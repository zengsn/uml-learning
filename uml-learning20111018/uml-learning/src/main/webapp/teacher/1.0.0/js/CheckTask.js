Ext.define('MyDesktop.CheckTask', {
    extend: 'Ext.ux.desktop.Module',

    requires: [
        'Ext.data.ArrayStore',
        'Ext.util.Format',
        'Ext.grid.Panel',
        'Ext.grid.RowNumberer',
        'Ext.form.Panel',
        'Ext.panel.Panel',
        'MyDesktop.t'
    ],

    id:'checktask-win',

    init : function(){
      /*  this.launcher = {
            text: '批改作业',
            iconCls:'icon-grid',
            handler : this.createWindow,
            scope: this
        };*/
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
        				id : 'bro_id',
        				xtype : 'textfield',
        				hidden : true,
        				value : ''
        			}, {
    					xtype : 'textfield',
    					fieldLabel : '标　　题',
    					allowBlank : false,
    					name : 'bro_title'
    				}, {
    					xtype : 'textfield',
    					fieldLabel : '所属科目',
    					allowBlank : false,
    					name : 'bro_subject'
        			}, {
        				xtype : 'datefield',
        				name : 'bro_posttime',
        				allowBlank : false,
        				fieldLabel : '开始时间',
        				format : 'Y-m-d',
        				disabled : true
        			}, {
        				xtype : 'datefield',
        				name : 'bro_finishtime',
        				allowBlank : false,
        				fieldLabel : '结束时间',
        				format : 'Y-m-d',
        				disabled : true
        			}, {
        				id : 'bro_score',
        				xtype : 'textfield',
        				name : 'bro_score',
        				allowBlank : false,
        				fieldLabel : '评　　分'
        			},{
		            	id : 'pic_btn',
		            	xtype : 'button',
		            	text : '查看图片',
		            	handler : function(){
		            		
		            		var picData = Ext.getCmp('bro_pic').getValue();
		            		if (picData != 'null'){
		            			dataType = picData.substring(0, 3);
		            			if (dataType == "img"){
		            				picTmpValue = './upload/' + picData;
		            			} else {
		            				xmlTmpValue = picData;
		//            				xmlTmpValue = '<uml><shape><id>1</id><name>hzucmj</name><email>hzucmj@gmail.com</email></shape></uml>';
		//            				console.log(xmlTmpValue);
		            			}
		            		} else {
		            			picData = null;
		            		}
		            		desktop.onCreateWindow('showimg-win');
		            	}
		            },{
		            	id : 'bro_pic',
		            	xtype : 'textarea',
		            	fieldLabel : '图片地址',
		            	hidden : true,
		            	editable : false
		            }]
        		}),
        		Ext.create('Ext.panel.Panel', {
        			xtype : 'panel',
            		layout : 'fit',
    	        	border : false,
    	        	items : [{
    	        		xtype : 'htmleditor',
    	        		id : 'bro_content',
    	        		name : 'bro_content',
    	        		allowBlank : false,
    	        		border : false,
    	        		height : 420
    	        	}]
        		}),
        		Ext.create('Ext.panel.Panel', {
	        		title : '附加图片',
	        		border : false,
	        		hidden : true,
	        		autoHeight : true,
	        		items : [
	        		         Ext.create('Ext.Img', {
	        		        	 id : 'bro_pic1',
	        		        	 name : 'bro_pic1',
	        		        	 margin : '5px',
	        		        	 autoHeight : true
	            	})]
	        	})
        	],
        	listeners : {
        		render : function(){
        			if (tmpValue != null){
        				editPanel.getForm().load({
        					url : './task.jxp?action=ReadTask&type=homework',
        					method : 'post',
        					model : 'MyDesktop.t',
        					//reader : jsonReader,
        					params : {
        						//taskId : '20110827153811689'
        						taskId : tmpValue
        						
        					},
        					success : function(form, action){
        						//Ext.Msg.alert('', action.result.msg);
        						Ext.getCmp('bro_id').setValue(tmpValue);
//        						Ext.getCmp('bro_pic').setSrc("./upload/" + action.result.data.bro_pic);
        						
            					var pic = Ext.getCmp('bro_pic').getValue();
            					var t = pic.substring(0, 3);
            					if (t == 'img'){
            						Ext.getCmp('bro_pic1').setSrc('./upload/' + action.result.data.bro_pic);
            					}
            					if (pic == '' || pic == 'no-image.gif'){
            						Ext.getCmp('pic_btn').setVisible(false);
            					}
        					},
        					failure : function(form, action){
        						Ext.Msg.alert('提示', action.result.msg);
        					}
        				});
        			} else {
        				Ext.Msg.alert('提示', '数据加载错误！');
        			}
        		}
        	},
        	buttons : [{
        		text : '保存',
        		handler : function(){
        			Ext.Ajax.request({
        				url : './task.jxp?action=UpdateTask',
	        			method : 'post',
	        			params : {
	        				t_id : Ext.getCmp('bro_id').value,
	        				t_score : Ext.getCmp('bro_score').value,
	        				t_content : Ext.getCmp('bro_content').getValue()
	        			},
	        			success : function(form, action){
	        				//Ext.Msg.alert('提示', action.result.msg);
	        				Ext.Msg.alert('提示', '提交成功!');
	        				tmpValue = '';
	        				win.close();
	        			}, 
	        			failure : function(form, action){
	        				Ext.Msg.alert('提示', action.result.msg);
	        			}
        			});
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
                id: 'checktask-win',
                title:'批改作业',
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