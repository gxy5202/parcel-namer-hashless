/*
 * @description: parcel namer plugin
 * @Author: Gomi
 * @Date: 2022-01-14 23:14:13
 */
import { Namer } from "@parcel/plugin";
import defaultName from "@parcel/namer-default";

const CONFIG = Symbol.for("parcel-plugin-config");
export default new Namer({
    async name({ bundle, bundleGraph, logger, options }) {
        const oldName: string = await defaultName[CONFIG].name({
            bundle,
            bundleGraph,
            logger,
        });

        // if mode is development, return file name with hash
        if (options.mode === "development") {
            return oldName;
        }

        // if filename has hash,
        if (!bundle.needsStableName) {
            const nameArr = oldName.split(".");
            nameArr.splice(nameArr.length - 2, 1);
            const newName = nameArr.join(".");

            logger.log({
                message: `${oldName} -> ${newName}`,
            });

            return newName;
        }

        // use default filename
        return oldName;
    },
});
