const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  // esto cambia el directorio de donde tomas el index JS
  entry: "./src/index.js",

  // esto genera el bundle, por defecto crea un main.js,
  // lo cambie a bundle.js
  // y el path tiene q estar asi, porque si lo usas asi path: './dist', tira error
  // ya que tiene que ser path absoluto
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "./dist"),
    publicPath: "dist/", //por defecto esta en 'auto', poner 'directorio/'
  },

  mode: "none",

  module: {
    // webpack para tratar los archivos q no sean de JS, se fija si hay reglas creadas
    // y hace segun se le pide
    // "si tenes una imagen usa esto para ponerlo en el distribuible y asi sucesivamente"
    rules: [
      {
        test: /\.(png|bmp|jpeg|jpg)$/,
        // type: "asset/resource", // copia las imgs en el output (dist)
        // type: "asset/inline", //NO genera un nuevo archivo, pone la imagen en base64 en el src de la img, pesa mas que /resource
        type: "asset", // si la imagen(archivo) pesa <8kb(por default) usa inline si no, resource
        parser: { dataUrlCondition: { maxSize: 3 * 1024 } }, // si uso asset, puedo modificar esos 8kb por defecto
        // aca por ej lo cambie a 3 kb
      },
      {
        test: /\.txt/,
        type: "asset/source", //con esto, webpack lee el txt y te devuelve un string de JS comun
      },
      {
        test: /\.css$/,
        // cuando usamos loaders hay que instalarlos aparte
        // use: ["style-loader", "css-loader"], // esto crea un bundle con todo dentro (css, js)
        // atencion al orden de los loaders, webpack los procesa
        // de derecha a izquierda
        // css-loader lee los css y retorna su contenido
        // style-loader agarra eso y lo inyecta al bundle
        // uso MiniCss para poder extraer el css del bundle final
        // y lograr ponerlo por separado para disminuir el size del bundle.js
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
        // sass-loader convierte de sass a css
        // y se repite lo de la rule anterior
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/env"], //env convierte todo a ES5
            plugins: ["@babel/plugin-proposal-class-properties"],
          },
        },
      },
    ],
  },
  // se tienen q instalar aparte
  plugins: [
    // esto disminuye el size del bundle
    new TerserPlugin(),
    // esto pone el css aparte del bundle
    // la idea es no crear un bundle enorme
    new MiniCssExtractPlugin({
      // nombre del archivo final q une todos los estilos
      filename: "styles.css",
    }),
  ],
};
