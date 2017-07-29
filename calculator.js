function Calculator(inputString) {
  this.tokenStream = this.lexer(inputString);
}

Calculator.prototype.lexer = function(string) {
    let tokenTypes = [
      ["NUMBER",    /^\d+/ ],
      ["ADD",       /^\+/  ],
      ["SUB",       /^\-/  ],
      ["MUL",       /^\*/  ],
      ["DIV",       /^\//  ],
      ["LPAREN",    /^\(/  ],
      ["RPAREN",    /^\)/  ]
    ];
}

let calc = new Calculator("(1+2)*3");

console.log(calc);
