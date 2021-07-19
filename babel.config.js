module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        useBuiltIns: false
      }
    ]
  ],
  plugins: [
    [
      "@babel/plugin-transform-runtime",
      {
        regenerator: true,
        corejs: 3,
        helpers: true
      }
    ]
  ]
}
