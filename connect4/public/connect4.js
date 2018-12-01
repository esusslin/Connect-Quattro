class Connect4 {
  constructor(selector) {
    this.ROWS = 6;
    this.COLS = 7;
    this.selector = selector;
    this.player = "red";
    this.createGrid();
    this.setupEventListeners();
  }

  createGrid() {
    const $board = $(this.selector);
    for (let row = 0; row < this.ROWS; row++) {
      const $row = $("<div>").addClass("row");
      for (let col = 0; col < this.COLS; col++) {
        const $col = $("<div>")
          .addClass("col empty")
          .attr("data-row", row)
          .attr("data-col", col);
        $row.append($col);
      }
      $board.append($row);
    }
  }

  setupEventListeners() {
    const $board = $(this.selector);
    const that = this;

    function findLastEmptyCell(col) {
      const cells = $(`.col[data-col='${col}']`);
      for (let i = cells.length - 1; i >= 0; i--) {
        const $cell = $(cells[i]);
        if ($cell.hasClass("empty")) {
          return $cell;
        }
      }
      return null;
    }

    $board.on("mouseenter", ".col.empty", function() {
      const col = $(this).data("col");
      const $lastEmptyCell = findLastEmptyCell(col);
      $lastEmptyCell.addClass(`next-${that.player}`);
    });

    $board.on("mouseleave", ".col", function() {
      $(".col").removeClass(`next-${that.player}`);
    });

    $board.on("click", ".col.empty", function() {
      const col = $(this).data("col");
      const row = $(this).data("row");
      const $lastEmptyCell = findLastEmptyCell(col);
      $lastEmptyCell.removeClass("empty");
      $lastEmptyCell.addClass(that.player);

      that.player = that.player === "red" ? "black" : "red";
    });
  }
}
