app = new (function(){
	//public methods
	this.init = function(){
		console.log("init");
		this.tests();
	};
	this.tests = function(){
		console.log("test 1 started");
		var createTestCase = function(height, width){
			height = height || Math.ceil(Math.random() * 30);
			width = width || Math.ceil(Math.random() * 30);
			var maze = new Maze({
				height: height,
				width: width
			});
			new MazeRunner({
				maze: maze
			}).run();
		};
		//createTestCase(13, 29);
		//createTestCase(13, 5);
		//createTestCase(5, 10);
		createTestCase();
		createTestCase();
		createTestCase();
	};
});