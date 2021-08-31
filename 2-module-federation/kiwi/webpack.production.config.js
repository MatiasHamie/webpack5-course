const path = require("path");
// const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    kiwi: "./src/kiwi.js",
  },

  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "./dist"),
    publicPath: "http://localhost:9002/",
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
        type: "asset",
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
      filename: "kiwi.html",
      chunks: ["kiwi"],
      title: "Kiwi",
      description: "Kiwi",
      template: "src/page-template.hbs",
    }),
    new ModuleFederationPlugin({
      //nombre de la aplicacion
      name: "KiwiApp",
      // filename y exposes va solo si lo exportamos
      // no olvidar configurar el publicPath
      // para poner donde va a estar alojada la app
      filename: "remoteEntry.js",
      exposes: {
        "./KiwiPage": "./src/components/kiwi-page/kiwi-page.js",
      },
    }),

    // Module Federation
    // Lo que EXPORTO
    // new ModuleFederationPlugin({
    //   //nombre de la aplicacion
    //   name: "HelloWorldApp",
    //   // al buildear webpack genera un archivo
    //   // que contiene lo q exporta esta app
    //   filename: "remoteEntry.js",
    //   exposes: {
    //     // que exporto y el path
    //     "./HelloWorldButton":
    //       "./src/components/hello-world-button/hello-world-button",
    //   },
    // }),

    // Como lo importo en el webpack config
    // new ModuleFederationPlugin({
    //   //nombre de la aplicacion
    //   name: "KiwiApp",
    //   remotes: {
    //     HelloWorldApp: "HelloWorldApp@http://localhost:9001/remoteEntry.js",
    //   },
    // }),
    // como lo importo ya para usarlo en un js
    // import("HelloWorldApp/HelloWorldButton").then((HelloWorldButtonModule) => {
    //   // esto es porque exportamos por default en la app remota
    //   const HelloWorldButton = HelloWorldButtonModule.default;

    //   // ahora puedo usar el modulo
    //   const helloWorldButton = new HelloWorldButton();
    //   helloWorldButton.render();
    // });
  ],
};
