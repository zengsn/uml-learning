/*!
* author 蔡治平
*/
Ext.define('MyDesktop.post',{
	extend : 'Ext.window.Window',
	id:'post-win',
	title:'发布问题',
    width:815,
    height:570,
    iconCls: 'icon-grid',
    layout : 'fit',
	maximizable : true,
	minimizable : true,
	
	initComponent : function(){
		var editPanel = Ext.create('Ext.form.Panel', {
        	id : 'editPanel',
        	border : false,
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
    					fieldLabel : '标题',
    					allowBlank : false,
    					name : 'title'
    				}, {
    					xtype : 'textfield',
    					fieldLabel : '所属科目',
    					allowBlank : false,
    					name : 'subject'
        			}, {
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
		                    checked : true,
		                    inputValue: 'question',
		                    id : 'radio2'
		                }]
        			}, {
        				xtype : 'datefield',
        				name : 'postdate',
        				allowBlank : false,
        				fieldLabel : '开始时间'
        			}, {
        				xtype : 'datefield',
        				name : 'finishdate',
        				allowBlank : false,
        				fieldLabel : '结束时间'
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
    	        		height : 400,
    	        		name : 'content'
    	        	}]
        	}, {
        		xtype : 'filefield',
        		name : 'uploadPic',
        		fieldLabel : '上传图片',
        		labelWidth : 70,
        		width : 350,
        		margin : '10px 0 0 10px',
        		buttonText : '选择图片'
        	}]
        });
		this.buttons = [{
			text : '发布',
			scope : this,
			handler : function(){
				
			}
		}, {
			text : '取消',
			scope : this,
			handler :  function(){
				this.close();
			}
		}];
		this.items = [editPanel];
		this.callParent();
	}

});