import Heading from "../heading/heading";
import KiwiImage from "../kiwi-image/kiwi-image";

class KiwiPage {
  render() {
    const heading = new Heading();
    heading.render("kiwi");

    const kiwiImage = new KiwiImage();
    kiwiImage.render();
  }
}

export default KiwiPage;
