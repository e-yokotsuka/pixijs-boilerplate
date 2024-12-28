import { AssetPack } from "@assetpack/core";
import { defineConfig } from "vite";
import eslintPlugin from "vite-plugin-eslint";
import path from "path";
import { texturePacker } from "@assetpack/core/texture-packer";

const env = process.env.NODE_ENV;
const isEnvProduction = env === "production";
const isEnvDevelopment = env === "development";

console.info("---------- info ---------");
console.info(`env: ${env}`);
console.info(`isEnvProduction: ${isEnvProduction}`);
console.info(`isEnvDevelopment: ${isEnvDevelopment}`);
console.info("-------------------------");

function assetpackPlugin() {
    const apConfig = {
        entry: "./raw-assets",
        pipes: [
            texturePacker({
                texturePacker: {
                  padding: 2,
                  nameStyle: "relative",
                  removeFileExtension: false,
                }
              })
        ],
    };

    let mode;
    let ap;

    return {
        name: "vite-plugin-assetpack",
        configResolved(resolvedConfig) {
            mode = resolvedConfig.command;
            if (!resolvedConfig.publicDir) return;
            if (apConfig.output) return;
            const publicDir = path.relative(process.cwd(), resolvedConfig.publicDir);
            apConfig.output = path.join(publicDir, "assets/");
        },
        buildStart: async () => {
            if (mode === "serve") {
                if (ap) return;
                ap = new AssetPack(apConfig);
                void ap.watch();
            } else {
                await new AssetPack(apConfig).run();
            }
        },
        buildEnd: async () => {
            if (ap) {
                await ap.stop();
                ap = undefined;
            }
        },
    };
}

export default defineConfig({
    plugins: [
        eslintPlugin({
            include: ["src/**/*.js"],
            failOnError: !(isEnvDevelopment),
            failOnWarning: false,
            emitWarning: false,
            cache: false,
        }),
        assetpackPlugin(),
        {
            name: "watch-raw-assets",
            handleHotUpdate({ file, server }) {
              if (file.includes("raw-assets")) {
                server.ws.send({ type: "full-reload" });
              }
            },
          },
    ],
    server: {
        open: true,
        watch: {
            usePolling: true,
        },
    }
});
