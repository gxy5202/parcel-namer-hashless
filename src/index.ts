/*
 * @description: parcel namer plugin
 * @Author: Gomi
 * @Date: 2022-01-14 23:14:13
 */
import { Namer } from "@parcel/plugin";
import defaultName from "@parcel/namer-default";

const CONFIG = Symbol.for("parcel-plugin-config");

type Config = {
    namerConfig: any;
    allNames: Array<string>;
}

enum MODE {
    ALL = "all",
    DEVELOPMENT = "development",
    PRODUCTION = "production"
}

function matchFileName(configs, newName) {
    return Array.isArray(configs) && configs?.some((v) => {
        const reg = new RegExp(v);
        return reg.test(newName)
    })
}

// fixed #1: Error: Bundles must have unique names
function checkFileNameIsUnique({ allNames, oldName, newName, logger }) {
    if (allNames.includes(newName)) {
        logger.warn({
            message: `${oldName} hashless failed: file name exists`,
        });
        return oldName;
    }

    logger.log({
        message: `${oldName} -> ${newName}`,
    });

    allNames.push(newName);

    return newName;
}

function buildNameWithoutHash({ bundle, oldName, logger, include, exclude, allNames }): string {
    try {
        // if filename has hash,
        if (!bundle?.needsStableName) {
            const nameArr = oldName.split(".");
            nameArr.splice(nameArr.length - 2, 1);
            const newName = nameArr.join(".");

            if (matchFileName(exclude, newName)) {
                return oldName;
            }

            if (matchFileName(include, newName)) {
                return checkFileNameIsUnique({allNames, oldName, newName, logger});
            }

            if (Array.isArray(include)) {
                return oldName;
            }

            return checkFileNameIsUnique({allNames, oldName, newName, logger});
        }
    } catch (err) {
        console.error(err);
    }

    return oldName;
}

export default new Namer({
    async loadConfig({ config }) {
        const packageJson = await config.getPackage();

        const namerConfig = packageJson?.['parcel-namer-hashless'];

        const allNames = [];

        // if parcel-namer-hashless config is matched
        if (Object.prototype.toString.call(namerConfig) === '[object Object]') {
            return Promise.resolve({ namerConfig, allNames } as Config);
        }

        return Promise.resolve({})
    },
    async name({ bundle, bundleGraph, logger, options, config }) {
        const oldName: string = await defaultName[CONFIG].name({
            bundle,
            bundleGraph,
            logger,
        });

        const { namerConfig, allNames } = config as Config;

        const { mode: configMode, include, exclude } = namerConfig;

        const { mode } = options;

        if (configMode === mode || configMode === MODE.ALL) {
            return buildNameWithoutHash({ bundle, oldName, logger, include, exclude, allNames });
        }

        if (!configMode) {
            if (mode === MODE.DEVELOPMENT) {
                return oldName;
            }

            return buildNameWithoutHash({ bundle, oldName, logger, include, exclude, allNames });
        }

        // use default filename
        return oldName;
    },
});
