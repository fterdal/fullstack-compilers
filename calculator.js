function Calculator(inputString) {
  this.tokenStream = this.lexer(inputString);
}

Calculator.prototype.lexer = function(inputString) {
    let tokenTypes = [
      ["NUMBER",    /^\d+/ ],
      ["ADD",       /^\+/  ],
      ["SUB",       /^\-/  ],
      ["MUL",       /^\*/  ],
      ["DIV",       /^\//  ],
      ["LPAREN",    /^\(/  ],
      ["RPAREN",    /^\)/  ]
    ];

    let result = [];

    while(inputString.length > 0) {
      let matchFound = false;
      let char = inputString;
      // console.log(char);
      for (var i = 0; i < tokenTypes.length && !matchFound; i++) {
        let key = tokenTypes[i][0];
        let regex = tokenTypes[i][1];
        let regexMatch = regex.exec(char);
        // console.log(regexMatch);
        if (regexMatch !== null) {
          result.push({
            name: key,
            value: regexMatch[0]
          });
          inputString = inputString.slice( regexMatch[0].length );
          matchFound = true;
        }
      }
      if (!matchFound) {
        throw new Error("Found unparseable token: " + inputString);
      }
    }
    return result;
}

Calculator.prototype.peek = function() {
  return this.tokenStream[0] || null;
}

Calculator.prototype.get = function() {
  return this.tokenStream.shift();
}

function TreeNode(name){
  this.name = name;
  this.children = arguments;
}

Calculator.prototype.parseExpression = function(){
    var term = this.parseTerm();
    var a = this.parseA();

    return new TreeNode("Expression", term, a);

}

Calculator.prototype.parseTerm = function(){
  var factor = this.parseFactor();
  var b = this.parseB();

  return TreeNode("Term", factor, b);
}

Calculator.prototype.parseFactor = function(){
//get the token stream
  var token = this.peek();
  if (token.name === "LPAREN") {
    this.get();
    return TreeNode("Factor", "(", this.parseExpression(), ")"); // TODO: Figure out what to do with ( E )
  } else if (token.name === "SUB") {
    this.get();
    return TreeNode("Factor", "-", this.parseFactor());
  } else if (token.name === "NUMBER") {
    this.get();
    return TreeNode("NUMBER", token.value);
  }
  throw new Error("Invalid Token");
}

Calculator.prototype.parseA = function(){
  var nextToken = this.peek();
  if(nextToken && nextToken.name === "ADD") {
    this.get();
    return new TreeNode("A", "+", this.parseTerm(), this.parseA());
  } else if(nextToken && nextToken.name == "SUB") {
    this.get();
    return new TreeNode("A", "-", this.parseTerm(), this.parseA());
  } else {
      return new TreeNode("A")
  }
}

// TODO
Calculator.prototype.parseB = function(){
  var nextToken = this.peek();
  if(nextToken && nextToken.name === "MUL") {
    this.get();
    return new TreeNode("B", "*", this.parseTerm(), this.parseB());
  } else if(nextToken && nextToken.name == "DIV") {
    this.get();
    return new TreeNode("B", "/", this.parseTerm(), this.parseB());
  } else {
    return new TreeNode("B")
  }
}

let calc = new Calculator("1");
console.dir( calc.parseExpression() );
//console.log(calc.peek());
// console.log(calc.tokenStream);
