class Token {
  constructor(type, value, line = 1, column = 1) {
    this.type = type;
    this.value = value;
    this.line = line;
    this.column = column;
  }
}

class Lexer {
  constructor(code) {
    this.code = code;
    this.position = 0;
    this.line = 1;
    this.column = 1;
    this.tokens = [];

    // Basque keywords mapping
    this.keywords = {
      // Functions
      funtzio: "FUNCTION",
      definitu: "FUNCTION",
      itzuli: "RETURN",

      // Aldagaiak
      orokor: "VAR",
      aldagarri: "LET",
      finko: "CONST",

      // Baldintzak
      baldin: "IF",
      bada: "THEN",
      bestela: "ELSE",
      aukeratu: "SWITCH",
      kasua: "CASE",

      // Begiztak
      errepikatu: "FOR",
      bitartean: "WHILE",
      eten: "BREAK",
      jarraitu: "CONTINUE",

      // Logika
      eta: "AND",
      edo: "OR",
      ez: "NOT",

      // Datu-motak
      osoa: "INT",
      katea: "STRING",
      boolearra: "BOOL",
      zerrenda: "LIST",
      hamartarra: "FLOAT",
      egia: "TRUE",
      gezurra: "FALSE",
      hutsa: "NULL",

      // Erroreak
      saiatu: "TRY",
      harrapatu: "CATCH",
      jaurti: "THROW",
      azkenean: "FINALLY",

      // Motak
      mota: "CLASS",
      objektu: "OBJECT",
      berri: "NEW",
      metodoa: "METHOD",
      norbera: "SELF",
      hau: "THIS",

      // Funtzio integratuak
      ageri: "PRINT",
      sartu: "INPUT",
      luzera: "LENGTH",
      bitartea: "RANGE",

      // Loop iteration
      n: "IN",
    };
  }

  current() {
    if (this.position >= this.code.length) {
      return null;
    }
    return this.code[this.position];
  }

  peek(offset = 1) {
    const pos = this.position + offset;
    if (pos >= this.code.length) {
      return null;
    }
    return this.code[pos];
  }

  advance() {
    if (this.position < this.code.length) {
      if (this.code[this.position] === "\n") {
        this.line++;
        this.column = 1;
      } else {
        this.column++;
      }
      this.position++;
    }
  }

  skipWhitespace() {
    while (
      this.current() &&
      /\s/.test(this.current()) &&
      this.current() !== "\n"
    ) {
      this.advance();
    }
  }

  skipComment() {
    if (this.current() === "#") {
      while (this.current() && this.current() !== "\n") {
        this.advance();
      }
    }
  }

  readString(quote) {
    let value = "";
    this.advance(); // Skip opening quote

    while (this.current() && this.current() !== quote) {
      if (this.current() === "\\") {
        this.advance();
        const escaped = this.current();
        switch (escaped) {
          case "n":
            value += "\n";
            break;
          case "t":
            value += "\t";
            break;
          case "r":
            value += "\r";
            break;
          case "\\":
            value += "\\";
            break;
          case quote:
            value += quote;
            break;
          default:
            value += escaped;
            break;
        }
      } else {
        value += this.current();
      }
      this.advance();
    }

    if (this.current() === quote) {
      this.advance(); // Skip closing quote
    } else {
      throw new Error(`SintaxiHutsa: Katea ez da itxi - ${this.line} lerroan`);
    }

    return value;
  }

  readNumber() {
    let value = "";
    let hasDecimal = false;

    while (
      this.current() &&
      (/\d/.test(this.current()) || this.current() === ".")
    ) {
      if (this.current() === ".") {
        if (hasDecimal) break;
        hasDecimal = true;
      }
      value += this.current();
      this.advance();
    }

    return hasDecimal ? parseFloat(value) : parseInt(value);
  }

  readIdentifier() {
    let value = "";

    while (
      this.current() &&
      (/[a-zA-Z_\u00C0-\u017F]/.test(this.current()) ||
        /\d/.test(this.current()))
    ) {
      value += this.current();
      this.advance();
    }

    return value;
  }

  tokenize() {
    while (this.position < this.code.length) {
      const char = this.current();

      if (!char) break;

      // Skip whitespace (except newlines)
      if (/\s/.test(char) && char !== "\n") {
        this.skipWhitespace();
        continue;
      }

      // Comments
      if (char === "#") {
        this.skipComment();
        continue;
      }

      // Newlines
      if (char === "\n") {
        this.tokens.push(new Token("NEWLINE", "\n", this.line, this.column));
        this.advance();
        continue;
      }

      // Strings
      if (char === '"' || char === "'") {
        const value = this.readString(char);
        this.tokens.push(new Token("STRING", value, this.line, this.column));
        continue;
      }

      // Numbers
      if (/\d/.test(char)) {
        const value = this.readNumber();
        this.tokens.push(new Token("NUMBER", value, this.line, this.column));
        continue;
      }

      // Identifiers and keywords
      if (/[a-zA-Z_\u00C0-\u017F]/.test(char)) {
        const value = this.readIdentifier();
        const tokenType = this.keywords[value] || "IDENTIFIER";
        this.tokens.push(new Token(tokenType, value, this.line, this.column));
        continue;
      }

      // Two-character operators
      if (char === "=" && this.peek() === "=") {
        this.tokens.push(new Token("EQ", "==", this.line, this.column));
        this.advance();
        this.advance();
        continue;
      }

      if (char === "!" && this.peek() === "=") {
        this.tokens.push(new Token("NE", "!=", this.line, this.column));
        this.advance();
        this.advance();
        continue;
      }

      if (char === "<" && this.peek() === "=") {
        this.tokens.push(new Token("LE", "<=", this.line, this.column));
        this.advance();
        this.advance();
        continue;
      }

      if (char === ">" && this.peek() === "=") {
        this.tokens.push(new Token("GE", ">=", this.line, this.column));
        this.advance();
        this.advance();
        continue;
      }

      // Single-character tokens
      const singleCharTokens = {
        "+": "PLUS",
        "-": "MINUS",
        "*": "MULTIPLY",
        "/": "DIVIDE",
        "%": "MODULO",
        "=": "ASSIGN",
        "<": "LT",
        ">": "GT",
        "(": "LPAREN",
        ")": "RPAREN",
        "[": "LBRACKET",
        "]": "RBRACKET",
        "{": "LBRACE",
        "}": "RBRACE",
        ",": "COMMA",
        ":": "COLON",
        ";": "SEMICOLON",
        ".": "DOT",
      };

      if (singleCharTokens[char]) {
        this.tokens.push(
          new Token(singleCharTokens[char], char, this.line, this.column)
        );
        this.advance();
        continue;
      }

      // Unknown character
      throw new Error(
        `SintaxiHutsa: Karaktere ezezaguna '${char}' ${this.line} lerroan, ${this.column} zutabean`
      );
    }

    this.tokens.push(new Token("EOF", null, this.line, this.column));
    return this.tokens;
  }
}

module.exports = Lexer;
