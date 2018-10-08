const inquirer = require("inquirer");

let patternsToWin;
//prettier-ignore
const patternsToWinO = [
  [/ OO....../, 0], [/O..O.. ../, 6], [/......OO /, 8], [/.. ..O..O/, 2], [/ ..O..O../, 0],
  [/...... OO/, 6], [/..O..O.. /, 8], [/OO ....../, 2], [/ ...O...O/, 0], [/..O.O. ../, 6],
  [/O...O... /, 8], [/.. .O.O../, 2], [/O O....../, 1], [/O.. ..O../, 3], [/......O O/, 7],
  [/..O.. ..O/, 5], [/. ..O..O./, 1], [/... OO.../, 3], [/.O..O.. ./, 7], [/...OO .../, 5]
];
//prettier-ignore
const patternsToWinX = [
  [/ XX....../, 0], [/X..X.. ../, 6], [/......XX /, 8], [/.. ..X..X/, 2], [/ ..X..X../, 0],
  [/...... XX/, 6], [/..X..X.. /, 8], [/XX ....../, 2], [/ ...X...X/, 0], [/..X.X. ../, 6],
  [/X...X... /, 8], [/.. .X.X../, 2], [/X X....../, 1], [/X.. ..X../, 3], [/......X X/, 7],
  [/..X.. ..X/, 5], [/. ..X..X./, 1], [/... XX.../, 3], [/.X..X.. ./, 7], [/...XX .../, 5]
];
let patternsToBlockWin;
//prettier-ignore
const patternsToBlockWinX = [
  [/  X . X  /, 1], [/ XX....../, 0], [/X..X.. ../, 6], [/......XX /, 8], [/.. ..X..X/, 2],
  [/ ..X..X../, 0], [/...... XX/, 6], [/..X..X.. /, 8], [/XX ....../, 2], [/ ...X...X/, 0],
  [/..X.X. ../, 6], [/X...X... /, 8], [/.. .X.X../, 2], [/X X....../, 1], [/X.. ..X../, 3],
  [/......X X/, 7], [/..X.. ..X/, 5], [/. ..X..X./, 1], [/... XX.../, 3], [/.X..X.. ./, 7],
  [/...XX .../, 5], [/ X X.. ../, 0], [/ ..X.. X /, 6], [/.. ..X X /, 8], [/ X ..X.. /, 2],
  [/  XX.. ../, 0], [/X.. .. X /, 6], [/.. .XX   /, 8], [/X  ..X.. /, 2], [/ X  ..X../, 0],
  [/ ..X..  X/, 6], [/..X..  X /, 8], [/X  ..X.. /, 2]
];
//prettier-ignore
const patternsToBlockWinO = [
  [/  O . O  /, 1], [/ OO....../, 0], [/O..O.. ../, 6], [/......OO /, 8], [/.. ..O..O/, 2],
  [/ ..O..O../, 0], [/...... OO/, 6], [/..O..O.. /, 8], [/OO ....../, 2], [/ ...O...O/, 0],
  [/..O.O. ../, 6], [/O...O... /, 8], [/.. .O.O../, 2], [/O O....../, 1], [/O.. ..O../, 3],
  [/......O O/, 7], [/..O.. ..O/, 5], [/. ..O..O./, 1], [/... OO.../, 3], [/.O..O.. ./, 7],
  [/...OO .../, 5], [/ O O.. ../, 0], [/ ..O.. O /, 6], [/.. ..O O /, 8], [/ O ..O.. /, 2],
  [/  OO.. ../, 0], [/O.. .. O /, 6], [/.. .OO   /, 8], [/O  ..O.. /, 2], [/ O  ..O../, 0],
  [/ ..O..  O/, 6], [/..O..  O /, 8], [/O  ..O.. /, 2]
];
//prettier-ignore
const patternsToConfirmWin = [
  [/OOO....../, "O"], [/...OOO.../, "O"], [/......OOO/, "O"], [/O..O..O../, "O"], [/.O..O..O./, "O"],
  [/..O..O..O/, "O"], [/O...O...O/, "O"], [/..O.O.O../, "O"], [/XXX....../, "X"], [/...XXX.../, "X"],
  [/......XXX/, "X"], [/X..X..X../, "X"], [/.X..X..X./, "X"], [/..X..X..X/, "X"], [/X...X...X/, "X"],
  [/..X.X.X../, "X"]
];

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
    choices: ["Easy", "Medium", "Hard", "Impossible"]
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

const board = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
const X = "X";
const O = "O";

let currentTurn;
let gameSettings;

const handleGame = function() {
  welcome();
  handleQuestions();
};

const welcome = function() {
  tellUser(
    "Welcome to Tic Tac Toe!\nMoves are placed by entering [0-8]\nNumbered from top left(0) to bottom right(8)"
  );
  renderBoard();
};

//shows user message
const tellUser = function(message) {
  console.log(message);
};

//shows user updated board
const renderBoard = function() {
  console.log(updatedBoard());
};

//returns updated board
updatedBoard = function() {
  // prettier-ignore
  return (
      " " + board[0] + " |" + " " + board[1] + " |" + " " + board[2] + "\n" +
      "===+===+===\n" +
      " " + board[3] + " |" + " " + board[4] + " |" + " " + board[5] + "\n" +
      "===+===+===\n" +
      " " + board[6] + " |" + " " + board[7] + " |" + " " + board[8]
    );
};

async function handleQuestions() {
  gameSettings = await inquirer.prompt(questions);
  handleGameSettings();
}

const handleGameSettings = function() {
  handlecurrentTurn();
  handlePatterns();
  handleGameDifficulty();
  handleGameMode();
  handleGameOrder();
};

const handlecurrentTurn = function() {
  currentTurn = gameSettings.symbol;
};

const handlePatterns = function() {
  if (gameSettings.symbol === O) {
    patternsToWin = patternsToWinX;
    patternsToBlockWin = patternsToBlockWinO;
  } else {
    patternsToWin = patternsToWinO;
    patternsToBlockWin = patternsToBlockWinX;
  }
};

const handleGameDifficulty = function() {
  switch (gameSettings.difficulty) {
    case "Easy":
      patternsToBlockWin = patternsToBlockWin.slice(25);
      break;
    case "Hard":
      patternsToBlockWin = patternsToBlockWin;
      break;
    case "Impossible":
      patternsToBlockWin = patternsToBlockWin.concat([
        [/.. .X...X/, 2],
        [/.. .O...O/, 2]
      ]);
      break;
    default:
      gameSettings.difficulty = "Hard";
  }
};

const handleGameMode = function() {
  switch (gameSettings.mode) {
    case "Human vs Computer":
      play();
      break;
    case "Human vs Human":
      handleHumanVsHuman();
      break;
    case "Computer vs Computer":
      handleComputerVsComputer();
      break;
  }
};

const handleGameOrder = function() {
  gameSettings.order === "First" ? renderBoard() : handleSecond();
};

const handleHumanVsHuman = function() {
  tellUser("Please enter a unique number between 0-8.");
  process.openStdin().on("data", function(res) {
    if (move(res, currentTurn)) {
      if (winner() || filledBoard()) {
        exit();
      } else {
        renderBoard();
      }
      currentTurn = currentTurn === X ? O : X;
    }
  });
};

const handleComputerVsComputer = function() {
  if (gameSettings.symbol === X) {
    currentTurn = gameSettings.order === "First" ? O : X;
  } else {
    currentTurn = gameSettings.order === "First" ? X : O;
  }

  while (!winner() || !filledBoard()) {
    move(compareBoardAgainstPatterns(), currentTurn);
  }
  exit();
};

const handleSecond = function() {
  //prettier-ignore
  currentTurn = ((gameSettings.mode === "Human vs Human" && gameSettings.symbol === X) ? O : X);
  if (gameSettings.mode === "Human vs Computer") {
    currentTurn = gameSettings.symbol === X ? X : O;
    compareBoardAgainstPatterns();
  }
  if (gameSettings.mode === "Human vs Human") {
    renderBoard();
  }
};

//returns true or false
const filledBoard = function() {
  const positionPlacement = getAvailableSapce();
  if (positionPlacement == -1) {
    renderBoard();
    tellUser("Game over");
    return true;
  }
  return false;
};
//returns true or false
const winner = function() {
  const boardString = board.join("");
  let theWinner = null;
  for (i = 0; i < patternsToConfirmWin.length; i++) {
    const array = boardString.match(patternsToConfirmWin[i][0]);
    if (array) {
      theWinner = patternsToConfirmWin[i][1];
    }
  }
  if (theWinner) {
    renderBoard();
    tellUser("Game over");
    return true;
  }
  return false;
};

//returns positionPlacement for winning move or -1
const handlePatternsToWinMove = function() {
  const boardString = board.join("");
  for (i = 0; i < patternsToWin.length; i++) {
    const array = boardString.match(patternsToWin[i][0]);
    if (array) {
      return patternsToWin[i][1];
    }
  }
  return -1;
};
//returns positionPlacement for blocking win move or -1
const handlePatternsToBlockWinMove = function() {
  const boardString = board.join("");
  for (i = 0; i < patternsToBlockWin.length; i++) {
    const array = boardString.match(patternsToBlockWin[i][0]);
    if (array) {
      return patternsToBlockWin[i][1];
    }
  }
  return -1;
};
//returns 4 or next available space
const getAvailableSapce = function() {
  if (board[4] == " ") {
    return 4;
  }
  return board.indexOf(" ");
};
const exit = function() {
  process.exit();
};
//shows board, tells user rules, asks user for move
//nothing for invalid moves

//decides and passes positionPlacement && symbol to move()
const compareBoardAgainstPatterns = function() {
  //set to winning pattern
  let positionPlacement = handlePatternsToWinMove();
  //if there is no winning pattern
  if (positionPlacement == -1) {
    //set to blocking pattern
    positionPlacement = handlePatternsToBlockWinMove();
    //if there is no blocking pattern
    if (positionPlacement == -1) {
      //positionPlacement next available space
      positionPlacement = getAvailableSapce();
    }
  }
  currentTurn === X ? move(positionPlacement, O) : move(positionPlacement, X);
};

const move = function(positionPlacement = getAvailableSapce(), currentTurn) {
  if (
    +positionPlacement >= 0 &&
    +positionPlacement <= 8 &&
    !isNaN(+positionPlacement) &&
    board[+positionPlacement] == " "
  ) {
    board.splice(+positionPlacement, 1, currentTurn);
    renderBoard();
    tellUser(`${currentTurn}'s move: ${positionPlacement}`);
    if (winner() || filledBoard()) {
      exit();
    } else {
      return true;
    }
  } else {
    tellUser("Please enter a unique number between 0-8.");
    renderBoard();
    return false;
  }
};

const play = function() {
  renderBoard();
  tellUser("Enter [0-8]:");
  process.openStdin().on("data", function(res) {
    if (move(res, currentTurn)) {
      if (winner() || filledBoard()) {
        exit();
      } else {
        compareBoardAgainstPatterns();
        if (winner() || filledBoard()) {
          exit();
        } else {
          renderBoard();
          // console.log("Enter [0-8]:");
        }
      }
    }
  });
};

handleGame();

//sample test
const isEqual = function(a, b) {
  return a === b;
};
//prettier-ignore
module.exports = {
  isEqual, 
  X, O,
  play, move, winner, filledBoard, compareBoardAgainstPatterns, updatedBoard,
  handlePatternsToWinMove, handlePatternsToBlockWinMove, getAvailableSapce,
  renderBoard, tellUser, exit
};
