const path = require("path");
// const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
  entry: {
    "hello-world": "./src/index.js",
  },

  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "./dist"),
    publicPath: "http://localhost:9001/",
  },

  mode: "production",

  optimization: {
    splitChunks: {
      chunks: "all",
      minSize: 3000,
    },
  },

  module: {
    rules: [
      {
        test: /\.(png|bmp|jpeg|jpg)$/,
        parser: { dataUrlCondition: { maxSize: 3 * 1024 } },
      },
      {
        test: /\.txt/,
        type: "asset/source",
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/env"],
            plugins: ["@babel/plugin-proposal-class-properties"],
          },
        },
      },
      {
        test: /\.hbs$/,
        use: {
          loader: "handlebars-loader",
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: "hello-world.html",
      title: "Hello World",
      description: "Some description",
      template: "src/page-template.hbs",
    }),
    new ModuleFederationPlugin({
      name: "HelloWorldApp",
      // al buildear webpack genera un archivo
      // que contiene lo q exporta esta app
      // filename y exposes va solo si lo exportamos
      // no olvidar configurar el publicPath
      // para poner donde va a estar alojada la app
      filename: "remoteEntry.js",
      exposes: {
        // que exporto y el path
        "./HelloWorldButton":
          "./src/components/hello-world-button/hello-world-button",
        "./HelloWorldPage":
          "./src/components/hello-world-page/hello-world-page",
      },
    }),
  ],
};
