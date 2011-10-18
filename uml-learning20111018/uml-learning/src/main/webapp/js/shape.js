
//定义uml图形对象
function UmlObject(){};
UmlObject.prototype = {
	text : null,
	elX : 50,
	elY : 50,
	x1 : 0,
	y1 : 0,
	x2 : 0,
	y2 : 0,
	width : 100,
	height : 50,
	image : null,
	id : null,
	type : null,
	dw : this.width,
	dh : this.height,
	other : null,
	setXY : function(x, y){
		this.elX = x;
		this.elY = y;
	},
	setXY1 : function(x, y){
		this.x1 = x;
		this.y1 = y;
	},
	setXY2 : function(x, y){
		this.x2 = x;
		this.y2 = y;
	},
	setWH : function(width, height) {
		this.width = width;
		this.height = height;
	},
	//设置图形可拖拽区域
	setDwh : function(dw, dh) {
		this.dw = dw;
		this.dh = dh;
	},
	//公共方法
	drawImage : function(ctx) {
		console.log('call drawImage() function.');
	}
};

//
function actorCls(){};
actorCls.prototype = new UmlObject();
actorCls.prototype.drawImage = function(mainCt){
	var tx, ty;
	this.setWH(33, 51);
	tx = this.elX + this.width / 2;
	ty = this.elY + this.height + 10;
	var r = 10;
	DCI.DrawStrokeCircle(mainCt, r, this.elX, this.elY, "#000000");
	DCI.DrawLine(mainCt,this.elX + r, this.elY + 2 * r, this.elX + r, this.elY + 2 *r + 15, 1);
	for (var i = 0; i <= 15; i = i + 15) {
		DCI.DrawLine(mainCt,this.elX, this.elY + 3 * r + i, this.elX + r, this.elY + 2 * r + i, 1);
		DCI.DrawLine(mainCt, this.elX + r, this.elY + 2 * r + i, this.elX + 2 * r, this.elY + 3 * r + i, 1);
	}
	//DCI.DrawText(mainCt, fontSize, this.text, tx, ty, this.width, "center");
//	this.setDwh(this.width, ty - this.elY + fontSize);
	this.setDwh(this.width, 2 * r + 18);
};
//
function lineCls(){};
lineCls.prototype = new UmlObject();
lineCls.prototype.drawImage = function(mainCt){
	if ( this.x1 < this.x2 && this.y1 > this.y2 || this.x2 < this.x1 && this.y2 > this.y1){
		this.x1 = this.elX;
		this.y1 = this.elY + this.height;
		this.x2 = this.elX + this.width;
		this.y2 = this.elY;
	} else if ( this.x1 < this.x2 && this.y1 < this.y2 || this.x2 > this.x1 && this.y2 > this.y1){
		this.x1 = this.elX;
		this.y1 = this.elY;
		this.x2 = this.elX + this.width;
		this.y2 = this.elY + this.height;
	}

	DCI.DrawLine(mainCt, this.x1, this.y1, this.x2, this.y2, 1);
};
//
function statusCls(){};
statusCls.prototype = new UmlObject();
statusCls.prototype.drawImage = function(mainCt){
	var tx, ty;
	this.setWH(100, 40);
	tx = this.elX + this.width / 2;
	ty = this.elY + this.height / 2;
	DCI.DrawRoundRect(mainCt, this.width, this.height, this.elX, this.elY);
	//DCI.DrawText(mainCt, fontSize, this.text, tx , ty, this.width, "center");
	this.setDwh(this.width, this.height);
};

//
function classCls(){};
classCls.prototype = new UmlObject();
classCls.prototype.drawImage = function(mainCt){
	var tx, ty;
	this.setWH(100, 50);
	tx = this.elX + this.width / 2;
	ty = this.elY + this.height + 10;
	DCI.DrawRect(mainCt, this.width, this.height, this.elX, this.elY);
	//DCI.DrawText(mainCt, fontSize, this.text, tx, ty, this.width, "center");
	DCI.DrawRect(mainCt, this.width, this.height, this.elX, this.elY + this.height, "center");
	//DCI.DrawText(mainCt, fontSize, this.text, tx, ty + this.height, this.width, "center");
//	this.setDwh(this.width, 2 * (ty - this.elY + fontSize));
	this.setDwh(this.width, 2 * (ty - this.elY));
};

//
function usecaseCls(){};
usecaseCls.prototype = new UmlObject();
usecaseCls.type = 'usercase';
usecaseCls.prototype.drawImage = function(mainCt){
	var tx, ty;
	this.setWH(120, 40);
	tx = this.elX + this.width / 2;
	ty = this.elY + this.height / 2;
	DCI.DrawEllipse(mainCt, this.width, this.height, this.elX, this.elY);
	//DCI.DrawText(mainCt, fontSize, this.text, tx, ty, this.width, "center");
	this.setDwh(this.width, this.height);
};

//
function startCls(){};
startCls.prototype = new UmlObject();
startCls.prototype.drawImage = function(mainCt){
	this.setWH(20, 20);
	DCI.DrawFillCircle(mainCt, this.width / 2, this.elX, this.elY, "#000000", "#000000");
	this.setDwh(this.width, this.height);
};

//
function endCls(){};
endCls.prototype = new UmlObject();
endCls.prototype.drawImage = function(mainCt){
	this.setWH(20, 20);
	DCI.DrawFillCircle(mainCt, this.width / 2, this.elX, this.elY, "#ffffff", "#000000");
	DCI.DrawFillCircle(mainCt, this.width / 4, this.elX + this.width / 4 , this.elY + this.height / 4, "#000000", "#000000");
	this.setDwh(this.width, this.height);
};

//
function conditionCls(){};
conditionCls.prototype = new UmlObject();
conditionCls.prototype.drawImage = function(mainCt){
	this.setWH(30, 30);
	DCI.DrawDiamond(mainCt, this.elX, this.elY, this.width, this.height);
	this.setDwh(this.width, this.height);
};

//
function textCls(){};
textCls.prototype = new UmlObject();
textCls.prototype.drawImage = function(mainCt){
	var eid = parseInt(this.id.substring(3));
	mainCt.font = fontSize + "pt Arial";
	mainCt.textBaseline = "top";
	mainCt.textAlign = "left";
	mainCt.fillText(this.text, this.elX, this.elY, fontSize * this.text.length);
	this.setWH(fontSize * this.text.length, fontSize + 5);
	this.setDwh(this.width, this.height);
};

//
function simpleCls(){};
simpleCls.prototype = new UmlObject();
simpleCls.prototype.drawImage = function(mainCt){
	var tx, ty;
	this.setWH(100, 30);
	tx = this.elX + this.width / 2;
	ty = this.elY + this.height / 2;
	DCI.DrawRect(mainCt, this.width, this.height, this.elX, this.elY);
	//DCI.DrawText(mainCt, fontSize, this.text, tx, ty, 50, "center");
	this.setDwh(this.width, this.height);
};
//
function pkgCls(){};
pkgCls.prototype = new UmlObject();
pkgCls.prototype.drawImage = function(mainCt){
	var tx, ty;
	this.setWH(150, 80);
	tx = this.elX + 5;
	ty = this.elY + 10;
	this.text = "EmptyPackage";
	DCI.DrawRect(mainCt,this.width * 2 / 3, this.height / 4, this.elX, this.elY);
	DCI.DrawRect(mainCt,this.width, this.height * 3 / 4, this.elX, this.elY + this.height / 4);
	//DCI.DrawText(mainCt, fontSize - 2, this.text, tx, ty, 50, "left");
	this.setDwh(this.width + 100, this.height + 30);
};

//
function noteCls(){};
noteCls.prototype = new UmlObject();
noteCls.prototype.drawImage = function(mainCt){
	var tx, ty;
	this.setWH(50, 50);
	tx = this.elX + this.width/3;
	ty = this.elY + this.height/5;
	DCI.DrawLine(mainCt,this.elX, this.elY, this.elX, this.elY+this.height*2);
	DCI.DrawLine(mainCt,this.elX, this.elY+this.height*2, this.elX+this.width*3, this.elY+this.height*2);
	DCI.DrawLine(mainCt,this.elX+this.width*3, this.elY+this.height*2, this.elX+this.width*3, this.elY+this.height*2/5);
	DCI.DrawLine(mainCt,this.elX+this.width*3, this.elY+this.height*2/5, this.elX+this.width*13/5, this.elY+this.height/this.height);
	DCI.DrawLine(mainCt,this.elX+this.width*13/5, this.elY+this.height/this.height, this.elX, this.elY);
	DCI.DrawLine(mainCt,this.elX+this.width*13/5, this.elY+this.height/this.height, this.elX+this.width*13/5, this.elY+this.height/5*2);
	DCI.DrawLine(mainCt,this.elX+this.width*13/5, this.elY+this.height/5*2, this.elX+this.width*3, this.elY+this.height/5*2);
	//DCI.DrawText(mainCt, fontSize, this.text, tx, ty, 50, "left");
	this.setDwh(this.width * 3, this.height * 2);
};

//
function sendCls(){};
sendCls.prototype = new UmlObject();
sendCls.prototype.drawImage = function(mainCt){
	var tx, ty;
	this.setWH(50, 50);
	tx = this.elX;
	ty = this.elY + fontSize+3;
	DCI.DrawLine(mainCt,this.elX, this.elY, this.elX, this.elY+this.height*3/5);
	DCI.DrawLine(mainCt,this.elX, this.elY+this.height*3/5, this.elX+this.width, this.elY+this.height*3/5);
	DCI.DrawLine(mainCt,this.elX+this.width, this.elY+this.height*3/5, this.elX+this.width*13/10, this.elY+this.height*3/10);
	DCI.DrawLine(mainCt,this.elX+this.width*13/10, this.elY+this.height*3/10, this.elX+this.width, this.elY);
	DCI.DrawLine(mainCt,this.elX+this.width, this.elY, this.elX, this.elY);
	//DCI.DrawText(mainCt, fontSize, this.text, tx, ty, 50, "left");
	this.setDwh(this.width+15,this.height-20);
};
//
function receiveCls(){};
receiveCls.prototype = new UmlObject();
receiveCls.prototype.drawImage = function(mainCt){
	var tx, ty;
	this.setWH(50, 50);
	tx = this.elX;
	ty = this.elY + fontSize+3;
	DCI.DrawLine(mainCt,this.elX, this.elY, this.elX+this.width*3/10, this.elY+this.height*3/10);
	DCI.DrawLine(mainCt,this.elX+this.width*3/10, this.elY+this.height*3/10, this.elX, this.elY+this.height*3/5);
	DCI.DrawLine(mainCt,this.elX, this.elY+this.height*3/5, this.elX+this.width*6/5, this.elY+this.height*3/5);
	DCI.DrawLine(mainCt,this.elX+this.width*6/5, this.elY+this.height*3/5, this.elX+this.width*6/5, this.elY);
	DCI.DrawLine(mainCt,this.elX+this.width*6/5, this.elY, this.elX, this.elY);
	//DCI.DrawText(mainCt, fontSize, this.text, tx, ty, 50, "left");
	this.setDwh(this.width+15,this.height -20);
};
//
function compPackCls(){};
compPackCls.prototype = new UmlObject();
compPackCls.prototype.drawImage = function(mainCt){
	var tx, ty;
	this.setWH(150, 80);
	tx = this.elX + 5;
	ty = this.elY + 10;
	this.text = "EmptyPackage";
	DCI.DrawRect(mainCt,this.width * 2 / 3, this.height / 4, this.elX, this.elY);
	DCI.DrawRect(mainCt,this.width, this.height * 3 / 4, this.elX, this.elY + this.height / 4);
	//DCI.DrawText(mainCt, fontSize - 2, this.text, tx, ty, 50, "left");
	//DCI.DrawText(mainCt, fontSize - 2, this.text, tx, ty + fontSize * 2, 50, "left");
	//DCI.DrawText(mainCt, fontSize - 2, this.text, tx, ty + fontSize * 4, 50, "left");
	this.setDwh(this.width + 100,this.height + 30);
};
//
function complexCls(){};
complexCls.prototype = new UmlObject();
complexCls.prototype.drawImage = function(mainCt){
	var tx, ty;
	this.setWH(50, 50);
	tx = this.elX + this.width / 2;
	ty = this.elY + this.height + fontSize;
	DCI.DrawLine(mainCt,this.elX, this.elY, this.elX , this.elY+80);
	DCI.DrawLine(mainCt,this.elX, this.elY+80, this.elX + 150 , this.elY+80);
	DCI.DrawLine(mainCt,this.elX+150, this.elY+80, this.elX +150, this.elY);
	DCI.DrawLine(mainCt,this.elX+150, this.elY, this.elX, this.elY);
	DCI.DrawLine(mainCt,this.elX, this.elY+20, this.elX+150, this.elY+20);
	//DCI.DrawText(mainCt, fontSize, this.text, tx, ty-52, 50, "middle");
	this.setDwh(this.width+100,this.height +30);
};

//
function timeCls(){};
timeCls.prototype = new UmlObject();
timeCls.prototype.drawImage = function(mainCt){
	this.setWH (40,80);
	var tw = this.width;
	var th = Math.floor(Math.sqrt(Math.pow(tw,2)-Math.pow(tw/2,2)));
	DCI.DrawStrokeTriangle(mainCt,this.elX,this.elY, this.elX+tw,this.elY,this.elX+tw/2,this.elY+th);
	DCI.DrawStrokeTriangle(mainCt,this.elX,this.elY+2*th,this.elX+tw/2,this.elY+th,this.elX+tw,this.elY+2*th);
	this.setDwh(tw,2*th);
};

//
function vrectCls(){};
vrectCls.prototype = new UmlObject();
vrectCls.prototype.drawImage = function(mainCt){
	this.setWH(6, 70);
	DCI.DrawFillRect(mainCt, this.width, this.height, this.elX, this.elY);
	this.setDwh(this.width,this.height);
};

//
function hrectCls(){};
hrectCls.prototype = new UmlObject();
hrectCls.prototype.drawImage = function(mainCt){
	this.setWH(70, 6);
	DCI.DrawFillRect(mainCt, this.width, this.height, this.elX, this.elY);
	this.setDwh(this.width,this.height);
};

//
function bvrectCls(){};
bvrectCls.prototype = new UmlObject();
bvrectCls.prototype.drawImage = function(mainCt){
	this.setWH(15, 70);
	DCI.DrawRect(mainCt, this.width, this.height, this.elX, this.elY);
	this.setDwh(this.width, this.height);
};

//
function drectCls(){};
drectCls.prototype = new UmlObject();
drectCls.prototype.drawImage = function(mainCt){
	var tx, ty;
	this.setWH(150, 100);
	tx = this.elX + 5;
	ty = this.elY + 10;
	this.text = "EmptyPackage";
	DCI.DrawRect(mainCt,this.width * 2 / 3, this.height / 4, this.elX, this.elY);
	DCI.DrawRect(mainCt,this.width, this.height * 3 / 4, this.elX, this.elY + this.height / 4);
	//DCI.DrawText(mainCt, fontSize - 2, this.text, tx, ty, 50, "left");
	//DCI.DrawText(mainCt, fontSize - 2, this.text, tx, ty + fontSize * 3, 50, "left");
	//DCI.DrawText(mainCt, fontSize - 2, this.text, tx, ty + fontSize * 5, 50, "left");
	this.setDwh(this.width + 100,this.height + 30);
};
//
function ddrectCls(){};
ddrectCls.prototype = new UmlObject();
ddrectCls.prototype.drawImage = function(mainCt){
	DCI.DrawRect(mainCt,this.elX+30,25,this.elX,this.elY);
	DCI.DrawRect(mainCt,this.elX+100,this.elY+30,this.elX,this.elY+25);
	DCI.DrawRect(mainCt,38,16,(this.elX+100)/2,this.elY+40);
	DCI.DrawRect(mainCt,this.elX+20,30,(this.elX+100)/2,this.elY+56);
};
//
function interactionCls(){};
interactionCls.prototype = new UmlObject();
interactionCls.prototype.drawImage = function(mainCt){
	this.setWH(100, 50);
	DCI.DrawRect(mainCt,this.width, this.height,this.elX,this.elY);
	DCI.DrawLine(mainCt,this.elX + this.width * 4 / 5, this.elY, this.elX + this.width * 4 / 5, this.elY + this.height * 1 / 5);
	DCI.DrawLine(mainCt, this.elX, this.elY + this.height * 2 / 5, this.elX + this.width * 3 / 5, this.elY + this.height * 2 / 5 );
	DCI.DrawLine(mainCt, this.elX + this.width * 4 / 5, this.elY + this.height * 1 / 5, this.elX + this.width * 3 / 5, this.elY + this.height * 2 / 5);
	this.setDwh(this.width, this.height);
};
//
function strokeLineCls(){};
strokeLineCls.prototype = new UmlObject();
strokeLineCls.prototype.drawImage = function(mainCt){
	this.setWH(20, 20);
	DCI.DrawStrokeCircle(mainCt, this.width / 2, this.elX, this.elY, '#000000');
	DCI.DrawLine(mainCt, this.elX + this.width / 4, this.elY + this.height / 2, this.elX + this.width * 3 / 4, this.elY + this.height / 2, 1);
	DCI.DrawLine(mainCt, this.elX + this.width / 2, this.elY + this.height / 4, this.elX + this.width / 2, this.elY + this.height * 3 / 4, 1);
	DCI.DrawLine(mainCt, this.elX + this.width / 2, this.elY + this.height, this.elX + this.width / 2, this.elY + 4 * this.height);
	this.setDwh(this.width, this.height * 4);
};
//
function interfaceCls(){};
interfaceCls.prototype = new UmlObject();
interfaceCls.prototype.drawImage = function(mainCt){
	this.setWH(20, 20);
	DCI.DrawStrokeCircle(mainCt, this.width / 2, this.elX, this.elY, "#000000");
	DCI.DrawLine(mainCt, this.elX - this.width, this.elY + this.height * 3 / 2, this.elX + this.width * 2, this.elY + this.height * 3 / 2, 1);
	this.setDwh(3 * this.width, 2 * this.height);
};
