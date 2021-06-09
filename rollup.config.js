export default [
  {
    input: "src/index.js",
    output: {
      name: "scrollShow",
      file: "dist/scroll-show.cjs.js",
      format: "cjs",
      sourcemap: "inline"
    }
  },
  {
    input: "src/index.js",
    output: {
      name: "scrollShow",
      file: "dist/scroll-show.esm.js",
      format: "esm"
    }
  },
  {
    input: "src/index.js",
    output: {
      name: "scrollShow",
      file: "dist/scroll-show.umd.js",
      format: "umd"
    }
  }
];
