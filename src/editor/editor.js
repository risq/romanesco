import * as monaco from "monaco-editor"; // eslint-disable-line
import { debounce } from "lodash";
import store from "store";

monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
  noLib: true,
  allowNonTsExtensions: true,
});

monaco.editor.defineTheme("romanesco", {
  base: "vs-dark",
  inherit: true,
  rules: [{ background: "EDF9FA" }],
  colors: {
    "editor.background": "#000000",
    "editor.foreground": "#fefefe",
    "editor.lineHighlightBackground": "#FFFFFF10",
  },
});

export default class Editor {
  constructor(element, { viewer, loader }) {
    this.viewer = viewer;
    this.loader = loader;

    this.monacoEditor = monaco.editor.create(element, {
      theme: "romanesco",
      language: "javascript",
      minimap: {
        enabled: false,
      },
      lineDecorationsWidth: 0,
      lineNumbersMinChars: 1,
      wordWrap: true,
      fontFamily: "Source Code Pro, monospace",
      scrollbar: {
        verticalScrollbarSize: 4,
      },
      renderIndentGuides: true,
      fontSize: 14,
    });

    this.monacoEditor.model.onDidChangeContent(
      debounce(() => {
        // loadCode()
      }, 1500)
    );

    this.monacoEditor.addCommand(
      monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, // eslint-disable-line no-bitwise
      () => {
        const code = this.monacoEditor.getValue();
        store.set("code", code);
        this.viewer.loadCode(code);
        this.monacoEditor.getAction("editor.action.formatDocument").run();
        this.monacoEditor.getAction("editor.action.formatDocument").run();
      }
    );

    document.addEventListener(
      "keydown",
      (e) => {
        if (
          e.keyCode === 191 &&
          (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)
        ) {
          e.preventDefault();
          this.monacoEditor.getAction("editor.action.commentLine").run();
        }
      },
      false
    );
  }

  getValue() {
    return this.monacoEditor.getValue();
  }

  setValue(value, { updateViewer = true } = {}) {
    this.monacoEditor.setValue(value);

    if (updateViewer) {
      this.viewer.loadCode(value);
    }
  }

  reset() {
    const saved = store.get("code");

    if (saved) {
      this.setValue(saved);
    } else {
      this.loader.loadExample("01-basics", "spiral").then((exampleCode) => {
        this.setValue(exampleCode);
      });
    }
  }
}
