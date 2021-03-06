import Editor from "./editor";
import Viewer from "./viewer";
import Loader from "./loader";
import Router from "./router";
import Ui from "./ui";

import "./style/index.scss";

const rootPath = document.body.dataset.rootPath || "/";

const loader = new Loader({ rootPath });
const viewer = new Viewer(document.getElementById("viewer"), { rootPath });
const editor = new Editor(document.getElementById("editor"), { viewer, loader });
const router = new Router({ rootPath, editor, loader });
const ui = new Ui({ viewer });

export default {
  editor,
  viewer,
  router,
  ui,
};
