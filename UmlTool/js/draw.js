var mainCanvas;//新建的canvas画布
var mainCt;//上下文
var MAIN_CANVAS_WIDTH=0;//canvas画布的宽度
var MAIN_CANVAS_HEIGHT=0;//canvas画布的高度
var currentRectX=50;//初始化x坐标
var currentRectY=50;//初始化y坐标
var startDragRectX=0;//开始拖动时矩形x坐标
var startDragRectY=0;//开始拖动时矩形y坐标
var startDragMouseX=0;//开始拖动时鼠标x坐标
var startDragMouseY=0;//开始拖动时鼠标y坐标
var elWidth=50;//矩形宽度
var elHeight=50;//矩形高度
var whichEl = 0;//标志选中了画布上哪个元素
var elCount = 0;//画布上图形数
var isRedraw = false;//是否进行重绘操作
var fontSize = 12;//默认字体大小
var isDrawLine = false;//是否画直线
var imgEl =  null;//临时变量

function imgClass() {
};

var el = new Array();//存放画布上元素的数组

function UmlObject() {
	//图形的text
	this.text = null;
	//图形的坐标
	this.elX = 0;
	this.elY = 0;
	//图形的宽度、高度
	this.width = 100;
	this.height = 50;
	//图形的图片资源
	this.image = null;
	//图形id
	this.id = null;
	//图形类型
	this.type = null;
	//图形可拖拽的点击范围
	this.dw = 0;
	this.dh = 0;
	//图形的其它参数
	this.other = null;
	//this.fun = null; //xml
	//设置图形的坐标
	this.setXY = function(x, y) {
		this.elX = x;
		this.elY = y;
	}
	//设置图形的宽度、高度
	this.setWH = function(width, height) {
		this.width = width;
		this.height = height;
	}
	//设置图形可拖拽区域
	this.setDwh = function(dw, dh) {
		this.dw = dw;
		this.dh = dh;
	}
	//公用方法
	this.drawImage = function() {
		DUI.drawUmlImage(this.id,this.type);
	}
}

function mMove(event) {
	var canvasMouseX=(event.offsetX==undefined) ? getOffset(event).offsetX : event.offsetX ;

	if(!canvasMouseX) {
		canvasMouseX=event.x;
	}
	var canvasMouseY=(event.offsetY==undefined) ? getOffset(event).offsetY : event.offsetY ;
	if(!canvasMouseY) {
		canvasMouseY=event.y;
	}

	imgEl.x2 = canvasMouseX;
	imgel.y2 = canvasMouseY;

	redrawRect();
}

function mDown(event) {
	var canvasMouseX=(event.offsetX==undefined) ? getOffset(event).offsetX : event.offsetX ;
	if(!canvasMouseX) {
		canvasMouseX=event.x;
	}
	var canvasMouseY=(event.offsetX==undefined) ? getOffset(event).offsetY : event.offsetY ;
	if(!canvasMouseY) {
		canvasMouseY=event.y;
	}

	imgEl.x1 = canvasMouseX;
	imgEl.y1 = canvasMouseY;

	$("#uml-canvas").mousemove(mMove(event));

}

function mUp() {
	mainCanvas.onmousedown=canvasMouseDownHandler;
	mainCanvas.onmouseup=canvasMouseUpHandler;
	isDrawLine = false;
	$("uml-canvas").mousemove(null);
}

//在画布上添加图形元素
function addEl(img) {
	//imgClass类继承UmlObject类
	imgClass.prototype = new UmlObject();
	//根据不同类型处理
	if (img.name == "actor") {
		imgEl = new imgClass();
		initCommon(imgEl, img);
		imgEl.image = img;
		imgEl.setWH(40, 54);
	} else if (img.name == "status") {
		imgEl = new imgClass();
		initCommon(imgEl, img);
		imgEl.setWH(100, 40);
	} else if (img.name == "line") {
		imgClass.prototype.x1 = 0;
		imgClass.prototype.y1 = 0;
		imgClass.prototype.x2 = 0;
		imgClass.prototype.y2 = 0;

		imgEl = new imgClass();
		initCommon(imgEl, img);

		mainCanvas.onmousedown = null;
		mainCanvas.onmouseup = null;
		$("#uml-canvas").mouseup(mMove(event));
		$("#uml-canvas").mousedown(mDown(event));

	} else if (img.name == "class") {
		imgClass.prototype.fun = null;
		imgClass.prototype.properties = null;
		imgEl = new imgClass();
		initCommon(imgEl, img);
		imgEl.setWH(100, 50);
		imgEl.other = "<b>Properties</b><br />Private:<input type='text' name='prp' id='prp' /><br />Public:<input type='text' name='pup' id='pup' /><br /><b>Methods</b><br />private:<input type='text' name='prm' id='prm' /><br />Public:<input type='text' name='pum' id='pum' /><br /> ";
		$("#p-other").html(imgEl.other);
	} else if (img.name == "usecase") {
		imgEl = new imgClass();
		initCommon(imgEl, img);
		imgEl.setWH(120, 40);
	} else if (img.name == "start" || img.name == "end") {
		imgEl = new imgClass();
		initCommon(imgEl, img);
		imgEl.setWH(30, 30);
	} else if (img.name == "condition") {
		imgEl = new imgClass();
		initCommon(imgEl, img);
		imgEl.setWH(30, 30);
	} else if (img.name == "text") {
		imgEl = new imgClass();
		initCommon(imgEl, img);
	}
	//向数组添加新图形
	el[elCount] = imgEl;
	//同时图开数量加1
	elCount++;
	//开始绘图
	imgEl.drawImage();

}

//初始化共有参数
function initCommon(o, img) {
	//设置图形坐标
	o.setXY(50, 50);
	//设置图形宽度、高度
	o.setDwh(o.width, o.height);
	//初始化文本
	$("#i-text").attr({
		value : "text"
	});
	o.text = $("#i-text").attr("value");
	//初始化id
	o.id = "el-" + elCount;
	//初始化类型
	o.type = img.name;
}

//删除画布上图形元素
function removeEl() {
	var e = el[whichEl];
	mainCt.clearRect(e.elX - 1, e.elY - 1, e.dw + 2, e.dh + 2);
	el[whichEl].drawImage = function() {
	};
}

//放大画布上的图形元素
function zoomIn() {
	var arg = 10;
	if (el[whichEl].width <= 10 || el[whichEl].height <= 10) {
		alert("图片不能再缩放！");
	} else {
		mainCt.clearRect(el[whichEl].elX, el[whichEl].elY, el[whichEl].dw, el[whichEl].dh);
		el[whichEl].width -= arg;
		el[whichEl].height -= el[whichEl].height * arg / (el[whichEl].width + arg);
	}
	DUI.drawUmlImage(el[whichEl].id, el[whichEl].type);
}

//缩小画布上的图形元素
function zoomOut() {
	var arg = 10;
	if (el[whichEl].width >= 200 || el[whichEl].height >= 150) {
		alert("图片不能再缩放！");
	} else {
		mainCt.clearRect(el[whichEl].elX, el[whichEl].elY, el[whichEl].dw, el[whichEl].dh);
		el[whichEl].width += arg;
		el[whichEl].height *= el[whichEl].width / (el[whichEl].width - arg);
	}
	DUI.drawUmlImage(el[whichEl].id, el[whichEl].type);
}

function redrawRect() {

	mainCt.clearRect(0,0,MAIN_CANVAS_WIDTH,MAIN_CANVAS_HEIGHT);//清除画布
	if (el.length > 0) {
		for (i = 0; i < el.length; i ++) {
			if (i == whichEl) {
				//如果是选中图形，则按新位置重新绘图
				el[i].setXY(currentRectX, currentRectY);
				el[i].drawImage();
			} else
				//其它图形按原有位置绘图
				el[i].drawImage();
		}
	}

	mainCt.save();
}