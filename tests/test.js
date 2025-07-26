const Laboa = require("../src/laboa");
const assert = require("assert");

function test(name, fn) {
  try {
    fn();
    console.log(`✓ ${name}`);
  } catch (error) {
    console.log(`✗ ${name}: ${error.console.log('\nTest execution completed!');
console.log('\nTo run manual tests:');
console.log('node laboa.js run adibideak/kaixo.laboa');
console.log('node laboa.js run adibideak/funtzioak.laboa');age}`);
  }
}

// Test basic variable declarations
test("Variable declarations", () => {
  const code = `
        konst a = 5
        izan b = 10
        alda c = 15
    `;

  const js = Laboa.transpile(code);
  assert(js.includes("const a = 5"));
  assert(js.includes("let b = 10"));
  assert(js.includes("var c = 15"));
});

// Test function declarations
test("Function declarations", () => {
  const code = `
        funtzio test(x, y) {
            itzuli x + y
        }
    `;

  const js = Laboa.transpile(code);
  assert(js.includes("function test(x, y)"));
  assert(js.includes("return (x + y)"));
});

// Test conditionals
test("Conditional statements", () => {
  const code = `
        baldin x > 5 bada:
            ageri('Handia')
        bestela:
            ageri('Txikia')
    `;

  const js = Laboa.transpile(code);
  assert(js.includes("if ((x > 5))"));
  assert(js.includes("} else {"));
});

// Test logical operators
test("Logical operators", () => {
  const code = `
        baldin x > 5 eta y < 10 bada:
            ageri('Ondo')
    `;

  const js = Laboa.transpile(code);
  assert(js.includes("((x > 5) && (y < 10))"));
});

// Test loops
test("For loops", () => {
  const code = `
        errepikatu i bitartea(0, 10):
            ageri(i)
    `;

  const js = Laboa.transpile(code);
  assert(js.includes("for (let i = 0; i < 10; i++)"));
});

// Test array literals
test("Array literals", () => {
  const code = `
        izan zerrenda = [1, 2, 3]
    `;

  const js = Laboa.transpile(code);
  assert(js.includes("[1, 2, 3]"));
});

// Test function calls
test("Function calls", () => {
  const code = `
        ageri('Kaixo mundua')
    `;

  const js = Laboa.transpile(code);
  assert(js.includes('ageri("Kaixo mundua")'));
});

// Test string literals
test("String literals", () => {
  const code = `
        konst mezua = 'Kaixo'
    `;

  const js = Laboa.transpile(code);
  assert(js.includes('"Kaixo"'));
});

// Test binary expressions
test("Binary expressions", () => {
  const code = `
        izan emaitza = 10 + 5 * 2
    `;

  const js = Laboa.transpile(code);
  assert(js.includes("((10 + (5 * 2)))"));
});

// Test print statements
test("Print statements", () => {
  const code = `
        ageri('Test', 123, egia)
    `;

  const js = Laboa.transpile(code);
  assert(js.includes('ageri("Test", 123, true)'));
});

console.log("\nLaboa Tests");
console.log("===========");

// Run all tests using the actual test functions
test("Variable declarations", () => {
  const code = `
        konst a = 5
        izan b = 10
        alda c = 15
    `;

  const js = Laboa.transpile(code);
  assert(js.includes("const a = 5"));
  assert(js.includes("let b = 10"));
  assert(js.includes("var c = 15"));
});

test("Function declarations", () => {
  const code = `
        funtzio test(x, y) {
            itzuli x + y
        }
    `;

  const js = Laboa.transpile(code);
  assert(js.includes("function test(x, y)"));
  assert(js.includes("return (x + y)"));
});

test("Conditional statements", () => {
  const code = `
        baldin x > 5 bada:
            ageri('Handia')
        bestela:
            ageri('Txikia')
    `;

  const js = Laboa.transpile(code);
  assert(js.includes("if ((x > 5))"));
  assert(js.includes("} else {"));
});

test("Logical operators", () => {
  const code = `
        baldin x > 5 eta y < 10 bada:
            ageri('Ondo')
    `;

  const js = Laboa.transpile(code);
  assert(js.includes("((x > 5) && (y < 10))"));
});

test("Function calls", () => {
  const code = `
        ageri('Kaixo mundua')
    `;

  const js = Laboa.transpile(code);
  assert(js.includes('ageri("Kaixo mundua")'));
});

test("String literals", () => {
  const code = `
        konst mezua = 'Kaixo'
    `;

  const js = Laboa.transpile(code);
  assert(js.includes('"Kaixo"'));
});

test("Print statements", () => {
  const code = `
        ageri('Test', 123, egia)
    `;

  const js = Laboa.transpile(code);
  assert(js.includes('ageri("Test", 123, true)'));
});

console.log("\nTest execution completed!");
console.log("\nTo run manual tests:");
console.log("node laboa.js run examples/hello.laboa");
console.log("node laboa.js run examples/functions.laboa");
