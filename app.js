app = new (function(){
	//public methods
	this.init = function(){
		console.log("init");
		this.tests();
	};
	this.tests = function(){
		console.log("test 1 started");
		maze = new Maze({
			height: 25,
			width: 25
		});
		mazeRunner = new MazeRunner({
			maze: maze
		});
		mazeRunner.run();
	};
});