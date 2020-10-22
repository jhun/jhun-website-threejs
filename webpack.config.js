const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  mode: "development",
  devServer: {
    contentBase: "./dist",
    host: "0.0.0.0",
    hot: true,
    open: true,
  },
  entry: "./src/main.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.html$/i,
        use: ["html-loader"],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: {
          loader: "file-loader",
          options: {
            name: "[path][name].[ext]",
            context: "src",
          },
        },
      },
      {
        test: /\.(gltf)$/,
        use: {
          loader: "gltf-webpack-loader",
          options: {
            name: "[path][name].[ext]",
            context: "src",
          },
        },
      },
      {
        test: /\.(bin)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[path][name].[ext]",
              context: "src",
            },
          },
        ],
      },
      {
        test: /\.(glsl)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[path][name].[ext]",
              context: "src",
            },
          },
        ],
      },
    ],
  },
};
