MazeRunner = function(args){
	var maze = args.maze;
	var currentRow;
	var currentColumn;
	var locationHistory = [];
	var speed = 10;

	this.run = function(){
		setStartingLocation(0, 0); // set starting point
		setTimeout(tick.bind(this), speed);
	};
	this.previousLocation = function(){
		return locationHistory.length > 0 ? locationHistory[locationHistory.length-1] : {
			row: currentRow,
			col: currentColumn
		};
	};
	var setStartingLocation = function(row, col){
		currentRow = row, currentColumn = col;
	};
	var setPath = function(){
		maze.setAt(this, currentRow, currentColumn, 1);
	};
	var tick = function(){
		var moved = false;
		while(!moved){
			var current = maze.getAt(currentRow, currentColumn);
			if(current == 0){
				setPath.call(this); // mark space as a path
				maze.showGridStatus();
				moved = true;
			}
			if(!moveToNextValidSpace() && !moveBack()){
				console.log("beginning reached");
				return;
			}
		}
		setTimeout(tick.bind(this), speed);
	};
	var moveBack = function(){
		locationHistory.pop(); // remove current location
		if(locationHistory.length == 0){
			return false;
		} else {
			var previousLocation = locationHistory.pop(); // get previous location
			setNextLocation(previousLocation.row, previousLocation.col);
			return true;
		}
	};
	var getFourRandomNumbers = function(){
		var fourRandomNumbers = [];
		while(fourRandomNumbers.length < 4){
			var nextRandomNumber = Math.ceil(Math.random()*4);
			if(fourRandomNumbers.indexOf(nextRandomNumber) == -1) fourRandomNumbers.push(nextRandomNumber);
		}
		return fourRandomNumbers;
	};
	var moveToNextValidSpace = function(){
		var row = currentRow, col = currentColumn, moveChoices = getFourRandomNumbers();
		for(var i = 0; (moveChoice=moveChoices[i]);i++){
			if(moveChoice == 1) // move up
				row--;
			else if(moveChoice == 2) // move right
				col++;	
			else if(moveChoice == 3) // move down
				row++;
			else if(moveChoice == 4) // move left
				col--;
			if(row == maze.getHeight() || row == -1 || col == maze.getWidth() || col == -1 || maze.getAt(row, col) != 0){
				row = currentRow, col = currentColumn; // reset position
				continue; // try another direction
			} else {
				setNextLocation(row, col);
				return true; // valid position found
			}
		}
		return false;
	};
	var setNextLocation = function(row, col){
		locationHistory.push({
			row: currentRow,
			col: currentColumn
		});
		currentRow = row;
		currentColumn = col;
	};
};