var X = 'X';
var O = 'O';

function getNewBoard() {
  var board = [];
  for (var i=0; i<9; i++) {
    board.push('');
  }
  return board;
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
