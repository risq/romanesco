import { transform } from "babel-standalone";
import { template } from "lodash";

import bus from "framebus";

import viewerHtml from "raw-loader!./embedded/index.html"; // eslint-disable-line

const viewerHtmlTemplate = template(viewerHtml);

export default class Viewer {
  constructor(element, { rootPath }) {
    this.container = element;
    this.rootPath = rootPath;

    bus.on("screenshot", Viewer.onScreenshot);
  }

  createIframe(script) {
    const iframe = document.createElement("iframe");
    iframe.srcdoc = viewerHtmlTemplate({
      script,
      rootPath: this.rootPath,
    });
    iframe.sandbox = "allow-forms allow-scripts allow-same-origin";

    if (this.currentIframe) {
      this.container.removeChild(this.currentIframe);
    }

    this.container.appendChild(iframe);
    this.currentIframe = iframe;
  }

  loadCode(code) {
    try {
      const res = transform(code, {
        presets: ["es2015"],
      });
      this.createIframe(res.code);
    } catch (err) {
      // console.log(err);
    }
  }

  screenshot() {
    if (!this.currentIframe) {
      return;
    }

    bus.emit("take-screenshot", { width: 1024, height: 1024 });
  }

  static onScreenshot(data) {
    const w = window.open("", "");
    w.document.title = "Screenshot";

    const img = new Image();
    img.src = data;

    w.document.body.appendChild(img);
  }
}
