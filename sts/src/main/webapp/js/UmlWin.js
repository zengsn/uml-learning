Ext.define('MyDesktop.UmlWin', {
    extend: 'Ext.ux.desktop.Module',

    /*requires: [
        'Ext.data.ArrayStore',
        'Ext.util.Format',
        'Ext.grid.Panel',
        'Ext.grid.RowNumberer'
    ],*/

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
        
        
        var usecaseDiagram = desktop.generateTree("usecase", "./data/usecase.txt", false, true, "usecase");
        var activityDiagram = desktop.generateTree("activity", "./data/activity.txt", false, true, "activity");
        var packageDiagram = desktop.generateTree("package", "./data/package.txt", false, true, "package");
        var sequenceDiagram = desktop.generateTree("sequence", "./data/sequence.txt", false, true, "sequence");
        
        var toolsPanel = new Ext.Panel({
        	id : 'umlTools',
        	title : '工具箱',
        	layout : 'accordion',
        	region : 'west',
        	width : 150,
        	maxWidth : 150,
        	items : [
        		new Ext.Panel({
        			title : '用例图', 
        			items : [usecaseDiagram]
        		}), 
        		new Ext.Panel({
        			title : '类图',
        			items : []
        		}),
        		new Ext.Panel({
        			title : '包图',
        			items : [packageDiagram]
        		}),
        		new Ext.Panel({
        			title : '顺序图',
        			items : [sequenceDiagram]
        		}),
        		new Ext.Panel({title : '状态图'}),
        		new Ext.Panel({
        			title : '活动图',
        			items : [activityDiagram]
        		})
        	]
        });
        var canvasPanel = new Ext.Panel({
        	id : 'canvasPanel',
        	title : '绘图区域',
        	layout : 'fit',
        	region : 'center',
        	html : '<div id="uml-canvas"><canvas id="myCanvas"></canvas></div>'
        });
        var attrPanel =  new Ext.Panel({
        	id : 'attrPanel',
        	title : '属性',
        	layout : 'fit',
        	region : 'east',
        	width : 150	
        });

        if(!win){
            win = desktop.createWindow({
                id: 'uml-win',
                title:'Grid Window',
                width:1050,
                height:600,
                iconCls: 'icon-grid',
                animCollapse:false,
                constrainHeader:true,
                layout: 'border',
                items: [toolsPanel, canvasPanel, attrPanel],
                listeners : {
                	'show' : function(){
                		initCanvas();
                	}
                },
				dockedItems : [{
					xtype : 'toolbar',
					dock : 'top',
					items : ['->',{
						text : 'Save'
					}, {
						text : 'Upload'
					}, {
						text : 'Zoom In'
					}, {
						text : 'Zoom Out'
					}, {
						text : 'Delete'
					}]
				}, {
					xtype : 'toolbar',
					dock : 'bottom',
					items : [{
						id : 'stautsText',
						xtype : 'label',
						text : '当前选中：text'
					}]
				}]
            });
        }
        win.show();
        return win;
    }

 
});