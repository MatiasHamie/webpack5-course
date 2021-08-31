import Heading from "../heading/heading";
import HelloWorldButton from "../hello-world-button/hello-world-button";

class HelloWorldPage {
  render() {
    const heading = new Heading();
    heading.render("hello world");

    const helloWorldButton = new HelloWorldButton();
    helloWorldButton.render();
  }
}

export default HelloWorldButton;
