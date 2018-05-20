import editor from "./editor";
import viewer from "./viewer";
import router from "./router";

import "./style/index.scss";

editor.init(document.getElementById("editor"));
viewer.init(document.getElementById("viewer"));

router.init();
