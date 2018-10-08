const utils = require("./utils");

class Pattern {
  constructor(board, gameSettings) {
    this.board = board;
    this.gameSettings = gameSettings;
    this.patterns = {
      //prettier-ignore
      patternsToWinO : [
          [/ OO....../, 0], [/O..O.. ../, 6], [/......OO /, 8], [/.. ..O..O/, 2], [/ ..O..O../, 0],
          [/...... OO/, 6], [/..O..O.. /, 8], [/OO ....../, 2], [/ ...O...O/, 0], [/..O.O. ../, 6],
          [/O...O... /, 8], [/.. .O.O../, 2], [/O O....../, 1], [/O.. ..O../, 3], [/......O O/, 7],
          [/..O.. ..O/, 5], [/. ..O..O./, 1], [/... OO.../, 3], [/.O..O.. ./, 7], [/...OO .../, 5]
        ],
      //prettier-ignore
      patternsToWinX : [
          [/ XX....../, 0], [/X..X.. ../, 6], [/......XX /, 8], [/.. ..X..X/, 2], [/ ..X..X../, 0],
          [/...... XX/, 6], [/..X..X.. /, 8], [/XX ....../, 2], [/ ...X...X/, 0], [/..X.X. ../, 6],
          [/X...X... /, 8], [/.. .X.X../, 2], [/X X....../, 1], [/X.. ..X../, 3], [/......X X/, 7],
          [/..X.. ..X/, 5], [/. ..X..X./, 1], [/... XX.../, 3], [/.X..X.. ./, 7], [/...XX .../, 5]
        ],

      //prettier-ignore
      patternsToBlockWinX : [
          [/  X . X  /, 1], [/ XX....../, 0], [/X..X.. ../, 6], [/......XX /, 8], [/.. ..X..X/, 2],
          [/ ..X..X../, 0], [/...... XX/, 6], [/..X..X.. /, 8], [/XX ....../, 2], [/ ...X...X/, 0],
          [/..X.X. ../, 6], [/X...X... /, 8], [/.. .X.X../, 2], [/X X....../, 1], [/X.. ..X../, 3],
          [/......X X/, 7], [/..X.. ..X/, 5], [/. ..X..X./, 1], [/... XX.../, 3], [/.X..X.. ./, 7],
          [/...XX .../, 5], [/ X X.. ../, 0], [/ ..X.. X /, 6], [/.. ..X X /, 8], [/ X ..X.. /, 2],
          [/  XX.. ../, 0], [/X.. .. X /, 6], [/.. .XX   /, 8], [/X  ..X.. /, 2], [/ X  ..X../, 0],
          [/ ..X..  X/, 6], [/..X..  X /, 8], [/X  ..X.. /, 2]
        ],
      //prettier-ignore
      patternsToBlockWinO : [
          [/  O . O  /, 1], [/ OO....../, 0], [/O..O.. ../, 6], [/......OO /, 8], [/.. ..O..O/, 2],
          [/ ..O..O../, 0], [/...... OO/, 6], [/..O..O.. /, 8], [/OO ....../, 2], [/ ...O...O/, 0],
          [/..O.O. ../, 6], [/O...O... /, 8], [/.. .O.O../, 2], [/O O....../, 1], [/O.. ..O../, 3],
          [/......O O/, 7], [/..O.. ..O/, 5], [/. ..O..O./, 1], [/... OO.../, 3], [/.O..O.. ./, 7],
          [/...OO .../, 5], [/ O O.. ../, 0], [/ ..O.. O /, 6], [/.. ..O O /, 8], [/ O ..O.. /, 2],
          [/  OO.. ../, 0], [/O.. .. O /, 6], [/.. .OO   /, 8], [/O  ..O.. /, 2], [/ O  ..O../, 0],
          [/ ..O..  O/, 6], [/..O..  O /, 8], [/O  ..O.. /, 2]
        ],
      //prettier-ignore
      patternsToConfirmWin : [
          [/OOO....../, "O"], [/...OOO.../, "O"], [/......OOO/, "O"], [/O..O..O../, "O"], [/.O..O..O./, "O"],
          [/..O..O..O/, "O"], [/O...O...O/, "O"], [/..O.O.O../, "O"], [/XXX....../, "X"], [/...XXX.../, "X"],
          [/......XXX/, "X"], [/X..X..X../, "X"], [/.X..X..X./, "X"], [/..X..X..X/, "X"], [/X...X...X/, "X"],
          [/..X.X.X../, "X"]
        ]
    };
    this.patternsToWin = undefined;
    this.patternsToBlockWin = undefined;
  }

  init() {
    this.handlePatterns();
    this.handleGameDifficulty();
  }

  handlePatterns() {
    if (this.gameSettings.symbol === utils.O) {
      this.patternsToWin = this.patterns.patternsToWinX;
      this.patternsToBlockWin = this.patterns.patternsToBlockWinO;
    } else {
      this.patternsToWin = this.patterns.patternsToWinO;
      this.patternsToBlockWin = this.patterns.patternsToBlockWinX;
    }
  }

  handleGameDifficulty() {
    switch (this.gameSettings.difficulty) {
      case "Easy":
        this.patternsToBlockWin = this.patternsToBlockWin.slice(25);
        break;
      case "Hard":
        this.patternsToBlockWin = this.patternsToBlockWin;
        break;
      case "Impossible":
        this.patternsToBlockWin = this.patternsToBlockWin.concat([
          [/.. .X...X/, 2],
          [/.. .O...O/, 2]
        ]);
        break;
    }
  }

  handlePatternsToWinMove() {
    const boardString = this.board.join("");
    for (i = 0; i < this.patternsToWin.length; i++) {
      const array = boardString.match(this.patternsToWin[i][0]);
      if (array) {
        return this.patternsToWin[i][1];
      }
    }
    return -1;
  }

  handlePatternsToBlockWinMove() {
    const boardString = this.board.join("");
    for (i = 0; i < this.patternsToBlockWin.length; i++) {
      const array = boardString.match(this.patternsToBlockWin[i][0]);
      if (array) {
        return this.patternsToBlockWin[i][1];
      }
    }
    return -1;
  }
}
module.exports = Pattern;
