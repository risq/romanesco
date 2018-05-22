import { transform } from "babel-standalone";
import { template } from "lodash";

import config from "./config";

import viewerHtml from "raw-loader!./embedded/index.html"; // eslint-disable-line

const viewerHtmlTemplate = template(viewerHtml);

let container;
let currentIframe;

function init(element) {
  container = element;
}

function createIframe(script) {
  const iframe = document.createElement("iframe");
  iframe.srcdoc = viewerHtmlTemplate({
    script,
    rootPath: config.rootPath,
  });
  iframe.sandbox = "allow-forms allow-scripts allow-same-origin";

  if (currentIframe) {
    container.removeChild(currentIframe);
  }

  container.appendChild(iframe);
  currentIframe = iframe;
}

function loadCode(code) {
  try {
    const res = transform(code, {
      presets: ["es2015"],
    });
    createIframe(res.code);
  } catch (err) {
    // console.log(err);
  }
}

export default {
  init,
  loadCode,
};
