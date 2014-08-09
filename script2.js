
function Cor(xCor, yCor){

	this.xCor = xCor;
	this.yCor = yCor;

}

function Canvas(canvasID){
	this.canvasID = canvasID;

	var canvasCtx;
	var c = document.getElementById(this.canvasID);
	canvasCtx = c.getContext("2d");

	this.CWidth;
	this.CHeight;

	
	
	var lineWidth = 5;
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
		canvasCtx.lineWidth = lineWidth;
		canvasCtx.strokeStyle = Color;
		canvasCtx.stroke();
	}

		
	this.DrawCircle = function(Cor,Radius,Color){
		canvasCtx.beginPath();
		canvasCtx.arc(Cor.xCor,Cor.yCor,Radius,0,2*Math.PI);
		canvasCtx.stroke();
		canvasCtx.fillStyle = Color;
		canvasCtx.strokeStyle = 'white';
		canvasCtx.fill();
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
	return Math.sqrt(Math.pow(cor1.x-cor2.x,2) + Math.pow(cor1.y-cor2.y,2));
}

function Circle(x,y,r,canvas){
	this.x = x;
	this.y = y;
	this.r = r;
	
	this.c = canvas;
	
	this.velocity = 0;
	this.energyLost = 0;
	this.damping = 1;
}


Circle.prototype.Update = function(){
	;
	//this.c.Clear();
	this.c.DrawCircle(new Cor(this.x, this.y),
					  this.r, randomColor());
	if(this.energyLost === 0)
		this.velocity += 9.8 / 60;
	this.y += this.velocity;	
		
	if (this.y > 500 - this.r ){
		this.velocity = - this.velocity + this.damping;// + this.damping;
		this.y = 500 - this.r;		
	}	
}

$(document).ready(
	function(){
		var canvas = new Canvas("mycanvas");
		
		var activated = 0;
		var ini_x;
		var ini_y;
		
		//canvas.FullScreen();
		
		var requestAnimationFrame = window.requestAnimationFrame || 
                                    window.mozRequestAnimationFrame ||
                                    window.webkitRequestAnimationFrame ||
                                    window.msRequestAnimationFrame;
	
		var myCircles = [];
		
		$("#mycanvas").on("click",function(event){
		/*
			if(typeof myCircles[0] != 'undefined'){
				var mouse = new Cor(event.pageX,event.pageY);
				//console.log(myCircles.length);
			
				for(var i = 0; i < myCircles.length; i++){
					if (distance(mouse, new Cor(myCircles[i].x,myCircles[i].y)) < myCircles[i].r)
						myCircles[i].velocity += Math.sign(myCircles[i].velocity) * 5;
					
					else
						myCircles.push(new Circle(event.pageX,event.pageY, randInt(0,20), canvas));			
				}
			
			}
			else
			*/
		      myCircles.push(new Circle(event.pageX,event.pageY,randInt(0,20), canvas));	
		});	
		
		var repeatOften = function(){
			//canvas.DrawCircle(new Cor(randInt(0,500), randInt(0,500), 
			//				  randInt(0,10), randomColor()));
			
			
			
			canvas.Clear();
			
			for(var i = 0; i < myCircles.length; i++)
				myCircles[i].Update();
			/*
			canvas.DrawCircle(new Cor(myCircle.x, myCircle.y), 
								myCircle.r, randomColor());
			if(touched === 0)
				velocity += 9.8 / 60;
			myCircle.y += velocity;	
			if (myCircle.y >= canvas.CHeight - 2 * myCircle.r){
				velocity = - velocity + damping;
				if (velocity > 0){
				damping = 0.5;
				touched = 1;
				velocity = 0;
				}
				//damping = -damping;
			}
			else if(myCircle.y <= 5){
				velocity= - velocity - damping;
			}
		
			draw(new Circle(100,100,10));
			*/

			requestAnimationFrame(repeatOften);
			//console.log(count+=1);
			
		}
		
		requestAnimationFrame(repeatOften);
		
		
		
		
                
		

		
		
		$(window).on('resize',function(){
			canvas.FullScreen();
		});
		

		
		$("#blue").on("click", function(){
			canvas.Clear();
		});
	}
	
	
	
	
);