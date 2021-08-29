import "./hello-world-button.scss";

class HelloWorldButton {
  // esto de usar classProp de esta forma
  // no es de ES viejo, es para probar que funciona
  // Los browsers solo permiten metodos dentro de las clases de JS
  // pero NO propiedades como la q hice de buttonCssClass\
  buttonCssClass = "hello-world-button";

  render() {
    const button = document.createElement("button");
    button.innerHTML = "Hello World";
    button.classList.add(this.buttonCssClass);

    button.onclick = function () {
      const p = document.createElement("p");
      p.innerHTML = "Hellow World";
      p.classList.add("hello-world-text");
      body.appendChild(p);
    };

    const body = document.querySelector("body");
    body.appendChild(button);
  }
}

export default HelloWorldButton;
