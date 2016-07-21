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

function getEmptyPositions(board) {
  return board.reduce(function(prev, curr, i) {
    if (curr.length === 0) {
      prev.push(i);
    }
    return prev;
  }, []);
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

function computerTurn(board, side) {
  var empty_positions = getEmptyPositions(board);
  var position = empty_positions[Math.floor(Math.random() * empty_positions.length)];
  return board.map(function(e, i) {
    if (i === position) {
      return side;
    } else {
      return e;
    }
  });
}

function getNewGameState() {
  return {
    in_progress: false,
    player_side: null,
    computer_side: null,
    waiting_for_player: false,
    board: getNewBoard()
  };
}

$('.tile').click(function() {
  if (game_state.waiting_for_player) {
    game_state.waiting_for_player = false;
    if (getEmptyPositions(game_state.board).length === 9) {
      $('#status').html('');
      game_state.player_side = X;
      game_state.computer_side = O;
    }
    var tile_num = this.dataset.tileNumber;
    game_state.board[tile_num] = game_state.player_side;
    displayBoard(game_state.board);
    if (checkWinner(game_state.board)) {
      $('#status').html(playerEntity(checkWinner(game_state.board)) + ' WON!');
      return;
    }
    game_state.board = computerTurn(game_state.board, game_state.computer_side);
    displayBoard(game_state.board);
    if (checkWinner(game_state.board)) {
      $('#status').html(playerEntity(checkWinner(game_state.board)) + ' WON!');
      return;
    }
    game_state.waiting_for_player = true;
  }
});

$('#status').on('click', '#computer_first', function() {
  game_state.waiting_for_player = false;
  $('#status').html('');
  game_state.computer_side = X;
  game_state.player_side = O;
  game_state.board = computerTurn(game_state.board, game_state.computer_side);
  displayBoard(game_state.board);
  game_state.waiting_for_player = true;
});

var game_state = getNewGameState();
displayBoard(game_state.board);
$('#status').html('Make your move, or let the computer go first.');
$('#status').append('<br /><button id="computer_first">Let the computer go first.</button>');
game_state.waiting_for_player = true;
