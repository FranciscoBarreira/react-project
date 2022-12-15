class Board {
    constructor() {
      this.grid = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
      ];
      this.winner = null;
    }
  
    getCell(row, col) {
      return this.grid[row][col];
    }
  
    setCell(row, col, value) {
      this.grid[row][col] = value;
    }
  
    // checks the rows, columns, and diagonals of the board
    // to see if any player has won the game
    checkForWinner() {
      // check rows
      for (let row = 0; row < 3; row++) {
        if (this.grid[row][0] !== '' && this.grid[row][0] === this.grid[row][1] && this.grid[row][1] === this.grid[row][2]) {
          this.winner = this.grid[row][0];
          return true;
        }
      }
  
      // check columns
      for (let col = 0; col < 3; col++) {
        if (this.grid[0][col] !== '' && this.grid[0][col] === this.grid[1][col] && this.grid[1][col] === this.grid[2][col]) {
          this.winner = this.grid[0][col];
          return true;
        }
      }
  
      // check diagonals
      if (this.grid[0][0] !== '' && this.grid[0][0] === this.grid[1][1] && this.grid[1][1] === this.grid[2][2]) {
        this.winner = this.grid[0][0];
        return true;
      }
      if (this.grid[0][2] !== '' && this.grid[0][2] === this.grid[1][1] && this.grid[1][1] === this.grid[2][0]) {
        this.winner = this.grid[0][2];
        return true;
      }
  
      return false;
    }
  
    // checks if the board is full (no empty cells)
    isFull() {
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
          if (this.grid[row][col] === '') {
            return false;
          }
        }
      }
      return true;
    }
  }
  
  class Player {
    constructor(name, symbol) {
      this.name = name;
      this.symbol = symbol;
    }
  }
  
  class Game {
    constructor() {
      this.board = new Board();
      this.currentPlayer = null;
      this.players = [];
    }
  
    // starts a new game
    start() {
      // reset the board
      this.board = new Board();
  
      // choose the starting player at random
      this.currentPlayer = this.players[Math.floor(Math.random() * this.players.length)];
  
      console.log(`${this.currentPlayer.name} starts`);
    }
  
    // makes a move at the specified row and column
    playMove(row, col) {
      // check if the game is already over
      if (this.board.winner !== null || this.board.isFull()) {
        return false;
      }
  
      // check if the specified cell is empty
      if (this.board.getCell(row, col) !== '') {
        return false;
      }
  
      // make the move
      this.board.setCell(row, col, this.currentPlayer.symbol);
  
      // check if the player has won the game
      if (this.board.checkForWinner()) {
        console.log(`${this.currentPlayer.name} wins!`);
      }
  
      // switch to the other player
      this.currentPlayer = this.players.filter(p => p !== this.currentPlayer)[0];
  
      return true;
    }
  }
  
  class GameView {
    constructor(game) {
      this.game = game;
    }
  
    // starts the game loop
    start() {
      // display the initial game board
      this.render();
  
      // keep playing until the game is over
      while (this.game.board.winner === null && !this.game.board.isFull()) {
        // get the next move from the current player
        const row = this.getInput(`${this.game.currentPlayer.name}, choose a row (0, 1, or 2): `);
        const col = this.getInput(`${this.game.currentPlayer.name}, choose a column (0, 1, or 2): `);
  
        // make the move and display the updated game board
        this.game.playMove(row, col);
        this.render();
      }
  
      // display the final game board and the winner (if any)
      this.render();
      if (this.game.board.winner !== null) {
        console.log(`${this.game.board.winner} wins!`);
      } else {
        console.log('The game is a tie.');
      }
    }
  
    // gets input from the user
    getInput(prompt) {
      while (true) {
        // display the prompt and read the input
        process.stdout.write(prompt);
        const input = readline.question();
  
        // validate the input and return it if it's valid
        if (input >= 0 && input <= 2) {
          return input;
        }
      }
    }

    // create a new game
    const game = new Game();

    // add two players to the game
    game.players.push(new Player('Player 1', 'X'));
    game.players.push(new Player('Player 2', 'O'));

    // start the game
    game.start();

    // create a new game view
    const gameView = new GameView(game);

    // start the game loop
    gameView.start();
}    
  