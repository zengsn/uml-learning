Ext.define('MyDesktop.CheckTask', {
    extend: 'Ext.ux.desktop.Module',

    /*requires: [
        'Ext.data.ArrayStore',
        'Ext.util.Format',
        'Ext.grid.Panel',
        'Ext.grid.RowNumberer'
    ],*/

    id:'checktask-win',

    init : function(){
        this.launcher = {
            text: '批改作业',
            iconCls:'icon-grid',
            handler : this.createWindow,
            scope: this
        };
    },

    createWindow : function(){
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('checktask-win');
        
        var editPanel = Ext.create('Ext.form.Panel', {
        	id : 'editPanel',
        	border : false,
        	autoScroll : true,
        	items : [
        		Ext.create('Ext.panel.Panel', {
        			//title : '作业/问题属性',
        			bodyPadding : 5,
        			border : false,
        			layout : 'column',
        			style : 'text-indent : 10px;',
        			defaults : {labelWidth : 80},
        			items : [{
    					xtype : 'textfield',
    					fieldLabel : '标　　题',
    					allowBlank : false,
    					name : 'title'
    				}, {
    					xtype : 'textfield',
    					fieldLabel : '所属科目',
    					allowBlank : false,
    					name : 'subject'
        			}/*, {
        				xtype : 'fieldcontainer',
			            fieldLabel : '发布类型',
			            defaultType: 'radiofield',
			            layout : 'column',
			            labelWidth : 65,
			            items: [{
		                    boxLabel  : '作业',
		                    name      : 'type',
		                    inputValue: 'task',
		                    id  : 'radio1'
		                }, {
		                    boxLabel  : '问题',
		                    name : 'type',
		                    inputValue: 'question',
		                    id : 'radio2'
		                }]
        			}*/, {
        				xtype : 'datefield',
        				name : 'postdate',
        				allowBlank : false,
        				fieldLabel : '开始时间'
        			}, {
        				xtype : 'datefield',
        				name : 'finishdate',
        				allowBlank : false,
        				fieldLabel : '结束时间'
        			}, {
        				xtype : 'textfield',
        				name : 'score',
        				allowBlank : false,
        				fieldLabel : '评　　分'
        			}]
        		}),
        	{
        			xtype : 'panel',
            		layout : 'fit',
    	        	border : false,
    	        	items : [{
    	        		xtype : 'htmleditor',
    	        		allowBlank : false,
    	        		border : false,
    	        		height : 250,
    	        		name : 'content'
    	        	}]
        	}, Ext.create('Ext.panel.Panel', {
        		title : '附加图片',
        		border : false,
        		items : [
        		         Ext.create('Ext.Img', {
        		        	 margin : '10px',
        		        	 src : "http://www.gz01vod.com/WebMedia/VODJPG1/2007-12-27_%B0%A2%B7%B2%CC%E1%B5%C4%B9%CA%CA%C2.jpg"
            	})]
        	})]
        });
        
        if(!win){
            win = desktop.createWindow({
                id: 'checktask-win',
                title:'批改作业',
                width:815,
                height:570,
                //maximizable : false,
                iconCls: 'icon-grid',
                layout : 'fit',
                //resizable : false,
                items: [editPanel],
	        	buttons : [{
	        		text : '保存',
	        		handler : function(){
	        			
	        		}
	        	}, {
	        		text : '取消',
	        		handler :  function(){
	        			win.close();
	        		}
	        	}]
            });
        }
        win.show();
        return win;
    }

 
});