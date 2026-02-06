import express from "express";
import fs from "fs";
import { exec } from "child_process";
import path from "path";

const app = express();
app.use(express.json());
app.use(express.static("src"));

const sketchesDir = path.join(process.cwd(), "sketches");
if (!fs.existsSync(sketchesDir)) fs.mkdirSync(sketchesDir);

app.post("/compile", (req, res) => {
  const code = req.body.code;
  const sketchPath = path.join(sketchesDir, "sketch.ino");

  fs.writeFileSync(sketchPath, code);

  const fqbn = "arduino:avr:uno"; // change to your board

  exec(`bin/arduino-cli compile --fqbn ${fqbn} ${sketchPath}`, (err, stdout, stderr) => {
    if (err) return res.send(stderr || err.message);
    res.send(stdout);
  });
});

app.listen(5173, () => console.log("Arduino Web IDE running on port 5173"));
