/*
Board layout

+---+---+---+
| 0 | 1 | 2 |
+---+---+---+
| 3 | 4 | 5 |
+---+---+---+
| 6 | 7 | 8 |
+---+---+---+

*/

var X = 'X';
var O = 'O';

function getNewBoard() {
  var board = [];
  for (var i=0; i<9; i++) {
    board.push('');
  }
  return board;
}

function checkWinner(board) {
  var sequences = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  var board_sequences = sequences.map(function(sequence) {
    return sequence.map(function(e) {
      return board[e];
    });
  });

  var winning_sequences = board_sequences.filter(function(sequence) {
    return sequence.every(function(e) {
      return e === sequence[0] && e.length > 0;
    });
  });

  if (winning_sequences.length > 0) {
    return winning_sequences[0][0];
  } else {
    return false;
  }
}

function playerEntity(playerStr) {
  if (playerStr === 'X') {
    return '&times;';
  } else if (playerStr === 'O') {
    return '&cir;';
  } else {
    return '';
  }
}

function displayBoard(board) {
  board.forEach(function(tile, i) {
    $('.tile[data-tile-number=' + i + ']')
    .html(playerEntity(tile));
  });
}

function computerTurn(board) {
  for (var i=0; i<board.length; i++) {
    if (board[i] === '') {
      board[i] = O;
      return board;
    }
  }
  return board;
}

var game_state = {
  in_progress: false,
  player_side: null,
  waiting_for_player: false,
  board: getNewBoard()
};

$('.tile').click(function() {
  if (game_state.waiting_for_player) {
    var tile_num = this.dataset.tileNumber;
    game_state.board[tile_num] = game_state.player_side;
    displayBoard(game_state.board);
    game_state.board = computerTurn(game_state.board);
    displayBoard(game_state.board);
  }
});


// test

game_state.player_side = X;
game_state.waiting_for_player = true;
