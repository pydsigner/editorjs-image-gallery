const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
  entry: {
    imageGallery: {
      import: "./src/index.js",
      filename: "bundle.js",
      layer: "main",
    },
    galleryWidget: {
      import: "./src/gallery-grid.js",
      filename: "gallery.js",
      layer: "no-inject",
    },
  },
  plugins: [new MiniCssExtractPlugin()],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            targets: "defaults",
            presets: [["@babel/preset-env"]],
          },
        },
      },
      {
        test: /\.less$/,
        issuerLayer: "main",
        use: ["style-loader", "css-loader", "less-loader"],
      },
      {
        test: /\.less$/,
        issuerLayer: "no-inject",
        use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"],
      },
    ],
  },
  output: {
    path: __dirname + "/dist",
    publicPath: "/",
    library: "[name]",
    libraryTarget: "umd",
  },
};
