class HanoiView {
  constructor(game, el) {
    this.startTowerIdx = null;
    this.game = game;
    this.rootEl = el;
    this.setupTowers();
    this.render();
    $('ul').on('click', (e) => this.clickTower($(e.currentTarget)));
  }

  setupTowers() {
    for(let i = 0; i < 3; i++) {
      let ulEl = $('<ul></ul>');
      ulEl.attr('data-index', i );
      this.rootEl.append(ulEl);
    }
  }

  render() {
    $('li').remove();
    this.game.towers.forEach((tower, idx) => {
      const diskNum = tower.length;
      tower.forEach(disk => {
        let $disk = $('<li></li>');
        $disk.attr('data-size', disk).addClass(`size-${disk}`);
        console.log($($('ul')[idx]));
        $($('ul')[idx]).prepend($disk);
      });
      for (let i = 0; i < (3 - diskNum); i++) {
        let $emptyDisk = $('<li></li>');
        $($('ul')[idx]).prepend($emptyDisk);
      }
    });

    // $('ul').each(tower => {
    //
    // });
  }

  clickTower($tower) {

    if (this.startTowerIdx) {
      try {
        $($('ul')[this.startTowerIdx]).toggleClass('selected');
        console.log($tower);
        this.game.move(this.startTowerIdx, $tower.attr('data-index'));
        this.startTowerIdx = null;
        this.render();
        if (this.game.isWon()) {
          setTimeout(() => $('body').prepend('<marquee>You won!</marquee>'), 60);
        }
      }
      catch(err) {
        alert(err);
        this.startTowerIdx = null;
      }

    }
    else {
      this.startTowerIdx = $tower.attr('data-index');
      $($('ul')[this.startTowerIdx]).toggleClass('selected');
    }
  }
}

module.exports = HanoiView;
