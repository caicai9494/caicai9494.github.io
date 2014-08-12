
function Cor(xCor, yCor){

	this.xCor = xCor;
	this.yCor = yCor;

}

function Canvas(canvasID){
	this.canvasID = canvasID;

	var canvasCtx;
	var c = document.getElementById(this.canvasID);
	canvasCtx = c.getContext("2d");

	this.CWidth = c.width;
	this.CHeight = c.height;

	
	
	//var lineWidth = 5;
	//canvasCtx.beginPath();
	//canvasCtx.arc(100,100,50,0,2*Math.PI);
	//canvasCtx.stroke();
	
	this.FullScreen = function(){
	
		this.CWidth = document.body.clientWidth; //document.width is obsolete
		this.CHeight = document.body.clientHeight;
		
		//var w = $(window).width();
		//var h = $(window).height();
		
		//$("#mycanvas").css("width", w+'px');
		//$("#mycanvas").css("height",h+'px');
	}
	
	//this.FullScreen();
	
	this.Clear = function(){
		//canvasCtx.clearRect(0, 0, this.CWidth, this.CHeight);
		c.width = c.width;
		//this.DrawCor();
	}
	this.DrawCor = function(){


		//console.log(CWidth);
		var Cor1 = new Cor(0, this.CHeight/2);
		var Cor2 = new Cor(this.CWidth, this.CHeight/2);

		var Cor3 = new Cor(this.CWidth/2, 0);
		var Cor4 = new Cor(this.CWidth/2, this.CHeight);

		this.DrawLine(Cor1, Cor2);
		this.DrawLine(Cor3, Cor4);
	}

	this.DrawLine = function(Cor1, Cor2, Color){
		canvasCtx.moveTo(Cor1.xCor, Cor1.yCor);
		canvasCtx.lineTo(Cor2.xCor, Cor2.yCor);
		//canvasCtx.lineWidth = lineWidth;
		canvasCtx.strokeStyle = Color;
		canvasCtx.stroke();
	}

		
	this.DrawCircle = function(Cor,Radius,Color){
		canvasCtx.beginPath();
		canvasCtx.arc(Cor.xCor,Cor.yCor,Radius,0,2*Math.PI);
		canvasCtx.lineWidth = 0;
		canvasCtx.strokeStyle = 'white';
		canvasCtx.stroke();
		canvasCtx.fillStyle = Color;
		canvasCtx.fill();
	}
	
	this.DrawRect = function(Cor, length, width, color){
		canvasCtx.beginPath();
		//canvasCtx.lineWidth = lineWidth;
		canvasCtx.rect(Cor.xCor,Cor.yCor,width,length);
		canvasCtx.strokeStyle = 'white';
		canvasCtx.stroke();
		canvasCtx.fillStyle = color;
		canvasCtx.fill();	
	}

	this.DrawText = function(text,x,y){
		canvasCtx.font = "20px Georgia";
		canvasCtx.fillText(text, x, y);

	}
	
	this.DrawCurve = function(Cor1, Corp, Cor2, Color){
		canvasCtx.beginPath();
		canvasCtx.strokeStyle = Color;
		canvasCtx.lineWidth = 10;
		canvasCtx.moveTo(Cor1.xCor, Cor1.yCor);
		canvasCtx.quadraticCurveTo(Corp.xCor, Corp.yCor, 
									Cor2.xCor, Cor2.yCor);
		canvasCtx.stroke();
	}
	
	this.DrawFunc = function(funobj){
		var xlow = funobj.lowerv;


		while((xlow + funobj.interval) <= funobj.upperv ){
			var cor1 = new Cor(xlow + this.CWidth/2, - funobj.inputFun(xlow) + this.CHeight/2);
			xlow += funobj.interval;
			var cor2 = new Cor(xlow + this.CWidth/2, - funobj.inputFun(xlow) + this.CHeight/2);
			this.DrawLine(cor1, cor2);
		}
	}
}

function Funct(lowerv, upperv, interval){
	this.lowerv = lowerv;
	this.upperv = upperv;
	this.interval = interval;

	this.inputFun = function(xval){
		return 100*Math.sin(xval / 50);
	}

}
/*
	EXAMPLE:
	$(document).ready(

	function(){
		var canvas = new Canvas("mycanvas");
		canvas.CorSetup();

		//var myfunc = new Funct(-2*Math.PI, 2* Math.PI, 1/Math.PI);
		var myfunc = new Funct(-400, 400, 1);
		canvas.DrawFunc(myfunc);
	}

);
*/


 
function randomColor(){
		return  "#" + randInt(0,16).toString(16) + randInt(0,16).toString(16) +
					  randInt(0,16).toString(16) + randInt(0,16).toString(16) + 
					  randInt(0,16).toString(16) + randInt(0,16).toString(16);
}
		
		
		
function randInt(low,high){
		return Math.floor((Math.random() * high) + low);
}

function distance(cor1, cor2){
	return Math.sqrt(Math.pow(cor1.xCor-cor2.xCor,2) + Math.pow(cor1.yCor-cor2.yCor,2));
}

function Circle(x,y,r,canvas){
	this.x = x;
	this.y = y;
	this.r = r;
	
	this.mass = 1000 * (4/3) * Math.Pi * Math.pow(r,3);
	
	this.c = canvas;
	
	this.velocity = 0;
	this.energyLost = 0;
	this.damping = 1;
	this.selected = 0;
}

Circle.prototype.Fall = function(){
	if(this.energyLost === 0)
		this.velocity += 9.8 / 60;
	this.y += this.velocity;		
	if (this.y > 500 - this.r ){
		this.velocity = - this.velocity + this.damping;// + this.damping;
		this.y = 500 - this.r;		
	}	
}

Circle.prototype.Function = function(t){
	return 2 * t;
}

Circle.prototype.Update = function(){
	
	this.Fall();
	this.c.DrawCircle(new Cor(this.x, this.y),
					  this.r, randomColor());
}

//make sure ndim is odd
function System(ndim, a0, canvas){
	this.atoms = [];
	
	this.ndim = ndim;
	
	this.a0 = a0;
	
	this.c = canvas;
		
	this.shift = 0;
	this.release = 0;
	
	for(var i = 0; i < this.ndim; i++)
	{
		this.atoms.push(new Circle(this.c.CWidth/2 - (Math.floor(this.ndim/2) - i) * this.a0 * 50 , 250, 20, canvas));
	}

}

System.prototype.Compulse = function(){

	for(var i = 0; i < this.ndim; i++)
	{
		this.atoms[i].x = this.c.CWidth/2 - (Math.floor(this.ndim/2) - i) * (this.a0+this.shift/100) * 50;
	}

	if(this.release === 1)
	{
		if(this.shift > 0)
			this.shift -= 1;
		else
			this.shift += 1;

		if(Math.abs(this.shift) < 1)
			this.release = 0;
	}

	
}

System.prototype.Update = function(a0Val){

	this.a0 = a0Val;

	//console.log(this.a0);

	this.Compulse();

	
	//for(var i = 0; i < this.ndim - 1; i++)
	//{
	//	this.atomsDistance[i] = (this.atoms[i].x - this.atoms[i+1].x);
	//}
	
	this.c.DrawText('a = ' + parseFloat(this.a0 + this.shift/100).toFixed(2), 100, 100);
	

	
	for(var i = 0; i < this.atoms.length; i++)
	{	
		//this.atoms[i].x = 280 + i * (this.a0 + this.shift) * 50;
		this.c.DrawCircle(new Cor(this.atoms[i].x, this.atoms[i].y),
						  this.atoms[i].r, randomColor());
	}
}

function Board(x,y,canvas){
	this.posX = x;
	this.posY = y;
	
	this.c = canvas;
	this.length = 100;
	this.width = 10;
}
//center of the board
Board.prototype.Update = function(Corp){
	//this.opacity = .05 + Math.random() * .5;
	//this.c.DrawRect(new Cor(this.posX-this.length/2, this.posY-this.width/2),
	//				  this.width, this.length, randomColor());
					  
	//this.c.DrawCurve(new Cor(this.posX-this.length/2, this.posY-this.width/2),
	//				Corp,
	//				new Cor(this.posX+this.length/2, this.posY-this.width/2),
	//				randomColor()
	//				);		

	this.c.DrawCurve(new Cor(this.posX-this.length/2,this.posY-this.width/2),
					Corp,
					new Cor(this.posX+this.length/2,this.posY-this.width/2),
					randomColor());	
}
$(document).ready(
	function(){
		var canvas = new Canvas("mycanvas");
		

		var activated = 0;

		var ini_x = 0;
		
		var myCircles = [];
		
		var entered = 0;	
		var newA0 = 1;
		
		var requestAnimationFrame = window.requestAnimationFrame || 
                                    window.mozRequestAnimationFrame ||
                                    window.webkitRequestAnimationFrame ||
                                    window.msRequestAnimationFrame;
	
        var mySystem = new System(20, 1, canvas);  

		$("#a0form").submit(function(){
			newA0 = Math.floor($("#a0").val());
			$("#a0").val(newA0.toString());
			//mySystem = new System(5, value, canvas);

		});
		$("#mycanvas").on("mousedown",function(event){
			activated = 1;
			ini_x = event.pageX;

		});	
		
		$("#mycanvas").on("mouseup",function(event){
					  
			activated = 0;
			mySystem.release = 1;
		});	
		
		
		$("#mycanvas").on("mousemove",function(event){
			if (activated === 1) {
				mySystem.shift = event.pageX - ini_x;
				if((mySystem.shift/100 + mySystem.a0)*50 - 2 * mySystem.atoms[0].r < 0)
					mySystem.shift = -mySystem.a0 * 100 + 4 * mySystem.atoms[0].r;
			};
			
		});
		
//////////////animation done here!//////////////		
		var repeatOften = function(){			
			canvas.Clear();
			mySystem.Update(newA0);
			requestAnimationFrame(repeatOften);
		}
		


		requestAnimationFrame(repeatOften);
	}
	
	
	
	
);