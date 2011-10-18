Ext.define('MyDesktop.DoTask', {
    extend: 'Ext.ux.desktop.Module',
    id : 'dotask-win',

    requires : [
    	'Ext.panel.Panel',
    	'Ext.form.Panel',
    	'MyDesktop.t'
    ],
    
    init : function(){
      /*  this.launcher = {
            text: '完成作业',
            iconCls:'dotask-grid',
            handler : this.createWindow,
            scope: this
        };*/
    },

    createWindow : function(){
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('dotask-win');
        
        //题目信息栏
        var basePanel=Ext.create('Ext.panel.Panel',{
        	//bodyPadding: 5,
        	border:false,
        	style:'text-indent:5px',
        	padding : 10,
        	layout:'column',
        	defaultType: 'textfield',
        	defaults:{
        		labelWidth:65
        	},
            items: [{
            	id : 'bro_id',
            	name : 'bro_id',
            	value : '',
            	hidden : true
            }, {
            	id:'bro_title',
            	name:'bro_title',
            	value:'标题信息',
            	fieldLabel: '标　　题',
                editable:false
            },{
            	id:'bro_author',
            	name:'bro_author',
            	value:'swyma',
                fieldLabel: '发 布 者',
                editable:false
            
            },{
            	id:'bro_subject',
            	name:'bro_subject',
            	value:'英语',
            	fieldLabel: '隶属课程',
                editable:false
            },{
            	id:'bro_posttime',
            	name:'bro_posttime',
            	value:'2011-08-10',
                fieldLabel: '发布时间',
                editable:false
            },{
            	id:'bro_finishtime',
            	name:'bro_finishtime',
            	value:'2011-08-10',
                fieldLabel: '结束时间',
                editable:false
            },{
            	id : 'pic_btn',
            	xtype : 'button',
            	text : '查看图片',
            	handler : function(){
            		var picData = Ext.getCmp('bro_pic').getValue();
            		console.log(picData);
            		if (picData != 'null'){
            			dataType = picData.substring(0, 3);
            			if (dataType == "img"){
            				picTmpValue = './upload/' + picData;
            			} else {
            				xmlTmpValue = picData;
//            				xmlTmpValue = '<uml><shape><id>1</id><name>hzucmj</name><email>hzucmj@gmail.com</email></shape></uml>';
//            				console.log(xmlTmpValue);
            			}
            		} 
            		desktop.onCreateWindow('showimg-win');
            	}
            },{
            	id : 'bro_pic',
            	name : 'bro_pic',
            	xtype : 'textarea',
            	fieldLabel : '图片地址',
            	hidden : true,
            	editable : false
            }]
        });
      //formpanel
        var baseinformationPanel=Ext.create('Ext.panel.Panel',{
        	bodyPadding: 5,
        	border:false,
        	items:[basePanel]
        });
        //标题panel
        var titlePanel = Ext.create('Ext.panel.Panel',{
        	border:false,
        	bodyPadding: 5,
        	id : 'title',
        	//title:'基本信息',
        	autoHeight:true,
        	items:[basePanel]
        });
        //content panel        
        var contentPanel = Ext.create('Ext.panel.Panel', {
        	border : false,
        	layout : 'fit',
        	title : '内容信息',
        	height : 300,
        	items : [
        		Ext.create('Ext.form.HtmlEditor', {
        			id : 'bro_content',
        			name : 'bro_content',
        			border : false,
        			autoHeight : true
        		})
        	]
        });
        
        //pic
        var picPanel= Ext.create('Ext.panel.Panel',{
        	border:false,
//        	bodyPadding: 5,
        	title:'图片信息',
        	hidden : true,
        	autoScroll : true,
        	items : [Ext.create('Ext.Img', {
        		id:'bro_pic1',
        		name : 'bro_pic1',
            	src : 'http://www.google.com.hk/intl/zh-CN/images/logo_cn.png'
        	})]
        });
        
        //左边栏
        var basetaskPanel = Ext.create('Ext.form.Panel',{
        	id : 'basetask',
        	title:'基本信息',
        	collapsible:true,
        	region:'west',
        	width:'80%',
        	//border:false,
        	autoScroll:true,
        	items : [basePanel,contentPanel,picPanel],
        	listeners : {
        		'render' : function(){
        			if (tmpValue != null){
        				basetaskPanel.getForm().load({
        					url : './task.jxp?action=ReadTask',
        					method : 'post',
        					model : 'MyDesktop.t',
        					//reader : jsonReader,
        					params : {
        						taskId : tmpValue
        					},
        					success : function(form, action) {
        						//Ext.getCmp('bro_content').setReadOnly(true);
        						//Ext.getCmp('bro_pic').setSrc("./upload/" + action.result.data.bro_pic);
        						Ext.getCmp('bro_content').setReadOnly(true);
            					var pic = Ext.getCmp('bro_pic').getValue();
            					var t = pic.substring(0, 3);
            					if (t == 'img'){
            						Ext.getCmp('bro_pic1').setSrc('./upload/' + action.result.data.bro_pic);
            					}
            					if (pic == 'null' || pic == 'no-image.gif'){
            						Ext.getCmp('pic_btn').setVisible(false);
            					}
//        						tmpValue = '';
        					},
        					failure : function(form, action) {
        						Ext.Msg.alert(action.result.msg);
        					}
        				});
        			} else {
        				Ext.Msg.alert('提示', '数据加载错误！');
        			}
        		}
        	}
        });
        //答题栏 edit by hzucmj======================================
        var editPanel = Ext.create('Ext.form.Panel', {
        	id : 'editPanel',
        	title:'答题区',
        	collapseDirection:true,
        	region:'center',
        	autoScroll : true,
        	//border : false,
        	items : [{
				xtype : 'panel',
	    		layout : 'fit',
	    		border : false,
	        	items : [{
	        		xtype : 'htmleditor',
	        		allowBlank : false,
	        		border : false,
	        		height : 450,
	        		name : 't_content'
	        	}]
    		}, {
        		xtype : 'filefield',
        		name : 't_pic',
        		fieldLabel : '上传图片',
        		labelWidth : 70,
        		width : 350,
        		margin : '10px',
        		buttonText : '选择图片'
        	}]
        });
        //总panel
        
        if(!win){
            win = desktop.createWindow({
                id: 'post-win',
                title:'完成作业',
                width:950,
                height:570,
                border : false,
                iconCls: 'icon-grid',
                layout : 'border',
                items: [basetaskPanel,editPanel],
            	buttons : [{
            		text : '发布',
            		handler : function(){
            			editPanel.getForm().submit({
            				url : './homework.jxp',
            				method : 'post',
            				params : {
            					id : Ext.getCmp('bro_id').value,
            					title : Ext.getCmp('bro_title').value,
            					subject : Ext.getCmp('bro_subject').value,
            					posttime : Ext.getCmp('bro_posttime').value,
            					finishtime : Ext.getCmp('bro_finishtime').value
            				},
            				success : function(form, action){
            					Ext.Msg.alert('提示信息', action.result.msg);
            					win.close();
            				},
            				failure : function(form, action){
            					Ext.Msg.alert('提示信息', '发布作业失败！');
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
        }
        win.show();
        return win;
    }

 
});