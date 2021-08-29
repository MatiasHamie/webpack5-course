import Kiwi from "./kiwi.jpeg";
import altText from "./altText.txt"; //esto es para probar el asset/source en el webpack

export default function addImage() {
  const img = document.createElement("img");
  img.alt = altText;
  // img.alt = "Kiwi";
  img.width = 300;
  img.src = Kiwi;

  const body = document.querySelector("body");
  body.appendChild(img);
}
