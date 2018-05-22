import Editor from "./editor";
import Viewer from "./viewer";
import Router from "./router";

import "./style/index.scss";

const rootPath = document.body.dataset.rootPath || "/";

const viewer = new Viewer(document.getElementById("viewer"), { rootPath });
const editor = new Editor(document.getElementById("editor"), { viewer });

const router = new Router({ rootPath, editor });

export default {
  editor,
  viewer,
  router,
};
