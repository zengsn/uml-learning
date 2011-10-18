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
			this.ctx.moveTo(this.elX+130,this.elY);
			this.ctx.lineTo(this.elX,this.elY);
			this.ctx.lineTo(this.elX,this.elY+100);
			this.ctx.lineTo(this.elX+150,this.elY+100);
			this.ctx.lineTo(this.elX+150,this.elY+20);
			this.ctx.lineTo(this.elX+130,this.elY);
			this.ctx.lineTo(this.elX+130,this.elY+20);
			this.ctx.lineTo(this.elX+150,this.elY+20);
			this.ctx.closePath();
			this.ctx.stroke();
		}
	}					
});
//
Ext.define('Line', {
    extend: 'UmlShape',
    //alias : 'widget.Line',   	
	//title : 'Line',
    fX: null, //初始坐标
    sX: null, //终点坐标
    lt: 0, //划线类型
	constructor: function(config){
		config = config || {};	
	//	this.elX=30;
	//	this.elY=30;
	//	this.elWidth=50;
	//	this.elHeight=50;
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
	
	'recordDown': function(e, t, o, op) {  //鼠标按下
		//console.log('recordDown:'+this.status+'---'+this.elNum);
		if(Ve.isDrawLine==1 && Ve.elSelect==this.elNum){
			var xy=this.getCXY(e);
			this.elX=xy[0];
			this.elY=xy[1];
//			this.fX=this.elX;
//			this.fY=this.elY;
			console.log('isdrawline-------------:'+Ve.isDrawLine);
		}else if ((this.status==Constants.STATUS_PK) && this.isInside(this.getCXY(e))) { //处于初始状态且该元素被鼠标选中
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
	
	'recordUp': function(e, t, o, op) { //鼠标弹起	   
		if(Ve.isDrawLine==1 && Ve.elSelect==this.elNum){
			Ve.isDrawLine=0;
			var xy=this.getCXY(e);
//			this.sX=xy[0];
//			this.sY=xy[1];
			if(xy[0]>=this.elX){
				if(xy[1]>=this.elY){
					this.elWidth=xy[0]-this.elX;
					this.elHeight=xy[1]-this.elY;
				}else{
					this.lt=1;
					this.elWidth=xy[0]-this.elX;
					this.elHeight=this.elY-xy[1];
					this.elY=xy[1];
				}
				
			}
		    this.draw();		    
		    console.log('isdrawline-------------:'+Ve.isDrawLine);
		}else if (this.status==Constants.STATUS_M0) { 
			this.status=Constants.STATUS_PK;
			console.log('recordUp:'+this.status);
		} 
		document.body.style.cursor = 'default';	
	},
	
	// Drawing
	
	'draw': function() {  //xsm		
		//this.fireEvent('draw');
		if(this.lt==0){
			this.fX=this.elX;
			this.fY=this.elY;
			this.sX=this.elX+this.elWidth;
			this.sY=this.elY+this.elHeight;
		}else if(this.lt==1){
			this.fX=this.elX;
			this.fY=this.elY+this.elHeight;
			this.sX=this.elX+this.elWidth;
			this.sY=this.elY;
		}
		if(this.ctx){			
			this.ctx.beginPath();
			this.ctx.moveTo(this.fX,this.fY);
			this.ctx.lineTo(this.sX,this.sY);			
			//this.ctx.closePath();
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

	// Drawing
	
	'draw': function() {  //xsm		
		//this.fireEvent('draw');	
		if(this.ctx){			
			this.ctx.beginPath();
			this.ctx.moveTo(this.elX+14,this.elY);
			this.ctx.lineTo(this.elX,this.elY+14);
			this.ctx.lineTo(this.elX+14,this.elY+28);
			this.ctx.lineTo(this.elX+28,this.elY+14);
			this.ctx.lineTo(this.elX+14,this.elY);
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
			this.ctx.moveTo(this.elX,this.elY+50);
			this.ctx.lineTo(this.elX,this.elY+100);
			this.ctx.lineTo(this.elX+100,this.elY+100);
			this.ctx.lineTo(this.elX+100,this.elY);
			this.ctx.lineTo(this.elX,this.elY);
			this.ctx.lineTo(this.elX,this.elY+50);
			this.ctx.lineTo(this.elX+100,this.elY+50);
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
			this.ctx.moveTo(this.elX+100,this.elY+20);
			this.ctx.lineTo(this.elX+100,this.elY);
			this.ctx.lineTo(this.elX,this.elY);
			this.ctx.lineTo(this.elX,this.elY+80);
			this.ctx.lineTo(this.elX+150,this.elY+80);
			this.ctx.lineTo(this.elX+150,this.elY+20);
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
			this.ctx.moveTo(this.elX+100,this.elY+25);
			this.ctx.lineTo(this.elX+100,this.elY);
			this.ctx.lineTo(this.elX,this.elY);
			this.ctx.lineTo(this.elX,this.elY+95);
			this.ctx.lineTo(this.elX+150,this.elY+95);
			this.ctx.lineTo(this.elX+150,this.elY+25);
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
			this.ctx.moveTo(this.elX,this.elY+20);
			this.ctx.lineTo(this.elX+60,this.elY+20);
			this.ctx.lineTo(this.elX+80,this.elY+10);
			this.ctx.lineTo(this.elX+80,this.elY);
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
			this.ctx.lineTo(this.elX + 100 - 10, this.elY);
			this.ctx.quadraticCurveTo(this.elX + 100, this.elY, this.elX + 100, this.elY + 10);
			this.ctx.lineTo(this.elX + 100, this.elY + 60 -10);
			this.ctx.quadraticCurveTo(this.elX + 100, this.elY + 60, this.elX + 100 - 10, this.elY + 60);
			this.ctx.lineTo(this.elX + 10, this.elY + 60);
			this.ctx.quadraticCurveTo(this.elX, this.elY + 60, this.elX, this.elY + 60 - 10);
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
			this.ctx.lineTo(this.elX+50,this.elY);
			this.ctx.lineTo(this.elX+70,this.elY+15);
			this.ctx.lineTo(this.elX+50,this.elY+30);
			this.ctx.lineTo(this.elX,this.elY+30);
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
			this.ctx.lineTo(this.elX+70,this.elY);
			this.ctx.lineTo(this.elX+70,this.elY+30);
			this.ctx.lineTo(this.elX,this.elY+30);
			this.ctx.lineTo(this.elX+20,this.elY+15);
			this.ctx.closePath();
			this.ctx.stroke();	
		}
	}					
});