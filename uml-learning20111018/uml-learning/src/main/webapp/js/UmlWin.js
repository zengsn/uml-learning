Ext.define('MyDesktop.UmlWin', {
    extend: 'Ext.ux.desktop.Module',

    requires: [
        'Ext.grid.Panel',
        'Ext.tree',
        'Ext.panel.Panel'
    ],

    id:'uml-win',

    init : function(){
        this.launcher = {
            text: 'uml在线画图',
            iconCls:'icon-grid',
            handler : this.createWindow,
            scope: this
        };
    },
    
    
    
    createWindow : function(){
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('uml-win');
        
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
        var canvasPanel = Ext.create('Ext.panel.Panel', {
        	id : 'canvasPanel',
        	title : '绘图区域',
        	layout : 'fit',
        	region : 'center',
        	html : '<div id="uml-canvas"><canvas id="myCanvas"></canvas></div>',
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
        var attrPanel =  Ext.create('Ext.panel.Panel', {
        	id : 'attrPanel',
        	title : '属性',
        	layout : 'fit',
        	region : 'east',
        	width : 150	
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
							clear();
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
							removeEl();
						}
					}]
				}]
				
            });
        }
        win.show();
        return win;
    }

 
});