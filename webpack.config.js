const _require = (id) =>
  require(require.resolve(id, { paths: [require.main.path] }));
const HtmlWebpackPlugin = _require("html-webpack-plugin");
const path = require("path");

module.exports = {
  mode: "production",
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
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
      {
        test: /\.html$/i,
        use: ["html-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
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
          loader: "file-loader",
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
      {
        test: /\.(mp3|ogg)$/,
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
