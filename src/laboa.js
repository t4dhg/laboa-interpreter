const Lexer = require("./lexer");
const Parser = require("./parser");
const Transpiler = require("./transpiler");
const BuiltIns = require("./builtins");

class Laboa {
  static transpile(code) {
    try {
      const lexer = new Lexer(code);
      const tokens = lexer.tokenize();

      const parser = new Parser(tokens);
      const ast = parser.parse();

      const transpiler = new Transpiler();
      const jsCode = transpiler.transpile(ast);

      return jsCode;
    } catch (error) {
      if (error.name && error.name.includes("Hutsa")) {
        // Already a Basque error, re-throw
        throw error;
      }
      // Convert to Basque error
      throw new Error(this.translateError(error));
    }
  }

  static run(code) {
    try {
      const jsCode = this.transpile(code);

      // Create execution context with built-ins
      const context = {
        ...BuiltIns.getFunctions(),
        console: console,
        require: require,
        module: module,
        exports: exports,
        __filename: __filename,
        __dirname: __dirname,
        process: process,
        Buffer: Buffer,
        global: global,
      };

      // Execute the transpiled JavaScript code
      const func = new Function(...Object.keys(context), jsCode);
      func(...Object.values(context));
    } catch (error) {
      throw new Error(this.translateError(error));
    }
  }

  static translateError(error) {
    const message = error.message || error;

    // Map common JavaScript errors to Basque
    if (
      message.includes("SyntaxError") ||
      message.includes("Unexpected token")
    ) {
      return `SintaxiHutsa: ${message}`;
    } else if (
      message.includes("ReferenceError") ||
      message.includes("is not defined")
    ) {
      return `IzenHutsa: ${message}`;
    } else if (message.includes("TypeError")) {
      return `MotaHutsa: ${message}`;
    } else if (message.includes("RangeError") || message.includes("Invalid")) {
      return `BalioHutsa: ${message}`;
    } else if (
      message.includes("Cannot read property") ||
      message.includes("Cannot access")
    ) {
      return `AdierazleHutsa: ${message}`;
    } else if (
      message.includes("ENOENT") ||
      message.includes("file not found")
    ) {
      return `FitxategiaEzDaAurkitzenHutsa: ${message}`;
    }

    return message;
  }
}

module.exports = Laboa;
