const expect = require("chai").expect;
const Game = require("./game");
const Pattern = require("./pattern");
const utils = require("./utils");
const emptyBoard = `
   |   |  
===+===+===
   |   |  
===+===+===
   |   | 
   `;

describe("play:", () => {
  const game = new Game();

  it("should show an empty game board on start", () => {
    expect(game.board.renderBoard()).to.be.equal(console.log(emptyBoard));
  });
  it("should instruct user on start", () => {
    expect(utils.tellUser()).to.be.equal(console.log("Enter [0-8]"));
  });
});

describe("move:", () => {
  const game = new Game();
  game.gameSettings = {
    mode: "Human vs Computer",
    difficulty: "Impossible",
    symbol: "X",
    order: "First"
  };
  game.handleGameSettings();

  it("should reject invalid inputs", () => {
    //move() doesn't cover null, undefined, booleans, empty
    const invalidInputs = [[10, game.X], ["four", game.X], [{}, game.X]];
    invalidInputs.forEach(input => {
      const test = game.move(input[0], input[1]);
      expect(test).to.be.false;
    });
  });

  it("should accept valid inputs", () => {
    const validInputs = [[3, utils.X], [4, utils.O], [5, utils.X]];
    validInputs.forEach(input => {
      console.log(`input[0]: ${input[0]}`);
      const test = game.move(input[0], input[1]);
      expect(test).to.be.true;
    });
  });
});

describe("winner:", () => {
  const game = new Game();
  game.gameSettings = {
    mode: "Human vs Computer",
    difficulty: "Impossible",
    symbol: "X",
    order: "First"
  };
  game.handleGameSettings();

  it("should return false if there is no winner", () => {
    expect(utils.winner(game.board, game.pattern)).to.be.false;
  });
  it("should return true if there is a winner", () => {
    for (let i = 3; i < 6; i++) {
      game.move(i, utils.X);
    }
    expect(utils.winner(game.board, game.pattern)).to.be.true;
  });
});

xdescribe("filledBoard:", () => {
  it("should return false if the board is not filled", () => {
    expect(game.filledBoard()).to.be.false;
  });
  xit("should return true if the board is filled", () => {
    expect(game.filledBoard()).to.be.true;
  });
});

xdescribe("compareBoardAgainstPatterns:", () => {
  it("should match patternsToWin and place winning move", () => {
    // give compareBoardAgainstPatterns a game winning pattern
    expect(positionPlacement).tobegamewinning;
  });
  it("should not match patternsToWin and match patternsToBlockWin and place block move", () => {
    // give compareBoardAgainstPatterns a win blocking pattern
    expect(positionPlacement).tobewinblocking;
  });
  it("should not match patternsToWin nor patternsToBlockWin and place next available space", () => {
    // give compareBoardAgainstPatterns a neutral pattern
    expect(positionPlacement).tobenextavailablespace;
  });
});

xdescribe("handlePatternsToWinMove:", () => {
  it("", () => {
    expect();
  });
});

xdescribe("handlePatternsToBlockWinMove:", () => {
  it("", () => {
    expect();
  });
});

xdescribe("getAvailableSpace:", () => {
  it("", () => {
    expect();
  });
});

// xdescribe("", () => {
//   it("", () => {
//     expect();
//   });
// });

// xdescribe("", () => {
//   it("", () => {
//     expect();
//   });
// });

// xdescribe("", () => {
//   it("", () => {
//     expect();
//   });
// });

// xdescribe("", () => {
//   it("", () => {
//     expect();
//   });
// });

// xdescribe("", () => {
//   it("", () => {
//     expect();
//   });
// });

//sample test
// describe("isEqual", () => {
//   it("should give right answers for equal and unequal inputs", () => {
//     const equalInputs = [[1, 1], [true, true], ["foo", "foo"]];
//     equalInputs.forEach(input => {
//       const answer = game.isEqual(input[0], input[1]);
//       expect(answer).to.be.true;
//     });
//     const unequalInputs = [["1", 1], [1, 2], [1, true], [0, false]];
//     unequalInputs.forEach(input => {
//       const answer = game.isEqual(input[0], input[1]);
//       expect(answer).to.be.false;
//     });
//   });
// });
