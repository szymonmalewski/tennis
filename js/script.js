var canvas;
var canvasContext;

var ballX = 400;
var ballY = 300;
var ballSpeedX = 10;
var ballSpeedY = 5;
var ballWidth = 50;

var paddle1Y = 250;
var paddle2Y = 250;
var userPaddleHeight = 100;
var computerPaddleHeight = 100;
const PADDLE_WIDTH = 10;
var computerSpeed = 6;

var player1Score = 0;
var player2Score = 0;
var WINNING_SCORE = 5;

var showingWinScreen = false;

$(function(){
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');


	var framesPerSecond = 30;
	setInterval(callBoth, 1000/framesPerSecond );

	$('input[type="radio"]:checked').parent().css("background-color", "#aaaa55");

	$('.button1').on('click', function(){
		ballReset();
		$('input[type="radio"]:checked').parent().css("background-color", "#aaaa55");
		$('input[type="radio"]:not(:checked)').parent().css("background-color", "#ddd");
		ballSpeedX = 6;
		ballSpeedY = 2;
		userPaddleHeight = 140;
		computerPaddleHeight = 60;
		computerSpeed = 4;
		WINNING_SCORE = 3;
		player1Score = 0;
		player2Score = 0;
	});

	$('.button2').on('click', function(){
		ballReset();
		$('input[type="radio"]:checked').parent().css("background-color", "#aaaa55");
		$('input[type="radio"]:not(:checked)').parent().css("background-color", "#ddd");
		ballSpeedX = 10;
		ballSpeedY = 5;
		userPaddleHeight = 100;
		computerPaddleHeight = 100;
		computerSpeed = 6;
		WINNING_SCORE = 5;
		player1Score = 0;
		player2Score = 0;
	});


	$('.button3').on('click', function(){
		ballReset();
		$('input[type="radio"]:checked').parent().css("background-color", "#aaaa55");
		$('input[type="radio"]:not(:checked)').parent().css("background-color", "#ddd");
		ballSpeedX = 15;
		ballSpeedY = 6;
		userPaddleHeight = 80;
		computerPaddleHeight = 120;
		computerSpeed = 8;
		WINNING_SCORE = 10;
		player1Score = 0;
		player2Score = 0;
	});

	canvas.addEventListener('mousedown', handleMouseClick);

	canvas.addEventListener('mousemove', 
		function(evt) {
			var mousePos = calculateMousePos(evt);
			paddle1Y = mousePos.y - (userPaddleHeight/2);
		});
});

function callBoth() {
	moveEverything();
	drawEverything();
}

function moveEverything() {
	if(showingWinScreen == true) {
		return; // fuction moveEverything is not going to work further
	}

	computerMovement();

	ballX = ballX + ballSpeedX;
	ballY = ballY + ballSpeedY;

	if(ballX <0) {
		if(ballY > paddle1Y && ballY < paddle1Y + userPaddleHeight) {
			ballSpeedX = -ballSpeedX;
			var acelerateY = ballY - (paddle1Y+userPaddleHeight/2);
			ballSpeedY = acelerateY/3;
		} else {
			player2Score++;
			ballReset();
		}	
	}
	if(ballX > canvas.width) {
		if(ballY > paddle2Y && ballY < paddle2Y + computerPaddleHeight) {
			ballSpeedX = -ballSpeedX;
			var acelerateY = ballY - (paddle2Y+computerPaddleHeight/2);
			ballSpeedY = acelerateY/3;
		} else {
			player1Score++;
			ballReset();
		}
	}

	if(ballY <0) {
		ballSpeedY = -ballSpeedY;
	}
	if(ballY > canvas.height) {
		ballSpeedY = -ballSpeedY;
	}
}

function drawNet() {
	for(var i=10;i<canvas.height; i+=40) {
		colorRect(canvas.width/2-1,i,2,20,'white');
	}
}

function drawEverything() {
	colorRect(0,0,canvas.width,canvas.height, 'black'); // blanks out the screen



	if(showingWinScreen == true) {
		canvasContext.fillStyle = 'white';
		if(player1Score >= WINNING_SCORE){
			canvasContext.fillText("Player 1 wins!!!", 300, 300);
		} else if(player2Score >= WINNING_SCORE){
			canvasContext.fillText("Player 2 wins!!!", 300, 300);
		}

		canvasContext.fillText("click to continue", 300, 400);
		return; // fuction drawEverything is not going to work further
	}


	colorRect(0, paddle1Y, PADDLE_WIDTH, userPaddleHeight, 'white'); // draw left paddle
	colorRect(canvas.width-PADDLE_WIDTH, paddle2Y, PADDLE_WIDTH, computerPaddleHeight, 'white'); // draw right paddle
	drawNet();
	// draw ball
	colorCircle(ballX, ballY, 10, 'white');

	canvasContext.fillText(player1Score, 100, 100);
	canvasContext.fillText(player2Score, canvas.width-100, 100);
}

function colorRect(leftX, topY, width, height, drawColor) {
	canvasContext.fillStyle = drawColor;
	canvasContext.fillRect(leftX, topY, width, height);
}

function colorCircle(centerX, centerY, radious, drawColor) {
	canvasContext.fillStyle = drawColor;
	canvasContext.beginPath(); // all needed
	canvasContext.arc(centerX, centerY, radious, 0,Math.PI*2, true); // X, Y (from the center of a ball), radious, next formula for a ball
	canvasContext.fill();
}

function calculateMousePos(evt) {
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;
	var mouseX = evt.clientX - rect.left - root.scrollLeft;
	var mouseY = evt.clientY - rect.top - root.scrollTop;
	return {
		x:mouseX,
		y:mouseY
	};
}

function ballReset() {
	if(player1Score >= WINNING_SCORE || player2Score >= WINNING_SCORE){
		showingWinScreen = true;
	}

	ballSpeedX = -ballSpeedX;
	ballX = canvas.width/2;
	ballY = canvas.height/2;
}

function computerMovement() {
	var paddle2YCenter = paddle2Y + (computerPaddleHeight/2);
	if(paddle2YCenter < ballY - (computerPaddleHeight/3)) {
		paddle2Y += computerSpeed;
	} else if(paddle2YCenter > ballY + (computerPaddleHeight/3)) {
		paddle2Y -= computerSpeed;
	}
}

function handleMouseClick() {
	if(showingWinScreen){
		player1Score = 0;
		player2Score = 0;
		showingWinScreen = false;
	}
}





