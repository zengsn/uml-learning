// UmlShape.js
Ext.define('UmlShape', {
    extend: 'Ext.util.Observable',
	elX: null,  //矩形区域X坐标 
	elY: null,   //矩形区域Y坐标
	selX: null, //选中图形元素时的X坐标
	selY: null,  //选中图形元素时的Y坐标　
	elWidth: null, //矩形区域宽度
	elHeight: null,//矩形区域高度
	cvs: null,    //画布的canvas对象
	ctx: null,	  //画面的context对象
	elNum: null,  //图形元素在数组中的下标
	rz: 'cannot', //图形是否进入可拉动区域的标记
	cd: false,	  //图形是否是可拉动类图形
	sasX:null,
	sasY:null,
	constructor: function(config){
		config = config || {};
	//	Ve.elCount=Ve.elCount+1;
	//	Ve.elSelect=Ve.elSelect+1;
	//	console.log('elCount'+Ve.elCount);
	//	console.log('elSelect'+Ve.elSelect);
		this.elNum=Ve.elCount;
		// 获取画布
		this.cvs=Ext.getDom("myCanvas");
		this.ctx=this.cvs.getContext("2d");
		// 添加事件
        this.addEvents({
			"click"  : true,
			"dbclick": true,
			"draw"   : true
        });
        this.listeners = config.listeners;
		
		// 默认配置
		Ext.apply(config, {
			listeners: {
				'draw'  : this.onDraw
			}
		});
		Ext.get("myCanvas").on({
			'mouseenter' : { 
				fn   : this.onEditting, 
				scope: this
			},			
			'mouseleave' : { 
				fn   : this.stopEditing, 
				scope: this
			},			
			'mousemove' : { 
				fn   : this.recordMove, 
				scope: this
			},	
			'mousedown' : { 
				fn   : this.recordDown, 
				scope: this
			},	
			'mouseup' : { 
				fn   : this.recordUp, 
				scope: this
			},	
			'click' : { 
				fn   : this.onClick, 
				scope: this
			},
			'dblclick': {
				fn   : this.onDbclick,
				scope: this
			}
		});	
		this.status   = Constants.STATUS_PK;
		this.mousepos = Constants.MOUSE_OUT;
        // Call our superclass constructor to complete construction process.
        UmlShape.superclass.constructor.call(this, config);
    },
	
    endUml: function(){
    	Ext.get("myCanvas").un({
			'mouseenter' : { 
				fn   : this.onEditting, 
				scope: this
			},			
			'mouseleave' : { 
				fn   : this.stopEditing, 
				scope: this
			},			
			'mousemove' : { 
				fn   : this.recordMove, 
				scope: this
			},	
			'mousedown' : { 
				fn   : this.recordDown, 
				scope: this
			},	
			'mouseup' : { 
				fn   : this.recordUp, 
				scope: this
			},	
			'click' : { 
				fn   : this.onClick, 
				scope: this
			},
			'dblclick': {
				fn   : this.onDbclick,
				scope: this
			}
		});	
    },
    
	onEditting: function(e, t, o, op) { //鼠标进入画布
		this.mousepos = Constants.MOUSE_IN;
		console.log('onEditting: ' + e);		
	},
	
	stopEditing: function(e, t, o, op) { //鼠标退出画布
		this.mousepos = Constants.MOUSE_OUT;
		this.status=Constants.STATUS_PK;
		console.log('stopEditing: ' + e);
		document.body.style.cursor = 'default';	
	},
	
	recordDown: function(e, t, o, op) {  //鼠标按下
		//console.log('recordDown:'+this.status+'---'+this.elNum);
		if ((this.status==Constants.STATUS_PK) && this.isInside(this.getCXY(e))) { //处于初始状态且该元素被鼠标选中
			document.body.style.cursor = 'move';	
			Ve.elSelect=this.elNum;		
			console.log('elSelect :'+Ve.elSelect);
			console.log('this num is:'+this.elNum);		
			this.status=Constants.STATUS_M0;
			var xy=this.getCXY(e);						
		    this.selX=xy[0];
		    this.selY=xy[1];	
			console.log('downXY: ' + xy);		
			if(Ve.elSelect==this.elNum){
				this.restoreShape();
				this.draw();
				this.beSelect();
			}
			Ve.sas=true;
		}else{
			this.restoreShape();
			this.draw();
		}
	},
	
	recordUp: function(e, t, o, op) { //鼠标弹起	    
		if (this.status==Constants.STATUS_M0) { 
			this.status=Constants.STATUS_PK;
		//	console.log('recordUp:'+this.status);
		} 
		this.rz='cannot';
		document.body.style.cursor = 'default';	
	},
	
	onClick: function(e, t, o, op) { //鼠标单击
		//console.log('onClick'+e);		
	},
	
	onDbclick: function(e, t, o, op){ //鼠标双击
		//console.log('dbclick'+e);
	},

	recordMove: function(e, t, o, op) { //鼠标移动
		//console.log('recordMove: ' + this.status);
		if(this.mousepos==Constants.MOUSE_IN) {
			if(this.canResizable(this.getCXY(e))!='cannot' && Ve.elSelect==this.elNum && !this.cd){
				var cr=this.canResizable(this.getCXY(e));
				if(cr=='lefttop'){
					document.body.style.cursor='nw-resize';
				}else if(cr=='leftbottom'){
					document.body.style.cursor='sw-resize';
				}else if(cr=='righttop'){
					document.body.style.cursor='ne-resize';
				}else if(cr=='rightbottom'){
					document.body.style.cursor='se-resize';
				}		
			}
			if(this.status==Constants.STATUS_PK && this.canResizable(this.getCXY(e))=='cannot' && Ve.elSelect==this.elNum){
				document.body.style.cursor = 'default';
			}
			if((this.rz!='cannot' || this.canResizable(this.getCXY(e))!='cannot') && this.status==Constants.STATUS_M0 && !this.cd  && Ve.elSelect==this.elNum){//拉动图形放大缩小
				//document.body.style.cursor='nw-resize';
				var xy=this.getCXY(e);
				if(this.rz=='cannot'){
					this.rz=this.canResizable(this.getCXY(e));
				}
				//console.log('move0XY: ' + xy);
				if(this.rz=='lefttop'){
					document.body.style.cursor='nw-resize';
					console.log('--------------:'+this.rz);
					this.elWidth=this.elX-xy[0]+this.elWidth;
					this.elHeight=this.elY-xy[1]+this.elHeight;
					this.elX=xy[0];
					this.elY=xy[1];
					this.restoreShape();			
					this.draw();		
				}else if(this.rz=='leftbottom'){
					document.body.style.cursor='sw-resize';
					console.log('--------------:'+this.rz);
					this.elWidth=this.elX-xy[0]+this.elWidth;
					this.elHeight=xy[1]-this.elY;
					this.elX=xy[0];
					this.elY=xy[1]-this.elHeight;
					this.restoreShape();			
					this.draw();
				}else if(this.rz=='righttop'){
					document.body.style.cursor='ne-resize';
					console.log('--------------:'+this.rz);					
					this.elWidth=xy[0]-this.elX;
					this.elHeight=this.elY-xy[1]+this.elHeight;
					this.elX=xy[0]-this.elWidth;
					this.elY=xy[1];
					this.restoreShape();			
					this.draw();
				}else if(this.rz=='rightbottom'){
					document.body.style.cursor='se-resize';
					console.log('--------------:'+this.rz);
					this.elWidth=xy[0]-this.elX
					this.elHeight=xy[1]-this.elY;
					this.elX=xy[0]-this.elWidth;
					this.elY=xy[1]-this.elHeight;
					this.restoreShape();			
					this.draw();
				}	
				this.beSelect();
			}else if(this.status==Constants.STATUS_M0 && Ve.elSelect==this.elNum) {// 图形移动	
				document.body.style.cursor = 'move';	
				//console.log('recordMove: ' + this.status);	
				var xy=this.getCXY(e);			
				//console.log('move0XY: ' + xy);
				this.restoreShape();
				this.elX=xy[0]-this.selX+this.elX;
				this.elY=xy[1]-this.selY+this.elY;				
				this.draw();	
				this.beSelect();
				this.selX=xy[0];
				this.selY=xy[1];				
			}			
		}
	},
	
	// Drawing control
	restoreShape: function(){  //重绘元素
		this.clearCanvas();
		for(var i=0;i<Ve.elArray.length;i++){
			if(i!=this.elNum){
				Ve.elArray[i].draw();
			}
		}				
	},
	
	getCXY: function(e){ //获取当前鼠标相对于画布的坐标
		var canvasEl = this.getCanvasEl();
		var xy = [ // convert to coordinate of canvas
			e.getX() - canvasEl.getX(),
			e.getY() - canvasEl.getY()
		];
		return xy;
	},
	
	isInside: function(xy) { //判断当前鼠标是否在某个元素中
		if(xy[0]>=this.elX && xy[0]<=(this.elWidth+this.elX) && xy[1]>=this.elY && xy[1]<=(this.elHeight+this.elY)){
			return true;
		}else{
			return false;
		}
	},
		
	canResizable: function(xy){ //判断是否进入可拖动改变大小的区域
		if(xy[0]<=(this.elX+3) && xy[0]>=this.elX-3 && xy[1]<=(this.elY+3) && xy[1]>=this.elY-3){
			return 'lefttop';
		}else if(xy[0]<=(this.elX+3) && xy[0]>=this.elX-3 && xy[1]>=(this.elY+this.elHeight-3) && xy[1]<=(this.elY+this.elHeight+3)){
			return 'leftbottom';
		}else if(xy[0]>=(this.elX+this.elWidth-3) && xy[0]<=(this.elX+this.elWidth+3) && xy[1]<=(this.elY+3) && xy[1]>=this.elY-3){
			return 'righttop';
		}else if(xy[0]>=(this.elX+this.elWidth-3) && xy[0]<=(this.elX+this.elWidth+3) && xy[1]>=(this.elY+this.elHeight-3) && xy[1]<=(this.elY+this.elHeight+3)){
			return 'rightbottom';
		}else{
			return 'cannot';
		}
	},
	
	clearCanvas : function() { //清除整个画布
		this.ctx.clearRect(0,0,Ve.cvsWidth,Ve.cvsHeight);
	},
	
	getCanvasEl: function() {
		return Ext.get('myCanvas');
	},	
	
	getCanvas: function() {
		return this.getCanvasEl()? this.getCanvasEl().dom : null;
	},	
	
	get2dContext: function() {
		var canvas = this.getCanvas();
		return this.canvas ? this.canvas.getContext("2d") : null;
	},
	
	// Event Handlings	
	onDraw: function() {
		console.log('draw finished ...');
	},
	
	onSelect: function() {
		console.log('selected ...');
	},
	
	drawRec: function(x,y,w,h,t){ //画两种类别矩形的方法
		if(this.ctx){			
			this.ctx.strokeStyle="rgb(0,0,0)";	
			this.ctx.fillStyle="rgb(0,0,0)";
			if(t==0){
				this.ctx.strokeRect(x,y,w,h);
			}else if(t==1){
				this.ctx.fillRect(x,y,w,h);
			}			
		}
	},
	// Drawing	
	draw: function() {},
	
	beSelect: function(){  //呈现图形元素被选中时的效果
		if(this.ctx){
			this.ctx.strokeStyle="rgb(0,80,250)";
			this.ctx.beginPath();
			this.ctx.strokeRect(this.elX-3,this.elY-3,6,6);
			this.ctx.moveTo(this.elX+3,this.elY-1);
			this.ctx.lineTo(this.elX+this.elWidth-3,this.elY-1);
			this.ctx.strokeRect(this.elX+this.elWidth-3,this.elY-3,6,6);
			this.ctx.moveTo(this.elX+this.elWidth+1,this.elY+3);
			this.ctx.lineTo(this.elX+this.elWidth+1,this.elY+this.elHeight-3);
			this.ctx.strokeRect(this.elX+this.elWidth-3,this.elY+this.elHeight-3,6,6);
			this.ctx.moveTo(this.elX+this.elWidth-3,this.elY+this.elHeight+1);
			this.ctx.lineTo(this.elX+3,this.elY+this.elHeight+1);
			this.ctx.strokeRect(this.elX-3,this.elY+this.elHeight-3,6,6);
			this.ctx.moveTo(this.elX-1,this.elY+this.elHeight-3);
			this.ctx.lineTo(this.elX-1,this.elY+3);
			this.ctx.stroke();
			this.ctx.strokeStyle="rgb(0,0,0)";
		}
	}
});