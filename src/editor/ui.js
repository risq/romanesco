export default class Ui {
  constructor({ viewer }) {
    this.viewer = viewer;
    this.initElements();
    this.initEvents();
  }

  initElements() {
    this.elements = {
      screenshotButton: document.querySelector(".ui-screenshot"),
    };
  }

  initEvents() {
    this.elements.screenshotButton.addEventListener("click", this.onScreenshotButtonClick.bind(this));
  }

  onScreenshotButtonClick() {
    this.viewer.screenshot();
  }
}
