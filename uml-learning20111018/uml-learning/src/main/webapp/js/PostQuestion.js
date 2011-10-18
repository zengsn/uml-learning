Ext.define('MyDesktop.PostQuestion', {
    extend: 'Ext.ux.desktop.Module',
    id : 'post-win',
    requires: [
        'Ext.panel.Panel',
        'Ext.form.Panel'
    ],

    init : function(){
        this.launcher = {
            text: '发布作业/问题',
            iconCls:'icon-grid',
            handler : this.createWindow,
            scope: this
        };
    },

    createWindow : function(){
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('post-win');
        
        var userAuthentication = this.app.getUserAuthentication();
        
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
        			defaultType : 'textfield',
        			items : [{
    					xtype : 'textfield',
    					fieldLabel : '标题',
    					width : 250,
    					maxLength : 20,
    					allowBlank : false,
    					name : 't_title',
						emptyText : '请输入标题'
    				}, {
    					//xtype : 'combo',
    					fieldLabel : '所属科目',
    					width : 250,
    					maxLength : 20,
    					allowBlank : false,
    					name : 't_subject',
    					emptyText : '请输入科目',
    					fieldLabel: '所属科目'
//					    allowBlank : false,
//					    queryMode: 'local',
//					    displayField: 'name',
//					    valueField: 'val',
//					    store: Ext.create('Ext.data.Store', {
//						    fields: ['abbr', 'name'],
//						    data : [
//						        {"val":"UML", "name":"UML"}
//						    ]
//					    }),
        			}, {
        				xtype : 'fieldcontainer',
			            fieldLabel : '发布类型',
			            defaultType: 'radiofield',
			            layout : 'column',
			            labelWidth : 65,
			            items: [{
			            	id  : 'radio-task',
		                    boxLabel  : '作业',
		                    name      : 't_type',
		                    value : true,
		                    hidden : userAuthentication == 'ROLE_STUDENT' ? true : false,
		                    inputValue: 'task'
		                }, {
		                    boxLabel  : '问题',
		                    name : 't_type',
		                    checked : true,
		                    inputValue: 'question',
		                    id : 'radio-question',
		                    value : false,
		                    listeners : {
		                    	'change' : function(o){
		                    		var disable = Ext.getCmp('t_finishtime').isDisabled();
		                    		if (disable == true){
		                    			Ext.getCmp('t_finishtime').setDisabled(false);
		                    		} else {
		                    			Ext.getCmp('t_finishtime').setDisabled(true);
		                    		}
		                    	}
		                    }
		                }]
        			},/* {
        				xtype : 'datefield',
        				name : 't_posttime',
        				allowBlank : false,
        				format : 'Y-m-d',
        				fieldLabel : '开始时间'
        			}, */{
        				xtype : 'datefield',
        				id : 't_finishtime',
        				name : 't_finishtime',
        				allowBlank : true,
        				hidden : userAuthentication == 'ROLE_STUDENT' ? true : false,
        				width : 250,
        				disabled : true,
        				format : 'Y-m-d',
        				fieldLabel : '结束时间',
        				emptyText : '作业完成时间'
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
    	        		name : 't_content'
    	        	}]
        	}, {
        		xtype : 'filefield',
        		name : 't_img',
        		fieldLabel : '上传图片',
        		labelWidth : 70,
        		width : 350,
        		margin : '10px 0 0 10px',
        		buttonText : '选择图片'
        	}],
        	buttons : [{
        		text : '发布',
        		handler : function(){
    				var form = this.up('form').getForm();
    				if (form.isValid()){
    					form.submit({
	    					url : './savetask.jxp',
	    					method : 'post',
	    					success : function(form, action){
	    						Ext.Msg.alert('提示信息', action.result.msg);
	    						win.close();
	    					},
	    					failure : function(form, action){
	    						Ext.Msg.alert('提示信息', action.result.msg);
	    					}
    					});
    				} else {
    					Ext.Msg.alert('提示信息', '请检查相关信息是否填写正确！');
    				};
    			}
        	}, {
        		text : '取消',
        		handler :  function(){
        			win.close();
        		}
        	}]
        });
        
        if(!win){
            win = desktop.createWindow({
                id: 'post-win',
                title:'发布问题',
                width:815,
                height:570,
                //maximizable : false,
                iconCls: 'icon-grid',
                layout : 'fit',
                //resizable : false,
                items: [editPanel]
	        	
            });
        }
        win.show();
        return win;
    }

 
});