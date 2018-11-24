var canvas;
var canvasContext;

var ballX = 400;
var ballY = 300;
var ballSpeedX = 10; // org 10
var ballSpeedY = 5;
var ballWidth = 50;

var paddle1Y = 250;
var paddle2Y = 250;
var userPaddleHeight = 100;
var computerPaddleHeight = 100;
const PADDLE_WIDTH = 5;
var computerSpeed = 6;

var ballColor = 'white';
var backgroundPattern = "./images/darkness.png";

var player1Score = 0;
var player2Score = 0;
var WINNING_SCORE = 5;

var showingWinScreen = false;

var text;


$(function(){
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');

	$('input[name="gameButton"').click(function(){
	    var framesPerSecond = 30;
		setInterval(callBoth, 1000/framesPerSecond );

		$( ".startButton" ).hide();
	});

	function myName() {
	    text = document.getElementById("searchTxt").value;
	    console.log(text.length);
	    if (text.length > 0) {
	    	 document.getElementById("userName").innerHTML = text;
	    } else {
	    	document.getElementById("userName").innerHTML = 'Noname';
	    }
	}

	var input = document.getElementById("searchTxt");
	input.addEventListener("keyup", function(event) {
	    event.preventDefault();
	    if (event.keyCode === 13) {
	        document.getElementById("enterButton").click();
	    }
	});

	$('button[id="enterButton"]').click(function(){
		$( ".welcome" ).hide( "slow" );
		myName();
	});

	function toggle_visibility(id) {
       var e = document.getElementById(id);
       if(e.style.display == 'block')
          e.style.display = 'none';
       else
          e.style.display = 'block';
    }

	$('button[class="settings"]').click(function(){
		toggle_visibility('settingsOption');
	});
	// color change buttons START
	$('input[name="colorPicker"]:checked').parent().css("border", "3px solid #4CAF50");

	$('.color').on('click', function(){
		$('input[name="colorPicker"]:checked').parent().css("border", "3px solid #4CAF50");
		$('input[name="colorPicker"]:not(:checked)').parent().css("border", "1px solid black");
	});

	$('.color1').on('click', function(){
		ballColor = 'white';
	});

	$('.color2').on('click', function(){
		ballColor = 'yellow';
	});

	$('.color3').on('click', function(){
		ballColor = 'orange';
	});

	$('.color4').on('click', function(){
		ballColor = 'red';
	});

	$('.color5').on('click', function(){
		ballColor = 'green';
	});

	$('.color6').on('click', function(){
		ballColor = 'lightblue';
	});

	$('.color7').on('click', function(){
		ballColor = 'blue';
	});

	$('.color8').on('click', function(){
		ballColor = 'purple';
	});

	$('.color9').on('click', function(){
		ballColor = 'grey';
	});

	// color change buttons END

	//  background change buttons START

	$('input[name="BackgroundPicker"]:checked').parent().css("border", "3px solid #4CAF50");

	$('.background').on('change', function(){
		$('input[name="BackgroundPicker"]:checked').parent().css("border", "3px solid #4CAF50");
		$('input[name="BackgroundPicker"]:not(:checked)').parent().css("border", "1px solid black");
	});

	$('.background1').on('click', function(){
		backgroundPattern = "./images/darkness.png";
	});

	$('.background2').on('click', function(){
		backgroundPattern = "./images/wheat.png";
	});

	$('.background3').on('click', function(){
		backgroundPattern = "./images/folk-pattern-black.png";
	});

	$('.background4').on('click', function(){
		backgroundPattern = "./images/dark-grey-terrazzo.png";
	});

	//  background change buttons START

	$('input[name="selection"]:checked').parent().css("background-color", "#97c499");

	$('.button1').on('click', function(){
		ballReset();
		$('input[name="selection"]:checked').parent().css("background-color", "#97c499");
		$('input[name="selection"]:not(:checked)').parent().css("background-color", "#ddd");
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
		$('input[name="selection"]:checked').parent().css("background-color", "#97c499");
		$('input[name="selection"]:not(:checked)').parent().css("background-color", "#ddd");
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
		$('input[name="selection"]:checked').parent().css("background-color", "#97c499");
		$('input[name="selection"]:not(:checked)').parent().css("background-color", "#ddd");
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

// only game functions

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

	if(ballY < (ballWidth / 3)) {
		ballSpeedY = -ballSpeedY;
	}
	if(ballY > (canvas.height - (ballWidth / 3))) {
		ballSpeedY = -ballSpeedY;
	}
}

function drawNet() {
	for(var i=10;i<canvas.height; i+=40) {
		colorRect(canvas.width/2-1,i,2,20,'white');
	}
}

function drawEverything() {
	colorRect(0,0,canvas.width,canvas.height, 'black'); 	// blanks out the screen

	var background = new Image();
	background.src = backgroundPattern;
	canvasContext.drawImage(background,0,0,canvas.width,canvas.height);   

	if(showingWinScreen == true) {
		canvasContext.fillStyle = 'white';
		if(player1Score >= WINNING_SCORE){
			canvasContext.font = "30px Orbitron";
			canvasContext.fillText("You win!!!", 300, 300);
		} else if(player2Score >= WINNING_SCORE){
			canvasContext.font = "30px Orbitron";
			canvasContext.fillText("You lose", 300, 300);
		}

		canvasContext.font = "25px Orbitron";
		canvasContext.fillText("click to continue", 300, 400);
		return; // fuction drawEverything is not going to work further
	}


	colorRect(0, paddle1Y, PADDLE_WIDTH, userPaddleHeight, 'white'); // draw left paddle
	colorRect(canvas.width-PADDLE_WIDTH, paddle2Y, PADDLE_WIDTH, computerPaddleHeight, 'white'); // draw right paddle
	drawNet();
	// draw ball
	colorCircle(ballX, ballY, 10, ballColor);

	canvasContext.font = "30px Arial";
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





