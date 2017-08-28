(function($) {
	//Get container dimensions (includes padding)
	var w = $(window).width();
	var h = $(window).height();
	
	$('#intro').css('height', h); 
	
	//Get optimal frame rate from the browser
	var requestAnimFrame = (function(){
		return window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			window.oRequestAnimationFrame ||
			window.msRequestAnimationFrame ||
			function(callback){
				window.setTimeout(callback, 1000 / 60);
			};
	})();

	//Set up canvas and canvas context
	var canvas = document.createElement("canvas");
	var container = document.getElementById('intro'); 
	var ctx = canvas.getContext("2d");
	canvas.width = w;
	canvas.height = h;
	container.appendChild(canvas);
	
	//Set up the variables
	var lastTime;
	var gameTime = 0;
	var mountain_w = -200; 
	var mountain_x = [];
	var mountain_y = [];
	var numClouds = 20; 
	
	//Create an array of mountain points
	mountain_x.push(mountain_w); 
	mountain_y.push(h); 
	
	while ( mountain_w < w ) {
		var x = getRandomNumber(50, 250); 
		mountain_x.push(x); 
		
		var y = getRandomNumber(75, h);
		mountain_y.push(y); 
		
		mountain_w += x; 	
	}
	
	//Set the cloud image
	cloud = new Image();
	cloud.src = '/img/cloud.png';
	var aspect_ratio = .59; 
	
	//Create an array of clouds
	var clouds = [];
	var i = 0; 
	while ( i <= numClouds) {
		clouds.push(i); 
		i++; 
	}
	
	//Randomly set the starting x position of the clouds
	var cloudX = [];
	i = 0;
	while ( i <= clouds.length) {
		var random = getRandomNumber(0, canvas.width);
		cloudX.push(random); 
		i++; 
	}
	
	//Randomly set the starting y position of the clouds
	var cloudY = [];
	i = 0;
	while ( i <= clouds.length) {
		var random = getRandomNumber(0, canvas.height - 200); 
		cloudY.push(random); 
		i++; 
	}
	
	//Randomly set the horizontal floating speed of the clouds
	var starDeltaX = [];
	i = 0;
	while ( i <= clouds.length) {
		var random = getRandomNumber(-.5, -.25); 
		starDeltaX.push(random); 
		i++; 
	}
	
	//Randomly set the vertical floating speed of the clouds (0)
	var starDeltaY = [];
	i = 0;
	while ( i <= clouds.length) {
		var random = getRandomNumber(0, 0);  
		starDeltaY.push(random); 
		i++; 
	}
	
	//Randomly set the width of the clouds
	var cloudWidth = [];
	i = 0;
	while ( i <= clouds.length) {
		var random = getRandomNumber(80, 200); 
		cloudWidth.push(random); 
		i++; 
	}
 
	//Loop continuously to refresh the canvas
	function main() {
		var now = Date.now();
		var dt = (now - lastTime) / 1000.0;

		update(dt);  

		lastTime = now;
		requestAnimFrame(main);	
	};
	main();
	
	//Dynamically draw floating clouds
	function drawClouds(start, end){
		for (var i = start; i < end; i++) {
			ctx.drawImage(cloud, cloudX[i], cloudY[i], cloudWidth[i], cloudWidth[i] * aspect_ratio);
		}			  
	}
		
	//Dynamically draw a mountain range
	function drawMountain() {
		ctx.beginPath();
		ctx.moveTo(mountain_x[0], h);
		
		var x_pos = mountain_x[0]; 
		
		for (var i = 0; i < mountain_x.length; i++) {
			ctx.lineTo(x_pos, mountain_y[i]);
			
			x_pos += mountain_x[i]; 
		}
		
		ctx.lineTo(w, h);
		ctx.closePath();
		ctx.fillStyle = "#B6A694";
		ctx.fill();
	}
	
	//Update the game every frame 
	function update(dt) {
		gameTime += dt;
		animate(); 
	};
	
	//Handle the animation
	function animate() {
		ctx.clearRect(0,0,canvas.width,canvas.height);
		moveClouds(); 
		drawClouds(0, numClouds / 2);
		drawMountain(); 
        drawClouds(numClouds / 2, numClouds);		
	}
	
	function moveClouds(){
		for (var i = 0; i < clouds.length; i++) {
			//Handle infinite cloud scrolling
			if ( cloudX[i] < -1 * cloudWidth[i] ) {
				cloudX[i]  = w + cloudWidth[i]; 
			}

			//Move the clouds
			cloudX[i] = cloudX[i] + starDeltaX[i];
			cloudY[i] = cloudY[i] + starDeltaY[i];
		}
	}
	
	//Get a random number in a range
	function getRandomNumber(min, max) {
		return Math.random() * (max - min) + min;
	}
}(jQuery)); 