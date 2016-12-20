class View {
  constructor(game, $el) {
    this.game = game;
    $el.append(this.setupBoard());
    this.bindEvents();
  }

  bindEvents() {
    $('li').on('click', (e) => {
      const $square = $(e.currentTarget);
      let pos = $square.attr('data-pos').split(",");
      pos = pos.map(el => parseInt(el));
      const that = this.game;
      try {
        this.game.playMove(pos);
        this.makeMove($square);
      }
      catch(err) {
        alert(err.msg);
      }
      if (this.game.isOver()) {
        alert('Game Over!');
      }
    });
  }

  makeMove($square) {
    if (this.game.currentPlayer === "x") {
      $square.addClass('filledX');
    }
    else {
      $square.addClass('filledO');
    }
    $square.text(this.game.currentPlayer);

  }

  setupBoard() {
    let $ul = $('<ul></ul>');
    for (let i = 0; i < 9; i++) {
      let $li = $('<li></li>');
      const row = Math.floor(i / 3);
      const col = i % 3;
      $li.attr('data-pos', `${row}, ${col}`);
      $ul.append($li);
    }

    return $ul;
  }
}

module.exports = View;
