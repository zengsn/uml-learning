var mainCanvas;//新建的canvas画布
var ctx;//上下文
var imgCtx;
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
var fontSize = 10;//默认字体大小
var isDrawLine = false;//是否画直线
var imgEl =  null;//临时变量
var xmlCanvas = '';
var canvasXmlData = '';
var picTmpValue = '';
var xmlTmpValue = '';
var elArr = new Array();
var allEl = new Array();
//function imgClass() {
//};

var el = new Array();//存放画布上元素的数组

//在画布上添加图形元素
function addEl(node) {

	//向数组添加新图形
	el[elCount] = checkType(node);
	//初始化部分属性
	initCommon(el[elCount], node);
	//开始绘图
	el[elCount].drawImage(ctx);
	//同时图形数量加1
	elCount++;
}

//初始化共有参数
function initCommon(o, node) {
	//设置图形坐标
//	o.setXY(50, 50);
	//设置图形宽度、高度
//	o.setDwh(o.width, o.height);
	//初始化文本
	o.text = node.text;
	//初始化id
	o.id = "el-" + elCount;
	//初始化类型
	o.type = node.type;
	Ext.getCmp('stautsText').setText("当前选择的是：" + el[whichEl].text);
	whichEl = elCount;
}

function checkType(node){
		//根据不同类型处理
	var umlShape;
	if (node.type == "actor") {
		umlShape = new actorCls();
	} else if (node.type == "status") {
		umlShape = new statusCls();
	} else if (node.type == "line") {
		mainCanvas.onmousedown = mDown;
		mainCanvas.onmouseup = mUp;
		umlShape = new lineCls();
	} else if (node.type == "class") {
		umlShape = new classCls();
	} else if (node.type == "usecase") {
		umlShape = new usecaseCls();
	} else if (node.type == "start") {
		umlShape = new startCls();
	} else if (node.type == "end") {
		umlShape = new endCls();
	} else if (node.type == "condition") {
		umlShape = new conditionCls();
	} else if (node.type == "text") {
		umlShape = new textCls();
	} else if (node.type == "SimpleClass"){
		umlShape = new simpleCls();
	} else if (node.type == "package") {
		umlShape = new pkgCls();
	} else if (node.type == "Note") {
		umlShape = new noteCls();
	} else if (node.type == "SendSignal") {
		umlShape = new sendCls();
	} else if (node.type == "RecevieSignal") {
		umlShape = new receiveCls();
	} else if (node.type == "complexClass") {
		umlShape = new complexCls();
	} else if (node.type == "compPack") {
		umlShape = new compPackCls();
	} else if (node.type == "time"){
		umlShape = new timeCls();
	}else if (node.type == "vrect"){
		umlShape = new vrectCls();
	}else if (node.type == "hrect"){
		umlShape = new hrectCls();
	}else if (node.type == "bvrect"){
		umlShape = new bvrectCls();
	}else if (node.type == "drect"){
		umlShape = new drectCls();
	}else if (node.type == "ddrect"){
		umlShape = new ddrectCls();
	}else if (node.type == "interaction"){
		umlShape = new interactionCls();
	}else if (node.type == "strokeLine"){
		umlShape = new strokeLineCls();
	}else if (node.type == "interface"){
		umlShape = new interfaceCls();
	} else {}
	return umlShape;
} 

function generateClass(obj){
	
	imgEl = checkType(obj);
//	checkType(obj);
//	imgEl.id = obj.id;
//	imgEl.text = obj.text;
//	imgEl.elX = obj.elX;
//	imgEl.elY = obj.elY;
//	imgEl.x1 = obj.x1;
//	imgEl.y1 = obj.y1;
//	imgEl.x2 = obj.x2;
//	imgEl.y2 = obj.y2;
//	imgEl.type = obj.type;
//	imgEl.width = obj.width;
//	imgEl.height = obj.height;
//	imgEl.dw = obj.dw;
//	imgEl.dh = obj.dh;
//	imgEl.other = obj.other;
//	
//	console.log(imgEl);
	return imgEl;
	
	
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

//	el[whichEl].x1 = canvasMouseX;
//	el[whichEl].y1 = canvasMouseY;
	el[whichEl].setXY2(canvasMouseX, canvasMouseY);
	//console.log(el[whichEl].text);
//	console.log("elX : " + el[whichEl].elX + "/ elY : " + el[whichEl].elY);
//	console.log("x1 : " + el[whichEl].x1 + "/ y1 : " + el[whichEl].y1);
	//mainCt.clearRect(0,0,MAIN_CANVAS_WIDTH,MAIN_CANVAS_HEIGHT);
	//DCI.DrawLine(mainCt, el[whichEl].elX, el[whichEl].elY, el[whichEl].x1, el[whichEl].y1, 1);
	
	//redrawRect();
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
	
//	el[whichEl].setXY1(canvasMouseX, canvasMouseY);
	el[whichEl].x1 = canvasMouseX;
	el[whichEl].y1 = canvasMouseY;
	console.log("x1 : " + el[whichEl].x1 + "/ y1 : " + el[whichEl].y1);
	
	//imgEl.x1 = canvasMouseX;
	//imgEl.y1 = canvasMouseY;
	

	//$("#uml-canvas").mousemove(mMove(event));
	mainCanvas.onmousemove = mMove;

}

function mUp() {
//	isDrawLine = false;
	//$("uml-canvas").mousemove(null);
	mainCanvas.onmousemove = null;
	
	el[whichEl].setXY2(el[whichEl].x2, el[whichEl].y2);
	console.log("elX00 : " + el[whichEl].elX + "/ elY00 : " + el[whichEl].elY);
	console.log("x111 : " + el[whichEl].x1 + "/ y111 : " + el[whichEl].y1);
	DCI.DrawLine(ctx, el[whichEl].x1, el[whichEl].y1, el[whichEl].x2, el[whichEl].y2, 1);
	
	var w = Math.abs(parseInt(el[whichEl].x2) - parseInt(el[whichEl].x1));
	var h = Math.abs(parseInt(el[whichEl].y2) - parseInt(el[whichEl].y1));
	console.log("w = " + w + "/" + "h = " + h);
	el[whichEl].setWH(w, h);
	el[whichEl].setDwh(w, h);
	
	el[whichEl].elX = el[whichEl].x1 < el[whichEl].x2 ? el[whichEl].x1 : el[whichEl].x2;
	el[whichEl].elY = el[whichEl].y1 < el[whichEl].y2 ? el[whichEl].y1 : el[whichEl].y2;
	
	mainCanvas.onmousedown = canvasMouseDownHandler;
	mainCanvas.onmouseup = canvasMouseUpHandler;
	//redrawRect();
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

function get2dContext(canvas){
	var context = canvas.getContext('2d');
	return context;
}

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
	mainCanvas.ondblclick = canvasMouseDbclickHandler;

	//获取上下文
	ctx = get2dContext(mainCanvas);
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
			this[n++]=this[i];
		}
	}
	this.length-=1;
};

var DCI = (function() {
	return {
		//绘制空心矩形， c：上下文， w：宽度， h：高度，初始坐标(x, y)
		DrawRect : function(c, w, h, x, y) {
			c.save();
			c.lineWidth = 1;
			c.strokeRect(x, y, w, h);
			c.restore();
		},
		//绘制实心矩形
		DrawFillRect : function(c, w, h, x, y) {
			c.save();
			c.lineWidth = 1;
			c.fillStyle = "#000000";
			c.fillRect(x, y, w, h);
			c.restore();
		},
		//绘制圆角矩形，c：上下文， w：宽度， h：高度，初始坐标(x, y)
		DrawRoundRect : function(c, w, h, x, y) {
			c.save();
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
			c.restore();
		},
		//绘制椭圆， c：上下文， w：宽度， h：高度， 椭圆中心(x, y)
		DrawEllipse : function(c, w, h, x, y) {
			c.save();
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
			c.restore();
		},
		//绘制实心圆，c：上下文， r：圆半径， 圆顶点坐标(x, y)， fc：填充颜色， sc：边界颜色
		DrawFillCircle : function(c, r, x, y, fc, sc) {
			c.save();
			c.beginPath();
			c.fillStyle = fc;
			c.strokeStyle = sc;
			c.arc(x + r, y + r, r, 0, Math.PI * 2, false);
			c.fill();
			c.stroke();
			c.closePath();
			c.restore();
		},
		//绘制空心圆，c：上下文， r：圆半径， 圆心坐标(x, y)， sc：边界颜色
		DrawStrokeCircle : function(c, r, x, y, sc) {
			c.save();
			c.beginPath();
			c.strokeStyle = sc;
			c.arc(x + r, y + r, r, 0, Math.PI * 2, false);
			c.stroke();
			c.closePath();
			c.restore();
		},
		//绘制线条，c：上下文， 起点(x1, y1)， 终点(x2, y2), lw: 线粗
		DrawLine : function(c, x1, y1, x2, y2, lw) {
			c.save();
			c.lineWidth = parseInt(lw);
			c.moveTo(x1, y1);
			c.lineTo(x2, y2);
			c.closePath();
			c.stroke();
			c.restore();
		},
		//绘制菱形，c：上下文， x：x坐标， y：y坐标， w：宽度， h：高度
		DrawDiamond : function(c, x, y, w, h) {
			c.save();
			c.beginPath();
			c.strokeStyle = "#000000";
			c.moveTo(x + w / 2, y);
			c.lineTo(x, y + h / 2);
			c.lineTo(x + w / 2, y + h);
			c.lineTo(x + w, y + h / 2);
			c.lineTo(x + w / 2, y);
			c.closePath();
			c.stroke();
			c.restore();
		},
		//绘制文本, c：上下文， size：字体大小， text：文本， x：x坐标， y：y坐标, align:对齐方式：left，right, center
		DrawText : function(c, size, text, x, y, w, align) {
			c.save();
			c.font = size + "pt Arial";
			c.textBaseline = "middle";
			c.textAlign = align;
			c.fillText(text, x, y, w);
			c.restore();
		},
		//绘制空心三角形, 三个顶点(x1, y1), (x2, y2), (x3, y3)
		DrawStrokeTriangle : function(c, x1, y1, x2, y2, x3, y3) {
			c.save();
			c.beginPath();
			c.strokeStyle = "#000000";
			c.moveTo(x1, y1);
			c.lineTo(x2, y2);
			c.lineTo(x3, y3);
			c.closePath();
			c.stroke();
			c.restore();
		},
		//绘制实心三角形， 三个顶点(x1, y1), (x2, y2), (x3, y3)， fc：填充颜色， sc：边界颜色
		DrawFillTriangle : function(c, x1, y1, x2, y2, x3, y3, fc, sc) {
			c.save();
			c.beginPath();
			c.strokeStyle = sc;
			c.fillStyle = fc;
			c.moveTo(x1, y1);
			c.lineTo(x2, y2);
			c.lineTo(x3, y3);
			c.closePath();
			c.fill();
			c.stroke();
			c.restore();
		},
		//两点距离
		Distance : function(x1, y1, x2, y2) {
			var i;
			i=Math.pow((y2-y1),2)+Math.pow((x2-x1),2);
			i=Math.floor(Math.sqrt(i));
			return i;
		},
		DrawImg : function(c, img){
			c.save();
			c.drawImage(img, 0, 0);
			c.restore();
		}
	};
})();