const path = require("path");
// const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  // esto cambia el directorio de donde tomas el index JS
  // si queremos un solo bundle hacemos asi
  // entry: "./src/index.js",

  // si tenemos multiples paginas y queremos separar en varios bundles
  entry: {
    "hello-world": "./src/index.js",
    kiwi: "./src/kiwi.js",
  },

  // esto genera el bundle, por defecto crea un main.js,
  // lo cambie a bundle.js
  // y el path tiene q estar asi, porque si lo usas asi path: './dist', tira error
  // ya que tiene que ser path absoluto
  output: {
    // [name] toma el nombre de cada entry que configuramos arriba
    // (kiwi, hello-world, etc.) y lo reemplaza
    // [id] puede ser tambien pero no es un nombre legible
    filename: "[name].[contenthash].js",
    // [contenthash] lo que hace es agregarle un hash al nombre
    // del bundle, y lo actualiza cada vez q hay un cambio
    // esto sirve para no tener un nombre estatico y que quede cacheado
    path: path.resolve(__dirname, "./dist"),
    publicPath: "", //por defecto esta en 'auto', poner 'directorio/'
  },
  // se puede poner none, development o production
  // dependiendo que modo este puesto, webpack habilita N plugins
  // https://webpack.js.org/configuration/mode/
  mode: "production",
  // en el caso de que importemos una libreria en varias paginas
  // Hay q poner esto para q no importe la libreria en comun SIEMPRE
  // en CADA pagina q lo usa, tenemos q decirle a webpack q optimice eso
  // caso contrario, cada bundle se vuelve re pesado
  // lo q hace es generar un bundle aparte con la dependencia sola
  // y la incluye cuando la importe en algun lado
  // por defecto eso lo hace si la dependencia q importe pesa mas de 30 kb
  // eso se puede editar con minSize
  optimization: {
    splitChunks: {
      chunks: "all",
      minSize: 3000, //casi 3kb
    },
  },

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
      {
        test: /\.hbs$/,
        use: {
          loader: "handlebars-loader",
        },
      },
    ],
  },
  // se tienen q instalar aparte
  plugins: [
    // esto disminuye el size del bundle
    // new TerserPlugin(), // esto esta habilitado por defecto en production
    // esto pone el css aparte del bundle
    // la idea es no crear un bundle enorme
    new MiniCssExtractPlugin({
      // nombre del archivo final q une todos los estilos
      // esto es idem con el bundle.js de arriba
      // [name] o [id]
      filename: "[name].[contenthash].css",
    }),
    // esto borra todos los archivos de los paths antes de buildear
    // la idea es que no queden los bundles anteriores
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [
        "**/*", // esto es en .dist por defecto
        // si se quiere borrar otra carpeta se especifica asi
        path.join(process.cwd(), "build/**/*"),
      ],
    }),
    // como usamos nombres hasheados para css y js,
    // se necesita que se auto actualicen los imports de los scrips y styles
    // en el index.html buildeado, lo que hace este plugin es actualizar eso
    new HtmlWebpackPlugin({
      filename: "hello-world.html",
      // chunks sirve para crear el html al hacer el building
      // de forma tal que tome el filename q se especifico
      // en entry{} arriba de todo este archivo
      // tiene q coincidir con la key
      // de esta forma hacemos un html por cada pagina q querramos
      // para eso se necesitan instancias de este plugin
      chunks: ["hello-world"],
      // Este plugin le cambia el titulo al index.html en el head
      // por lo que aca se le pone el titulo que se quiere
      title: "Hello World",
      // le podes decir que el archivo html te lo ubique donde vos quieras
      // un ejemplo seria
      // filename: "subfolder/custom_filename.html",
      // agregando una metatag nueva
      // si no uso handlebars u otro template
      //   meta: {
      //     description: "Some descript",
      //   },
      description: "Some description", // si uso handlebars u otro template lo dejo asi
      // usando handlebars (template para crear un html mas personalizado)
      // como hbs no es un archivo conocido por defecto por webpack
      // tenemos q decirle como manejarlo
      template: "src/page-template.hbs",
      // minify: false, // customizable el minificado true o false
    }),
    new HtmlWebpackPlugin({
      filename: "kiwi.html",
      chunks: ["kiwi"],
      title: "Kiwi",
      description: "Kiwi",
      template: "src/page-template.hbs",
    }),
  ],
};
