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
       // var getwin=desktop.getWinow('umlup-win');
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
              
     /*   function addEl(node) {

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
        } */
        
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
       
        function generateCanvasXml(){
        	Ve.canvasXmlData = "<uml>";
        	for (var i = 0; i < Ve.elArray.length; i++){
        		Ve.canvasXmlData += "<shape>";
        		for (attr in Ve.elArray[i]){
        			if (Ve.elArray[i].hasOwnProperty(attr)){
        				Ve.canvasXmlData += "<" + attr + ">" + Ve.elArray[i][attr] + "</" + attr + ">";
        			}
        		}
        		Ve.canvasXmlData += "</shape>";
        	}
        	Ve.canvasXmlData += "</uml>";
        	console.log(Ve.canvasXmlData);
        }
           
        /*var toolsPanel = Ext.create('Ext.panel.Panel', {
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
        });*/

        var store = Ext.create('Ext.data.Store', {
        	fields: ['type', 'name'],
            data:[
                  {type: 'string', name: '用例图'},
                  {type: 'string', name: '类图'},
                  {type: 'string', name: '包图'},
                  {type: 'string', name: '顺序图'},
                  {type: 'string', name: '状态图'},
                  {type: 'string', name: '活动图'}
            ]
        });

        var simpleCombo = Ext.create('Ext.form.field.ComboBox', {
            //fieldLabel: 'Select a single state',
        	id: 'combo',
            displayField: 'name',
            width: 150,
            labelWidth: 130,
            store: store,
            queryMode: 'local',
            typeAhead: true,
            listeners:{
                'select': function(){
                	var layout = Ext.getCmp('dpanel').getLayout();
                	if(this.getValue()=="用例图"){
                		layout.setActiveItem(0);
                	}else if(this.getValue()=="类图"){
                		layout.setActiveItem(1);
                	}else if(this.getValue()=="包图"){
                		layout.setActiveItem(2);
                	}else if(this.getValue()=="顺序图"){
                		layout.setActiveItem(3);
                	}else if(this.getValue()=="状态图"){
                		layout.setActiveItem(4);
                	}else if(this.getValue()=="活动图"){
                		layout.setActiveItem(5);
                	}
                }
            }
        });
        var toolsPanel = Ext.create('Ext.panel.Panel', {
        	id : 'umlTools',
        	title : '请选择UML图：',
        	layout : 'vbox',
        	region : 'west',
        	width : 150,
        	maxWidth : 150,
        	collapsible : true,
        	autoHeight : true,
        	items : [
        			simpleCombo,
        			Ext.create('Ext.panel.Panel',{
        				id: 'dpanel',
        				width : 150,
        				layout: 'card',
        				activeItem: false,
        				baseCls: true,
        				items: [
        				        new Ext.Panel({
//        				        	id: 'ucp',
//									title : '用例图', 
        				        	baseCls: true,
									items : [usecaseDiagram]
								}), 
								new Ext.Panel({
//									id: 'clp',
//									title : '类图',
									baseCls: true,
									items : [classDiagram]
								}),
								new Ext.Panel({
//									id: 'pap',
//									title : '包图',
									baseCls: true,
									items : [packageDiagram]
								}),
								new Ext.Panel({
//									id: 'sep',
//									title : '顺序图',
									baseCls: true,
									items : [sequenceDiagram]
								}),
								new Ext.Panel({
//									id: 'stp',
//									title : '状态图',
									baseCls: true,
									items : [statusDiagram]
								}),
								new Ext.Panel({
//									id: 'acp',
//									title : '活动图',
									baseCls: true,
									items : [activityDiagram]
								})     
							        				        
        				        ]
        			})
             		
             	]
        });
        var canvasPanel = Ext.create('canvasPanel', {       	
        	region : 'center',
        	listeners: {
				init: function(p){
					var sas=new SelectAll();
					/*p.el.on("mouseenter",function(){
						this.onEditting
					},"mouseleave",function(){
						this.stopEditing
					},"mousemove",function(){
						this.checkStatus
					},"mousedown",function(){
						this.recordDown
					})*/
				}
			}
        	/*dockedItems : [{
        		xtype : 'toolbar',
				dock : 'bottom',
				items : [{
					id : 'stautsText',
					xtype : 'label',
					text : '当前选中：'
				}]
        	}]*/
        });
        var upanel=Ext.create('Ext.form.Panel', {
			//title: 'Upload a Xml',
			width: 400,
			bodyPadding: 10,
			baseCls: true,
			frame: true, 
			fileUpload: true,
			items: [{
				xtype: 'filefield',
				name: 'umlxml',
				fieldLabel: 'XML文件',
				labelWidth: 50,
				msgTarget: 'side',
				allowBlank: false,
				anchor: '100%',
				buttonText: '选择文件...'
			}],

			buttons: [{
				text: '确定',
				handler: function() {
					var form = this.up('form').getForm();
					var fileName="";
					if(form.isValid()){
						form.submit({
							url: './getlocalxml.jxp',
							method : 'post',
	    					success : function(form, action){
	    						Ext.Msg.alert('提示信息', action.result.msg);
	    						//getwin.close();
	    						
	    						fileName=action.result.data;
	    						console.log('filename:'+fileName);
	    						var i;
				                var obj=Ext.decode(fileName); 
				                for(i=0;i<obj.length;i++){
				                	var a=new Array();
				                	a[i]=obj[i];
				                	console.log('json   array:'+a[i]);
				                	xmlDraw(a[i]);
				                }   						
	    					},
	    					failure : function(form, action){
	    						Ext.Msg.alert('提示信息', action.result.msg);
	    						getwin.close();
	    					}														
						});
					}
				}
			}]
		});
        function saveFile(T,content) {
          var filename=T;
          var win=window.open('','','top=10000,left=10000');
          win.document.write(content);
         // win.close();
//          win.document.open("application/xml",filename);
          win.document.execCommand('SaveAs','f1.xml');
          
        }
        var getwin=Ext.create('Ext.window.Window',{
        	id: 'getwin',
			title: '导入XML',
			width: 412,
			height: 120,
			resizable: false,
			items: upanel				
		});

        function saveAs(){
        	var data = Ext.toDataURL();
//        	window.location.href = data;
        	var win = window.open(data,'Your pic','status=yes');
        }
        if(!win){
            win = desktop.createWindow({
                id: 'draw-win',
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
						text: '导入XML',
						handler: function(){
							//getwin.show();
							desktop.onCreateWindow('umlup-win');
						}
					},{
						text: '导出XML',
						handler: function(){
//							window.location.href='./data/tool.xml';
//							window.open('./data/tool.xml','_blank','width=500,height=500,directories=yes');
//							saveFile('data/tool.xml','asdasdfadfadf');
							var fileName="123.xml";
							var filePath="E:/test.xml";
							Ext.Ajax.request({ 
					        	url:'./loadxml.jxp',
					        	params:{
					        		//checkFileExist: 'checkFileExist',
					        		filename: fileName,
					        		filepath: filePath
					        	},
					        	//method: 'post',  
					        	success : function(response, config){
//									Ext.Msg.alert('提示', response.responseText);
					        		var obj = Ext.decode(response.responseText);   
					                console.log(obj);//可以到火狐的firebug下面看看obj里面的结构   
					                //加入getPath返回的json为{'path':'upload/abc.jpg'}   
					                window.location.href = obj.path;//这样就可以弹出下载对话框了
								}, 
								failure : function(response, config){
									Ext.Msg.alert('提示', response.responseText);
								} 
				        	}); 
						}
					},{
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
							var really = Ext.Msg.show({
								title : '警告信息',
								msg : '确认要删除吗？',
								buttons : Ext.Msg.YESNO,
								icon : Ext.window.MessageBox.QUESTION,
								fn : function(button, text){
									if (button == 'yes'){
										clearAll();
									}
								}
							});
//							clearAll();
						}
					}, {
						text : '上传',
						handler : function(){
							generateCanvasXml();
							if (Ve.canvasXmlData != '<uml></uml>'){
								Ext.Ajax.request({
									url : './task.jxp?action=saveUmlString',
									params : {
										umlString : Ve.canvasXmlData
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
					}, /*{
						text : '缩小',
						handler : function(){
							
						}
					}, {
						text : '放大',
						handler : function(){
							
						}
					}, */{
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