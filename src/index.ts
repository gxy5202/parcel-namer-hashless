/*
 * @description: parcel namer plugin
 * @Author: Gomi
 * @Date: 2022-01-14 23:14:13
 */
import { Namer } from "@parcel/plugin";
import defaultName from "@parcel/namer-default";

const CONFIG = Symbol.for("parcel-plugin-config");

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

function buildNameWithoutHash({ bundle, oldName, logger, include, exclude }): string {
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
                logger.log({
                    message: `${oldName} -> ${newName}`,
                });
                return newName;
            }

            if (Array.isArray(include)) {
                return oldName;
            }

            logger.log({
                message: `${oldName} -> ${newName}`,
            });

            return newName;
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

        // if parcel-namer-hashless config is matched
        if (Object.prototype.toString.call(namerConfig) === '[object Object]') {
            return Promise.resolve(namerConfig);
        }

        return Promise.resolve({})
    },
    async name({ bundle, bundleGraph, logger, options, config }) {
        const oldName: string = await defaultName[CONFIG].name({
            bundle,
            bundleGraph,
            logger,
        });

        const { mode: configMode, include, exclude } = config;

        const { mode } = options;

        if (configMode === mode || configMode === MODE.ALL) {
            return buildNameWithoutHash({ bundle, oldName, logger, include, exclude });
        }

        if (!configMode) {
            if (mode === MODE.DEVELOPMENT) {
                return oldName;
            }

            return buildNameWithoutHash({ bundle, oldName, logger, include, exclude });
        }

        // use default filename
        return oldName;
    },
});
