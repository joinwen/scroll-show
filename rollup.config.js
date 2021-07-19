import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";

export default [
  {
    input: "src/index.js",
    output: {
      name: "scrollShow",
      file: "dist/scroll-show.cjs.js",
      format: "cjs",
      sourcemap: "inline"
    },
    plugins: [resolve(), commonjs()]
  },
  {
    input: "src/index.js",
    output: {
      name: "scrollShow",
      file: "dist/scroll-show.esm.js",
      format: "esm"
    },
    plugins: [resolve(), commonjs()]
  },
  {
    input: "src/index.js",
    output: {
      name: "scrollShow",
      file: "dist/scroll-show.umd.js",
      format: "umd"
    },
    plugins: [
      resolve(),
      commonjs(),
      babel({
        babelHelpers: "runtime",
        include: /src/,
        exclude: /node_modules/
      })
    ]
  }
];
