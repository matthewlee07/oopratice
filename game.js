const inquirer = require("inquirer");
const Board = require("./board");
const Pattern = require("./pattern");
const utils = require("./utils");

class Game {
  constructor() {
    this.board = new Board();
    this.currentTurn = undefined;
    this.gameSettings = undefined;
    this.patternsToWin = undefined;
    this.patternsToBlockWin = undefined;
    this.isWinner = false;
    this.isFilledBoard = false;
  }

  handleGame() {
    this.welcome();
    this.handleQuestions();
  }

  welcome() {
    utils.tellUser(
      "Welcome to Tic Tac Toe!\nMoves are placed by entering [0-8]\nNumbered from top left(0) to bottom right(8)"
    );
    this.board.renderBoard();
  }

  async handleQuestions() {
    this.gameSettings = await inquirer.prompt(utils.questions);
    this.handleGameSettings();
  }

  handleGameSettings() {
    this.handlecurrentTurn();
    this.pattern = new Pattern(this.board.board, this.gameSettings);
    this.pattern.init();
    this.handleGameMode(); //only human vs computer works
    // this.handleGameOrder();
  }

  handlecurrentTurn() {
    this.currentTurn = this.gameSettings.symbol;
  }

  handleGameMode() {
    switch (this.gameSettings.mode) {
      case "Human vs Computer": //only human vs computer works
        this.play();
        break;
      case "Human vs Human":
        this.handleHumanVsHuman();
        break;
      case "Computer vs Computer":
        this.handleComputerVsComputer();
        break;
    }
  }

  play() {
    this.board.renderBoard();
    utils.tellUser("Enter [0-8]:");

    process.openStdin().on("data", res => {
      this.isWinner = utils.winner(this.board, this.pattern);
      this.isFilledBoard = utils.filledBoard(this.board);

      if (this.move(res, this.currentTurn)) {
        if (this.isWinner || this.isFilledBoard) {
          utils.exit();
        } else {
          this.compareBoardAgainstPatterns();
          if (this.isWinner || this.isFilledBoard) {
            utils.exit();
          } else {
            this.board.renderBoard();
          }
        }
      }
    });
  }

  move(positionPlacement = utils.getAvailableSpace(this.board), currentTurn) {
    if (
      +positionPlacement >= 0 &&
      +positionPlacement <= 8 &&
      !isNaN(+positionPlacement) &&
      this.board.board[+positionPlacement] == " "
    ) {
      this.board.board.splice(+positionPlacement, 1, currentTurn);
      this.board.renderBoard();
      utils.tellUser(`${currentTurn}'s move: ${positionPlacement}`);
      this.isWinner = utils.winner(this.board, this.pattern);
      this.isFilledBoard = utils.filledBoard(this.board);
      if (this.isWinner || this.isFilledBoard) {
        utils.exit();
      } else {
        return true;
      }
    } else {
      utils.tellUser("Please enter a unique number between 0-8.");
      this.board.renderBoard();
      return false;
    }
  }

  compareBoardAgainstPatterns() {
    let positionPlacement = this.pattern.handlePatternsToWinMove();
    if (positionPlacement == -1) {
      positionPlacement = this.pattern.handlePatternsToBlockWinMove();
      if (positionPlacement == -1) {
        positionPlacement = utils.getAvailableSpace(this.board.board);
      }
    }
    this.currentTurn === utils.X
      ? this.move(positionPlacement, utils.O)
      : this.move(positionPlacement, utils.X);
  }

  //   handleGameOrder() {
  //     gameSettings.order === "First" ? renderBoard() : handleSecond();
  //   }

  //   handleHumanVsHuman() {
  //     utils.tellUser("Please enter a unique number between 0-8.");
  //     process.openStdin().on("data", function(res) {
  //       if (move(res, currentTurn)) {
  //         if (winner() || filledBoard()) {
  //           exit();
  //         } else {
  //           renderBoard();
  //         }
  //         currentTurn = currentTurn === X ? O : X;
  //       }
  //     });
  //   }

  //   handleComputerVsComputer() {
  //     if (gameSettings.symbol === X) {
  //       currentTurn = gameSettings.order === "First" ? O : X;
  //     } else {
  //       currentTurn = gameSettings.order === "First" ? X : O;
  //     }

  //     while (!winner() || !filledBoard()) {
  //       move(compareBoardAgainstPatterns(), currentTurn);
  //     }
  //     exit();
  //   }

  //   handleSecond() {
  //     //prettier-ignore
  //     currentTurn = ((gameSettings.mode === "Human vs Human" && gameSettings.symbol === X) ? O : X);
  //     if (gameSettings.mode === "Human vs Computer") {
  //       currentTurn = gameSettings.symbol === X ? X : O;
  //       compareBoardAgainstPatterns();
  //     }
  //     if (gameSettings.mode === "Human vs Human") {
  //       renderBoard();
  //     }
  //   }
}

module.exports = Game;
