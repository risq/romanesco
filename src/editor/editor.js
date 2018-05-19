import * as monaco from "monaco-editor"; // eslint-disable-line
import EventEmitter from "event-emitter";
import { debounce } from "lodash";

let editor;
const events = new EventEmitter();

monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
  noLib: true,
  allowNonTsExtensions: true,
});

monaco.editor.defineTheme("romanesco", {
  base: "vs-dark",
  inherit: true,
  rules: [{ background: "EDF9FA" }],
  colors: {
    "editor.background": "#111111",
    "editor.foreground": "#fefefe",
    "editor.lineHighlightBackground": "#FFFFFF10",
  },
});

function create(element, { value }) {
  editor = monaco.editor.create(element, {
    value,
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
  });

  editor.model.onDidChangeContent(
    debounce(() => {
      // loadCode()
    }, 1500)
  );

  editor.addCommand(
    monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, // eslint-disable-line no-bitwise
    () => {
      events.emit("validate");
      editor.getAction("editor.action.formatDocument").run();
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
        editor.getAction("editor.action.commentLine").run();
      }
    },
    false
  );
}

function getValue() {
  return editor.getValue();
}

export default {
  create,
  getValue,
  events,
};
