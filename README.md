# Notas

### Pasos para iniciar un proyecto con npm y webpack

1. npm init -y
2. npm i webpack webpack-cli --save-dev
3. crear el bundle `npx webpack`

# Configuraciones minimas de webpack.config.js

### 1. Lo minimo que te pide webpack para configurar

### OJO, NO USAR ARROW FUNCTIONS EN ESTA ETAPA

```
 const path = require("path");

 module.exports = {
     entry: "./src/index.js",

     output: {
         filename: "bundle.js",
         path: path.resolve(__dirname, "./dist"),
     },
     mode: "none",
 };
```

# Instalar los loaders

```
npm i css-loader style-loader sass sass-loader --save-dev
npm i @babel/core babel-loader @babel/preset-env @babel/plugin-proposal-class-properties --save-dev
```

# Instalar los plugins

```
npm i terser-webpack-plugin mini-css-extract-plugin clean-webpack-plugin --save-dev

npm i handlebars handlebars-loader --save-dev
```

# Instalar localhost webpack server

```
 npm i webpack-dev-server --save-dev
```
