class ASTNode {
  constructor(type, value = null, children = []) {
    this.type = type;
    this.value = value;
    this.children = children;
  }
}

class Parser {
  constructor(tokens) {
    this.tokens = tokens.filter((token) => token.type !== "NEWLINE"); // Remove newlines for now
    this.position = 0;
  }

  current() {
    if (this.position >= this.tokens.length) {
      return null;
    }
    return this.tokens[this.position];
  }

  peek(offset = 1) {
    const pos = this.position + offset;
    if (pos >= this.tokens.length) {
      return null;
    }
    return this.tokens[pos];
  }

  advance() {
    if (this.position < this.tokens.length) {
      this.position++;
    }
  }

  expect(tokenType) {
    const token = this.current();
    if (!token || token.type !== tokenType) {
      throw new Error(
        `SintaxiHutsa: ${tokenType} espero zen, baina ${
          token ? token.type : "EOF"
        } aurkitu da`
      );
    }
    this.advance();
    return token;
  }

  match(...tokenTypes) {
    const token = this.current();
    return token && tokenTypes.includes(token.type);
  }

  parse() {
    const statements = [];

    while (this.current() && this.current().type !== "EOF") {
      const stmt = this.parseStatement();
      if (stmt) {
        statements.push(stmt);
      }
    }

    return new ASTNode("PROGRAM", null, statements);
  }

  parseStatement() {
    const token = this.current();

    if (!token || token.type === "EOF") {
      return null;
    }

    switch (token.type) {
      case "FUNCTION":
      case "METHOD":
        return this.parseFunction();
      case "CONST":
      case "LET":
      case "VAR":
        return this.parseVariableDeclaration();
      case "IF":
        return this.parseIf();
      case "WHILE":
        return this.parseWhile();
      case "FOR":
        return this.parseFor();
      case "RETURN":
        return this.parseReturn();
      case "TRY":
        return this.parseTry();
      case "CLASS":
        return this.parseClass();
      case "PRINT":
        return this.parsePrint();
      default:
        return this.parseExpressionStatement();
    }
  }

  parseFunction() {
    const token = this.current();
    if (token && (token.type === "FUNCTION" || token.type === "METHOD")) {
      this.advance();
    } else {
      throw new Error("SintaxiHutsa: funtzio edo metodoa espero zen");
    }
    const name = this.expect("IDENTIFIER").value;

    this.expect("LPAREN");
    const params = [];

    while (!this.match("RPAREN")) {
      // Accept both IDENTIFIER and SELF tokens as parameters
      const token = this.current();
      if (token && (token.type === "IDENTIFIER" || token.type === "SELF")) {
        params.push(token.value);
        this.advance();
      } else {
        throw new Error("SintaxiHutsa: Parametro izena espero zen");
      }
      if (this.match("COMMA")) {
        this.advance();
      }
    }

    this.expect("RPAREN");

    // Support both { } and : syntax
    let body;
    if (this.match("LBRACE")) {
      this.advance();
      body = this.parseBlock();
      this.expect("RBRACE");
    } else if (this.match("COLON")) {
      this.advance();
      body = this.parseBlock();
    } else {
      throw new Error("SintaxiHutsa: { edo : espero zen funtzio definizioan");
    }

    return new ASTNode("FUNCTION_DECLARATION", { name, params }, [body]);
  }

  parseVariableDeclaration() {
    const declType = this.current().type;
    this.advance();

    const name = this.expect("IDENTIFIER").value;
    let value = null;

    if (this.match("ASSIGN")) {
      this.advance();
      value = this.parseExpression();
    }

    // Optional semicolon
    if (this.match("SEMICOLON")) {
      this.advance();
    }

    return new ASTNode(
      "VARIABLE_DECLARATION",
      { name, declType },
      value ? [value] : []
    );
  }

  parseIf() {
    this.expect("IF");
    const condition = this.parseExpression();
    this.expect("THEN");
    this.expect("COLON");

    const thenBranch = this.parseBlock();
    let elseBranch = null;

    if (this.match("ELSE")) {
      this.advance();

      if (this.match("IF")) {
        // else if
        elseBranch = this.parseIf();
      } else {
        this.expect("COLON");
        elseBranch = this.parseBlock();
      }
    }

    const children = [condition, thenBranch];
    if (elseBranch) {
      children.push(elseBranch);
    }

    return new ASTNode("IF_STATEMENT", null, children);
  }

  parseWhile() {
    this.expect("WHILE");
    const condition = this.parseExpression();
    this.expect("COLON");
    const body = this.parseBlock();

    return new ASTNode("WHILE_LOOP", null, [condition, body]);
  }

  parseFor() {
    this.expect("FOR");

    // Support both "errepikatu i bitartea(0, 10):" and "errepikatu item zerrenda-n:"
    const variable = this.expect("IDENTIFIER").value;

    // Parse the iterable expression first
    const iterableStart = this.position;
    let iterable;

    // Look ahead to see if this is an "iterable-n" pattern
    if (this.match("IDENTIFIER")) {
      const identifierName = this.current().value;
      this.advance(); // consume the identifier

      if (this.match("MINUS") && this.peek() && this.peek().type === "IN") {
        // This is a "zerrenda-n" pattern
        this.advance(); // consume MINUS
        this.advance(); // consume IN
        this.expect("COLON");
        const body = this.parseBlock();

        iterable = new ASTNode("IDENTIFIER", { name: identifierName });
        return new ASTNode("FOR_IN_LOOP", { variable }, [iterable, body]);
      } else {
        // Reset position and parse as range-based for loop
        this.position = iterableStart;
        iterable = this.parseExpression();
        this.expect("COLON");
        const body = this.parseBlock();

        return new ASTNode("FOR_RANGE_LOOP", { variable }, [iterable, body]);
      }
    } else {
      // Parse as expression (could be range or other)
      iterable = this.parseExpression();
      this.expect("COLON");
      const body = this.parseBlock();

      return new ASTNode("FOR_RANGE_LOOP", { variable }, [iterable, body]);
    }
  }

  parseReturn() {
    this.expect("RETURN");
    let value = null;

    if (!this.match("SEMICOLON") && !this.match("EOF")) {
      value = this.parseExpression();
    }

    if (this.match("SEMICOLON")) {
      this.advance();
    }

    return new ASTNode("RETURN_STATEMENT", null, value ? [value] : []);
  }

  parseTry() {
    this.expect("TRY");
    this.expect("COLON");
    const tryBlock = this.parseBlock();

    let catchBlock = null;
    let finallyBlock = null;

    if (this.match("CATCH")) {
      this.advance();
      const errorVar = this.expect("IDENTIFIER").value;
      this.expect("COLON");
      catchBlock = this.parseBlock();
      catchBlock.errorVar = errorVar;
    }

    if (this.match("FINALLY")) {
      this.advance();
      this.expect("COLON");
      finallyBlock = this.parseBlock();
    }

    const children = [tryBlock];
    if (catchBlock) children.push(catchBlock);
    if (finallyBlock) children.push(finallyBlock);

    return new ASTNode("TRY_STATEMENT", null, children);
  }

  parseClass() {
    this.expect("CLASS");
    const name = this.expect("IDENTIFIER").value;
    this.expect("COLON");

    const methods = [];

    // Simple class parsing - expect indented methods
    while (this.current() && this.current().type !== "EOF") {
      if (this.match("FUNCTION", "METHOD")) {
        methods.push(this.parseFunction());
      } else {
        break;
      }
    }

    return new ASTNode("CLASS_DECLARATION", { name }, methods);
  }

  parsePrint() {
    this.expect("PRINT");
    this.expect("LPAREN");

    const args = [];
    while (!this.match("RPAREN")) {
      args.push(this.parseExpression());
      if (this.match("COMMA")) {
        this.advance();
      }
    }

    this.expect("RPAREN");

    if (this.match("SEMICOLON")) {
      this.advance();
    }

    return new ASTNode("PRINT_STATEMENT", null, args);
  }

  parseBlock() {
    const statements = [];

    // Simple block parsing - collect statements until we hit a dedent or closing token
    while (
      this.current() &&
      this.current().type !== "EOF" &&
      !this.match("RBRACE", "ELSE", "CATCH", "FINALLY", "FUNCTION", "CLASS")
    ) {
      const stmt = this.parseStatement();
      if (stmt) {
        statements.push(stmt);
      } else {
        break;
      }
    }

    return new ASTNode("BLOCK", null, statements);
  }

  parseExpressionStatement() {
    const expr = this.parseExpression();

    if (this.match("SEMICOLON")) {
      this.advance();
    }

    return new ASTNode("EXPRESSION_STATEMENT", null, [expr]);
  }

  parseExpression() {
    return this.parseAssignment();
  }

  parseAssignment() {
    const expr = this.parseLogicalOr();

    if (this.match("ASSIGN")) {
      this.advance();
      const value = this.parseAssignment();

      if (expr.type === "IDENTIFIER") {
        return new ASTNode("ASSIGNMENT", { name: expr.value.name }, [value]);
      } else if (expr.type === "PROPERTY_ACCESS") {
        return new ASTNode(
          "PROPERTY_ASSIGNMENT",
          {
            object: expr.value.object,
            property: expr.value.property,
          },
          [value]
        );
      } else {
        throw new Error("SintaxiHutsa: Ezin da esleipen hau egin");
      }
    }

    return expr;
  }

  parseLogicalOr() {
    let left = this.parseLogicalAnd();

    while (this.match("OR")) {
      const operator = this.current().value;
      this.advance();
      const right = this.parseLogicalAnd();
      left = new ASTNode("BINARY_EXPRESSION", { operator }, [left, right]);
    }

    return left;
  }

  parseLogicalAnd() {
    let left = this.parseEquality();

    while (this.match("AND")) {
      const operator = this.current().value;
      this.advance();
      const right = this.parseEquality();
      left = new ASTNode("BINARY_EXPRESSION", { operator }, [left, right]);
    }

    return left;
  }

  parseEquality() {
    let left = this.parseComparison();

    while (this.match("EQ", "NE")) {
      const operator = this.current().value;
      this.advance();
      const right = this.parseComparison();
      left = new ASTNode("BINARY_EXPRESSION", { operator }, [left, right]);
    }

    return left;
  }

  parseComparison() {
    let left = this.parseAddition();

    while (this.match("LT", "GT", "LE", "GE")) {
      const operator = this.current().value;
      this.advance();
      const right = this.parseAddition();
      left = new ASTNode("BINARY_EXPRESSION", { operator }, [left, right]);
    }

    return left;
  }

  parseAddition() {
    let left = this.parseMultiplication();

    while (this.match("PLUS", "MINUS")) {
      const operator = this.current().value;
      this.advance();
      const right = this.parseMultiplication();
      left = new ASTNode("BINARY_EXPRESSION", { operator }, [left, right]);
    }

    return left;
  }

  parseMultiplication() {
    let left = this.parseUnary();

    while (this.match("MULTIPLY", "DIVIDE", "MODULO")) {
      const operator = this.current().value;
      this.advance();
      const right = this.parseUnary();
      left = new ASTNode("BINARY_EXPRESSION", { operator }, [left, right]);
    }

    return left;
  }

  parseUnary() {
    if (this.match("NOT", "MINUS")) {
      const operator = this.current().value;
      this.advance();
      const operand = this.parseUnary();
      return new ASTNode("UNARY_EXPRESSION", { operator }, [operand]);
    }

    return this.parsePrimary();
  }

  parsePrimary() {
    const token = this.current();

    if (!token) {
      throw new Error("SintaxiHutsa: Adierazpena espero zen");
    }

    switch (token.type) {
      case "NUMBER":
        this.advance();
        return new ASTNode("LITERAL", { value: token.value, type: "number" });

      case "STRING":
        this.advance();
        return new ASTNode("LITERAL", { value: token.value, type: "string" });

      case "TRUE":
        this.advance();
        return new ASTNode("LITERAL", { value: true, type: "boolean" });

      case "FALSE":
        this.advance();
        return new ASTNode("LITERAL", { value: false, type: "boolean" });

      case "NULL":
        this.advance();
        return new ASTNode("LITERAL", { value: null, type: "null" });

      case "IDENTIFIER":
        return this.parseIdentifierExpression();

      case "SELF":
        return this.parseIdentifierExpression();

      case "NEW":
        return this.parseNewExpression();

      case "LPAREN":
        this.advance();
        const expr = this.parseExpression();
        this.expect("RPAREN");
        return expr;

      case "LBRACKET":
        return this.parseArrayLiteral();

      default:
        throw new Error(`SintaxiHutsa: Ustekabeko tokena '${token.type}'`);
    }
  }

  parseIdentifierExpression() {
    const token = this.current();
    if (!token || (token.type !== "IDENTIFIER" && token.type !== "SELF")) {
      throw new Error(
        "SintaxiHutsa: Identifikatzaile edo 'norbera' espero zen"
      );
    }

    const name = token.value;
    this.advance();

    // Function call
    if (this.match("LPAREN")) {
      this.advance();
      const args = [];

      while (!this.match("RPAREN")) {
        args.push(this.parseExpression());
        if (this.match("COMMA")) {
          this.advance();
        }
      }

      this.expect("RPAREN");
      return new ASTNode("FUNCTION_CALL", { name }, args);
    }

    // Property access
    if (this.match("DOT")) {
      this.advance();
      const property = this.expect("IDENTIFIER").value;
      return new ASTNode("PROPERTY_ACCESS", { object: name, property });
    }

    // Array access
    if (this.match("LBRACKET")) {
      this.advance();
      const index = this.parseExpression();
      this.expect("RBRACKET");
      return new ASTNode("ARRAY_ACCESS", { object: name }, [index]);
    }

    return new ASTNode("IDENTIFIER", { name });
  }

  parseNewExpression() {
    this.expect("NEW");
    const className = this.expect("IDENTIFIER").value;

    this.expect("LPAREN");
    const args = [];

    while (!this.match("RPAREN")) {
      args.push(this.parseExpression());
      if (this.match("COMMA")) {
        this.advance();
      }
    }

    this.expect("RPAREN");
    return new ASTNode("NEW_EXPRESSION", { className }, args);
  }

  parseArrayLiteral() {
    this.expect("LBRACKET");
    const elements = [];

    while (!this.match("RBRACKET")) {
      elements.push(this.parseExpression());
      if (this.match("COMMA")) {
        this.advance();
      }
    }

    this.expect("RBRACKET");
    return new ASTNode("ARRAY_LITERAL", null, elements);
  }
}

module.exports = Parser;
