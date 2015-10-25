Maze = function(args){
	// private properties
	var height = args.height;
	var width = args.width;
	var grid = [];
	var gridDomElName = "maze-" + Math.ceil(Math.random() * 1000000);	// I wouldn't recommend having more than 1 million mazes

	(function(){
		// generate placeholder element for the whole maze
		var newMazePlaceholderDiv = $("<div id='" + gridDomElName + "'>");

		// generate logical rows and cells
		for(var i = 0;i<height;i++){
			var row = [];
			for(var x = 0;x<width;x++){
				row.push(0);
			}
			grid.push(row);
		}

		// generate visual rows and cells
		$.each(grid, function(rowIndex, row){
			var newRow = $("<div class='row row" + rowIndex + "'>");
			$.each(row, function(colIndex, column){
				var newCell = $("<div class='cell cell" + colIndex + "'>");
				newCell.append("<div class='up-connection'>");
				newCell.append("<div class='left-connection'>");
				newCell.append("<div class='cell-centre'>");
				newCell.append("<div class='right-connection'>");
				newCell.append("<div class='down-connection'>");
				newRow.append(newCell);
			});
			newMazePlaceholderDiv.append(newRow);
		});
		$("body").append(newMazePlaceholderDiv);
	})();

	// public methods
	this.getAt = function(row, cell){
		return grid[row][cell];
	};
	this.setAt = function(runner, row, cell, value){
		grid[row][cell] = value;
		drawConnection({
			row: runner.previousLocation().row,
			col: runner.previousLocation().col
		}, {
			row: row,
			col: cell
		});
	};
	this.getHeight = function(){
		return height;
	};
	this.getWidth = function(){
		return width;
	};

	// private methods
	var drawConnection = function(from, to){
		if(from.row == to.row && from.col == to.col) return;
		var fromEl = $("#" + gridDomElName + " .row" + from.row + " .cell" + from.col);
		var toEl = $("#" + gridDomElName + " .row" + to.row + " .cell" + to.col);
		if(from.row == to.row){
			// is not up or down so is left or right
			fromEl.addClass((from.col < to.col) ? "point-right" : "point-left");
			toEl.addClass((from.col < to.col) ? "point-left" : "point-right");
		} else {
			// different row so up or down
			fromEl.addClass((from.row < to.row) ? "point-down" : "point-up");
			toEl.addClass((from.row < to.row) ? "point-up" : "point-down");
		}
		fromEl.addClass("visited");
		toEl.addClass("visited");
	};
};