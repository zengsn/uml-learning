// UmlShape.js
Ext.define('UmlShape', {
    extend: 'Ext.util.Observable',
	elX: null, 
	elY: null,
	selX: null,
	selY: null,
	elWidth: null,
	elHeight: null,
	cvs: null,
	ctx: null,
	elNum: null,
	constructor: function(config){
		config = config || {};
	//	Ve.elCount=Ve.elCount+1;
	//	Ve.elSelect=Ve.elSelect+1;
	//	console.log('elCount'+Ve.elCount);
	//	console.log('elSelect'+Ve.elSelect);
		this.elNum=Ve.elCount;
		// 2D Render Context
		this.cvs=Ext.getDom("myCanvas");
		this.ctx=this.cvs.getContext("2d");
		// Events
        this.addEvents({
			"click"  : true,
			"dbclick": true,
			"draw"   : true
        });
        this.listeners = config.listeners;
		
		// Default configs
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
		if ((this.status==Constants.STATUS_PK)&& this.isInside(this.getCXY(e))) { //处于初始状态且该元素被鼠标选中
			document.body.style.cursor = 'move';	
			Ve.elSelect=this.elNum;		
			console.log('elSelect :'+Ve.elSelect);
			console.log('this num is:'+this.elNum);		
			this.status=Constants.STATUS_M0;
			var xy=this.getCXY(e);						
		    this.selX=xy[0];
		    this.selY=xy[1];	
			console.log('downXY: ' + xy);					
		}
	},
	
	recordUp: function(e, t, o, op) { //鼠标弹起	    
		if (this.status==Constants.STATUS_M0) { 
			this.status=Constants.STATUS_PK;
		//	console.log('recordUp:'+this.status);
		} 
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
			/*if(this.canResizable(this.getCXY(e))!='cannot' && this.status==Constants.STATUS_M0){
				document.body.style.cursor='crosshair';
				var xy=this.getCXY(e);			
				var rz=this.canResizable(this.getCXY(e));
				//console.log('move0XY: ' + xy);
				//this.clearShape(this.elX,this.elY,this.elWidth,this.elHeight);				
				if(rz=='lefttop'){
					console.log('--------------:'+rz);
					this.elWidth=this.elX-xy[0]+this.elWidth;
					this.elHeight=this.elY-xy[1]+this.elHeight;
					this.elX=xy[0];
					this.elY=xy[1];
					this.restoreShape();			
					this.draw();		
				}else if(rz=='leftbottom'){
					console.log('--------------:'+rz);
					this.elWidth=this.elX-xy[0]+this.elWidth;
					this.elHeight=xy[1]-this.elY;
					this.elX=xy[0];
					this.elY=xy[1]-this.elHeight;
					this.restoreShape();			
					this.draw();
				}else if(rz=='righttop'){
					console.log('--------------:'+rz);					
					this.elWidth=xy[0]-this.elX;
					this.elHeight=this.elY-xy[1]+this.elHeight;
					this.elX=xy[0]-this.elWidth;
					this.elY=xy[1];
					this.restoreShape();			
					this.draw();
				}else if(rz=='rightbottom'){
					console.log('--------------:'+rz);
					this.elWidth=xy[0]-this.elX
					this.elHeight=xy[1]-this.elY;
					this.elX=xy[0]-this.elWidth;
					this.elY=xy[1]-this.elHeight;
					this.restoreShape();			
					this.draw();
				}											
			}else*/ if(this.status==Constants.STATUS_M0 && Ve.elSelect==this.elNum) {// 判断鼠标按下且移动就进行元素移动	
				document.body.style.cursor = 'move';	
				//console.log('recordMove: ' + this.status);	
				var xy=this.getCXY(e);			
				//console.log('move0XY: ' + xy);
				this.restoreShape();
				this.elX=xy[0]-this.selX+this.elX;
				this.elY=xy[1]-this.selY+this.elY;				
				this.draw();		
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
		if((xy[0]-6)<=this.elX && (xy[1]-6)<=this.elY){
			return 'lefttop';
		}else if((xy[0]-6)<=this.elX && (xy[1]+6)>=(this.elY+this.elHeight)){
			return 'leftbottom';
		}else if((xy[0]+6)>=(this.elX+this.elWidth) && (xy[1]-6)<=(this.elY)){
			return 'righttop';
		}else if((xy[0]+6)>=(this.elX+this.elWidth) && (xy[1]+6)>=(this.elY+this.elHeight)){
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
	
	drawRec: function(x,y,w,h,t){
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
	draw: function() {}		
});