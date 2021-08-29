import addImage from "./add-image";
import Heading from "./components/heading/heading";
import HelloWorldButton from "./components/hello-world-button/hello-world-button";

const heading = new Heading();
heading.render();

const helloWorldButton = new HelloWorldButton();
helloWorldButton.render();

addImage();

if (process.env.NODE_ENV === "production") {
  console.log("Production Mode");
} else if (process.env.NODE_ENV === "development") {
  console.log("Development Mode");
}

// aca veo que llamo a un metodo a proposito q no existe
// para ver como se comporta webpack dependiendo en q modo
// y puedo observar que en modo production
// el error dice
// Uncaught TypeError: c.methodThatNotExist is not a function
//     at bundle.79a316810a32f87db15b.js:1
//     at bundle.79a316810a32f87db15b.js:1
//     at bundle.79a316810a32f87db15b.js:1

// pero en development te ayuda para debugear
// index.js:26 Uncaught TypeError: helloWorldButton.methodThatNotExist is not a function
//     at eval (index.js:26)
//     at Object../src/index.js (bundle.cf83a9eeb24118d3794a.js:2)
//     at __webpack_require__ (bundle.cf83a9eeb24118d3794a.js:2)
//     at bundle.cf83a9eeb24118d3794a.js:2
//     at bundle.cf83a9eeb24118d3794a.js:2
helloWorldButton.methodThatNotExist();
