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



let calc = new Calculator("(11+2)*3");
console.log(calc);
