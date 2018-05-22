import Navigo from "navigo";

const HOME_PAGE = Symbol("home");
const EXAMPLE_PAGE = Symbol("example");

export default class Router {
  constructor({ rootPath, editor, loader }) {
    this.editor = editor;
    this.rootPath = rootPath;
    this.loader = loader;

    this.navigo = new Navigo(
      `${window.location.protocol}//${window.location.host}${this.rootPath}`
    );

    this.initRoutes();

    this.navigo.resolve();
  }

  initRoutes() {
    this.navigo.on({
      "/": () => {
        if (this.currentPage === HOME_PAGE) {
          return;
        }

        this.currentPage = HOME_PAGE;

        this.editor.reset();
      },
      "examples/:folder/:file": ({ folder, file }) => {
        this.currentPage = EXAMPLE_PAGE;

        this.loader.loadExample(folder, file).then((exampleCode) => {
          this.editor.setValue(exampleCode);
        });
      },
    });
  }
}
