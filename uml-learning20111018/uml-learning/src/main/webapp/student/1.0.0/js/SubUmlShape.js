// SubUmlShape.js
Ext.define('Actor', {
    extend: 'UmlShape',
    //alias : 'widget.Actor',   	
	//title : 'Actor',
	constructor: function(config){
		config = config || {};	
		this.elX=30;
		this.elY=30;
		this.elWidth=20;
		this.elHeight=50;
		// Events
        this.addEvents({
        });
		// Default configs
		Ext.apply(this, {
			listeners: {
				'draw'   : this.onDraw
			}
		});
		this.listeners = config.listeners;
        // Call our superclass constructor to complete construction process.
        Actor.superclass.constructor.call(this, config);
    },
	
	// Event Handlings	
	onDraw: function() {
		console.log('draw rect finished ...');		
	},

	// Drawing
	
	'draw': function() {  //xsm		
		//this.fireEvent('draw');	
		this.cd=true;
		if(this.ctx){			
			this.ctx.beginPath();
			this.ctx.arc(this.elX+10,this.elY+10,10,Math.PI/2,Math.PI*5/2,false);
			this.ctx.lineTo(this.elX+10,this.elY+40);
			this.ctx.lineTo(this.elX,this.elY+50);
			this.ctx.moveTo(this.elX,this.elY+30);
			this.ctx.lineTo(this.elX+10,this.elY+20);
			this.ctx.lineTo(this.elX+20,this.elY+30);
			this.ctx.moveTo(this.elX+20,this.elY+50);
			this.ctx.lineTo(this.elX+10,this.elY+40);
			this.ctx.closePath();
			this.ctx.stroke();
		}
	}					
});
Ext.define('UseCase', {
extend: 'UmlShape',
//alias : 'widget.UseCase',   	
//title : 'UseCase',
constructor: function(config){
	config = config || {};	
	this.elX=30;
	this.elY=30;
	this.elWidth=100;
	this.elHeight=70;
	// Events
    this.addEvents({
    });
	// Default configs
	Ext.apply(this, {
		listeners: {
			'draw'   : this.onDraw
		}
	});
	this.listeners = config.listeners;
    // Call our superclass constructor to complete construction process.
	UseCase.superclass.constructor.call(this, config);
},

// Event Handlings	
onDraw: function() {
	console.log('draw rect finished ...');		
},

recordMove: function(e, t, o, op) { //鼠标移动
	//console.log('recordMove: ' + this.status);
	if(this.mousepos==Constants.MOUSE_IN) {
		if(this.canResizable(this.getCXY(e))!='cannot' && Ve.elSelect==this.elNum && !this.cd){
			var cr=this.canResizable(this.getCXY(e));
			if(cr=='left' || cr=='right'){
				document.body.style.cursor='w-resize';
			}else if(cr=='top' || cr=='bottom'){
				document.body.style.cursor='n-resize';
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
			//this.clearShape(this.elX,this.elY,this.elWidth,this.elHeight);				
			if(this.rz=='left'){
				document.body.style.cursor='w-resize';
				console.log('--------------:'+this.rz);
				this.elWidth=this.elX-xy[0]+this.elWidth;
				this.elX=xy[0];
				this.restoreShape();			
				this.draw();		
			}else if(this.rz=='right'){
				document.body.style.cursor='e-resize';
				console.log('--------------:'+this.rz);
				this.elWidth=xy[0]-this.elX;
				this.elX=xy[0]-this.elWidth;
				this.restoreShape();			
				this.draw();
			}else if(this.rz=='top'){
				document.body.style.cursor='n-resize';
				console.log('--------------:'+this.rz);					
				this.elHeight=this.elY-xy[1]+this.elHeight*9/8;
				this.elY=xy[1]-this.elHeight/8;
				this.restoreShape();			
				this.draw();
			}else if(this.rz=='bottom'){
				document.body.style.cursor='s-resize';
				console.log('--------------:'+this.rz);
				this.elHeight=xy[1]-this.elY+this.elHeight/8;
				this.elY=xy[1]-this.elHeight*7/8;
				this.restoreShape();			
				this.draw();
			}											
		}else if(this.status==Constants.STATUS_M0 && Ve.elSelect==this.elNum) {// 图形移动	
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

canResizable: function(xy){ //判断是否进入可拖动改变大小的区域
	if(xy[0]<=(this.elX+3) && xy[0]>=(this.elX-3) && xy[1]<=(this.elY+this.elHeight) && xy[1]>=this.elY){
		return 'left';
	}else if(xy[0]<=(this.elX+this.elWidth+3) && xy[0]>=(this.elX+this.elWidth-3) && xy[1]<=(this.elY+this.elHeight) && xy[1]>=this.elY){
		return 'right';
	}else if(xy[1]<=(this.elY+3+this.elHeight/8) && xy[1]>=(this.elY-3+this.elHeight/8) && xy[0]<=(this.elX+this.elWidth) && xy[0]>=this.elX){
		return 'top';
	}else if(xy[1]<=(this.elY+this.elHeight+3-this.elHeight/8) && xy[1]>=(this.elY+this.elHeight-3-this.elHeight/8) && xy[0]<=(this.elX+this.elWidth) && xy[0]>=this.elX){
		return 'bottom';
	}else{
		return 'cannot';
	}
},
// Drawing

'draw': function() {  //xsm		
	//this.fireEvent('draw');			
	if(this.ctx){			
		this.ctx.beginPath();		  
		this.ctx.moveTo(this.elX,this.elY+this.elHeight/2); // A1		  
		this.ctx.bezierCurveTo(
				this.elX, this.elY, // C1
				this.elX+this.elWidth, this.elY, // C2
				this.elX+this.elWidth, this.elY+this.elHeight/2); // A2
		this.ctx.bezierCurveTo(
				this.elX+this.elWidth, this.elY+this.elHeight, // C3
				this.elX, this.elY+this.elHeight, // C4
				this.elX,this.elY+this.elHeight/2); // A1	
//		this.drawRec(this.elX,this.elY,this.elWidth,this.elHeight,0);
		this.ctx.stroke();
		this.ctx.closePath();	
	}
}					
});
Ext.define('System', {
    extend: 'UmlShape',
    //alias : 'widget.System',   	
	//title : 'System',
	constructor: function(config){
		config = config || {};	
		this.elX=30;
		this.elY=30;
		this.elWidth=100;
		this.elHeight=100;
		// Events
        this.addEvents({	
        });
		// Default configs
		Ext.apply(this, {
			listeners: {
				'draw'   : this.onDraw
			}
		});
		this.listeners = config.listeners;
        // Call our superclass constructor to complete construction process.
		System.superclass.constructor.call(this, config);
    },
	
	// Event Handlings	
	onDraw: function() {
		console.log('draw rect finished ...');		
	},
	
	// Drawing
	
	'draw': function() {  		
		//this.fireEvent('draw');	;			
		this.drawRec(this.elX,this.elY,this.elWidth,this.elHeight,0);	
	}					
});
Ext.define('SimpleClass', {
    extend: 'UmlShape',
    //alias : 'widget.SimpleClass',   	
	//title : 'SimpleClass',
	constructor: function(config){
		config = config || {};	
		this.elX=30;
		this.elY=30;
		this.elWidth=100;
		this.elHeight=30;
		// Events
        this.addEvents({	
        });
		// Default configs
		Ext.apply(this, {
			listeners: {
				'draw'   : this.onDraw
			}
		});
		this.listeners = config.listeners;
        // Call our superclass constructor to complete construction process.
		SimpleClass.superclass.constructor.call(this, config);
    },
	
	// Event Handlings	
	onDraw: function() {
		console.log('draw rect finished ...');		
	},

	// Drawing
	
	'draw': function() {  //xsm		
		//this.fireEvent('draw');		
		this.drawRec(this.elX,this.elY,this.elWidth,this.elHeight,0);	
	}					
});
//
Ext.define('Note', {
    extend: 'UmlShape',
    //alias : 'widget.Note',   	
	//title : 'Note',
	constructor: function(config){
		config = config || {};	
		this.elX=30;
		this.elY=30;
		this.elWidth=150;
		this.elHeight=100;
		// Events
        this.addEvents({	
        });
		// Default configs
		Ext.apply(this, {
			listeners: {
				'draw'   : this.onDraw
			}
		});
		this.listeners = config.listeners;
        // Call our superclass constructor to complete construction process.
		Note.superclass.constructor.call(this, config);
    },
	
	// Event Handlings	
	onDraw: function() {
		console.log('draw rect finished ...');		
	},

	// Drawing
	
	'draw': function() {  //xsm		
		//this.fireEvent('draw');	
		if(this.ctx){			
			this.ctx.beginPath();
			this.ctx.moveTo(this.elX+this.elWidth-20,this.elY);
			this.ctx.lineTo(this.elX,this.elY);
			this.ctx.lineTo(this.elX,this.elY+this.elHeight);
			this.ctx.lineTo(this.elX+this.elWidth,this.elY+this.elHeight);
			this.ctx.lineTo(this.elX+this.elWidth,this.elY+20);
			this.ctx.lineTo(this.elX+this.elWidth-20,this.elY);
			this.ctx.lineTo(this.elX+this.elWidth-20,this.elY+20);
			this.ctx.lineTo(this.elX+this.elWidth,this.elY+20);
			this.ctx.closePath();
			this.ctx.stroke();
		}
	}					
});
//
//Ext.define('Line', {
//    extend: 'UmlShape',
//    //alias : 'widget.Line',   	
//	//title : 'Line',
//    fX: null, //初始坐标
//    fY: null,
//    sX: null, //终点坐标
//    sY: null,
//    lt: 0, //划线类型
//	constructor: function(config){
//		config = config || {};	
//		this.elX=30;
//		this.elY=30;
//		this.elWidth=50;
//		this.elHeight=50;
//		this.fX=this.elX;
//		this.fY=this.elY;
//		this.sX=this.elX+this.elWidth;
//		this.sY=this.elY+this.elHeight;
//		// Events
//        this.addEvents({	
//        });
//		// Default configs
//		Ext.apply(this, {
//			listeners: {
//				'draw'   : this.onDraw
//			}
//		});
//		this.listeners = config.listeners;
//        // Call our superclass constructor to complete construction process.
//		Line.superclass.constructor.call(this, config);
//    },
//	
//	// Event Handlings	
//	onDraw: function() {
//		console.log('draw rect finished ...');		
//	},
//	
//	recordMove: function(e, t, o, op) { //鼠标移动
//		//console.log('recordMove: ' + this.status);
//		if(this.mousepos==Constants.MOUSE_IN) {
//			if(this.canResizable(this.getCXY(e),this.lt)!='cannot' && Ve.elSelect==this.elNum && !this.cd){
//				var cr=this.canResizable(this.getCXY(e),this.lt);
//				if(this.lt==0){
//					if(cr=='lefttop' || cr=='rightbottom'){
//						document.body.style.cursor='nw-resize';
//					}
//				}else if(this.lt==1){
//					if(cr=='leftbottom' || cr=='righttop'){
//						document.body.style.cursor='sw-resize';
//					}
//				}
//			}
//			if(this.status==Constants.STATUS_PK && this.canResizable(this.getCXY(e),this.lt)=='cannot' && Ve.elSelect==this.elNum){
//				document.body.style.cursor = 'default';
//			}
//			if((this.rz!='cannot' || this.canResizable(this.getCXY(e),this.lt)!='cannot') && this.status==Constants.STATUS_M0 && !this.cd  && Ve.elSelect==this.elNum){//拉动图形放大缩小
//				var xy=this.getCXY(e);
//				if(this.rz=='cannot'){
//					this.rz=this.canResizable(this.getCXY(e),this.lt);
//				}
//				//console.log('move0XY: ' + xy);
//				if(this.rz=='lefttop' || this.rz=='leftbottom'){
//					if(this.rz!='leftbottom'){
//						document.body.style.cursor='nw-resize';
//					}else{
//						document.body.style.cursor='sw-resize';
//					}
//					console.log('--------------:'+this.rz);
//					if(xy[0]<=this.sX && xy[1]>=this.sY){
//						this.oneT(this.sX,this.sY,xy);
//					}else if(xy[0]<=this.sX){
//						this.twoT(this.sX,this.sY,xy);
//					}else if(xy[0]>this.sX && xy[1]>=this.sY){
//						this.threeT(this.sX,this.sY,xy);
//					}else if(xy[0]>this.sX){
//						this.fourT(this.sX,this.sY,xy);
//					}
//					this.fX=xy[0];
//					this.fY=xy[1];
//					this.restoreShape();			
//					this.draw();		
//				}else if(this.rz=='rightbottom' || this.rz=='righttop'){
//					if(this.rz!='righttop'){
//						document.body.style.cursor='se-resize';
//					}else{
//						document.body.style.cursor='ne-resize';
//					}
//					console.log('--------------:'+this.rz);
//					if(xy[0]>=this.fX && xy[1]<=this.fY){
//						this.fourT(this.fX,this.fY,xy);
//					}else if(xy[0]>=this.fX){
//						this.threeT(this.fX,this.fY,xy);
//					}else if(xy[0]<this.fX && xy[1]<=this.fY){
//						this.twoT(this.fX,this.fY,xy);
//					}else if(xy[0]<this.fX){
//						this.oneT(this.fX,this.fY,xy);
//					}
//					this.sX=xy[0];
//					this.sY=xy[1];
//					this.restoreShape();			
//					this.draw();
//				}											
//			}else if(this.status==Constants.STATUS_M0 && Ve.elSelect==this.elNum) {// 图形移动	
//				document.body.style.cursor = 'move';	
//				//console.log('recordMove: ' + this.status);	
//				var xy=this.getCXY(e);			
////				console.log('move0XY: ' + xy);
//				this.restoreShape();
//				this.elX=xy[0]-this.selX+this.elX;
//				this.elY=xy[1]-this.selY+this.elY;	
//				if(this.lt==1){
//					this.cngV(this.fX,this.sX);
//					this.fX=this.elX;
//					this.fY=this.elY+this.elHeight;
//					this.sX=this.elX+this.elWidth;
//					this.sY=this.elY;
//				}else{
//					this.cngV(this.fX,this.sX);
//					this.fX=this.elX;
//					this.fY=this.elY;
//					this.sX=this.elX+this.elWidth;
//					this.sY=this.elY+this.elHeight;
//				}
//				this.draw();		
//				this.selX=xy[0];
//				this.selY=xy[1];				
//			}			
//		}
//	},
//	canResizable: function(xy,lt){ //判断是否进入可拖动改变大小的区域
//		if(lt==0){
//			if(xy[0]<=(this.elX+6) && xy[0]>=this.elX && xy[1]<=(this.elY+6) && xy[1]>=this.elY){
//				return 'lefttop';
//			}else if(xy[0]>=(this.elX+this.elWidth-6) && xy[0]<=(this.elX+this.elWidth) && xy[1]>=(this.elY+this.elHeight-6) && xy[1]<=(this.elY+this.elHeight)){
//				return 'rightbottom';
//			}else{
//				return 'cannot';
//			}
//		}else if(lt==1){
//			if(xy[0]<=(this.elX+6) && xy[0]>=this.elX && xy[1]>=(this.elY+this.elHeight-6) && xy[1]<=(this.elY+this.elHeight)){
//				return 'leftbottom';
//			}else if(xy[0]>=(this.elX+this.elWidth-6) && xy[0]<=(this.elX+this.elWidth) && xy[1]<=(this.elY+6) && xy[1]>=this.elY){
//				return 'righttop';
//			}else{
//				return 'cannot';
//			}
//		}
//	},
//	cngV: function(a,b){
//		if(a>=b){
//			var m=0;
//			m=a;
//			a=b;
//			b=m;
//		}
//	},
//	oneT: function(a,b,c){ 
//		this.elWidth=a-c[0];
//		this.elHeight=c[1]-b;
//		this.elX=c[0];
//		this.elY=c[1]-this.elHeight;
//		a=c[0]+this.elWidth;
//		b=this.elY;
//		this.lt=1;
//	},
//    twoT: function(a,b,c){ 
//    	this.elWidth=a-c[0];
//		this.elHeight=b-c[1];
//		this.elX=c[0];
//		this.elY=c[1];
//		a=c[0]+this.elWidth;
//		b=c[1]+this.elHeight;
//		this.lt=0;
//    },
//	threeT: function(a,b,c){ 
//		this.elWidth=c[0]-a;
//		this.elHeight=c[1]-b;
//		this.elX=c[0]-this.elWidth;
//		this.elY=c[1]-this.elHeight;
//		a=this.elX;
//		b=this.elY;	
//		this.lt=0;
//	},
//	fourT: function(a,b,c){ 
//		this.elWidth=c[0]-a;
//		this.elHeight=b-c[1];
//		this.elX=c[0]-this.elWidth;
//		this.elY=c[1];
//		a=this.elX;
//		b=c[1]+this.elHeight;
//		this.lt=1;
//	},
//	// Drawing
//	
//	'draw': function() {  //xsm		
//		//this.fireEvent('draw');
//		if(this.ctx){			
//			this.ctx.beginPath();
//			this.ctx.moveTo(this.fX,this.fY);
//			this.ctx.lineTo(this.sX,this.sY);
//			this.ctx.stroke();
//		}
//	}					
//});

Ext.define('Line', {
    extend: 'UmlShape',
    //alias : 'widget.Line',   	
	//title : 'Line',
    fX: 30, //初始坐标
    fY: 30,
    sX: 60, //
    sY: 60,
    tX: 90,
    tY: 90,
    foX: 120,
    foY: 120,
//    lt: 0, //划线类型
	constructor: function(config){
		config = config || {};	
//		this.elX=30;
//		this.elY=30;
//		this.elWidth=12;
//		this.elHeight=12;
		// Events
        this.addEvents({	
        });
		// Default configs
		Ext.apply(this, {
			listeners: {
				'draw'   : this.onDraw
			}
		});
		this.listeners = config.listeners;
        // Call our superclass constructor to complete construction process.
		Line.superclass.constructor.call(this, config);
    },
	
	// Event Handlings	
	onDraw: function() {
		console.log('draw rect finished ...');		
	},
	recordDown: function(e, t, o, op) {  //鼠标按下
		//console.log('recordDown:'+this.status+'---'+this.elNum);
		var xy=this.getCXY(e);
		if (this.status==Constants.STATUS_PK && (this.canResizable(this.getCXY(e))!='cannot' || this.isInside(xy))) { //处于初始状态且该元素被鼠标选中
			this.status=Constants.STATUS_M0;
			if(this.isInside(xy)){
				Ve.elSelect=this.elNum;
				console.log('========= 进入---------');
			}
			console.log('elSelect :'+Ve.elSelect);
			console.log('this num is:'+this.elNum);	
			this.selX=xy[0];
		    this.selY=xy[1];	
			console.log('downXY: ' + xy);		
			if(Ve.elSelect==this.elNum){
				this.restoreShape();
				this.draw();
				this.beSelect();
			}
		}else{
			this.restoreShape();
			this.draw();
		}
	},
	
	recordMove: function(e, t, o, op) { //鼠标移动
		//console.log('recordMove: ' + this.status);
		if(this.mousepos==Constants.MOUSE_IN) {
			if(this.canResizable(this.getCXY(e))!='cannot' && !this.cd){
				var cr=this.canResizable(this.getCXY(e));
				if(cr!='cannot'){
					document.body.style.cursor='w-resize';
				}
			}
			if(this.status==Constants.STATUS_PK && this.canResizable(this.getCXY(e),this.lt)=='cannot'){
				document.body.style.cursor = 'default';
			}
			if((this.rz!='cannot' || this.canResizable(this.getCXY(e))!='cannot') && this.status==Constants.STATUS_M0 && !this.cd){//拉动图形放大缩小
				var xy=this.getCXY(e);
				if(this.rz=='cannot'){
					this.rz=this.canResizable(this.getCXY(e));
				}
				//console.log('move0XY: ' + xy);
				if(this.rz=='first'){
					this.redrawLine(xy[0],xy[1],'f');		
				}else if(this.rz=='second'){
					this.redrawLine(xy[0],xy[1],'s');
				}else if(this.rz=='third'){
					this.redrawLine(xy[0],xy[1],'t');
				}else if(this.rz=='four'){
					this.redrawLine(xy[0],xy[1],'fo');
				}
				this.beSelect();
			}else if(this.status==Constants.STATUS_M0 && Ve.elSelect==this.elNum) {// 图形移动	
				document.body.style.cursor = 'move';	
				//console.log('recordMove: ' + this.status);	
				var xy=this.getCXY(e);			
//				console.log('move0XY: ' + xy);
				this.restoreShape();
				this.fX=xy[0]-this.selX+this.fX;
				this.fY=xy[1]-this.selY+this.fY;	
				this.sX=xy[0]-this.selX+this.sX;
				this.sY=xy[1]-this.selY+this.sY;	
				this.tX=xy[0]-this.selX+this.tX;
				this.tY=xy[1]-this.selY+this.tY;	
				this.foX=xy[0]-this.selX+this.foX;
				this.foY=xy[1]-this.selY+this.foY;	
				this.draw();	
				this.beSelect();
				this.selX=xy[0];
				this.selY=xy[1];	
			}		
		}
	},
	
	isInside: function(xy) { //判断当前鼠标是否在某个元素中
		var x=this.checkPoint(this.sX,this.tX);
		var y=this.checkPoint(this.sY,this.tY);
		if(xy[0]>=x && xy[0]<=(16+x) && xy[1]>=y && xy[1]<=(16+y)){
			console.log('在图形中 ');
			return true;
		}else{
			return false;
		}
	},
	
	canResizable: function(xy){ //判断是否进入可拖动改变大小的区域
		if(xy[0]<=(this.fX+3) && xy[0]>=this.fX-3 && xy[1]<=(this.fY+3) && xy[1]>=this.fY-3){
			return 'first';
		}else if(xy[0]<=(this.sX+3) && xy[0]>=this.sX-3 && xy[1]<=(this.sY+3) && xy[1]>=this.sY-3){
			return 'second';
		}else if(xy[0]<=(this.tX+3) && xy[0]>=this.tX-3 && xy[1]<=(this.tY+3) && xy[1]>=this.tY-3){
			return 'third';
		}else if(xy[0]<=(this.foX+3) && xy[0]>=this.foX-3 && xy[1]<=(this.foY+3) && xy[1]>=this.foY-3){
			return 'four';
		}else{
			return 'cannot';
		}
	},
	redrawLine: function(a,b,c){
		console.log('--------------:'+this.rz);
		if(c=='f'){
			this.fX=a;
			this.fY=b;
		}else if(c=='s'){
			this.sX=a;
			this.sY=b;
		}else if(c=='t'){
			this.tX=a;
			this.tY=b;
		}else if(c=='fo'){
			this.foX=a;
			this.foY=b;
		}
		this.restoreShape();		
		this.draw();
	},
	
	beSelect: function(){  //呈现图形元素被选中时的效果
		if(this.ctx){
			this.ctx.strokeStyle="rgb(0,80,250)";
			this.ctx.beginPath();
			this.ctx.strokeRect(this.fX-3,this.fY-3,6,6);
			this.ctx.strokeRect(this.sX-3,this.sY-3,6,6);
			this.ctx.strokeRect(this.tX-3,this.tY-3,6,6);
			this.ctx.strokeRect(this.foX-3,this.foY-3,6,6);
			this.ctx.strokeRect(this.checkPoint(this.sX,this.tX),this.checkPoint(this.sY,this.tY),16,16); //可实现移动图形的矩形框
//			this.ctx.moveTo(this.sX-3,this.sY-3);
			this.ctx.stroke();
			this.ctx.strokeStyle="rgb(0,0,0)";
		}
	},
	
	checkPoint: function(a,b){ //检查两个点的某一维坐标的比较大小并返回计算出的构成矩形框的初始坐标
		if(a>=b){
			return b+(a-b)/2-8;
		}else{
			return a+(b-a)/2-8;
		}
		
	},
	// Drawing
	
	'draw': function() {  //xsm		
		//this.fireEvent('draw');
		if(this.ctx){			
			this.ctx.beginPath();
			this.ctx.moveTo(this.fX,this.fY);
			this.ctx.lineTo(this.sX,this.sY);
			this.ctx.lineTo(this.tX,this.tY);
			this.ctx.lineTo(this.foX,this.foY);
			this.ctx.stroke();
		}
	}					
});


Ext.define('Text', {
    extend: 'UmlShape',
    //alias : 'widget.Text',   	
	//title : 'Text',
    txt: 'text',
    b: 0,
	constructor: function(config){
		config = config || {};		
		this.elX=30;
		this.elY=30;
		this.elWidth=50;
		this.elHeight=20;
		// Events
        this.addEvents({
        });
		// Default configs
		Ext.apply(this, {
			listeners: {
				'draw'   : this.onDraw
			}
		});
		this.listeners = config.listeners;
        // Call our superclass constructor to complete construction process.
		Text.superclass.constructor.call(this, config);
    },
	
	// Event Handlings	
    onEditting: function(e, t, o, op) { //鼠标进入画布
		this.mousepos = Constants.MOUSE_IN;
		if(this.b==1){
			this.restoreShape();
			this.draw();
			this.b=0;
		}	
		console.log('onEditting: ' + e);		
	},
	
	onDbclick: function(e, t, o, op){
		//console.log('dbclick'+e);
		if ((this.status==Constants.STATUS_PK)&& this.isInside(this.getCXY(e))) { //处于初始状态且该元素被鼠标选中
			Ve.elSelect=this.elNum;	
		//	console.log('doubleclick__________:');
		//	console.log('elSelect :'+Ve.elSelect);
		//	console.log('this num is:'+this.elNum);		
			this.b=1;
			Ext.Msg.prompt('提示', '请输入文本内容', function(btn, text){
				if (btn == 'ok'){		
					Ve.elArray[Ve.elSelect].txt= text;		
				}
			});			
		}
	},
	
	// Drawing
	
	'draw': function() {  //xsm		
		//this.fireEvent('draw');	
		this.cd=true;
		if(this.ctx){			
			//this.ctx.beginPath();
			this.ctx.font = "12pt Arial";
			this.ctx.textBaseline = "top";
			this.ctx.textAlign = "left";
			this.ctx.fillText(this.txt, this.elX, this.elY, this.txt.length+100);
			//this.setWH(this.text.length, 5);
			//this.setDwh(this.width, this.height);
			//this.ctx.stroke();
		}
	}					
});

Ext.define('DottedLine', {
	 extend: 'UmlShape',
//	 mixins : 'UmlShape',
	    //alias : 'widget.Line',   	
		//title : 'Line',
	    fX: 30, //初始坐标
	    fY: 30,
	    sX: 60, //
	    sY: 60,
	    tX: 90,
	    tY: 90,
	    foX: 120,
	    foY: 120,
//	    lt: 0, //划线类型
		constructor: function(config){
			config = config || {};	
//			this.elX=30;
//			this.elY=30;
//			this.elWidth=12;
//			this.elHeight=12;
			// Events
	        this.addEvents({	
	        });
			// Default configs
			Ext.apply(this, {
				listeners: {
					'draw'   : this.onDraw
				}
			});
			this.listeners = config.listeners;
	        // Call our superclass constructor to complete construction process.
			DottedLine.superclass.constructor.call(this, config);
	    },
		
		// Event Handlings	
		onDraw: function() {
			console.log('draw rect finished ...');		
		},
		recordDown: function(e, t, o, op) {  //鼠标按下
			//console.log('recordDown:'+this.status+'---'+this.elNum);
			var xy=this.getCXY(e);
			if (this.status==Constants.STATUS_PK && (this.canResizable(this.getCXY(e))!='cannot' || this.isInside(xy))) { //处于初始状态且该元素被鼠标选中
				this.status=Constants.STATUS_M0;
				if(this.isInside(xy)){
					Ve.elSelect=this.elNum;
					console.log('========= 进入---------');
				}
				console.log('elSelect :'+Ve.elSelect);
				console.log('this num is:'+this.elNum);	
				this.selX=xy[0];
			    this.selY=xy[1];	
				console.log('downXY: ' + xy);		
				if(Ve.elSelect==this.elNum){
					this.restoreShape();
					this.draw();
					this.beSelect();
				}
			}else{
				this.restoreShape();
				this.draw();
			}
		},
		
		recordMove: function(e, t, o, op) { //鼠标移动
			//console.log('recordMove: ' + this.status);
			if(this.mousepos==Constants.MOUSE_IN) {
				if(this.canResizable(this.getCXY(e))!='cannot' && !this.cd){
					var cr=this.canResizable(this.getCXY(e));
					if(cr!='cannot'){
						document.body.style.cursor='w-resize';
					}
				}
				if(this.status==Constants.STATUS_PK && this.canResizable(this.getCXY(e),this.lt)=='cannot'){
					document.body.style.cursor = 'default';
				}
				if((this.rz!='cannot' || this.canResizable(this.getCXY(e))!='cannot') && this.status==Constants.STATUS_M0 && !this.cd){//拉动图形放大缩小
					var xy=this.getCXY(e);
					if(this.rz=='cannot'){
						this.rz=this.canResizable(this.getCXY(e));
					}
					//console.log('move0XY: ' + xy);
					if(this.rz=='first'){
						this.redrawLine(xy[0],xy[1],'f');		
					}else if(this.rz=='second'){
						this.redrawLine(xy[0],xy[1],'s');
					}else if(this.rz=='third'){
						this.redrawLine(xy[0],xy[1],'t');
					}else if(this.rz=='four'){
						this.redrawLine(xy[0],xy[1],'fo');
					}
					this.beSelect();
				}else if(this.status==Constants.STATUS_M0 && Ve.elSelect==this.elNum) {// 图形移动	
					document.body.style.cursor = 'move';	
					//console.log('recordMove: ' + this.status);	
					var xy=this.getCXY(e);			
//					console.log('move0XY: ' + xy);
					this.restoreShape();
					this.fX=xy[0]-this.selX+this.fX;
					this.fY=xy[1]-this.selY+this.fY;	
					this.sX=xy[0]-this.selX+this.sX;
					this.sY=xy[1]-this.selY+this.sY;	
					this.tX=xy[0]-this.selX+this.tX;
					this.tY=xy[1]-this.selY+this.tY;	
					this.foX=xy[0]-this.selX+this.foX;
					this.foY=xy[1]-this.selY+this.foY;	
					this.draw();	
					this.beSelect();
					this.selX=xy[0];
					this.selY=xy[1];	
				}		
			}
		},
		
		isInside: function(xy) { //判断当前鼠标是否在某个元素中
			var x=this.checkPoint(this.sX,this.tX);
			var y=this.checkPoint(this.sY,this.tY);
			if(xy[0]>=x && xy[0]<=(16+x) && xy[1]>=y && xy[1]<=(16+y)){
				console.log('在图形中 ');
				return true;
			}else{
				return false;
			}
		},
		
		canResizable: function(xy){ //判断是否进入可拖动改变大小的区域
			if(xy[0]<=(this.fX+3) && xy[0]>=this.fX-3 && xy[1]<=(this.fY+3) && xy[1]>=this.fY-3){
				return 'first';
			}else if(xy[0]<=(this.sX+3) && xy[0]>=this.sX-3 && xy[1]<=(this.sY+3) && xy[1]>=this.sY-3){
				return 'second';
			}else if(xy[0]<=(this.tX+3) && xy[0]>=this.tX-3 && xy[1]<=(this.tY+3) && xy[1]>=this.tY-3){
				return 'third';
			}else if(xy[0]<=(this.foX+3) && xy[0]>=this.foX-3 && xy[1]<=(this.foY+3) && xy[1]>=this.foY-3){
				return 'four';
			}else{
				return 'cannot';
			}
		},
		redrawLine: function(a,b,c){
			console.log('--------------:'+this.rz);
			if(c=='f'){
				this.fX=a;
				this.fY=b;
			}else if(c=='s'){
				this.sX=a;
				this.sY=b;
			}else if(c=='t'){
				this.tX=a;
				this.tY=b;
			}else if(c=='fo'){
				this.foX=a;
				this.foY=b;
			}
			this.restoreShape();		
			this.draw();
		},
		
		beSelect: function(){  //呈现图形元素被选中时的效果
			if(this.ctx){
				this.ctx.strokeStyle="rgb(0,80,250)";
				this.ctx.beginPath();
				this.ctx.strokeRect(this.fX-3,this.fY-3,6,6);
				this.ctx.strokeRect(this.sX-3,this.sY-3,6,6);
				this.ctx.strokeRect(this.tX-3,this.tY-3,6,6);
				this.ctx.strokeRect(this.foX-3,this.foY-3,6,6);
				this.ctx.strokeRect(this.checkPoint(this.sX,this.tX),this.checkPoint(this.sY,this.tY),16,16); //可实现移动图形的矩形框
//				this.ctx.moveTo(this.sX-3,this.sY-3);
				this.ctx.stroke();
				this.ctx.strokeStyle="rgb(0,0,0)";
			}
		},
		
		checkPoint: function(a,b){ //检查两个点的某一维坐标的比较大小并返回计算出的构成矩形框的初始坐标
			if(a>=b){
				return b+(a-b)/2-8;
			}else{
				return a+(b-a)/2-8;
			}
			
		},
		// Drawing
	    drawDottedLine: function(a,b,c,d,ctx){
	    	var len=Math.sqrt(Math.pow(c-a,2)+Math.pow(d-b,2));
	    	var s=len/5;
	    	for(var i=0;i<s;i++){
	    		if((i+1)%2!=0){
	    			this.ctx.lineTo((a/s)*(i+1),(b/s)*(i+1));
	    		}else{
	    			this.ctx.moveTo((a/s)*(i+1),(b/s)*(i+1));
	    		}
	    	}
	    }, 
		'draw': function() {  //xsm		
			//this.fireEvent('draw');
			console.log(this.drawDottedLine(this.fX,this.fY,this.sX,this.sY));
			if(this.ctx){			
				this.ctx.beginPath();
				this.ctx.moveTo(this.fX,this.fY);
//				this.ctx.lineTo(this.sX,this.sY);
//				this.ctx.lineTo(this.tX,this.tY);
//				this.ctx.lineTo(this.foX,this.foY);
				this.drawDottedLine(this.fX,this.fY,this.sX,this.sY,this.ctx);
//				this.drawDottedLine(this.sX,this.sY,this.tX,this.tY,this.ctx);
//				this.drawDottedLine(this.tX,this.tY,this.foX,this.foY,this.ctx);
				this.ctx.stroke();
			}
		}					
});

Ext.define('Condition', {
    extend: 'UmlShape',
    //alias : 'widget.Condition',   	
	//title : 'Condition',
	constructor: function(config){
		config = config || {};		
		this.elX=30;
		this.elY=30;
		this.elWidth=28;
		this.elHeight=28;
		// Events
        this.addEvents({	
        });
		// Default configs
		Ext.apply(this, {
			listeners: {
				'draw'   : this.onDraw
			}
		});
		this.listeners = config.listeners;
        // Call our superclass constructor to complete construction process.
		Condition.superclass.constructor.call(this, config);
    },
	
	// Event Handlings	
	onDraw: function() {
		console.log('draw rect finished ...');		
	},

	recordMove: function(e, t, o, op) { //鼠标移动
		//console.log('recordMove: ' + this.status);
		if(this.mousepos==Constants.MOUSE_IN) {
			if(this.canResizable(this.getCXY(e))!='cannot' && Ve.elSelect==this.elNum && !this.cd){
				var cr=this.canResizable(this.getCXY(e));
				if(cr=='left' || cr=='right'){
					document.body.style.cursor='w-resize';
				}else if(cr=='top' || cr=='bottom'){
					document.body.style.cursor='n-resize';
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
				//this.clearShape(this.elX,this.elY,this.elWidth,this.elHeight);				
				if(this.rz=='left'){
					document.body.style.cursor='w-resize';
					console.log('--------------:'+this.rz);
					this.elWidth=this.elX-xy[0]+this.elWidth;
					this.elX=xy[0];
					this.restoreShape();			
					this.draw();		
				}else if(this.rz=='right'){
					document.body.style.cursor='e-resize';
					console.log('--------------:'+this.rz);
					this.elWidth=xy[0]-this.elX;
					this.elX=xy[0]-this.elWidth;
					this.restoreShape();			
					this.draw();
				}else if(this.rz=='top'){
					document.body.style.cursor='n-resize';
					console.log('--------------:'+this.rz);					
					this.elHeight=this.elY-xy[1]+this.elHeight;
					this.elY=xy[1];
					this.restoreShape();			
					this.draw();
				}else if(this.rz=='bottom'){
					document.body.style.cursor='s-resize';
					console.log('--------------:'+this.rz);
					this.elHeight=xy[1]-this.elY;
					this.elY=xy[1]-this.elHeight;
					this.restoreShape();			
					this.draw();
				}											
			}else if(this.status==Constants.STATUS_M0 && Ve.elSelect==this.elNum) {// 图形移动	
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

	canResizable: function(xy){ //判断是否进入可拖动改变大小的区域
		if(xy[0]<=(this.elX+3) && xy[0]>=(this.elX-3) && xy[1]<=(this.elY+this.elHeight) && xy[1]>=this.elY){
			return 'left';
		}else if(xy[0]<=(this.elX+this.elWidth+3) && xy[0]>=(this.elX+this.elWidth-3) && xy[1]<=(this.elY+this.elHeight) && xy[1]>=this.elY){
			return 'right';
		}else if(xy[1]<=(this.elY+3) && xy[1]>=(this.elY-3) && xy[0]<=(this.elX+this.elWidth) && xy[0]>=this.elX){
			return 'top';
		}else if(xy[1]<=(this.elY+this.elHeight+3) && xy[1]>=(this.elY+this.elHeight-3) && xy[0]<=(this.elX+this.elWidth) && xy[0]>=this.elX){
			return 'bottom';
		}else{
			return 'cannot';
		}
	},
	// Drawing
	
	'draw': function() {  //xsm		
		//this.fireEvent('draw');	
		if(this.ctx){			
			this.ctx.beginPath();
			this.ctx.moveTo(this.elX+this.elWidth/2,this.elY);
			this.ctx.lineTo(this.elX,this.elY+this.elHeight/2);
			this.ctx.lineTo(this.elX+this.elWidth/2,this.elY+this.elHeight);
			this.ctx.lineTo(this.elX+this.elWidth,this.elY+this.elHeight/2);
			this.ctx.lineTo(this.elX+this.elWidth/2,this.elY);
			this.ctx.closePath();
			this.ctx.stroke();
		}
	}					
});
Ext.define('Interface', {
    extend: 'UmlShape',
    //alias : 'widget.Interface',   	
	//title : 'Interface',
	constructor: function(config){
		config = config || {};		
		this.elX=30;
		this.elY=30;
		this.elWidth=60;
		this.elHeight=30;
		// Events
        this.addEvents({	
        });
		// Default configs
		Ext.apply(this, {
			listeners: {
				'draw'   : this.onDraw
			}
		});
		this.listeners = config.listeners;
        // Call our superclass constructor to complete construction process.
		Interface.superclass.constructor.call(this, config);
    },
	
	// Event Handlings	
	onDraw: function() {
		console.log('draw rect finished ...');		
	},
	
	// Drawing
	
	'draw': function() {  //xsm		
		//this.fireEvent('draw');
		this.cd=true;
		if(this.ctx){			
			this.ctx.beginPath();		
			this.ctx.arc(this.elX+30,this.elY+10,10,Math.PI/2,Math.PI*5/2,false);
			this.ctx.moveTo(this.elX,this.elY+30);
			this.ctx.lineTo(this.elX+60,this.elY+30);
			this.ctx.stroke();
		}
	}					
});
Ext.define('Class', {
    extend: 'UmlShape',
    //alias : 'widget.Class',   	
	//title : 'Class',
	constructor: function(config){
		config = config || {};		
		this.elX=30;
		this.elY=30;
		this.elWidth=100;
		this.elHeight=100;
		// Events
        this.addEvents({
        });
		// Default configs
		Ext.apply(this, {
			listeners: {
				'draw'   : this.onDraw
			}
		});
		this.listeners = config.listeners;
        // Call our superclass constructor to complete construction process.
		Class.superclass.constructor.call(this, config);
    },
	
	// Event Handlings	
	onDraw: function() {
		console.log('draw rect finished ...');		
	},

	// Drawing
	
	'draw': function() {  //xsm		
		//this.fireEvent('draw');	
		if(this.ctx){			
			this.ctx.beginPath();
			this.ctx.moveTo(this.elX,this.elY+this.elHeight/2);
			this.ctx.lineTo(this.elX,this.elY+this.elHeight);
			this.ctx.lineTo(this.elX+this.elWidth,this.elY+this.elHeight);
			this.ctx.lineTo(this.elX+this.elWidth,this.elY);
			this.ctx.lineTo(this.elX,this.elY);
			this.ctx.lineTo(this.elX,this.elY+this.elHeight/2);
			this.ctx.lineTo(this.elX+this.elWidth,this.elY+this.elHeight/2);
			this.ctx.closePath();
			this.ctx.stroke();
		}
	}					
});
Ext.define('EmptyPackage', {
    extend: 'UmlShape',
    //alias : 'widget.EmptyPackage',   	
	//title : 'EmptyPackage',
	constructor: function(config){
		config = config || {};	
		this.elX=30;
		this.elY=30;
		this.elWidth=150;
		this.elHeight=80;
		// Events
        this.addEvents({
        });
		// Default configs
		Ext.apply(this, {
			listeners: {
				'draw'   : this.onDraw
			}
		});
		this.listeners = config.listeners;
        // Call our superclass constructor to complete construction process.
		EmptyPackage.superclass.constructor.call(this, config);
    },
	
	// Event Handlings	
	onDraw: function() {
		console.log('draw rect finished ...');		
	},	
	// Drawing
	
	'draw': function() {  //xsm		
		//this.fireEvent('draw');	
		if(this.ctx){			
			this.ctx.beginPath();		
			this.ctx.moveTo(this.elX+this.elWidth*2/3,this.elY+20);
			this.ctx.lineTo(this.elX+this.elWidth*2/3,this.elY);
			this.ctx.lineTo(this.elX,this.elY);
			this.ctx.lineTo(this.elX,this.elY+this.elHeight);
			this.ctx.lineTo(this.elX+this.elWidth,this.elY+this.elHeight);
			this.ctx.lineTo(this.elX+this.elWidth,this.elY+20);
			this.ctx.lineTo(this.elX,this.elY+20);
			this.ctx.stroke();
		}
	}					
});

Ext.define('Package', {
    extend: 'UmlShape',
    //alias : 'widget.Package',   	
	//title : 'Package',
	constructor: function(config){
		config = config || {};	
		this.elX=30;
		this.elY=30;
		this.elWidth=150;
		this.elHeight=95;
		// Events
        this.addEvents({
        });
		// Default configs
		Ext.apply(this, {
			listeners: {
				'draw'   : this.onDraw
			}
		});
		this.listeners = config.listeners;
        // Call our superclass constructor to complete construction process.
		Package.superclass.constructor.call(this, config);
    },
	
	// Event Handlings	
	onDraw: function() {
		console.log('draw rect finished ...');		
	},	
	// Drawing
	
	'draw': function() {  //xsm		
		//this.fireEvent('draw');	
		if(this.ctx){			
			this.ctx.beginPath();		
			this.ctx.moveTo(this.elX+this.elWidth*2/3,this.elY+25);
			this.ctx.lineTo(this.elX+this.elWidth*2/3,this.elY);
			this.ctx.lineTo(this.elX,this.elY);
			this.ctx.lineTo(this.elX,this.elY+this.elHeight);
			this.ctx.lineTo(this.elX+this.elWidth,this.elY+this.elHeight);
			this.ctx.lineTo(this.elX+this.elWidth,this.elY+25);
			this.ctx.lineTo(this.elX,this.elY+25);
			this.ctx.stroke();
		}
	}					
});
Ext.define('StrokeLine', {
    extend: 'UmlShape',
    //alias : 'widget.StrokeLine',   	
	//title : 'StrokeLine',
	constructor: function(config){
		config = config || {};	
		this.elX=30;
		this.elY=30;
		this.elWidth=20;
		this.elHeight=80;
		// Events
        this.addEvents({
        });
		// Default configs
		Ext.apply(this, {
			listeners: {
				'draw'   : this.onDraw
			}
		});
		this.listeners = config.listeners;
        // Call our superclass constructor to complete construction process.
		StrokeLine.superclass.constructor.call(this, config);
    },
	
	// Event Handlings	
	onDraw: function() {
		console.log('draw rect finished ...');		
	},	
	
	recordMove: function(e, t, o, op) { //鼠标移动
		//console.log('recordMove: ' + this.status);
		if(this.mousepos==Constants.MOUSE_IN) {
			if(this.canResizable(this.getCXY(e))!='cannot' && Ve.elSelect==this.elNum && !this.cd){
				var cr=this.canResizable(this.getCXY(e));
				document.body.style.cursor='n-resize';
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
				if(this.rz=='top'){
					document.body.style.cursor='n-resize';
					console.log('--------------:'+this.rz);					
					this.elHeight=this.elY-xy[1]+this.elHeight;
					this.elY=xy[1];
					this.restoreShape();			
					this.draw();
				}else if(this.rz=='bottom'){
					document.body.style.cursor='s-resize';
					console.log('--------------:'+this.rz);
					this.elHeight=xy[1]-this.elY;
					this.elY=xy[1]-this.elHeight;
					this.restoreShape();			
					this.draw();
				}											
			}else if(this.status==Constants.STATUS_M0 && Ve.elSelect==this.elNum) {// 图形移动	
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

	canResizable: function(xy){ //判断是否进入可拖动改变大小的区域
		if(xy[1]<=(this.elY+3) && xy[1]>=(this.elY-3) && xy[0]<=(this.elX+this.elWidth) && xy[0]>=this.elX){
			return 'top';
		}else if(xy[1]<=(this.elY+this.elHeight+3) && xy[1]>=(this.elY+this.elHeight-3) && xy[0]<=(this.elX+this.elWidth) && xy[0]>=this.elX){
			return 'bottom';
		}else{
			return 'cannot';
		}
	},
	// Drawing
	
	'draw': function() {  //xsm		
		//this.fireEvent('draw');	
		if(this.ctx){			
			this.ctx.beginPath();		
			this.ctx.moveTo(this.elX+this.elWidth/2,this.elY+this.elHeight);
			this.ctx.lineTo(this.elX+this.elWidth/2,this.elY+20);
			this.ctx.arc(this.elX+this.elWidth/2,this.elY+10,10,Math.PI/2,Math.PI*5/2,false);
			this.ctx.moveTo(this.elX+this.elWidth/2,this.elY+16);
			this.ctx.lineTo(this.elX+this.elWidth/2,this.elY+4);
			this.ctx.moveTo(this.elX+4,this.elY+10);
			this.ctx.lineTo(this.elX+16,this.elY+10);
			this.ctx.stroke();
		}
	}					
});

Ext.define('Interaction', {
    extend: 'UmlShape',
    //alias : 'widget.Interaction',   	
	//title : 'Interaction',
	constructor: function(config){
		config = config || {};	
		this.elX=30;
		this.elY=30;
		this.elWidth=100;
		this.elHeight=70;
		// Events
        this.addEvents({
        });
		// Default configs
		Ext.apply(this, {
			listeners: {
				'draw'   : this.onDraw
			}
		});
		this.listeners = config.listeners;
        // Call our superclass constructor to complete construction process.
		Interaction.superclass.constructor.call(this, config);
    },
	
	// Event Handlings	
	onDraw: function() {
		console.log('draw rect finished ...');		
	},	
	// Drawing
	
	'draw': function() {  //xsm		
		//this.fireEvent('draw');	
		if(this.ctx){			
			this.ctx.beginPath();		
			this.ctx.strokeRect(this.elX,this.elY,this.elWidth,this.elHeight);
			this.ctx.moveTo(this.elX,this.elY+26);
			this.ctx.lineTo(this.elX+this.elWidth*3/5,this.elY+26);
			this.ctx.lineTo(this.elX+this.elWidth*4/5,this.elY+18);
			this.ctx.lineTo(this.elX+this.elWidth*4/5,this.elY);
			this.ctx.stroke();
		}
	}					
});

Ext.define('Bvrec', {
    extend: 'UmlShape',
    //alias : 'widget.Bvrec',   	
	//title : 'Bvrec',
	constructor: function(config){
		config = config || {};	
		this.elX=30;
		this.elY=30;
		this.elWidth=15;
		this.elHeight=60;
		// Events
        this.addEvents({
        });
		// Default configs
		Ext.apply(this, {
			listeners: {
				'draw'   : this.onDraw
			}
		});
		this.listeners = config.listeners;
        // Call our superclass constructor to complete construction process.
		Bvrec.superclass.constructor.call(this, config);
    },
	
	// Event Handlings	
	onDraw: function() {
		console.log('draw rect finished ...');		
	},	
	
	recordMove: function(e, t, o, op) { //鼠标移动
		//console.log('recordMove: ' + this.status);
		if(this.mousepos==Constants.MOUSE_IN) {
			if(this.canResizable(this.getCXY(e))!='cannot' && Ve.elSelect==this.elNum && !this.cd){
				var cr=this.canResizable(this.getCXY(e));
				document.body.style.cursor='n-resize';
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
				if(this.rz=='top'){
					document.body.style.cursor='n-resize';
					console.log('--------------:'+this.rz);					
					this.elHeight=this.elY-xy[1]+this.elHeight;
					this.elY=xy[1];
					this.restoreShape();			
					this.draw();
				}else if(this.rz=='bottom'){
					document.body.style.cursor='s-resize';
					console.log('--------------:'+this.rz);
					this.elHeight=xy[1]-this.elY;
					this.elY=xy[1]-this.elHeight;
					this.restoreShape();			
					this.draw();
				}											
			}else if(this.status==Constants.STATUS_M0 && Ve.elSelect==this.elNum) {// 图形移动	
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

	canResizable: function(xy){ //判断是否进入可拖动改变大小的区域
		if(xy[1]<=(this.elY+3) && xy[1]>=(this.elY-3) && xy[0]<=(this.elX+this.elWidth) && xy[0]>=this.elX){
			return 'top';
		}else if(xy[1]<=(this.elY+this.elHeight+3) && xy[1]>=(this.elY+this.elHeight-3) && xy[0]<=(this.elX+this.elWidth) && xy[0]>=this.elX){
			return 'bottom';
		}else{
			return 'cannot';
		}
	},
	// Drawing
	
	'draw': function() {  //xsm		
		//this.fireEvent('draw');	
		this.drawRec(this.elX,this.elY,this.elWidth,this.elHeight,0);
	}					
});

Ext.define('Start', {
    extend: 'UmlShape',
    //alias : 'widget.Start',   	
	//title : 'Start',
	constructor: function(config){
		config = config || {};	
		this.elX=30;
		this.elY=30;
		this.elWidth=20;
		this.elHeight=20;
		// Events
        this.addEvents({
        });
		// Default configs
		Ext.apply(this, {
			listeners: {
				'draw'   : this.onDraw
			}
		});
		this.listeners = config.listeners;
        // Call our superclass constructor to complete construction process.
		Start.superclass.constructor.call(this, config);
    },
	
	// Event Handlings	
	onDraw: function() {
		console.log('draw rect finished ...');		
	},	
	// Drawing
	
	'draw': function() {  //xsm		
		//this.fireEvent('draw');
		this.cd=true;
		if(this.ctx){	
			this.ctx.beginPath();
			this.ctx.arc(this.elX+10,this.elY+10,10,0,Math.PI*2,true);
			this.ctx.fill();
		}
	}					
});

Ext.define('End', {
    extend: 'UmlShape',
    //alias : 'widget.End',   	
	//title : 'End',
	constructor: function(config){
		config = config || {};	
		this.elX=30;
		this.elY=30;
		this.elWidth=20;
		this.elHeight=20;
		// Events
        this.addEvents({
        });
		// Default configs
		Ext.apply(this, {
			listeners: {
				'draw'   : this.onDraw
			}
		});
		this.listeners = config.listeners;
        // Call our superclass constructor to complete construction process.
		End.superclass.constructor.call(this, config);
    },
	
	// Event Handlings	
	onDraw: function() {
		console.log('draw rect finished ...');		
	},	
	// Drawing
	
	'draw': function() {  //xsm		
		//this.fireEvent('draw');	
		this.cd=true;
		if(this.ctx){	
			this.ctx.beginPath();
			this.ctx.arc(this.elX+10,this.elY+10,5,0,Math.PI*2,true);
			this.ctx.fill();
			this.ctx.moveTo(this.elX+20,this.elY+10);
			this.ctx.arc(this.elX+10,this.elY+10,10,0,Math.PI*2,true);
			this.ctx.stroke();
			
		}
	}					
});

Ext.define('Status', {
	extend: 'UmlShape',
	//alias : 'widget.Status',   	
	//title : 'Status',
	constructor: function(config){
		config = config || {};	
		this.elX=30;
		this.elY=30;
		this.elWidth=100;
		this.elHeight=60;
		// Events
	    this.addEvents({
	    });
		// Default configs
		Ext.apply(this, {
			listeners: {
				'draw'   : this.onDraw
			}
		});
		this.listeners = config.listeners;
	    // Call our superclass constructor to complete construction process.
		Status.superclass.constructor.call(this, config);
	},

	// Event Handlings	
	onDraw: function() {
		console.log('draw rect finished ...');		
	},

	// Drawing

	'draw': function() {  //xsm		
		//this.fireEvent('draw');			
		if(this.ctx){			
			/*this.ctx.beginPath();		  
			this.ctx.moveTo(this.elX,this.elY+this.elHeight/2); // A1		  
			this.ctx.bezierCurveTo(
					this.elX, this.elY-this.elHeight/4, // C1
					this.elX+this.elWidth, this.elY, // C2
					this.elX+this.elWidth, this.elY+this.elHeight/2); // A2
			this.ctx.bezierCurveTo(
					this.elX+this.elWidth, this.elY+this.elHeight, // C3
					this.elX, this.elY+this.elHeight, // C4
					this.elX,this.elY+this.elHeight/2); // A1		 
			this.ctx.stroke();
			this.ctx.closePath();	*/
			/*this.ctx.beginPath();
			this.ctx.moveTo(75,25);
			this.ctx.quadraticCurveTo(25,25,25,62.5);
			this.ctx.quadraticCurveTo(25,100,50,100);
			this.ctx.quadraticCurveTo(50,120,30,125);
			this.ctx.quadraticCurveTo(60,120,65,100);
			this.ctx.quadraticCurveTo(125,100,125,62.5);
			this.ctx.quadraticCurveTo(125,25,75,25);
			this.ctx.stroke();*/
			this.ctx.beginPath();
			this.ctx.moveTo(this.elX + 10, this.elY);
			this.ctx.lineTo(this.elX + this.elWidth - 10, this.elY);
			this.ctx.quadraticCurveTo(this.elX + this.elWidth, this.elY, this.elX + this.elWidth, this.elY + 10);
			this.ctx.lineTo(this.elX + this.elWidth, this.elY + this.elHeight -10);
			this.ctx.quadraticCurveTo(this.elX + this.elWidth, this.elY + this.elHeight, this.elX + this.elWidth - 10, this.elY + this.elHeight);
			this.ctx.lineTo(this.elX + 10, this.elY + this.elHeight);
			this.ctx.quadraticCurveTo(this.elX, this.elY + this.elHeight, this.elX, this.elY + this.elHeight - 10);
			this.ctx.lineTo(this.elX, this.elY + 10);
			this.ctx.quadraticCurveTo(this.elX, this.elY, this.elX + 10, this.elY);
			this.ctx.stroke();
		}
	}					
});

Ext.define('Time', {
	extend: 'UmlShape',
	//alias : 'widget.Time',   	
	//title : 'Time',
	constructor: function(config){
		config = config || {};	
		this.elX=30;
		this.elY=30;
		this.elWidth=40;
		this.elHeight=70;
		// Events
	    this.addEvents({
	    });
		// Default configs
		Ext.apply(this, {
			listeners: {
				'draw'   : this.onDraw
			}
		});
		this.listeners = config.listeners;
	    // Call our superclass constructor to complete construction process.
		Time.superclass.constructor.call(this, config);
	},

	// Event Handlings	
	onDraw: function() {
		console.log('draw rect finished ...');		
	},

	// Drawing

	'draw': function() {  //xsm		
		//this.fireEvent('draw');	
		this.cd=true;
		if(this.ctx){			
			this.ctx.beginPath();		  
			this.ctx.moveTo(this.elX,this.elY);
			this.ctx.lineTo(this.elX+40,this.elY);
			this.ctx.lineTo(this.elX,this.elY+70);
			this.ctx.lineTo(this.elX+40,this.elY+70);
			this.ctx.lineTo(this.elX,this.elY);
			this.ctx.stroke();	
		}
	}					
});

Ext.define('Hrec', {
	extend: 'UmlShape',
	//alias : 'widget.Hrec',   	
	//title : 'Hrec',
	constructor: function(config){
		config = config || {};	
		this.elX=30;
		this.elY=30;
		this.elWidth=70;
		this.elHeight=5;
		// Events
	    this.addEvents({
	    });
		// Default configs
		Ext.apply(this, {
			listeners: {
				'draw'   : this.onDraw
			}
		});
		this.listeners = config.listeners;
	    // Call our superclass constructor to complete construction process.
		Hrec.superclass.constructor.call(this, config);
	},

	// Event Handlings	
	onDraw: function() {
		console.log('draw rect finished ...');		
	},

	recordMove: function(e, t, o, op) { //鼠标移动
		//console.log('recordMove: ' + this.status);
		if(this.mousepos==Constants.MOUSE_IN) {
			if(this.canResizable(this.getCXY(e))!='cannot' && Ve.elSelect==this.elNum && !this.cd){
				var cr=this.canResizable(this.getCXY(e));
				document.body.style.cursor='w-resize';
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
				//this.clearShape(this.elX,this.elY,this.elWidth,this.elHeight);				
				if(this.rz=='left'){
					document.body.style.cursor='w-resize';
					console.log('--------------:'+this.rz);
					this.elWidth=this.elX-xy[0]+this.elWidth;
					this.elX=xy[0];
					this.restoreShape();			
					this.draw();		
				}else if(this.rz=='right'){
					document.body.style.cursor='e-resize';
					console.log('--------------:'+this.rz);
					this.elWidth=xy[0]-this.elX;
					this.elX=xy[0]-this.elWidth;
					this.restoreShape();			
					this.draw();
				}/*else if(this.rz=='top'){
					document.body.style.cursor='n-resize';
					console.log('--------------:'+this.rz);					
					this.elHeight=this.elY-xy[1]+this.elHeight;
					this.elY=xy[1];
					this.restoreShape();			
					this.draw();
				}else if(this.rz=='bottom'){
					document.body.style.cursor='s-resize';
					console.log('--------------:'+this.rz);
					this.elHeight=xy[1]-this.elY;
					this.elY=xy[1]-this.elHeight;
					this.restoreShape();			
					this.draw();
				}	*/										
			}else if(this.status==Constants.STATUS_M0 && Ve.elSelect==this.elNum) {// 图形移动	
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

	canResizable: function(xy){ //判断是否进入可拖动改变大小的区域
		if(xy[0]<=(this.elX+3) && xy[0]>=(this.elX-3) && xy[1]<=(this.elY+this.elHeight) && xy[1]>=this.elY){
			return 'left';
		}else if(xy[0]<=(this.elX+this.elWidth+3) && xy[0]>=(this.elX+this.elWidth-3) && xy[1]<=(this.elY+this.elHeight) && xy[1]>=this.elY){
			return 'right';
		}/*else if(xy[1]<=(this.elY+3) && xy[1]>=(this.elY-3) && xy[0]<=(this.elX+this.elWidth) && xy[0]>=this.elX){
			return 'top';
		}else if(xy[1]<=(this.elY+this.elHeight+3) && xy[1]>=(this.elY+this.elHeight-3) && xy[0]<=(this.elX+this.elWidth) && xy[0]>=this.elX){
			return 'bottom';
		}*/else{
			return 'cannot';
		}
	},
	// Drawing

	'draw': function() {  //xsm		
		//this.fireEvent('draw');			
		this.drawRec(this.elX,this.elY,this.elWidth,this.elHeight,1);
	}					
});

Ext.define('Vrec', {
	extend: 'UmlShape',
	//alias : 'widget.Vrec',   	
	//title : 'Vrec',
	constructor: function(config){
		config = config || {};	
		this.elX=30;
		this.elY=30;
		this.elWidth=5;
		this.elHeight=70;
		// Events
	    this.addEvents({
	    });
		// Default configs
		Ext.apply(this, {
			listeners: {
				'draw'   : this.onDraw
			}
		});
		this.listeners = config.listeners;
	    // Call our superclass constructor to complete construction process.
		Vrec.superclass.constructor.call(this, config);
	},

	// Event Handlings	
	onDraw: function() {
		console.log('draw rect finished ...');		
	},
	
	recordMove: function(e, t, o, op) { //鼠标移动
		//console.log('recordMove: ' + this.status);
		if(this.mousepos==Constants.MOUSE_IN) {
			if(this.canResizable(this.getCXY(e))!='cannot' && Ve.elSelect==this.elNum && !this.cd){
				var cr=this.canResizable(this.getCXY(e));
				document.body.style.cursor='n-resize';
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
				if(this.rz=='top'){
					document.body.style.cursor='n-resize';
					console.log('--------------:'+this.rz);					
					this.elHeight=this.elY-xy[1]+this.elHeight;
					this.elY=xy[1];
					this.restoreShape();			
					this.draw();
				}else if(this.rz=='bottom'){
					document.body.style.cursor='s-resize';
					console.log('--------------:'+this.rz);
					this.elHeight=xy[1]-this.elY;
					this.elY=xy[1]-this.elHeight;
					this.restoreShape();			
					this.draw();
				}											
			}else if(this.status==Constants.STATUS_M0 && Ve.elSelect==this.elNum) {// 图形移动	
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

	canResizable: function(xy){ //判断是否进入可拖动改变大小的区域
		if(xy[1]<=(this.elY+3) && xy[1]>=(this.elY-3) && xy[0]<=(this.elX+this.elWidth) && xy[0]>=this.elX){
			return 'top';
		}else if(xy[1]<=(this.elY+this.elHeight+3) && xy[1]>=(this.elY+this.elHeight-3) && xy[0]<=(this.elX+this.elWidth) && xy[0]>=this.elX){
			return 'bottom';
		}else{
			return 'cannot';
		}
	},
	// Drawing

	'draw': function() {  //xsm		
		//this.fireEvent('draw');			
		this.drawRec(this.elX,this.elY,this.elWidth,this.elHeight,1);
	}					
});
Ext.define('SendSignal', {
	extend: 'UmlShape',
	//alias : 'widget.SendSignal',   	
	//title : 'SendSignal',
	constructor: function(config){
		config = config || {};	
		this.elX=30;
		this.elY=30;
		this.elWidth=70;
		this.elHeight=30;
		// Events
	    this.addEvents({
	    });
		// Default configs
		Ext.apply(this, {
			listeners: {
				'draw'   : this.onDraw
			}
		});
		this.listeners = config.listeners;
	    // Call our superclass constructor to complete construction process.
		SendSignal.superclass.constructor.call(this, config);
	},

	// Event Handlings	
	onDraw: function() {
		console.log('draw rect finished ...');		
	},

	// Drawing

	'draw': function() {  //xsm		
		//this.fireEvent('draw');			
		if(this.ctx){			
			this.ctx.beginPath();		  
			this.ctx.moveTo(this.elX,this.elY);
			this.ctx.lineTo(this.elX+this.elWidth-20,this.elY);
			this.ctx.lineTo(this.elX+this.elWidth,this.elY+this.elHeight/2);
			this.ctx.lineTo(this.elX+this.elWidth-20,this.elY+this.elHeight);
			this.ctx.lineTo(this.elX,this.elY+this.elHeight);
			this.ctx.closePath();
			this.ctx.stroke();	
		}
	}					
});

Ext.define('ReceiveSignal', {
	extend: 'UmlShape',
	//alias : 'widget.ReceiveSignal',   	
	//title : 'ReceiveSignal',
	constructor: function(config){
		config = config || {};	
		this.elX=30;
		this.elY=30;
		this.elWidth=70;
		this.elHeight=30;
		// Events
	    this.addEvents({
	    });
		// Default configs
		Ext.apply(this, {
			listeners: {
				'draw'   : this.onDraw
			}
		});
		this.listeners = config.listeners;
	    // Call our superclass constructor to complete construction process.
		ReceiveSignal.superclass.constructor.call(this, config);
	},

	// Event Handlings	
	onDraw: function() {
		console.log('draw rect finished ...');		
	},

	// Drawing

	'draw': function() {  //xsm		
		//this.fireEvent('draw');			
		if(this.ctx){			
			this.ctx.beginPath();		  
			this.ctx.moveTo(this.elX,this.elY);
			this.ctx.lineTo(this.elX+this.elWidth,this.elY);
			this.ctx.lineTo(this.elX+this.elWidth,this.elY+this.elHeight);
			this.ctx.lineTo(this.elX,this.elY+this.elHeight);
			this.ctx.lineTo(this.elX+20,this.elY+this.elHeight/2);
			this.ctx.closePath();
			this.ctx.stroke();	
		}
	}					
});