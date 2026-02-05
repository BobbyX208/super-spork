import * as monaco from "monaco-editor";

// For Vite, configure the base URL for workers
self.MonacoEnvironment = {
  getWorkerUrl: function (moduleId, label) {
    return `/node_modules/monaco-editor/esm/vs/editor/editor.worker.js`;
  }
};

const editor = monaco.editor.create(document.getElementById("editor"), {
  value: `#include <Arduino.h>\n\nvoid setup() {\n\n}\n\nvoid loop() {\n\n}`,
  language: "cpp",
  theme: "vs-dark",
  automaticLayout: true
});
