#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const readline = require("readline");
const Laboa = require("./src/laboa");

const args = process.argv.slice(2);

function showHelp() {
  console.log(`
Laboa Programazio Hizkuntza

Erabilera:
    laboa run <fitxategia>               Laboa fitxategia exekutatu
    laboa transpile <sarrera> <irteera>  Laboa JavaScript-era transpilatu
    laboa repl                           REPL interaktiboa hasi
    laboa help                           Laguntza mezu hau erakutsi

Adibideak:
    laboa run kaixo.laboa
    laboa transpile sarrera.laboa irteera.js
    laboa repl
    `);
}

function runFile(filename) {
  try {
    if (!fs.existsSync(filename)) {
      console.error(`Fitxategia ez da aurkitu: ${filename}`);
      process.exit(1);
    }

    const code = fs.readFileSync(filename, "utf8");
    Laboa.run(code);
  } catch (error) {
    console.error("Errorea:", error.message);
    process.exit(1);
  }
}

function transpileFile(inputFile, outputFile) {
  try {
    if (!fs.existsSync(inputFile)) {
      console.error(`Fitxategia ez da aurkitu: ${inputFile}`);
      process.exit(1);
    }

    const code = fs.readFileSync(inputFile, "utf8");
    const jsCode = Laboa.transpile(code);

    fs.writeFileSync(outputFile, jsCode);
    console.log(`Ondo transpilatu da: ${inputFile} -> ${outputFile}`);
  } catch (error) {
    console.error("Errorea:", error.message);
    process.exit(1);
  }
}

function startREPL() {
  console.log('Laboa REPL - Kaixo! Idatzi "irten" ateratzeko.');

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "laboa> ",
  });

  rl.prompt();

  rl.on("line", (line) => {
    const input = line.trim();

    if (input === "irten" || input === "exit") {
      console.log("Agur!");
      rl.close();
      return;
    }

    if (input === "") {
      rl.prompt();
      return;
    }

    try {
      Laboa.run(input);
    } catch (error) {
      console.error("Errorea:", error.message);
    }

    rl.prompt();
  }).on("close", () => {
    console.log("Agur!");
    process.exit(0);
  });
}

// Komando nagusien kudeaketa
if (args.length === 0 || args[0] === "help") {
  showHelp();
} else if (args[0] === "run") {
  if (args.length < 2) {
    console.error("Fitxategia zehaztu behar duzu");
    showHelp();
    process.exit(1);
  }
  runFile(args[1]);
} else if (args[0] === "transpile") {
  if (args.length < 3) {
    console.error("Sarrera eta irteera fitxategiak zehaztu behar dituzu");
    showHelp();
    process.exit(1);
  }
  transpileFile(args[1], args[2]);
} else if (args[0] === "repl") {
  startREPL();
} else {
  console.error(`Agindu ezezaguna: ${args[0]}`);
  showHelp();
  process.exit(1);
}
