import { toArray } from "#utils";
import { defineConfig as _defineConfig } from "rolldown";
import {
  DEFAULT_CIRCULAR_DEPS,
  DEFAULT_DIR,
  DEFAULT_EXCLUDE,
} from "./constants";
import { buildInput } from "./input";
import { buildOutput } from "./output";
import { PLUGIN_BUILDERS } from "./plugins";
import type { Config_F, Params } from "./types";
import path from "node:path";

export const defineConfig: Config_F = (additionals) => {
  return defineConfig.default(additionals);
};

const producePlugins = ({
  circularDeps,
  ignoresJS,
  dir = DEFAULT_DIR,
  sourcemap = false,
  excludesTS,
  declarationMap,
  plugins,
}: Params = {}) => {
  const include = buildInput(...toArray(excludesTS));
  const exclude = DEFAULT_EXCLUDE.concat(toArray(excludesTS));
  const unordered = {
    alias: () => PLUGIN_BUILDERS.alias(),
    typescript: () =>
      PLUGIN_BUILDERS.typescript({
        include,
        exclude,
        declarationMap,
        dir,
      }),
    circulars: () =>
      PLUGIN_BUILDERS.circulars({
        exclude: circularDeps,
      }),
    externals: () =>
      PLUGIN_BUILDERS.externals({
        // exclude peerDependencies and dependencies
        optDeps: false,
        builtinsPrefix: "strip",
        include: excludesTS,
      }),
    tsPaths: () => PLUGIN_BUILDERS.tsPaths({ colors: true }),
    clean: () =>
      PLUGIN_BUILDERS.clean({
        ignoresJS,
        sourcemap,
        dir,
      }),
  };

  const defaultOrdered = () => [
    unordered.alias(),
    unordered.tsPaths(),
    unordered.circulars(),
    unordered.externals(),
    unordered.typescript(),
    unordered.clean(),
  ];

  return plugins
    ? plugins
        .map((p) => {
          if (typeof p === "string") return unordered[p]();
          return p;
        })
        .filter((p) => !!p)
    : defaultOrdered();
};

defineConfig.default = ({
  dir = DEFAULT_DIR,
  sourcemap = false,
  ...rest
}: Params = {}) => {
  const input = buildInput();
  const external = rest.externals;
  const output = buildOutput(dir, sourcemap);

  const plugins = producePlugins({
    dir,
    sourcemap,
    ...rest,
  });

  return _defineConfig({
    input,
    plugins,
    external,
    output,
    transform: {
      inject: {
        require: path.resolve("./require.js"),
      },
    },
    platform: "node",
  });
};

defineConfig.bemedev = (additionals) => {
  // #region constants
  const circularDeps = DEFAULT_CIRCULAR_DEPS.concat(
    toArray(additionals?.circularDeps),
  );
  const ignoresJS = toArray(additionals?.ignoresJS).concat(
    DEFAULT_CIRCULAR_DEPS,
  );

  const excludesTS = DEFAULT_EXCLUDE.concat(toArray(additionals?.excludesTS));
  const _sourcemap = additionals?.sourcemap;
  const sourcemap = _sourcemap === undefined || _sourcemap === true;
  // #endregion

  return defineConfig.default({
    ...additionals,
    circularDeps,
    excludesTS,
    ignoresJS,
    sourcemap,
  });
};
