/**
 * 
 * 图形拖动
 *   
 */

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
					//DUI.drawShadow(whichEl);
				}
			}
		}
		//$("#p-other").html(el[whichEl].other);
		//$("#uml-status").html("当前选择的是：" + el[whichEl].text);
		Ext.getCmp('stautsText').setText("当前选择的是：" + el[whichEl].text);
		//$("#i-text").attr({value : el[whichEl].text});
			
	}
	if(canvasMouseX>currentRectX&&canvasMouseX<currentRectX+elWidth&&canvasMouseY>currentRectY&&canvasMouseY<currentRectY+elHeight) {
		mainCanvas.onmousemove=canvasMouseMoveHandler;

		startDragMouseX=canvasMouseX;
		startDragMouseY=canvasMouseY;
		startDragRectX=currentRectX;
		startDragRectY=currentRectY;
	}
	redrawRect();
}
//鼠标移动事件
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
//	if (el.length > 0){
//		DUI.drawShadow(whichEl);
//	}
}
//
function canvasMouseUpHandler(event) {
	isRedraw = false;
	mainCanvas.onmousemove=null;//未按下鼠标时，移动鼠标不进行任何操作
//	if (el.length > 0){
//		DUI.drawShadow(whichEl);
//	}
}
//鼠标单击事件
function canvasMouseDbclickHandler(event) {
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
					whichEl = i;
				}
			}
		}
		
		//$("#p-other").html(el[whichEl].other);
		//$("#uml-status").html("当前选择的是：" + el[whichEl].text);
		Ext.getCmp('stautsText').setText("当前选择的是：" + el[whichEl].text);
		//$("#i-text").attr({value : el[whichEl].text});
		
		if (el[whichEl].type == "text") {
			Ext.Msg.prompt('提示', '请输入文本内容', function(btn, text){
				if (btn == 'ok'){
					console.log("dbclick => " + whichEl);
					el[whichEl].text = text;
					redrawRect();
				}
			});
		}
			
	}
}

//缩小画布上的图形元素
function zoomIn() {
	var arg = 10;
	if (el.length > 0){	
		if (el[whichEl].type == "line") {
			
		} else if (el[whichEl].type == "text") {
			if (fontSize <= 10){
				Ext.Msg.alert('提示', '字体大小已达到最小值！');
			} else {
				fontSize -= 1;
			}
			ctx.clearRect(el[whichEl].elX - 1, el[whichEl].elY - 1, el[whichEl].dw + 2, el[whichEl].dh + 10 );
		} else {
			if (el[whichEl].width <= 10 || el[whichEl].height <= 10) {
				Ext.Msg.alert("提示", "图片不能再缩放！");
			} else {
				ctx.clearRect(el[whichEl].elX - 1, el[whichEl].elY - 1, el[whichEl].dw + 2, el[whichEl].dh + 10);
				el[whichEl].width -= arg;
				el[whichEl].height -= el[whichEl].height * arg / (el[whichEl].width + arg);
				el[whichEl].setDwh(el[whichEl].width, el[whichEl].height);
			}
		}
		//DUI.drawUmlImage(el[whichEl].id, el[whichEl].type);
		el[whichEl].drawImage(ctx);
		//DUI.drawShadow(whichEl);
	} else {}
}

//放大画布上的图形元素
function zoomOut() {
	var arg = 10;
	if (el.length > 0){
		if (el[whichEl].type == "line") {
			
		} else if (el[whichEl].type == "text") {
			if (fontSize >= 15){
				Ext.Msg.alert('提示', '字体大小已达到最大值！');
			} else {
				fontSize += 1;
			}
			ctx.clearRect(el[whichEl].elX - 1, el[whichEl].elY - 1, el[whichEl].dw + 2, el[whichEl].dh + 10 );
		} else {
			if (el[whichEl].width >= 200 || el[whichEl].height >= 150) {
				Ext.Msg.alert("提示", "图片不能再缩放！");
			} else {
				ctx.clearRect(el[whichEl].elX - 1, el[whichEl].elY - 1, el[whichEl].dw + 2, el[whichEl].dh + 15);
				el[whichEl].width += arg;
				el[whichEl].height *= el[whichEl].width / (el[whichEl].width - arg);
				el[whichEl].setDwh(el[whichEl].width, el[whichEl].height);
			}
		}
		//DUI.drawUmlImage(el[whichEl].id, el[whichEl].type);
		el[whichEl].drawImage(ctx);
		//DUI.drawShadow(whichEl);
	} else {}
}

//删除画布上图形元素
function removeEl() {
	var i = whichEl;
	ctx.clearRect(el[i].elX - 1, el[i].elY - 1, el[i].dw + 2, el[i].dh + 2);
	el[i].setWH(0, 0);
	el[i].setDwh(0, 0);
	el[i].drawImage = function(){};
	redrawRect();
}
//清除画布
function clear(){
	Ext.Msg.show({
		title : '警告信息',
		msg : '确认要删除吗？',
		buttons : Ext.Msg.YESNO,
		icon : Ext.window.MessageBox.QUESTION,
		fn : function(button, text){
			if (button == 'yes'){
				ctx.clearRect(0, 0, MAIN_CANVAS_WIDTH,MAIN_CANVAS_HEIGHT);
				el = new Array();
				whichEl = 0;
				elCount = 0;
			}
		}
	});
}

//另存图片
function saveAs(){
	canvasImageData = mainCanvas.toDataURL();
	//window.location.href = canvasImageData;
	window.open(canvasImageData,'Your pic','status=yes');
}

function generateCanvasXml(){
	canvasXmlData = "<uml>";
	for (var i = 0; i < el.length; i++){
		canvasXmlData += "<shape>";
		for (attr in el[i]){
			if (el[i].hasOwnProperty(attr)){
				canvasXmlData += "<" + attr + ">" + el[i][attr] + "</" + attr + ">";
			}
		}
		canvasXmlData += "</shape>";
	}
	canvasXmlData += "</uml>";
	console.log(canvasXmlData);
}

function redrawRect() {
	ctx.clearRect(0,0,MAIN_CANVAS_WIDTH,MAIN_CANVAS_HEIGHT);//清除画布
	if (el.length > 0) {
		for (var i = 0; i < el.length; i ++) {
			if (i == whichEl) {
				//如果是选中图形，则按新位置重新绘图
				el[i].setXY(currentRectX, currentRectY);
				el[i].drawImage(ctx);
			} else
				//其它图形按原有位置绘图
				el[i].drawImage(ctx);
		}
	}
}