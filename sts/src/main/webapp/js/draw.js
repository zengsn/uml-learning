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
var elWidth=50;//drag矩形宽度
var elHeight=50;//drag矩形高度
var whichEl = 0;//标志选中了画布上哪个元素
var elCount = 0;//画布上图形数
var isRedraw = false;//是否进行重绘操作
var fontSize = 12;//默认字体大小
var isDrawLine = false;//是否画直线
var imgEl =  null;//临时变量

//function imgClass() {
//};

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
	//根据不同类型处理
	if (img.name == "actor") {
		function actorCls() {};
		actorCls.prototype = new UmlObject();
		el[elCount] = new actorCls();
		el[elCount].image = img;
		el[elCount].setWH(40, 54);
		initCommon(el[elCount], img);
	} else if (img.name == "status") {
		function statusCls(){};
		statusCls.prototype = new UmlObject;
		el[elCount] = new statusCls();
		initCommon(el[elCount], img);
		el[elCount].setWH(100, 40);
	} else if (img.name == "line") {
		// imgClass.prototype.x1 = 0;
		// imgClass.prototype.y1 = 0;
		// imgClass.prototype.x2 = 0;
		// imgClass.prototype.y2 = 0;
// 
		// imgEl = new imgClass();
		// initCommon(imgEl, img);
// 
		// mainCanvas.onmousedown = null;
		// mainCanvas.onmouseup = null;
		// $("#uml-canvas").mouseup(mMove(event));
		// $("#uml-canvas").mousedown(mDown(event));

	} else if (img.name == "class") {
		function classCls(){};
		classCls.prototype = new UmlObject;
		classCls.prototype.fun = null;
		classCls.prototype.properties = null;
		el[elCount] = new classCls();
		initCommon(el[elCount], img);
		el[elCount].setWH(100, 50);
		el[elCount].other = "<b>Properties</b><br />Private:<input type='text' name='prp' id='prp' /><br />Public:<input type='text' name='pup' id='pup' /><br /><b>Methods</b><br />private:<input type='text' name='prm' id='prm' /><br />Public:<input type='text' name='pum' id='pum' /><br /> ";
		$("#p-other").html(el[elCount].other);
	} else if (img.name == "usecase") {
		function usecaseCls(){};
		usecaseCls.prototype = new UmlObject();
		el[elCount] = new usecaseCls();
		initCommon(el[elCount], img);
		el[elCount].setWH(120, 40);
	} else if (img.name == "start" || img.name == "end") {
		function seCls(){};
		seCls.prototype = new UmlObject();
		el[elCount] = new seCls();
		initCommon(el[elCount], img);
		el[elCount].setWH(20, 20);
	} else if (img.name == "condition") {
		function conditionCls(){};
		conditionCls.prototype = new UmlObject();
		el[elCount] = new conditionCls();
		initCommon(el[elCount], img);
		el[elCount].setWH(30, 30);
	} else if (img.name == "text") {
		function textCls(){};
		textCls.prototype = new UmlObject();
		el[elCount] = new textCls();
		initCommon(el[elCount], img);
	} else if (img.name == "square"){//以上由晓彬完成
		function simpleCls(){};
		simpleCls.prototype = new UmlObject();
		el[elCount] = new simpleCls();
		initCommon(el[elCount], img);
		el[elCount].setWH(100, 30);
	} else if (img.name == "package") {
		function pkgCls(){};
		pkgCls.prototype = new UmlObject();
		el[elCount] = new pkgCls();
		initCommon(el[elCount], img);
		el[elCount].setWH(150, 80);
	} else if (img.name == "Note") {
		function noteCls(){};
		noteCls.prototype = new UmlObject();
		el[elCount] = new noteCls();
		initCommon(el[elCount], img);
		el[elCount].setWH(50, 50);
	} else if (img.name == "SendSignal") {
		function sendCls(){};
		sendCls.prototype = new UmlObject();
		el[elCount] = new sendCls();
		initCommon(el[elCount], img);
		el[elCount].setWH(50, 50);
	} else if (img.name == "RecevieSignal") {
		function receiveCls(){};
		receiveCls.prototype = new UmlObject();
		el[elCount] = new receiveCls();
		initCommon(el[elCount], img);
		el[elCount].setWH(50, 50);
	} else if (img.name == "complexClass") {
		function complexCls(){};
		complexCls.prototype = new UmlObject();
		el[elCount] = new complexCls();
		initCommon(el[elCount], img);
		el[elCount].setWH(50, 50);
	} else if (img.name == "compPack") {
		function compPackCls(){};
		compPackCls.prototype = new UmlObject();
		el[elCount] = new compPackCls();
		initCommon(el[elCount], img);
		el[elCount].setWH(150, 80);
	} else if (img.name == "time"){
		function timeCls(){};
		timeCls.prototype = new UmlObject();
		el[elCount] = new timeCls();
		el[elCount].setWH (40,80);
		initCommon(el[elCount], img);
        
	}else if (img.name == "vrect"){
		function vrectCls(){};
		vrectCls.prototype = new UmlObject();
		el[elCount] = new vrectCls();
		el[elCount].setWH(6, 70);
		initCommon(el[elCount], img);
	
	}else if (img.name == "hrect"){
		function hrectCls(){};
		hrectCls.prototype = new UmlObject();
		el[elCount] = new hrectCls();
		el[elCount].setWH(70, 6);
		initCommon(el[elCount], img);

	}else if (img.name == "bvrect"){
		function bvrectCls(){};
		bvrectCls.prototype = new UmlObject();
		el[elCount] = new bvrectCls();
		el[elCount].setWH(15, 70);
		initCommon(el[elCount], img);

	}else if (img.name == "drect"){
		function drectCls(){};
		drectCls.prototype = new UmlObject();
		el[elCount] = new drectCls();
		el[elCount].setWH(150, 100);
		initCommon(el[elCount], img);

	}else if (img.name == "ddrect"){
		function ddrectCls(){};
		ddrectCls.prototype = new UmlObject();
		el[elCount] = new ddrectCls();
		initCommon(el[elCount], img);

	}else if (img.name == "interaction"){
		function interactionCLs(){};
		interactionCLs.prototype = new UmlObject();
		el[elCount] = new interactionCLs();
		el[elCount].setWH(100, 50);
		initCommon(el[elCount], img);

	}else if (img.name == "strokeLine"){
		function strokeLineCls(){};
		strokeLineCls.prototype = new UmlObject();
		el[elCount] = new strokeLineCls();
		el[elCount].setWH(20, 20);
		initCommon(el[elCount], img);
	}else if (img.name == "interface"){
		function interfaceCls(){};
		interfaceCls.prototype = new UmlObject();
		el[elCount] = new interfaceCls();
		el[elCount].setWH(20, 20);
		initCommon(el[elCount], img);
		
	} else {}
	//向数组添加新图形
	//el[elCount] = imgEl;
	
	//开始绘图
	el[elCount].drawImage();
	//同时图开数量加1
	elCount++;
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
	//o.text = $("#i-text").attr("value");
	o.text = img.name;
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
		if (el.length > 0){	
		if (el[whichEl].width <= 10 || el[whichEl].height <= 10) {
			alert("图片不能再缩放！");
		} else {
			mainCt.clearRect(el[whichEl].elX - 1, el[whichEl].elY - 1, el[whichEl].dw + 2, el[whichEl].dh + 10);
			el[whichEl].width -= arg;
			el[whichEl].height -= el[whichEl].height * arg / (el[whichEl].width + arg);
			el[whichEl].setDwh(el[whichEl].width, el[whichEl].height);
		}
		DUI.drawUmlImage(el[whichEl].id, el[whichEl].type);
	} else {}
}

//缩小画布上的图形元素
function zoomOut() {
	var arg = 10;
	if (el.length > 0){
		if (el[whichEl].width >= 200 || el[whichEl].height >= 150) {
			alert("图片不能再缩放！");
		} else {
			mainCt.clearRect(el[whichEl].elX - 1, el[whichEl].elY - 1, el[whichEl].dw + 2, el[whichEl].dh + 15);
			el[whichEl].width += arg;
			el[whichEl].height *= el[whichEl].width / (el[whichEl].width - arg);
			el[whichEl].setDwh(el[whichEl].width, el[whichEl].height);
		}
		DUI.drawUmlImage(el[whichEl].id, el[whichEl].type);
	} else {}
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



/*
$(window).ready( function() {
	//获取canvas的容器，以便动态控制canvas的宽度及高度
	var container = document.getElementById("uml-canvas");
	//获取canvas
	mainCanvas = document.getElementById("myCanvas");
	//获取canvas容器的宽度及高度
	MAIN_CANVAS_WIDTH = container.offsetWidth;
	MAIN_CANVAS_HEIGHT = container.offsetHeight;
	//设置canvas的高度及宽度
	mainCanvas.width=MAIN_CANVAS_WIDTH;
	mainCanvas.height=MAIN_CANVAS_HEIGHT;
	//初始化canvas的鼠标事件
	mainCanvas.onmousedown=canvasMouseDownHandler;
	mainCanvas.onmouseup=canvasMouseUpHandler;

	//获取上下文
	mainCt=mainCanvas.getContext("2d");
	//初始化监听事件
	AddEventHandlers();
	redrawRect();//绘制矩形
});
*/
function initCanvas(){
	//获取canvas的容器，以便动态控制canvas的宽度及高度
	var container = document.getElementById("uml-canvas");
	//获取canvas
	mainCanvas = document.getElementById("myCanvas");
	//获取canvas容器的宽度及高度
	MAIN_CANVAS_WIDTH = container.offsetWidth;
	MAIN_CANVAS_HEIGHT = container.offsetHeight;
	//设置canvas的高度及宽度
	mainCanvas.width=MAIN_CANVAS_WIDTH;
	mainCanvas.height=MAIN_CANVAS_HEIGHT;
	//初始化canvas的鼠标事件
	mainCanvas.onmousedown=canvasMouseDownHandler;
	mainCanvas.onmouseup=canvasMouseUpHandler;

	//获取上下文
	mainCt=mainCanvas.getContext("2d");
	//初始化监听事件
	AddEventHandlers();
	redrawRect();//绘制矩形
}
//添加监听事件
function AddEventHandlers(){
	$("#i-text").keyup(function(){
		el[whichEl].text = $("#i-text").attr("value");
		$("#uml-status").html("当前选择的是：" + el[whichEl].text); 
		redrawRect();
	});
	
	$("#i-text").focusout(function(){
		
	});
	//生成xml
	$("#i-output").click(function(){
		var xmlStr = "";
		for (var i = 0; i < el.length; i++){
			if (el[i].drawImage != null){
				e = el[i];
				xmlStr += "<uml>\n<id>" + e.id + "</id>\n<type>" + e.type + "</type>\n<x>" + e.elX + "</x>\n<y>" + e.elY + "</y>\n<width>" + e.width + "</width>\n<height>" + e.height + "</height>\n<dw>" + e.dw + "</dw>\n<dh>" + e.dh + "</dh>\n<other>" + e.other + "</other>\n</uml>\n";
			}
		}
		//以下代码仅对IE9有效
		var fso, tf;
		   fso = new ActiveXObject("Scripting.FileSystemObject");
		   tf = fso.CreateTextFile("c:\\testfile.xml", true);
		   // 写一行，并且带有新行字符。
		   tf.WriteLine(xmlStr) ;
		   tf.Close();
	});
	
	$("#i-saveAs").click(function(){
		//var data = mainCanvas.toDataURL();
		var data = mainCanvas.toDataURL();
		window.location.href = data;
	});
	
	
};


//删除数组元素
Array.prototype.remove= function(dx) {
	if(isNaN(dx)||dx>this.length) {
		return false;
	}
	for(var i=0,n=0;i<this.length;i++) {
		if(this[i]!=this[dx]) {
			this[n++]=this[i]
		}
	}
	this.length-=1
}

//兼容chrome，firefox下的offsetX,offsetY
function getOffset(e) {
	var target = e.target;
	if (target.offsetLeft == undefined) {
		target = target.parentNode;
	}
	var pageCoord = getPageCoord(target);
	var eventCoord = {
		x: window.pageXOffset + e.clientX,
		y: window.pageYOffset + e.clientY
	};
	var offset = {
		offsetX: eventCoord.x - pageCoord.x,
		offsetY: eventCoord.y - pageCoord.y
	};
	return offset;
}

function getPageCoord(element) {
	var coord = {
		x: 0,
		y: 0
	};
	while (element) {
		coord.x += element.offsetLeft;
		coord.y += element.offsetTop;
		element = element.offsetParent;
	}
	return coord;
}

//鼠标按下时的操作
function canvasMouseDownHandler(event) {
	isRedraw = true;
	var canvasMouseX=(event.offsetX==undefined) ? getOffset(event).offsetX : event.offsetX ;
	if(!canvasMouseX) {
		canvasMouseX=event.x;
	}
	var canvasMouseY=(event.offsetY==undefined) ? getOffset(event).offsetY : event.offsetY ;
	if(!canvasMouseY) {
		canvasMouseY=event.y;
	}
	if (el.length > 0){
		for (var i = 0; i < el.length; i ++) {
			if (canvasMouseX >= el[i].elX && canvasMouseX <= (el[i].elX + el[i].dw)) {
				if (canvasMouseY >= el[i].elY && canvasMouseY <= (el[i].elY + el[i].dh)) {
					currentRectX = el[i].elX;
					currentRectY = el[i].elY;
					elWidth = el[i].dw;
					elHeight = el[i].dh;
					whichEl = i;
				}
			}
		}
		$("#p-other").html(el[whichEl].other);
		$("#uml-status").html("当前选择的是：" + el[whichEl].text); 
		$("#i-text").attr({value : el[whichEl].text});
			
	}
	if(canvasMouseX>currentRectX&&canvasMouseX<currentRectX+elWidth&&canvasMouseY>currentRectY&&canvasMouseY<currentRectY+elHeight) {
		mainCanvas.onmousemove=canvasMouseMoveHandler;

		startDragMouseX=canvasMouseX;
		startDragMouseY=canvasMouseY;
		startDragRectX=currentRectX;
		startDragRectY=currentRectY;
	}
}

function canvasMouseMoveHandler(event) {
	var canvasMouseX=(event.offsetX==undefined) ? getOffset(event).offsetX : event.offsetX ;

	if(!canvasMouseX) {
		canvasMouseX=event.x;
	}
	var canvasMouseY=(event.offsetY==undefined) ? getOffset(event).offsetY : event.offsetY ;
	if(!canvasMouseY) {
		canvasMouseY=event.y;
	}

	currentRectX=startDragRectX+canvasMouseX-startDragMouseX;
	currentRectY=startDragRectY+canvasMouseY-startDragMouseY;
	redrawRect();
}

function canvasMouseUpHandler(event) {
	isRedraw = false;
	mainCanvas.onmousemove=null;//未按下鼠标时，移动鼠标不进行任何操作
}

//绘制uml图的类，DUI：Draw Uml Image
var DUI = (function() {
	return {

		drawUmlImage : function (id, type) {
			//id格式为el-0， 截取后面的数字赋值给eid
			var eid = parseInt(id.substring(3));
			if (type == "status") {
				DUI.drawStatus(eid);
			} else if (type == "actor") {
				DUI.drawActor(eid);
			} else if (type == "line") {
				DUI.drawLine(eid);
			} else if (type == "class") {
				DUI.drawClass(eid);
			} else if (type == "usecase") {
				DUI.drawUsecase(eid);
			} else if (type == "start") {
				DUI.drawStart(eid);
			} else if (type == "end") {
				DUI.drawEnd(eid);
			} else if (type == "condition") {
				DUI.drawCondition(eid);
			} else if (type == "text") {
				DUI.drawText(eid);
			} else if (type == "square") {//以下由晓彬完成
				DUI.drawSimpleClass(eid);
			} else if (type == "package") {
				DUI.drawEmptyPackage(eid);
			} else if (type == "Note") {
				DUI.drawNote(eid);
			} else if (type == "SendSignal") {
				DUI.drawSendSignal(eid);
			} else if (type == "RecevieSignal") {
				DUI.drawRecevieSignal(eid);
			} else if (type == "complexClass") {
				//DUI.drawzxb6(eid);
			} else if (type == "compPack") {
				DUI.drawCompPack(eid);
			} else if (type == "time") {
				DUI.drawDoubleTriangle(eid);
			} else if (type == "vrect") {
				DUI.drawVrect(eid);
			} else if (type == "hrect") {
				DUI.drawHrect(eid);
			} else if (type == "bvrect") {
				DUI.drawBVrect(eid);
			} else if (type == "drect") {
				DUI.drawDrect(eid);
			} else if (type == "ddrect") {
				//DUI.drawDDrect(eid);
			} else if (type == "interaction") {
				DUI.drawInteraction(eid);
			} else if (type == "strokeLine") {
				DUI.drawStrokeCircle(eid);
			} else if (type == "interface") {
				DUI.drawInterface(eid);
			} else {
			}
		},
		//tx, ty 两变量为绘制文本的坐标，决定文本的位置
		//绘制状态
		drawStatus : function(eid) {
			var tx, ty;
			tx = el[eid].elX + el[eid].width / 2;
			ty = el[eid].elY + el[eid].height / 2;
			DCI.DrawRoundRect(mainCt, el[eid].width, el[eid].height, el[eid].elX, el[eid].elY);
			DCI.DrawText(mainCt, fontSize, el[eid].text, tx , ty, "middle");
			el[eid].setDwh(el[eid].width, el[eid].height);
		},
		//绘制参与者
		drawActor : function(eid) {
			var tx, ty;
			el[eid].setWH(33, 51);
			tx = el[eid].elX + el[eid].width/2;
			ty = el[eid].elY + el[eid].height + 10;
			var r = 10;
			DCI.DrawStrokeCircle(mainCt, r, el[eid].elX, el[eid].elY, "#000000");
			DCI.DrawLine(mainCt,el[eid].elX + r, el[eid].elY + 2 * r, el[eid].elX + r, el[eid].elY + 2 *r + 15, 1);
			for (var i = 0; i <= 15; i = i + 15) {
				DCI.DrawLine(mainCt,el[eid].elX, el[eid].elY + 3 * r + i, el[eid].elX + r, el[eid].elY + 2 * r + i, 1);
				DCI.DrawLine(mainCt, el[eid].elX + r, el[eid].elY + 2 * r + i, el[eid].elX + 2 * r, el[eid].elY + 3 * r + i, 1);
			}
			DCI.DrawText(mainCt, fontSize, el[eid].text, tx, ty, el[eid].width, "middle");
			el[eid].setDwh(el[eid].width, ty - el[eid].elY + fontSize);
		},
		//绘制线
		drawLine : function(eid) {
			isDrawLine = true;

			if (isRedraw == false) {

				mainCt.beginPath();
				mainCt.moveTo(x1, y1);
				mainCt.lineTo(x2, y2);
				mainCt.closePath();
				mainCt.stroke();
				el[elCount] = imgEl;
				elCount++;
			} else {
				var tx = el[eid].elX + 2 * el[eid] / 5;
				var ty = el[eid].elY + el[eid].height + 10;
			}

		},
		//绘制类
		drawClass : function(eid) {
			var tx, ty;
			tx = el[eid].elX + el[eid].width / 2;
			ty = el[eid].elY + el[eid].height + 10;
			DCI.DrawRect(mainCt, el[eid].width, el[eid].height, el[eid].elX, el[eid].elY);
			DCI.DrawText(mainCt, fontSize, el[eid].text, tx, ty, el[eid].width);
			DCI.DrawRect(mainCt, el[eid].width, el[eid].height, el[eid].elX, el[eid].elY + el[eid].height, "center");
			DCI.DrawText(mainCt, fontSize, el[eid].text, tx, ty + el[eid].height, el[eid].width, "center");
			el[eid].setDwh(el[eid].width, 2 * (ty - el[eid].elY + fontSize));
		},
		//绘制用例
		drawUsecase : function(eid) {
			var tx, ty;
			tx = el[eid].elX + el[eid].width / 2;
			ty = el[eid].elY + el[eid].height / 2;
			DCI.DrawEllipse(mainCt, el[eid].width, el[eid].height, el[eid].elX, el[eid].elY);
			DCI.DrawText(mainCt, fontSize, el[eid].text, tx, ty, el[eid].width, "center");
			el[eid].setDwh(el[eid].width, el[eid].height);
		},
		//绘制开始状态
		drawStart : function(eid) {
			DCI.DrawFillCircle(mainCt, el[eid].width / 2, el[eid].elX, el[eid].elY, "#000000", "#000000");
			el[eid].setDwh(el[eid].width, el[eid].height);
		},
		//绘制结束状态
		drawEnd : function(eid) {
			DCI.DrawFillCircle(mainCt, el[eid].width / 2, el[eid].elX, el[eid].elY, "#ffffff", "#000000");
			DCI.DrawFillCircle(mainCt, el[eid].width / 4, el[eid].elX + el[eid].width / 4 , el[eid].elY + el[eid].height / 4, "#000000", "#000000");
			el[eid].setDwh(el[eid].width, el[eid].height);
		},
		//绘制条件框
		drawCondition : function (eid) {
			DCI.DrawDiamond(mainCt, el[eid].elX, el[eid].elY, el[eid].width, el[eid].height);
			el[eid].setDwh(el[eid].width, el[eid].height);
		},
		//添加文本
		drawText : function(eid) {
			mainCt.font = fontSize + "pt Arial";
			mainCt.textBaseline = "top";
			mainCt.textAlign = "left";
			mainCt.fillText(el[eid].text, el[eid].elX, el[eid].elY, el[eid].width);
			el[eid].setWH(fontSize * el[eid].text.length, fontSize + 5);
			el[eid].setDwh(el[eid].width, el[eid].height);
		},
		//ComplexClass
		/*drawzxb6 : function(eid) {
		var tx, ty;
		tx = el[eid].elX + el[eid].width / 2;
		ty = el[eid].elY + el[eid].height + fontSize;
		DCI.DrawLine(mainCt,el[eid].elX, el[eid].elY, el[eid].elX , el[eid].elY+80);
		DCI.DrawLine(mainCt,el[eid].elX, el[eid].elY+80, el[eid].elX + 150 , el[eid].elY+80);
		DCI.DrawLine(mainCt,el[eid].elX+150, el[eid].elY+80, el[eid].elX +150, el[eid].elY);
		DCI.DrawLine(mainCt,el[eid].elX+150, el[eid].elY, el[eid].elX, el[eid].elY);
		DCI.DrawLine(mainCt,el[eid].elX, el[eid].elY+20, el[eid].elX+150, el[eid].elY+20);
		DCI.DrawText(mainCt, fontSize, el[eid].text, tx, ty-52, 50, "middle");
		el[eid].setDwh(el[eid].width+100,el[eid].height +30);
		},*/
		//Recevie signal
		drawRecevieSignal : function(eid) {
			var tx, ty;
			tx = el[eid].elX + el[eid].width/2+10;
			ty = el[eid].elY + fontSize+3;
			DCI.DrawLine(mainCt,el[eid].elX, el[eid].elY, el[eid].elX+el[eid].width*3/10, el[eid].elY+el[eid].height*3/10);
			DCI.DrawLine(mainCt,el[eid].elX+el[eid].width*3/10, el[eid].elY+el[eid].height*3/10, el[eid].elX, el[eid].elY+el[eid].height*3/5);
			DCI.DrawLine(mainCt,el[eid].elX, el[eid].elY+el[eid].height*3/5, el[eid].elX+el[eid].width*6/5, el[eid].elY+el[eid].height*3/5);
			DCI.DrawLine(mainCt,el[eid].elX+el[eid].width*6/5, el[eid].elY+el[eid].height*3/5, el[eid].elX+el[eid].width*6/5, el[eid].elY);
			DCI.DrawLine(mainCt,el[eid].elX+el[eid].width*6/5, el[eid].elY, el[eid].elX, el[eid].elY);
			DCI.DrawText(mainCt, fontSize, el[eid].text, tx, ty, 50);
			el[eid].setDwh(el[eid].width+15,el[eid].height -20, "left");
		},
		//Send signal
		drawSendSignal : function(eid) {
			var tx, ty;
			tx = el[eid].elX + el[eid].width*3/5;
			ty = el[eid].elY + fontSize+3;
			DCI.DrawLine(mainCt,el[eid].elX, el[eid].elY, el[eid].elX, el[eid].elY+el[eid].height*3/5);
			DCI.DrawLine(mainCt,el[eid].elX, el[eid].elY+el[eid].height*3/5, el[eid].elX+el[eid].width, el[eid].elY+el[eid].height*3/5);
			DCI.DrawLine(mainCt,el[eid].elX+el[eid].width, el[eid].elY+el[eid].height*3/5, el[eid].elX+el[eid].width*13/10, el[eid].elY+el[eid].height*3/10);
			DCI.DrawLine(mainCt,el[eid].elX+el[eid].width*13/10, el[eid].elY+el[eid].height*3/10, el[eid].elX+el[eid].width, el[eid].elY);
			DCI.DrawLine(mainCt,el[eid].elX+el[eid].width, el[eid].elY, el[eid].elX, el[eid].elY);
			DCI.DrawText(mainCt, fontSize, el[eid].text, tx, ty, 50, "left");
			el[eid].setDwh(el[eid].width+15,el[eid].height-20);
		},
		//Note
		drawNote : function(eid) {
			var tx, ty;
			tx = el[eid].elX + el[eid].width/3;
			ty = el[eid].elY + el[eid].height/5;
			DCI.DrawLine(mainCt,el[eid].elX, el[eid].elY, el[eid].elX, el[eid].elY+el[eid].height*2);
			DCI.DrawLine(mainCt,el[eid].elX, el[eid].elY+el[eid].height*2, el[eid].elX+el[eid].width*3, el[eid].elY+el[eid].height*2);
			DCI.DrawLine(mainCt,el[eid].elX+el[eid].width*3, el[eid].elY+el[eid].height*2, el[eid].elX+el[eid].width*3, el[eid].elY+el[eid].height*2/5);
			DCI.DrawLine(mainCt,el[eid].elX+el[eid].width*3, el[eid].elY+el[eid].height*2/5, el[eid].elX+el[eid].width*13/5, el[eid].elY+el[eid].height/el[eid].height);
			DCI.DrawLine(mainCt,el[eid].elX+el[eid].width*13/5, el[eid].elY+el[eid].height/el[eid].height, el[eid].elX, el[eid].elY);
			DCI.DrawLine(mainCt,el[eid].elX+el[eid].width*13/5, el[eid].elY+el[eid].height/el[eid].height, el[eid].elX+el[eid].width*13/5, el[eid].elY+el[eid].height/5*2);
			DCI.DrawLine(mainCt,el[eid].elX+el[eid].width*13/5, el[eid].elY+el[eid].height/5*2, el[eid].elX+el[eid].width*3, el[eid].elY+el[eid].height/5*2);
			DCI.DrawText(mainCt, fontSize, el[eid].text, tx, ty, 50, "left");
			el[eid].setDwh(el[eid].width*4,el[eid].height*2);
		},
		//EmptyPackage
		drawEmptyPackage : function(eid) {
			var tx, ty;
			tx = el[eid].elX + 5;
			ty = el[eid].elY + 10;
			el[eid].text = "EmptyPackage";
			DCI.DrawRect(mainCt,el[eid].width * 2 / 3, el[eid].height / 4, el[eid].elX, el[eid].elY);
			DCI.DrawRect(mainCt,el[eid].width, el[eid].height * 3 / 4, el[eid].elX, el[eid].elY + el[eid].height / 4);
			DCI.DrawText(mainCt, fontSize - 2, el[eid].text, tx, ty, 50, "left");
			el[eid].setDwh(el[eid].width + 100,el[eid].height + 30);
		},
		//SimpleClass
		drawSimpleClass : function(eid) {
			var tx, ty;
			tx = el[eid].elX + el[eid].width / 2;
			ty = el[eid].elY + el[eid].height / 2;
			el[eid].text = "SimpleClass";
			DCI.DrawRect(mainCt, el[eid].width, el[eid].height, el[eid].elX, el[eid].elY);
			DCI.DrawText(mainCt, fontSize, el[eid].text, tx, ty, 50, "center");
			el[eid].setDwh(el[eid].width, el[eid].height + 2 * fontSize);

		},
		drawCompPack : function(eid) {
			var tx, ty;
			tx = el[eid].elX + 5;
			ty = el[eid].elY + 10;
			el[eid].text = "EmptyPackage";
			DCI.DrawRect(mainCt,el[eid].width * 2 / 3, el[eid].height / 4, el[eid].elX, el[eid].elY);
			DCI.DrawRect(mainCt,el[eid].width, el[eid].height * 3 / 4, el[eid].elX, el[eid].elY + el[eid].height / 4);
			DCI.DrawText(mainCt, fontSize - 2, el[eid].text, tx, ty, 50, "left");
			DCI.DrawText(mainCt, fontSize - 2, el[eid].text, tx, ty + fontSize * 2, 50, "left");
			DCI.DrawText(mainCt, fontSize - 2, el[eid].text, tx, ty + fontSize * 4, 50, "left");
			el[eid].setDwh(el[eid].width + 100,el[eid].height + 30);
		},
		//以下由陈丽东莎完成
		//绘制计时器
		drawDoubleTriangle : function(eid) {
			var tw = el[eid].width;
			var th = Math.floor(Math.sqrt(Math.pow(tw,2)-Math.pow(tw/2,2)));
			DCI.DrawStrokeTriangle(mainCt,el[eid].elX,el[eid].elY, el[eid].elX+tw,el[eid].elY,el[eid].elX+tw/2,el[eid].elY+th);
			DCI.DrawStrokeTriangle(mainCt,el[eid].elX,el[eid].elY+2*th,el[eid].elX+tw/2,el[eid].elY+th,el[eid].elX+tw,el[eid].elY+2*th);
			el[eid].setDwh(tw,2*th);
		},
		//绘制实心小竖矩形
		drawVrect : function (eid) {
			DCI.DrawFillRect(mainCt, el[eid].width, el[eid].height, el[eid].elX, el[eid].elY);
			el[eid].setDwh(el[eid].width,el[eid].height);
		},
		//绘制实心小横矩形
		drawHrect : function (eid) {
			DCI.DrawFillRect(mainCt, el[eid].width, el[eid].height, el[eid].elX, el[eid].elY);
			el[eid].setDwh(el[eid].width,el[eid].height);
		},
		//绘制空心大竖矩形(注意和上面两个实心矩形区别大小)
		drawBVrect: function(eid) {
			DCI.DrawRect(mainCt, el[eid].width, el[eid].height, el[eid].elX, el[eid].elY);
			el[eid].setDwh(el[eid].width, el[eid].height);

		},
		//绘制两大小不一的矩形（要仅触发图形区域，不要触发区域是一个矩形？）
		drawDrect : function (eid) {
			var tx, ty;
			tx = el[eid].elX + 5;
			ty = el[eid].elY + 10;
			el[eid].text = "EmptyPackage";
			DCI.DrawRect(mainCt,el[eid].width * 2 / 3, el[eid].height / 4, el[eid].elX, el[eid].elY);
			DCI.DrawRect(mainCt,el[eid].width, el[eid].height * 3 / 4, el[eid].elX, el[eid].elY + el[eid].height / 4);
			DCI.DrawText(mainCt, fontSize - 2, el[eid].text, tx, ty, 50, "left");
			DCI.DrawText(mainCt, fontSize - 2, el[eid].text, tx, ty + fontSize * 3, 50, "left");
			DCI.DrawText(mainCt, fontSize - 2, el[eid].text, tx, ty + fontSize * 5, 50, "left");
			el[eid].setDwh(el[eid].width + 100,el[eid].height + 30);
		},
		//同时绘制两个包图
		// drawDDrect : function (eid) {
			// DCI.DrawRect(mainCt,el[eid].elX+30,25,el[eid].elX,el[eid].elY);
			// DCI.DrawRect(mainCt,el[eid].elX+100,el[eid].elY+30,el[eid].elX,el[eid].elY+25);
			// DCI.DrawRect(mainCt,38,16,(el[eid].elX+100)/2,el[eid].elY+40);
			// DCI.DrawRect(mainCt,el[eid].elX+20,30,(el[eid].elX+100)/2,el[eid].elY+56);
		// },
		//绘制interaction
		drawInteraction : function (eid) {
			DCI.DrawRect(mainCt,el[eid].width, el[eid].height,el[eid].elX,el[eid].elY);
			DCI.DrawLine(mainCt,el[eid].elX + el[eid].width * 4 / 5, el[eid].elY, el[eid].elX + el[eid].width * 4 / 5, el[eid].elY + el[eid].height * 1 / 5);
			DCI.DrawLine(mainCt, el[eid].elX, el[eid].elY + el[eid].height * 2 / 5, el[eid].elX + el[eid].width * 3 / 5, el[eid].elY + el[eid].height * 2 / 5 );
			DCI.DrawLine(mainCt, el[eid].elX + el[eid].width * 4 / 5, el[eid].elY + el[eid].height * 1 / 5, el[eid].elX + el[eid].width * 3 / 5, el[eid].elY + el[eid].height * 2 / 5);
			el[eid].setDwh(el[eid].width, el[eid].height);
		},
		//加号圆形
		drawStrokeCircle : function (eid) {
			// DCI.DrawStrokeCircle(mainCt,r,x-10,y-10,sc);
			// DCI.DrawLine(mainCt,el[eid].elX-6,el[eid].elY+1,el[eid].elX+10,el[eid].elY+1);
			// DCI.DrawLine(mainCt,el[eid].elX+2,el[eid].elY+10,el[eid].elX+2,el[eid].elY-7);
			// DCI.DrawLine(mainCt,el[eid].elX+2,el[eid].elY+15,el[eid].elX+2,el[eid].elY+60);
			// var sc = "ffffff";
			// mainCt.strokeStyle = sc;
			// el[eid].setDwh();
			
			DCI.DrawStrokeCircle(mainCt, el[eid].width / 2, el[eid].elX, el[eid].elY, '#000000');
			DCI.DrawLine(mainCt, el[eid].elX + el[eid].width / 4, el[eid].elY + el[eid].height / 2, el[eid].elX + el[eid].width * 3 / 4, el[eid].elY + el[eid].height / 2, 1);
			DCI.DrawLine(mainCt, el[eid].elX + el[eid].width / 2, el[eid].elY + el[eid].height / 4, el[eid].elX + el[eid].width / 2, el[eid].elY + el[eid].height * 3 / 4, 1);
			DCI.DrawLine(mainCt, el[eid].elX + el[eid].width / 2, el[eid].elY + el[eid].height, el[eid].elX + el[eid].width / 2, el[eid].elY + 4 * el[eid].height);
			el[eid].setDwh(el[eid].width, el[eid].height * 4);

		},
		//绘制interface
		drawInterface : function (eid) {
			// var x=50;
			// var y=50;
			// var r=12;
			// DCI.DrawLine(mainCt,el[eid].elX-30,el[eid].elY+47,el[eid].elX+55,el[eid].elY+47);
			// DCI.DrawStrokeCircle(mainCt,r,x,y,sc);
			// var sc = "ffffff";
			// mainCt.strokeStyle = sc;
			// el[eid].setDwh();
			DCI.DrawStrokeCircle(mainCt, el[eid].width / 2, el[eid].elX, el[eid].elY, "#000000");
			DCI.DrawLine(mainCt, el[eid].elX - el[eid].width, el[eid].elY + el[eid].height * 3 / 2, el[eid].elX + el[eid].width * 2, el[eid].elY + el[eid].height * 3 / 2, 1);
			el[eid].setDwh(3 * el[eid].width, 2 * el[eid].height);
		}
	}
})();
var DCI = (function() {
	return {
		//绘制空心矩形， c：上下文， w：宽度， h：高度，初始坐标(x, y)
		DrawRect : function(c, w, h, x, y) {
			c.lineWidth = 1;
			c.strokeRect(x, y, w, h);
		},
		//绘制实心矩形
		DrawFillRect : function(c, w, h, x, y) {
			c.lineWidth = 1;
			c.fillStyle = "#000000";
			c.fillRect(x, y, w, h);
		},
		//绘制圆角矩形，c：上下文， w：宽度， h：高度，初始坐标(x, y)
		DrawRoundRect : function(c, w, h, x, y) {
			c.beginPath();
			c.moveTo(x + 10, y);
			c.lineTo(x + w - 10, y);
			c.quadraticCurveTo(x + w, y, x + w, y + 10);
			c.lineTo(x + w, y + h -10);
			c.quadraticCurveTo(x + w, y + h, x + w - 10, y + h);
			c.lineTo(x + 10, y + h);
			c.quadraticCurveTo(x, y + h, x, y + h - 10);
			c.lineTo(x, y + 10);
			c.quadraticCurveTo(x, y, x + 10, y);

			c.stroke();
			c.closePath();
		},
		//绘制椭圆， c：上下文， w：宽度， h：高度， 椭圆中心(x, y)
		DrawEllipse : function(c, w, h, x, y) {
			var centerX = x + w / 2;
			var centerY = y + h / 2;
			var height = h;
			var width = w;

			c.beginPath();
			c.moveTo(centerX, centerY - height/2); // A1
			//贝尔塞曲线
			c.bezierCurveTo(
			centerX + width/2, centerY - height/2, // C1
			centerX + width/2, centerY + height/2, // C2
			centerX, centerY + height/2); // A2
			c.bezierCurveTo(
			centerX - width/2, centerY + height/2, // C3
			centerX - width/2, centerY - height/2, // C4
			centerX, centerY - height/2); // A1

			c.stroke();
			c.closePath();
		},
		//绘制实心圆，c：上下文， r：圆半径， 圆顶点坐标(x, y)， fc：填充颜色， sc：边界颜色
		DrawFillCircle : function(c, r, x, y, fc, sc) {
			c.beginPath();
			c.fillStyle = fc;
			c.strokeStyle = sc;
			c.arc(x + r, y + r, r, 0, Math.PI * 2, false)
			c.fill();
			c.stroke();
			c.closePath();
		},
		//绘制空心圆，c：上下文， r：圆半径， 圆心坐标(x, y)， sc：边界颜色
		DrawStrokeCircle : function(c, r, x, y, sc) {
			c.beginPath();
			c.strokeStyle = sc;
			c.arc(x + r, y + r, r, 0, Math.PI * 2, false)
			c.stroke();
			c.closePath();
		},
		//绘制线条，c：上下文， 起点(x1, y1)， 终点(x2, y2), lw: 线粗
		DrawLine : function(c, x1, y1, x2, y2, lw) {
			c.lineWidth = parseInt(lw);
			c.moveTo(x1, y1);
			c.lineTo(x2, y2);
			c.closePath();
			c.stroke();
		},
		//绘制菱形，c：上下文， x：x坐标， y：y坐标， w：宽度， h：高度
		DrawDiamond : function(c, x, y, w, h) {
			c.beginPath();
			c.strokeStyle = "#000000";
			c.moveTo(x + w / 2, y);
			c.lineTo(x, y + h / 2);
			c.lineTo(x + w / 2, y + h);
			c.lineTo(x + w, y + h / 2);
			c.lineTo(x + w / 2, y);
			c.closePath();
			c.stroke();
		},
		//绘制文本, c：上下文， size：字体大小， text：文本， x：x坐标， y：y坐标, align:对齐方式：left，right, center
		DrawText : function(c, size, text, x, y, w, align) {
			c.font = size + "pt Arial";
			c.textBaseline = "middle";
			c.textAlign = align;
			c.fillText(text, x, y, w);
		},
		//绘制空心三角形, 三个顶点(x1, y1), (x2, y2), (x3, y3)
		DrawStrokeTriangle : function(c, x1, y1, x2, y2, x3, y3) {
			c.beginPath();
			c.strokeStyle = "#000000";
			c.moveTo(x1, y1);
			c.lineTo(x2, y2);
			c.lineTo(x3, y3);
			c.closePath();
			c.stroke();
		},
		//绘制实心三角形， 三个顶点(x1, y1), (x2, y2), (x3, y3)， fc：填充颜色， sc：边界颜色
		DrawFillTriangle : function(c, x1, y1, x2, y2, x3, y3, fc, sc) {
			c.beginPath();
			c.strokeStyle = sc;
			c.fillStyle = fc;
			c.moveTo(x1, y1);
			c.lineTo(x2, y2);
			c.lineTo(x3, y3);
			c.closePath();
			c.fill();
			c.stroke();
		},
		//两点距离
		Distance : function(x1, y1, x2, y2) {
			var i;
			i=Math.pow((y2-y1),2)+Math.pow((x2-x1),2);
			i=Math.floor(Math.sqrt(i));
			return i;
		}
	}
})();