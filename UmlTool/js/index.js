
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