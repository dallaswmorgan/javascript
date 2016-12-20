/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	// const Snake = require('./snake.js');
	const View = __webpack_require__(3);
	$(() => {
	  const renderEl = $('.snake-game');
	  const view = new View(renderEl);
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const Coord = __webpack_require__(2);

	class Snake {
	  constructor(board) {
	    this.gameOver = false;
	    this.length = 1;
	    this.direction = 'N';
	    this.board = board;
	    this.segments = [new Coord([5,5])];
	  }

	  move(interval) {
	    let head = this.segments[0];
	    this.segments.unshift(head.plus(this.direction));
	    if (this.segments.length > this.length) {
	      this.segments.pop();
	    }

	    // if head collide with any other segments OR head outside the board
	    const headPos = this.segments[0].pos;
	    const snakeTail = this.segments.slice(1);

	    if (snakeTail.some(coord => (coord.pos === headPos)) ||
	       (!this.board.isValidPos(headPos))) {
	         this.gameOver = true;
	      throw "Game Over!";
	    }
	    // console.log(this.renderPositions());
	  }

	  renderPositions() {
	    return this.segments.map(coord => coord.pos);
	    // snakePositions.each();
	  }

	  turn(dir) {
	    if (Coord.prototype.isOpposite(this.direction, dir)) {
	      return;
	    }
	    else {
	      this.direction = dir;
	    }
	  }
	}



	Snake.directions = ['N', 'S', 'E', 'W'];

	module.exports = Snake;


/***/ },
/* 2 */
/***/ function(module, exports) {

	class Coord {
	  constructor(pos) {
	    this.pos = pos;
	    this.dirs = {
	      'N': [-1, 0],
	      'E': [0, 1],
	      'S': [1, 0],
	      'W': [0, -1]
	    };
	  }

	  plus (dir) {
	    let [row, col] = this.pos;
	    const [dr, dc] = this.dirs[dir];

	    return new Coord([row + dr, col + dc]);
	  }

	  equals (coord2) {
	    // if (this.coord == coord2)
	  }

	  isOpposite (curDir, newDir) {
	    if((curDir === 'W' && newDir === 'E') ||
	       (curDir === 'E' && newDir === 'W') ||
	       (curDir === 'N' && newDir === 'S') ||
	       (curDir === 'S' && newDir === 'N')) {
	      return true;
	    }
	    else {
	      return false;
	    }
	  }

	}

	module.exports = Coord;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	const Board = __webpack_require__(4);

	class View {
	  constructor(renderEl) {
	    this.dirs = {
	      "37": "W",
	      "38": "N",
	      "39": "E",
	      "40": "S"
	    };

	    this.board = new Board(30);
	    this.snake = this.board.snake;
	    this.$el = renderEl;
	    $(window).keydown((key) => {
	      this.snake.turn(this.dirs[key.keyCode]);
	      console.log(this.snake.direction);
	    });
	    const snakeMove = window.setInterval(this.snake.move.bind(this.snake), 200);
	    // const appleInterval = window.setInterval(this.board.applePosition.bind(this.board), 200);
	    const renderInterval = window.setInterval(this.render.bind(this, this.$el), 200);
	    this.board.applePosition();
	    const checkInterval = window.setInterval(() => {
	      if (this.snake.gameOver) {
	      clearInterval(snakeMove);
	      clearInterval(renderInterval);
	    }
	    }, 500);
	  }

	  render($el) {
	    $('ul').remove();
	    for (let row = 0; row < this.board.size; row++) {
	      let $ul = $('<ul></ul>');
	      $ul.attr('data-idx', row);
	      for (let col = 0; col < this.board.size; col++) {
	        let $li = $('<li></li>');
	        $li.attr('data-idx', col);
	        $ul.append($li);
	      }
	      $el.append($ul);
	    }

	    this.snake.renderPositions().forEach(pos => {
	      const [row, col] = pos;
	      $($($('ul')[row].childNodes)[col]).addClass('snake');
	    });
	    if (this.board.applePos){
	      const [row_a, col_a] = this.board.applePos;
	      $($($('ul')[row_a].childNodes)[col_a]).addClass('apple');
	    }
	  }



	}

	module.exports = View;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	const Snake = __webpack_require__(1);
	const Coord = __webpack_require__(2);

	class Board {
	  constructor(size) {
	    this.apple = null;
	    this.snake = new Snake(this);
	    this.size = size;
	    this.grid = Array(size).fill().map(() => Array(size));
	    this.applePos = null;
	  }

	  isValidPos(pos) {
	    const [row, col] = pos;
	    if (row < 0 || row >= this.size || col < 0 || col >= this.size) {
	      return false;
	    }
	    return true;
	  }

	  applePosition() {
	    if (this.applePos) return;

	    let pos = [Math.round(Math.random()*this.size),
	               Math.round(Math.random()*this.size)];
	    if (this.snake.renderPositions.includes(pos)) {
	      this.applePosition();
	    }
	    else {
	      this.applePos = pos;
	    }
	  }

	}
	module.exports = Board;


/***/ }
/******/ ]);