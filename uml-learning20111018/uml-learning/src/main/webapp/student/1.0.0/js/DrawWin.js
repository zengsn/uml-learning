Ext.define('MyDesktop.DrawWin', {
    extend: 'Ext.ux.desktop.Module',

    requires: [
        'Ext.grid.Panel',
        'Ext.tree',
        'Ext.panel.Panel'
    ],

    id:'draw-win',

    init : function(){
        this.launcher = {
            text: 'umldraw',
            iconCls:'icon-grid',
            handler : this.createWindow,
            scope: this
        };
    },
        
    
    
    createWindow : function(){
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('draw-win');
        
        //创建工具树
        var usecaseDiagram = desktop.generateTree("usecase", "./data/usecase.txt", false, true, "usecase");
        var activityDiagram = desktop.generateTree("activity", "./data/activity.txt", false, true, "activity");
        var packageDiagram = desktop.generateTree("package", "./data/package.txt", false, true, "package");
        var sequenceDiagram = desktop.generateTree("sequence", "./data/sequence.txt", false, true, "sequence");
        var classDiagram = desktop.generateTree("class", "./data/class.txt", false, true, "class");
        var statusDiagram = desktop.generateTree("status", "./data/status.txt", false, true, "status");
        
        //重写tree的itemclick事件
        function overrideTreeEvent(obj){
        	obj.addListener('itemclick', function(view, record){
            	var nid = record.data.id, ntext = record.data.text;
            	var treenode = {
            			type : nid,
            			text : ntext
            	};
            	addEl(treenode);
            });
        }
        overrideTreeEvent(usecaseDiagram);
        overrideTreeEvent(activityDiagram);
        overrideTreeEvent(packageDiagram);
        overrideTreeEvent(sequenceDiagram);
        overrideTreeEvent(classDiagram);
        overrideTreeEvent(statusDiagram);
                 
        
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
        	if(node.type!="line"){
        		Ve.elArray[Ve.elCount].draw();
        	}
        }
        //初始化共有参数
        function initCommon(o, node) {
        	//初始化文本
        	o.text = node.text;
        	//初始化id
        	o.id = "el-" + Ve.elCount;
        	//初始化类型
        	o.type = node.type;
        	Ext.getCmp('stautsText').setText("当前选择的是：" + Ve.elArray[Ve.elSelect].text);
        	//Ve.elSelect = Ve.elCount;
        }

        function checkType(node){
        		//根据不同类型处理
        	var umlShape;
        	if (node.type == "actor") {
        		umlShape = new Actor();
        	} else if (node.type == "status") {
        		umlShape = new Status();
        	} else if (node.type == "line") {
        		Ve.isDrawLine=1;
        		umlShape = new Line();
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
        }
        
        function getCanvas(){
        	var cvs = Ext.get('myCanvas').dom;
        	return cvs;
        }       
        
        function get2dContext() {
    		var canvas = getCanvas();
    		return canvas ? canvas.getContext("2d") : null;
    	}
    	
        function initCanvas(){      	
        	var cvsWidth = Ext.get('uml-canvas').getWidth();
        	var cvsHeight = Ext.get('uml-canvas').getHeight();
        	Ve.cvsWidth=cvsWidth;
        	Ve.cvsHeight=cvsHeight;
        	this.cvs = getCanvas();
        	this.cvs.width = cvsWidth;
        	this.cvs.height = cvsHeight;  	      
        }
        
        function clearAll(){
        	get2dContext().clearRect(0,0,Ve.cvsWidth,Ve.cvsHeight);		
			for(var i=0;i<Ve.elArray.length;i++){				
					Ve.elArray[i].endUml();
			}	
			Ve.elArray=[];
			Ve.elCount=-1;
			Ve.elSelect=-1;    		
        }
        
        function clearShape(){
        	get2dContext().clearRect(0,0,Ve.cvsWidth,Ve.cvsHeight);
        	if(Ve.elSelect!=-1){
        		Ve.elArray[Ve.elSelect].endUml();
            	Ve.elArray.splice(Ve.elSelect,1);
            	Ve.elCount=Ve.elCount-1;
            	for(var i=Ve.elSelect;i<Ve.elArray.length;i++){
            		Ve.elArray[i].elNum=Ve.elArray[i].elNum-1;
            	}
            	//console.log('veelarray     :'+Ve.elArray.length);       	
            	for(var i=0;i<Ve.elArray.length;i++){
            		Ve.elArray[i].draw();  		     		
            	}
            	Ve.elSelect=Ve.elArray.length-1;
        	}    	
        }
        
        var toolsPanel = Ext.create('Ext.panel.Panel', {
        	id : 'umlTools',
        	title : '工具箱',
        	layout : 'accordion',
        	region : 'west',
        	width : 150,
        	maxWidth : 150,
        	collapsible : true,
        	//collapsed : true,
        	autoHeight : true,
        	items : [
        		new Ext.Panel({
        			title : '用例图', 
        			items : [usecaseDiagram]
        		}), 
        		new Ext.Panel({
        			title : '类图',
        			items : [classDiagram]
        		}),
        		new Ext.Panel({
        			title : '包图',
        			items : [packageDiagram]
        		}),
        		new Ext.Panel({
        			title : '顺序图',
        			items : [sequenceDiagram]
        		}),
        		new Ext.Panel({
        			title : '状态图',
        			items : [statusDiagram]
    			}),
        		new Ext.Panel({
        			title : '活动图',
        			items : [activityDiagram]
        		})
        	]
        });
        var canvasPanel = Ext.create('canvasPanel', {       	
        	region : 'center',
        	dockedItems : [{
        		xtype : 'toolbar',
				dock : 'bottom',
				items : [{
					id : 'stautsText',
					xtype : 'label',
					text : '当前选中：'
				}]
        	}]
        });
        
       

        if(!win){
            win = desktop.createWindow({
                id: 'uml-win',
                title:'UML在线画图工具',
                width:1050,
                height:600,
                iconCls: 'icon-grid',
                animCollapse:false,
                constrainHeader:true,
                layout: 'border',
                items: [toolsPanel, canvasPanel/*, attrPanel*/],
                listeners : {
                	'show' : function(){
                		initCanvas();
                	},
                	'maximize' : function(){
                		initCanvas();
                	},
                	'minimize' : function(){
                		initCanvas();
                	}
                },
				dockedItems : [{
					xtype : 'toolbar',
					dock : 'top',
					items : ['->',{
						text : '保存',
						handler : function(){
							saveAs();
//							window.location.href='./data/tool.xml';
//							window.open('./data/tool.xml');
//							var canvasImageData = mainCanvas.toDataURL();
							/*Ext.Ajax.request({
								url : './task.jxp?action=SaveImg',
								params : {
									umlString : canvasImageData
								}
							});*/
						}
					}, {
						text : '清除',
						handler : function(){
							clearAll();
						}
					}, {
						text : '上传',
						handler : function(){
							generateCanvasXml();
							if (canvasXmlData != '<uml></uml>'){
								Ext.Ajax.request({
									url : './task.jxp?action=saveUmlString',
									params : {
										umlString : canvasXmlData
									},
									success : function(response, config){
										Ext.Msg.alert('提示', response.responseText);
									}, 
									failure : function(response, config){
										Ext.Msg.alert('提示', response.responseText);
									}
								});
							} else {
								Ext.Msg.alert('提示', '请先绘制相关图形,再进行上传操作！');
							}
						}
					}, {
						text : '缩小',
						handler : function(){
							zoomIn();
						}
					}, {
						text : '放大',
						handler : function(){
							zoomOut();
						}
					}, {
						text : '删除',
						handler : function(){
							clearShape();
						}
					}]
				}]
				
            });
        }
        win.show();
        return win;
    }

 
});