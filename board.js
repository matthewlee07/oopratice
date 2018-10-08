class Board {
  constructor() {
    this.board = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
  }

  renderBoard() {
    console.log(this.updatedBoard());
  }

  updatedBoard() {
    let board = this.board;
    // prettier-ignore
    return (
              " " + board[0] + " |" + " " + board[1] + " |" + " " + board[2] + "\n" +
              "===+===+===\n" +
              " " + board[3] + " |" + " " + board[4] + " |" + " " + board[5] + "\n" +
              "===+===+===\n" +
              " " + board[6] + " |" + " " + board[7] + " |" + " " + board[8]
            );
  }
}

module.exports = Board;
