const fs = require("fs");
const readline = require("readline");

class BuiltIns {
  static getFunctions() {
    return {
      // Print function
      ageri: (...args) => {
        console.log(
          ...args.map((arg) =>
            typeof arg === "string" ? arg : JSON.stringify(arg)
          )
        );
      },

      // Input function (synchronous for simplicity)
      sartu: (prompt = "") => {
        if (prompt) {
          process.stdout.write(prompt);
        }
        // Note: This is a simplified synchronous input for demo purposes
        // In a real implementation, you might want to use async/await
        const input = require("child_process")
          .execSync('read -p "" INPUT && echo $INPUT', {
            encoding: "utf8",
            stdio: ["inherit", "pipe", "inherit"],
          })
          .trim();
        return input;
      },

      // Length function
      luzera: (obj) => {
        if (typeof obj === "string" || Array.isArray(obj)) {
          return obj.length;
        } else if (obj && typeof obj === "object") {
          return Object.keys(obj).length;
        } else {
          throw new Error(
            "MotaHutsa: luzera funtzioak katea edo zerrenda behar du"
          );
        }
      },

      // Range function
      bitartea: (start, end, step = 1) => {
        if (typeof start !== "number" || typeof end !== "number") {
          throw new Error("MotaHutsa: bitartea funtzioak zenbakiak behar ditu");
        }

        const result = [];
        if (step > 0) {
          for (let i = start; i < end; i += step) {
            result.push(i);
          }
        } else if (step < 0) {
          for (let i = start; i > end; i += step) {
            result.push(i);
          }
        }
        return result;
      },

      // String join
      lotu: (array, separator = "") => {
        if (!Array.isArray(array)) {
          throw new Error("MotaHutsa: lotu funtzioak zerrenda behar du");
        }
        return array.join(separator);
      },

      // String split
      zatitu: (string, separator) => {
        if (typeof string !== "string") {
          throw new Error("MotaHutsa: zatitu funtzioak katea behar du");
        }
        return string.split(separator);
      },

      // Mathematical operations
      batuketa: (a, b) => {
        if (typeof a !== "number" || typeof b !== "number") {
          throw new Error("MotaHutsa: batuketa funtzioak zenbakiak behar ditu");
        }
        return a + b;
      },

      kenketa: (a, b) => {
        if (typeof a !== "number" || typeof b !== "number") {
          throw new Error("MotaHutsa: kenketa funtzioak zenbakiak behar ditu");
        }
        return a - b;
      },

      biderketa: (a, b) => {
        if (typeof a !== "number" || typeof b !== "number") {
          throw new Error(
            "MotaHutsa: biderketa funtzioak zenbakiak behar ditu"
          );
        }
        return a * b;
      },

      zatiketa: (a, b) => {
        if (typeof a !== "number" || typeof b !== "number") {
          throw new Error("MotaHutsa: zatiketa funtzioak zenbakiak behar ditu");
        }
        if (b === 0) {
          throw new Error("BalioHutsa: Zero-rekin ezin da zatitu");
        }
        return a / b;
      },

      // File operations (simplified)
      ireki: (filename, mode = "r") => {
        try {
          if (mode === "r") {
            return {
              filename,
              mode,
              content: fs.readFileSync(filename, "utf8"),
            };
          } else {
            return { filename, mode, content: "" };
          }
        } catch (error) {
          throw new Error(
            `FitxategiaEzDaAurkitzenHutsa: ${filename} ezin da ireki`
          );
        }
      },

      irakurri: (fileObj) => {
        if (!fileObj || !fileObj.filename) {
          throw new Error(
            "MotaHutsa: irakurri funtzioak fitxategi objektua behar du"
          );
        }
        try {
          return fs.readFileSync(fileObj.filename, "utf8");
        } catch (error) {
          throw new Error(
            `FitxategiaEzDaAurkitzenHutsa: ${fileObj.filename} ezin da irakurri`
          );
        }
      },

      idatzi: (fileObj, content) => {
        if (!fileObj || !fileObj.filename) {
          throw new Error(
            "MotaHutsa: idatzi funtzioak fitxategi objektua behar du"
          );
        }
        try {
          fs.writeFileSync(fileObj.filename, content, "utf8");
          fileObj.content = content;
        } catch (error) {
          throw new Error(
            `FitxategiaEzDaAurkitzenHutsa: ${fileObj.filename} ezin da idatzi`
          );
        }
      },

      itxi: (fileObj) => {
        // In a real file system, this would close the file handle
        // For our simplified implementation, we just clear the content
        if (fileObj) {
          fileObj.content = null;
        }
      },

      // Array methods
      gehitu: function (array, item) {
        if (!Array.isArray(array)) {
          throw new Error("MotaHutsa: gehitu funtzioak zerrenda behar du");
        }
        array.push(item);
        return array;
      },

      kendu: function (array, index) {
        if (!Array.isArray(array)) {
          throw new Error("MotaHutsa: kendu funtzioak zerrenda behar du");
        }
        if (index < 0 || index >= array.length) {
          throw new Error("AdierazleHutsa: Indizea barrutitik kanpo dago");
        }
        return array.splice(index, 1)[0];
      },

      // Type checking functions
      motaAtera: (value) => {
        if (value === null) return "hutsa";
        if (Array.isArray(value)) return "zerrenda";
        if (typeof value === "number") {
          return Number.isInteger(value) ? "osoa" : "hamartarra";
        }
        if (typeof value === "string") return "katea";
        if (typeof value === "boolean") return "boolearra";
        if (typeof value === "object") return "gauza";
        if (typeof value === "function") return "funtzio";
        return "ezezaguna";
      },

      // Utility functions
      biurtu: (value) => {
        if (typeof value === "string") {
          return value.split("").reverse().join("");
        } else if (Array.isArray(value)) {
          return value.slice().reverse();
        } else {
          throw new Error(
            "MotaHutsa: biurtu funtzioak katea edo zerrenda behar du"
          );
        }
      },

      ordenatu: (array, compareFunction) => {
        if (!Array.isArray(array)) {
          throw new Error("MotaHutsa: ordenatu funtzioak zerrenda behar du");
        }
        return array.slice().sort(compareFunction);
      },

      // Math functions
      Math: {
        abs: Math.abs,
        max: Math.max,
        min: Math.min,
        round: Math.round,
        floor: Math.floor,
        ceil: Math.ceil,
        sqrt: Math.sqrt,
        pow: Math.pow,
        random: Math.random,
        PI: Math.PI,
        E: Math.E,
      },
    };
  }

  static getErrors() {
    return {
      SintaxiHutsa: class extends Error {
        constructor(message) {
          super(message);
          this.name = "SintaxiHutsa";
        }
      },

      IzenHutsa: class extends Error {
        constructor(message) {
          super(message);
          this.name = "IzenHutsa";
        }
      },

      MotaHutsa: class extends Error {
        constructor(message) {
          super(message);
          this.name = "MotaHutsa";
        }
      },

      BalioHutsa: class extends Error {
        constructor(message) {
          super(message);
          this.name = "BalioHutsa";
        }
      },

      AdierazleHutsa: class extends Error {
        constructor(message) {
          super(message);
          this.name = "AdierazleHutsa";
        }
      },

      FitxategiaEzDaAurkitzenHutsa: class extends Error {
        constructor(message) {
          super(message);
          this.name = "FitxategiaEzDaAurkitzenHutsa";
        }
      },
    };
  }
}

module.exports = BuiltIns;
