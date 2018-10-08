const questions = [
  {
    type: "list",
    name: "mode",
    message: "Choose a game mode:",
    choices: ["Human vs Computer", "Human vs Human", "Computer vs Computer"]
  },
  {
    type: "list",
    name: "difficulty",
    message: "Choose computer difficulty:",
    choices: ["Easy", "Hard", "Impossible"]
  },
  {
    type: "list",
    name: "symbol",
    message: "Choose your symbol:",
    choices: ["X", "O"]
  },
  {
    type: "list",
    name: "order",
    message: "Choose your order:",
    choices: ["First", "Second"]
  }
];

const getAvailableSpace = board => {
  if (board[4] == " ") {
    return 4;
  }
  return board.indexOf(" ");
};

const tellUser = message => {
  console.log(message);
};

//returns true or false
const filledBoard = board => {
  const positionPlacement = getAvailableSpace(board.board);
  if (positionPlacement == -1) {
    board.renderBoard();
    tellUser("Game over");
    return true;
  }
  return false;
};

//returns true or false
const winner = (board, { patterns }) => {
  const boardString = board.board.join("");
  let theWinner = null;
  for (i = 0; i < patterns.patternsToConfirmWin.length; i++) {
    const array = boardString.match(patterns.patternsToConfirmWin[i][0]);
    if (array) {
      theWinner = patterns.patternsToConfirmWin[i][1];
    }
  }

  if (theWinner) {
    tellUser(`Game Over. Player won`);
    return true;
  }
  return false;
};

const exit = () => {
  process.exit();
};

module.exports = {
  questions,
  getAvailableSpace,
  tellUser,
  filledBoard,
  winner,
  exit,
  X: "X",
  O: "O"
};
