app = new (function(){
	//public methods
	this.init = function(){
		console.log("init");
		this.tests();
	};
	this.tests = function(){
		console.log("test 1 started");
		maze = new Maze({
			height: 13,
			width: 24
		});
		mazeRunner = new MazeRunner({
			maze: maze
		});
		mazeRunner.run();
	};
});