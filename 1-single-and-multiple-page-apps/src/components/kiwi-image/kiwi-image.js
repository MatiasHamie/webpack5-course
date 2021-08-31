import Kiwi from "./kiwi.jpeg";
import altText from "./altText.txt"; //esto es para probar el asset/source en el webpack
import "./kiwi-image.scss";

class KiwiImage {
  render() {
    const img = document.createElement("img");
    img.src = Kiwi;
    img.alt = altText;
    img.classList.add("kiwi-image");

    const body = document.querySelector("body");
    body.appendChild(img);
  }
}

export default KiwiImage;
