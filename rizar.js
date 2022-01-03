var canvasWidth = 1900; 
var canvasHeight = 350;

var spriteWidth = 1700; 
var spriteHeight = 200;

var attackWidth =3255;
var attackHeight = 200;

var rows = 2; 
var cols = 17;

var rowsA = 2; 
var colsA = 21;

var trackRight = 0; 
var trackLeft = 1; 

var width = spriteWidth/cols; 
var height = spriteHeight/rows; 

var widthA = attackWidth/colsA; //Ширина одного кадра атакующего рыцаря
var heightA = attackHeight/rowsA; //Высота одного кадра атакующего рыцаря

var curFrame = 0;
var frameCount = 17;
var frameCountA = 21; // Количество кадров в анимации атаки

var x=0;
var y=200;

var x2=x;
var y2=y; 

var srcX;
var srcY;

var srcXA;  //srcXA,srcYA,width2,height2,x2,y2,width2,height2
var srcYA;

var left = false;
var right = true;

var speed = 8;

var canvas = document.getElementById('canvas');
var Jump = false;
var countJump = 0;
var Attack = false;
var indexAttack = 0;

//var rightchar;

canvas.width = canvasWidth;
canvas.height = canvasHeight; 


var ctx = canvas.getContext("2d");

var Run = new Image(); 
Run.src = "RizarRun.png";				

var iAttack = new Image(); 
iAttack.src = "RizarAttack.png";
var attackdx =20;

function updateFrame(){
	curFrame = ++curFrame % frameCount; 
	srcX = curFrame * width; 
	if (Attack)
		if (left)
			ctx.clearRect(x-attackdx,y,widthA,heightA);
		else
			ctx.clearRect(x,y,widthA,heightA);
	else
		ctx.clearRect(x,y,width,height);
    
	if(!Attack) {
		if(left && x>0){
		    srcY = trackLeft * height; 
			x-=speed; 
		}

		if(right && x<canvasWidth-width){
			srcY = trackRight * height; 
			x+=speed; 
		}

		if (Jump && countJump<=10) {
			if (countJump<5)
				y -= 2*speed;
			else if (countJump>=5 && countJump<10)
				y += 2*speed;
			else if (countJump == 10) {
				countJump = -1;
				Jump = false;
			}
			countJump++;
		}
	}
	
	if (Attack && indexAttack<21){
		srcXA = indexAttack * widthA;
		if (left)
			srcYA = 100;
		else
			srcYA = 0;
		indexAttack++;
	} else {
		Attack = false;
	}	
}

function draw(){
	updateFrame();
	if (!Attack){
		ctx.drawImage(Run,srcX,srcY,width,height,x,y,width,height);
	} else {
		if (right)
			ctx.drawImage(iAttack,srcXA,srcYA,widthA,heightA,x,y,widthA,heightA);
		if (left)
			ctx.drawImage(iAttack,srcXA,srcYA,widthA,heightA,x-attackdx,y,widthA,heightA);
	}	
}

function moveLeft(){
	left = true; 
	right = false; 
}

function moveRight(){
	left = false;
	right = true; 
} 

function moveJump(){
	Jump = true;
}

function moveAttack(){
	Attack = true; 
	indexAttack = 0;
}
/*
function stop(){
  clearInterval(rightchar);
}*/
setInterval(draw,200);