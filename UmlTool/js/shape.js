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
			DCI.DrawText(mainCt, fontSize, el[eid].text, tx , ty);
			el[eid].setDwh(el[eid].width, ty - el[eid].elY + fontSize);
		},
		//绘制参与者
		drawActor : function(eid) {
			var tx, ty;
			el[eid].setWH(33, 51);
			tx = el[eid].elX + el[eid].width/2;
			ty = el[eid].elY + el[eid].height + 10;
			var r = 10;
			DCI.DrawStroke(mainCt, r, el[eid].elX, el[eid].elY, "#000000");
			DCI.DrawLine(mainCt,el[eid].elX + r, el[eid].elY + 2 * r, el[eid].elX + r, el[eid].elY + 2 *r + 15, 1);
			for (var i = 0; i <= 15; i = i + 15){
				DCI.DrawLine(mainCt,el[eid].elX, el[eid].elY + 3 * r + i, el[eid].elX + r, el[eid].elY + 2 * r + i, 1);
				DCI.DrawLine(mainCt, el[eid].elX + r, el[eid].elY + 2 * r + i, el[eid].elX + 2 * r, el[eid].elY + 3 * r + i, 1);	
			}
			DCI.DrawText(mainCt, fontSize, el[eid].text, tx, ty, el[eid].width);
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
			DCI.DrawRect(mainCt, el[eid].width, el[eid].height, el[eid].elX, el[eid].elY + el[eid].height);
			DCI.DrawText(mainCt, fontSize, el[eid].text, tx, ty + el[eid].height, el[eid].width);
			el[eid].setDwh(el[eid].width, 2 * (ty - el[eid].elY + fontSize));
		},
		//绘制用例
		drawUsecase : function(eid) {
			var tx, ty;
			tx = el[eid].elX + el[eid].width / 2;
			ty = el[eid].elY + el[eid].height / 2;
			DCI.DrawEllipse(mainCt, el[eid].width, el[eid].height, el[eid].elX, el[eid].elY);
			DCI.DrawText(mainCt, fontSize, el[eid].text, tx, ty, el[eid].width);
			el[eid].setDwh(el[eid].width, el[eid].height);
		},
		//绘制开始状态
		drawStart : function(eid) {
			DCI.DrawFillCircle(mainCt, 10, el[eid].elX, el[eid].elY, "#000000", "#000000");
			el[eid].setDwh(el[eid].width, el[eid].height);
		},
		//绘制结束状态
		drawEnd : function(eid) {
			DCI.DrawFillCircle(mainCt, 10, el[eid].elX, el[eid].elY, "#ffffff", "#000000");
			DCI.DrawFillCircle(mainCt, 6, el[eid].elX + 4 , el[eid].elY + 4, "#000000", "#000000");
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
		}
	}
})();
var DCI = (function() {
	return {
		//绘制矩形， c：上下文， w：宽度， h：高度，初始坐标(x, y)
		DrawRect : function(c, w, h, x, y) {
			c.strokeRect(x, y, w, h);
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
		//绘制实心圆，c：上下文， r：圆半径， 圆心坐标(x, y)， fc：填充颜色， sc：边界颜色
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
		DrawStroke : function(c, r, x, y, sc) {
			c.beginPath();
			c.strokeStyle = sc;
			c.arc(x + r, y + r, r, 0, Math.PI * 2, false)
			c.stroke();
			c.closePath();
		},
		//绘制线条，c：上下文， 起点(x1, y1)， 终点(x2, y2), lw: 线粗
		DrawLine : function(c, x1, y1, x2, y2, lw) {
			c.beginPath();
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
		//绘制文本, c：上下文， size：字体大小， text：文本， x：x坐标， y：y坐标
		DrawText : function(c, size, text, x, y, w) {
			c.font = size + "pt Arial";
			c.textBaseline = "middle";
			c.textAlign = "center";
			c.fillText(text, x, y, w);
		},
		//绘制空心三角形, 三个顶点(x1, y1), (x2, y2), (x3, y3)
		DrawStrokeTriangle : function(c, x1, y1, x2, y2, x3, y3){
			c.beginPath();
			c.strokeStyle = "#000000";
			c.moveTo(x1, y1);
			c.lineTo(x2, y2);
			c.lineTo(x3, y3);
			c.closePath();
			c.stroke();
		},
		//绘制实心三角形， 三个顶点(x1, y1), (x2, y2), (x3, y3)， fc：填充颜色， sc：边界颜色
		DrawFillTriangle : function(c, x1, y1, x2, y2, x3, y3, fc, sc){
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
		Distance : function(x1, y1, x2, y2){
			var i;
			i=Math.pow((y2-y1),2)+Math.pow((x2-x1),2);
			i=Math.floor(Math.sqrt(i));
			return i;
		}
	}
})();