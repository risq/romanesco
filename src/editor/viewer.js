import { transform } from "babel-standalone";

import viewerHtml from "raw-loader!./iframe/viewer.html"; // eslint-disable-line

let container;
let currentIframe;

function init(element) {
  container = element;
}

function createIframe(content) {
  const iframe = document.createElement("iframe");
  iframe.srcdoc = viewerHtml.replace("{{ script }}", content);
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
