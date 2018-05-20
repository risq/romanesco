import Navigo from "navigo";

import editor from "./editor";

const HOME_PAGE = Symbol("home");
const EXAMPLE_PAGE = Symbol("example");

let currentPage;

const router = new Navigo(
  `${window.location.protocol}//${window.location.host}`
);

router.on({
  "/": () => {
    if (currentPage === HOME_PAGE) {
      return;
    }

    currentPage = HOME_PAGE;

    editor.reset();
  },
  "examples/:folder/:file": ({ folder, file }) => {
    currentPage = EXAMPLE_PAGE;

    fetch(`/ressources/examples/${folder}/${file}.js`)
      .then(response => response.text())
      .then((exampleCode) => {
        editor.setValue(exampleCode);
      });
  },
});

function init() {
  router.resolve();
}

export default {
  init,
};
