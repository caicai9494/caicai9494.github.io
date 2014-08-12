
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

	var lineWidth = 5;
	//canvasCtx.beginPath();
	//canvasCtx.arc(100,100,50,0,2*Math.PI);
	//canvasCtx.stroke();
	
	this.FullScreen = function(){
	
		c.width = document.body.clientWidth; //document.width is obsolete
		c.height = document.body.clientHeight;
		
		//var w = $(window).width();
		//var h = $(window).height();
		
		//$("#mycanvas").css("width", w+'px');
		//$("#mycanvas").css("height",h+'px');
	}
	
	this.Clear = function(){
		//canvasCtx.clearRect(0, 0, this.width, this.CHeight);
		c.width = c.width;
		this.DrawCor();
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
$(document).ready(

	function(){
		var canvas = new Canvas("mycanvas");
		
		canvas.FullScreen();
		//$("#mycanvas")[0].webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT); //Chrome
		//$("#mycanvas")[0].mozRequestFullScreen(); //Firefox
		
		//canvas.DrawCor();

		//var myfunc = new Funct(-2*Math.PI, 2* Math.PI, 1/Math.PI);
		//var myfunc = new Funct(-400, 400, 1);
		//canvas.DrawFunc(myfunc);
		
		//var count = 1;
		
		//canvas.DrawCircle(new Cor(200,400),10, 'red');
		//var e = jQuery.Event("click");
		
		var test = function(){
			canvas.Clear();

			var myfunc = new Funct(-400, 400, 1+10 * count);
			canvas.DrawFunc(myfunc);
			count++;
		}
		
		var activated = 0;
		var ini_x;
		var ini_y;

		$("#mycanvas").on("mousedown",function(event){
			activated = 1;
			ini_x = event.pageX;
			ini_y = event.pageY;				
		});
		
		$("#mycanvas").on("mousemove",function(event){

			if(activated)
			{
				canvas.DrawLine(	new Cor(ini_x,ini_y),
									new Cor(event.pageX,event.pageY),
								'red' );
				ini_x = event.pageX;
				ini_y = event.pageY;
			}

		});
		
		$("#mycanvas").on("mouseup",function(event){
			activated = 0;
		});
		
		$(window).on('resize',function(){
			canvas.FullScreen();
		});

	}
	
	
	
	
);