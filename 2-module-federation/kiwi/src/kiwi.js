import Heading from "./components/heading/heading";
import KiwiImage from "./components/kiwi-image/kiwi-image";
// import _ from "lodash";
import React from "react";

const heading = new Heading();
// heading.render(_.upperFirst("kiwi"));
heading.render("kiwi");

const kiwiImage = new KiwiImage();
kiwiImage.render();