Constants = {	
	STATUS_PK: 'begin',
	STATUS_M0: 'movestart',
	MOUSE_IN : 'mousein',
	MOUSE_OUT: 'mouseout'	
};
Ve = {
	elSelect: -1,
	elCount: -1,
	elArray: new Array(),
	cvsWidth: null,
	cvsHeight: null,
	sas: false,
	sasX: null,
	sasY: null,
//	isDrawLine: 0,
	canvasXmlData: null
};
Ext.define('SelectAll', {
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
		SelectAll.superclass.constructor.call(this, config);
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
    recordMove: function(e, t, o, op){
    	if(Ve.sas==false){
			var xy=this.getCXY(e);
			var sasW=xy[0]-Ve.sasX;
			var sasH=xy[1]-Ve.sasY;
			this.ctx.fillStyle="rgba(220,220,220,0.1)";
			this.ctx.fillRect(Ve.sasX,Ve.sasY,sasW,sasH);
			console.log('sas--------move');
		}console.log('sas--------move');
    },
    recordDown: function(e, t, o, op){
		if(Ve.sas==false){
			var xy=this.getCXY(e);
			Ve.sasX=xy[0];
			Ve.sasY=xy[1];
			console.log('sas--------down');
		}console.log('sas--------down');
	},
	recordUp: function(e, t, o, op){
		if(Ve.sas==false){
			Ve.sas=true;
			var xy=this.getCXY(e);
			Ve.sasX=xy[0];
			Ve.sasY=xy[1];
			restoreShape();
		}
	},
	restoreShape: function(){  //重绘元素
		this.ctx.clearRect(0,0,Ve.cvsWidth,Ve.cvsHeight);//清除整个画布
		for(var i=0;i<Ve.elArray.length;i++){
			Ve.elArray[i].draw();
		}				
	},
	getCXY: function(e){ //获取当前鼠标相对于画布的坐标
		var canvasEl = Ext.get('myCanvas');
		var xy = [ // convert to coordinate of canvas
			e.getX() - canvasEl.getX(),
			e.getY() - canvasEl.getY()
		];
		return xy;
	}
});
function addEl(node) {

	//向数组添加新图形        	
	Ve.elCount=Ve.elCount+1;
	//Ve.elSelect=Ve.elSelect+1;
	Ve.elSelect = Ve.elCount;
	Ve.elArray[Ve.elCount] = checkType(node);
	
	//初始化部分属性
	initCommon(Ve.elArray[Ve.elCount], node);
	console.log('addEl   :'+Ve.elCount+'======='+Ve.elSelect);
	//开始绘图
//	if(node.type!="line"){
	Ve.elArray[Ve.elCount].draw();
//	}
};
//初始化共有参数
function initCommon(o, node) {
	
	//初始化文本
	o.text = node.text;
	//初始化id
	o.id = "el-" + Ve.elCount;
	//初始化类型
	o.type = node.type;
//	Ext.getCmp('stautsText').setText("当前选择的是：" + Ve.elArray[Ve.elSelect].text);
	//Ve.elSelect = Ve.elCount;
};

function checkType(node){
		//根据不同类型处理
	var umlShape;
	if (node.type == "actor") {
		umlShape = new Actor();
	} else if (node.type == "status") {
		umlShape = new Status();
	} else if (node.type == "line") {
//		Ve.isDrawLine=1;
		umlShape = new Line();
	} else if (node.type == "dottedLine") {
		umlShape = new DottedLine();
	} else if (node.type == "class") {
		umlShape = new Class();
	} else if (node.type == "usecase") {
		umlShape = new UseCase();
	} else if (node.type == "start") {
		umlShape = new Start();
	} else if (node.type == "end") {
		umlShape = new End();
	} else if (node.type == "condition") {
		umlShape = new Condition();
	} else if (node.type == "text") {
		umlShape = new Text();
	} else if (node.type == "SimpleClass"){
		umlShape = new SimpleClass();
	} else if(node.type == "System"){
		umlShape= new System();
	} else if (node.type == "emptyPackage") {
		umlShape = new EmptyPackage();
	} else if (node.type == "Note") {
		umlShape = new Note();
	} else if (node.type == "SendSignal") {
		umlShape = new SendSignal();
	} else if (node.type == "ReceiveSignal") {
		umlShape = new ReceiveSignal();
	} else if (node.type == "complexClass") {
		umlShape = new complexCls();
	} else if (node.type == "compPack") {
		umlShape = new compPackCls();
	} else if (node.type == "time"){
		umlShape = new Time();
	}else if (node.type == "vrect"){
		umlShape = new Vrec();
	}else if (node.type == "hrect"){
		umlShape = new Hrec();
	}else if (node.type == "bvrect"){
		umlShape = new Bvrec();
	}else if (node.type == "package"){
		umlShape = new Package();
	}else if (node.type == "ddrect"){
		umlShape = new ddrectCls();
	}else if (node.type == "interaction"){
		umlShape = new Interaction();
	}else if (node.type == "strokeLine"){
		umlShape = new StrokeLine();
	}else if (node.type == "interface"){
		umlShape = new Interface();
	} else {}
	return umlShape;
};

function xmlDraw(s){
	Ve.elCount=Ve.elCount+1;
	//Ve.elSelect=Ve.elSelect+1;
	Ve.elSelect = Ve.elCount;
	Ve.elArray[Ve.elCount] = checkType(s);
	console.log('addEl   :'+Ve.elCount+'---'+Ve.elSelect);
	Ve.elArray[Ve.elCount].elX=parseInt(s.elX);
	Ve.elArray[Ve.elCount].elY=parseInt(s.elY);
	Ve.elArray[Ve.elCount].elWidth=parseInt(s.elWidth);
	Ve.elArray[Ve.elCount].elHeight=parseInt(s.elHeight);       	
	//开始绘图      
	Ve.elArray[Ve.elCount].draw();       	
};
Ext.define('canvasPanel', {
    extend: 'Ext.panel.Panel',
    alias : 'widget.canvaspanel',  
	initComponent : function() {		
		Ext.apply(this, {
			id: 'canvaspanel',
//			listeners: {
//				render: function(p){
//					/*p.el.on("mouseenter",function(){
//						this.onEditting
//					},"mouseleave",function(){
//						this.stopEditing
//					},"mousemove",function(){
//						this.checkStatus
//					},"mousedown",function(){
//						this.recordDown
//					})*/
//				}
//			},
			title : '绘图',
			layout : 'fit',     
			html : '<div id="uml-canvas"><canvas id="myCanvas"></canvas></div>'
		});
		this.callParent(arguments);		
	}
	
});

