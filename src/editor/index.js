import { transform } from "babel-standalone";
import Navigo from "navigo";
import editor from "./editor";

import defaultScript from "!raw-loader!./ressources/defaultScript.js"; // eslint-disable-line
import viewerHtml from "raw-loader!./iframe/viewer.html"; // eslint-disable-line

import "./style/index.scss";

const iframeContainer = document.getElementById("iframe-container");
let currentIframe;

function createIframe(content) {
  const iframe = document.createElement("iframe");
  iframe.srcdoc = viewerHtml.replace("{{ script }}", content);
  iframe.sandbox = "allow-forms allow-scripts allow-same-origin";

  if (currentIframe) {
    iframeContainer.removeChild(currentIframe);
  }

  iframeContainer.appendChild(iframe);
  currentIframe = iframe;
}

function loadCode() {
  try {
    const res = transform(editor.getValue(), {
      presets: ["es2015"],
    });
    createIframe(res.code);
  } catch (err) {
    // console.log(err);
  }
}

function loadDefault() {
  editor.setValue(defaultScript);
  loadCode();
}

function loadExample({ folder, file }) {
  fetch(`/ressources/examples/${folder}/${file}.js`)
    .then(response => response.text())
    .then((exampleCode) => {
      editor.setValue(exampleCode);
      loadCode(exampleCode);
    });
}

editor.create(document.getElementById("editor"));
editor.events.on("validate", loadCode);

const router = new Navigo(
  `${window.location.protocol}//${window.location.host}`
);
router
  .on({
    "/": loadDefault,
    "examples/:folder/:file": loadExample,
  })
  .resolve();
