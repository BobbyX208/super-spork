import * as monaco from "monaco-editor";

const editor = monaco.editor.create(document.getElementById("editor"), {
  value: `#include <Arduino.h>\n\nvoid setup() {}\n\nvoid loop() {}`,
  language: "cpp",
  theme: "vs-dark",
  automaticLayout: true
});

document.getElementById("compile-btn").addEventListener("click", async () => {
  const code = editor.getValue();
  const response = await fetch("/compile", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code })
  });
  const result = await response.text();
  document.getElementById("output").innerText = result;
});
