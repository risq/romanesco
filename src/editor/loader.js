export default class Loader {
  constructor({ rootPath }) {
    this.rootPath = rootPath;
  }

  loadExample(folder, file) {
    return fetch(`${this.rootPath}ressources/examples/${folder}/${file}.js`)
      .then(response => response.text());
  }
}
