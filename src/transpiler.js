class Transpiler {
  constructor() {
    this.indentLevel = 0;
    this.output = [];
  }

  indent() {
    return "  ".repeat(this.indentLevel);
  }

  emit(code) {
    this.output.push(code);
  }

  emitLine(code = "") {
    this.output.push(this.indent() + code + "\n");
  }

  transpile(ast) {
    this.output = [];
    this.indentLevel = 0;

    this.transpileNode(ast);

    return this.output.join("");
  }

  transpileNode(node) {
    if (!node) return;

    switch (node.type) {
      case "PROGRAM":
        return this.transpileProgram(node);
      case "FUNCTION_DECLARATION":
        return this.transpileFunction(node);
      case "VARIABLE_DECLARATION":
        return this.transpileVariableDeclaration(node);
      case "IF_STATEMENT":
        return this.transpileIf(node);
      case "WHILE_LOOP":
        return this.transpileWhile(node);
      case "FOR_RANGE_LOOP":
        return this.transpileForRange(node);
      case "FOR_IN_LOOP":
        return this.transpileForIn(node);
      case "RETURN_STATEMENT":
        return this.transpileReturn(node);
      case "TRY_STATEMENT":
        return this.transpileTry(node);
      case "CLASS_DECLARATION":
        return this.transpileClass(node);
      case "PRINT_STATEMENT":
        return this.transpilePrint(node);
      case "EXPRESSION_STATEMENT":
        return this.transpileExpressionStatement(node);
      case "BLOCK":
        return this.transpileBlock(node);
      case "BINARY_EXPRESSION":
        return this.transpileBinaryExpression(node);
      case "UNARY_EXPRESSION":
        return this.transpileUnaryExpression(node);
      case "FUNCTION_CALL":
        return this.transpileFunctionCall(node);
      case "PROPERTY_ACCESS":
        return this.transpilePropertyAccess(node);
      case "ASSIGNMENT":
        return this.transpileAssignment(node);
      case "PROPERTY_ASSIGNMENT":
        return this.transpilePropertyAssignment(node);
      case "NEW_EXPRESSION":
        return this.transpileNewExpression(node);
      case "ARRAY_ACCESS":
        return this.transpileArrayAccess(node);
      case "ARRAY_LITERAL":
        return this.transpileArrayLiteral(node);
      case "IDENTIFIER":
        return this.transpileIdentifier(node);
      case "LITERAL":
        return this.transpileLiteral(node);
      default:
        throw new Error(`MotaHutsa: AST node mota ezezaguna: ${node.type}`);
    }
  }

  transpileProgram(node) {
    for (const child of node.children) {
      this.transpileNode(child);
    }
  }

  transpileFunction(node) {
    const { name, params } = node.value;
    const body = node.children[0];

    this.emitLine(`function ${name}(${params.join(", ")}) {`);
    this.indentLevel++;
    this.transpileNode(body);
    this.indentLevel--;
    this.emitLine("}");
  }

  transpileVariableDeclaration(node) {
    const { name, declType } = node.value;
    const jsType = this.mapVariableType(declType);

    if (node.children.length > 0) {
      const value = this.transpileNode(node.children[0]);
      this.emitLine(`${jsType} ${name} = ${value};`);
    } else {
      this.emitLine(`${jsType} ${name};`);
    }
  }

  mapVariableType(laboadType) {
    switch (laboadType) {
      case "CONST":
        return "const";
      case "LET":
        return "let";
      case "VAR":
        return "var";
      default:
        return "let";
    }
  }

  transpileIf(node) {
    const [condition, thenBranch, elseBranch] = node.children;

    const conditionCode = this.transpileNode(condition);
    this.emitLine(`if (${conditionCode}) {`);
    this.indentLevel++;
    this.transpileNode(thenBranch);
    this.indentLevel--;

    if (elseBranch) {
      this.emitLine("} else {");
      this.indentLevel++;
      this.transpileNode(elseBranch);
      this.indentLevel--;
    }

    this.emitLine("}");
  }

  transpileWhile(node) {
    const [condition, body] = node.children;

    const conditionCode = this.transpileNode(condition);
    this.emitLine(`while (${conditionCode}) {`);
    this.indentLevel++;
    this.transpileNode(body);
    this.indentLevel--;
    this.emitLine("}");
  }

  transpileForRange(node) {
    const { variable } = node.value;
    const [range, body] = node.children;

    // Assume range is bitartea(start, end)
    if (range.type === "FUNCTION_CALL" && range.value.name === "bitartea") {
      const [start, end] = range.children;
      const startCode = this.transpileNode(start);
      const endCode = this.transpileNode(end);

      this.emitLine(
        `for (let ${variable} = ${startCode}; ${variable} < ${endCode}; ${variable}++) {`
      );
      this.indentLevel++;
      this.transpileNode(body);
      this.indentLevel--;
      this.emitLine("}");
    } else {
      throw new Error("MotaHutsa: errepikatu honen formatua okerra da");
    }
  }

  transpileForIn(node) {
    const { variable } = node.value;
    const [iterable, body] = node.children;

    const iterableCode = this.transpileNode(iterable);
    this.emitLine(`for (const ${variable} of ${iterableCode}) {`);
    this.indentLevel++;
    this.transpileNode(body);
    this.indentLevel--;
    this.emitLine("}");
  }

  transpileReturn(node) {
    if (node.children.length > 0) {
      const value = this.transpileNode(node.children[0]);
      this.emitLine(`return ${value};`);
    } else {
      this.emitLine("return;");
    }
  }

  transpileTry(node) {
    const [tryBlock, catchBlock, finallyBlock] = node.children;

    this.emitLine("try {");
    this.indentLevel++;
    this.transpileNode(tryBlock);
    this.indentLevel--;
    this.emitLine("}");

    if (catchBlock) {
      this.emitLine(`catch (${catchBlock.errorVar}) {`);
      this.indentLevel++;
      this.transpileNode(catchBlock);
      this.indentLevel--;
      this.emitLine("}");
    }

    if (finallyBlock) {
      this.emitLine("finally {");
      this.indentLevel++;
      this.transpileNode(finallyBlock);
      this.indentLevel--;
      this.emitLine("}");
    }
  }

  transpileClass(node) {
    const { name } = node.value;

    this.emitLine(`class ${name} {`);
    this.indentLevel++;

    for (const method of node.children) {
      if (method.type === "FUNCTION_DECLARATION") {
        const { name: methodName, params } = method.value;
        const body = method.children[0];

        // Handle constructor
        if (methodName === "__hasiera__") {
          this.emitLine(`constructor(${params.join(", ")}) {`);
        } else {
          this.emitLine(`${methodName}(${params.join(", ")}) {`);
        }

        this.indentLevel++;
        this.transpileNode(body);
        this.indentLevel--;
        this.emitLine("}");
      }
    }

    this.indentLevel--;
    this.emitLine("}");
  }

  transpilePrint(node) {
    const args = node.children.map((child) => this.transpileNode(child));
    this.emitLine(`ageri(${args.join(", ")});`);
  }

  transpileExpressionStatement(node) {
    const expr = this.transpileNode(node.children[0]);
    this.emitLine(`${expr};`);
  }

  transpileBlock(node) {
    for (const child of node.children) {
      this.transpileNode(child);
    }
  }

  transpileBinaryExpression(node) {
    const { operator } = node.value;
    const [left, right] = node.children;

    const leftCode = this.transpileNode(left);
    const rightCode = this.transpileNode(right);
    const jsOperator = this.mapOperator(operator);

    return `(${leftCode} ${jsOperator} ${rightCode})`;
  }

  transpileUnaryExpression(node) {
    const { operator } = node.value;
    const operand = this.transpileNode(node.children[0]);
    const jsOperator = this.mapOperator(operator);

    return `${jsOperator}${operand}`;
  }

  mapOperator(operator) {
    const operatorMap = {
      eta: "&&",
      edo: "||",
      ez: "!",
      "+": "+",
      "-": "-",
      "*": "*",
      "/": "/",
      "%": "%",
      "==": "===",
      "!=": "!==",
      "<": "<",
      ">": ">",
      "<=": "<=",
      ">=": ">=",
    };

    return operatorMap[operator] || operator;
  }

  transpileFunctionCall(node) {
    const { name } = node.value;
    const args = node.children.map((child) => this.transpileNode(child));

    // Map Basque built-in functions
    const mappedName = this.mapBuiltinFunction(name);

    return `${mappedName}(${args.join(", ")})`;
  }

  mapBuiltinFunction(name) {
    const builtinMap = {
      ageri: "ageri",
      sartu: "sartu",
      luzera: "luzera",
      bitartea: "bitartea",
      lotu: "lotu",
      zatitu: "zatitu",
      ireki: "ireki",
      irakurri: "irakurri",
      idatzi: "idatzi",
      itxi: "itxi",
    };

    return builtinMap[name] || name;
  }

  transpilePropertyAccess(node) {
    const { object, property } = node.value;
    return `${object}.${property}`;
  }

  transpileArrayAccess(node) {
    const { object } = node.value;
    const index = this.transpileNode(node.children[0]);
    return `${object}[${index}]`;
  }

  transpileArrayLiteral(node) {
    const elements = node.children.map((child) => this.transpileNode(child));
    return `[${elements.join(", ")}]`;
  }

  transpileIdentifier(node) {
    const { name } = node.value;

    // Map special identifiers
    const identifierMap = {
      norbera: "this",
      hau: "this",
      egia: "true",
      gezurra: "false",
      hutsa: "null",
    };

    return identifierMap[name] || name;
  }

  transpileLiteral(node) {
    const { value, type } = node.value;

    switch (type) {
      case "string":
        return `"${value.replace(/"/g, '\\"')}"`;
      case "number":
        return value.toString();
      case "boolean":
        return value.toString();
      case "null":
        return "null";
      default:
        return value.toString();
    }
  }

  transpileAssignment(node) {
    const { name } = node.value;
    const value = this.transpileNode(node.children[0]);
    return `${name} = ${value}`;
  }

  transpilePropertyAssignment(node) {
    const { object, property } = node.value;
    const value = this.transpileNode(node.children[0]);
    return `${object}.${property} = ${value}`;
  }

  transpileNewExpression(node) {
    const { className } = node.value;
    const args = node.children.map((child) => this.transpileNode(child));
    return `new ${className}(${args.join(", ")})`;
  }
}

module.exports = Transpiler;
