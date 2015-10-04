Maze = function(args){
	var height = args.height;
	var width = args.width;
	var grid = [];

	for(var i = 0;i<height;i++){
		var columns = [];
		for(var x = 0;x<width;x++){
			columns.push(0);
		}
		grid.push(columns);
	}
	$.each(grid, function(cIndex, column){
		var newColumn = $("<div class='column col" + cIndex + "'>");
		$.each(grid, function(rIndex, row){
			var newCell = $("<div class='cell row" + rIndex + "'>");
			newCell.append("<div class='up-connection'>");
			newCell.append("<div class='left-connection'>");
			newCell.append("<div class='cell-centre'>");
			newCell.append("<div class='right-connection'>");
			newCell.append("<div class='down-connection'>");
			newColumn.append(newCell);
		});
		$("#maze-grid").append(newColumn);
	});
	this.showGridStatus = function(){
		// $.each(grid, function(index, column){
		// 	console.log(column);
		// });
		// console.log("-------------");
	};
	this.getAt = function(row, col){
		return grid[col][row];
	};
	this.setAt = function(runner, row, col, value){
		grid[col][row] = value;
		drawConnection({
			row: runner.previousLocation().row,
			col: runner.previousLocation().col
		}, {
			row: row,
			col: col
		});
	};
	this.getHeight = function(){
		return height;
	};
	this.getWidth = function(){
		return width;
	};
	var drawConnection = function(from, to){
		if(from.row == to.row && from.col == to.col) return;
		var fromEl = $(".col" + from.col + " .row" + from.row);
		var toEl = $(".col" + to.col + " .row" + to.row);
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