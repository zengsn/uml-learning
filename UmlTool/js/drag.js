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