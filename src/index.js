// @ts-check
const { transformSync } = require("@babel/core");
function reactCssModulePlugin(opt) {
  return {
    name: "vite-plugin-react-css-module",
    enforce: "pre",
    transform(code, id) {
      // modified from https://github.com/vitejs/vite/blob/main/packages/plugin-react-refresh/index.js
      if (!/\.(t|j)sx?$/.test(id) || id.includes("node_modules")) {
        return;
      }

      // plain js/ts files can't use React without importing it, so skip
      // them whenever possible
      if (!id.endsWith("x") && !code.includes("react")) {
        return;
      }

      const parserPlugins = ["jsx", "importMeta"];
      if (/\.tsx?$/.test(id)) {
        // it's a typescript file
        // TODO: maybe we need to read tsconfig to determine parser plugins to
        // enable here, but allowing decorators by default since it's very
        // commonly used with TS.
        parserPlugins.push("typescript", "decorators-legacy");
      }
      const isReasonReact = id.endsWith(".bs.js");
      const result = transformSync(code, {
        babelrc: false,
        configFile: false,
        filename: id,
        parserOpts: {
          sourceType: "module",
          allowAwaitOutsideFunction: true,
          plugins: parserPlugins,
        },
        plugins: [
          [
            require("babel-plugin-react-css-modules"),
            {
              autoResolveMultipleImports: true,
              exclude: "node_modules",
              ...opt,
            },
          ],
        ],
        ast: !isReasonReact,
        sourceMaps: true,
        sourceFileName: id,
      });
      return {
        code: result.code,
        map: result.map,
      };
    },
  };
}

module.exports = reactCssModulePlugin;
reactCssModulePlugin.default = reactCssModulePlugin;
