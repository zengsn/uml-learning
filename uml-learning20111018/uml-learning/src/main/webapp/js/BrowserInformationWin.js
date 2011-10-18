Ext.define('MyDesktop.BrowserInformationWin', {
    extend: 'Ext.ux.desktop.Module',

    requires: [
        'Ext.data.ArrayStore',
        'Ext.util.Format',
        'Ext.grid.Panel',
        'Ext.grid.RowNumberer',
        'Ext.panel.Panel',
        'Ext.form.Panel',
        'MyDesktop.t'
    ],

    id:'browserinformation-win',
    
    init : function(){
    },

    createWindow : function(){
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('browserinformation-win');
        
        //baseinformaitonpanel
        var basePanel=Ext.create('Ext.panel.Panel',{
        	//bodyPadding: 5,
        	border:false,
        	style:'text-indent:5px',
        	layout:'column',
        	defaultType: 'textfield',
        	defaults:{
        		labelWidth:65
        	},
            items: [{
            	fieldLabel: '标　　题',
                value:'标题信息',
                id:'bro_title',
                name:'bro_title',
                editable:false
            },{
                fieldLabel: '发 布 者',
                value:'swyma',
                id:'bro_author',
                name:'bro_author',
                editable:false
            
            },{
            	fieldLabel: '隶属课程',
                value:'英语',
                id:'bro_subject',
                name:'bro_subject',
                editable:false
            },{
                fieldLabel: '发布时间',
                value:'2011-08-10',
                id:'bro_posttime',
                name:'bro_posttime',
                editable:false
            },{
                fieldLabel: '结束时间',
                value:'2011-08-10',
                id:'bro_finishtime',
                name:'bro_finishtime',
                editable:false
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
        });
        
        //formpanel
//        var baseinformationPanel=Ext.create('Ext.panel.Panel',{
//        	bodyPadding: 5,
//        	border:false,
//        	items:[basePanel]
//        });
        //标题panel
        var titlePanel = Ext.create('Ext.panel.Panel',{
        	border:false,
        	bodyPadding: 5,
        	id : 'title',
        	title:'基本信息',
        	autoHeight:true,
        	items:[basePanel]
        });
        //context panel
/*        var contentPanel = Ext.create('Ext.panel.Panel',{
        	id : 'bro_content',
        	name : 'bro_content',
        	border:false,
        	bodyPadding: 5,
        	title:'内容信息',
        	html:'<font size=3>这个是内容栏<br />这个是内容栏<br />这个是内容栏<br />这个是内容栏<br />这个是内容栏<br />这个是内容栏<br />这个是内容栏<br />这个是内容栏<br />这个是内容栏<br />这个是内容栏<br />这个是内容栏<br />这个是内容栏<br />这个是内容栏<br /></font>',
        	autoHeight:true
        });*/
        var contentPanel = Ext.create('Ext.panel.Panel', {
        	border : false,
        	layout : 'fit',
        	title : '内容信息',
        	height : 450,
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
        	hidden:true,
        	items : [
        	         Ext.create('Ext.Img', {
		        		id:'bro_pic1',
		        		name : 'bro_pic1',
		            	src : 'http://www.google.com.hk/intl/zh-CN/images/logo_cn.png'
        	         })
        	]
        });
        
        //左边栏
        var homeworkTimesPanel = Ext.create('Ext.form.Panel',{
        	id : 'homeworkTimes',
        	//border:false,
        	region : 'center',
        	autoScroll:true,
        	items : [titlePanel,contentPanel,picPanel],
        	listeners : {
        		'render' : function(){
        			if (tmpValue != null){
        				homeworkTimesPanel.getForm().load({
                			url : './task.jxp?action=ReadTask&type=task',
                			method : 'post',
                			model : 'MyDesktop.t',
                			//reader : jsonReader,
                			params : {
            					taskId : tmpValue
            				},
            				success : function(form, action) {
            					Ext.getCmp('bro_content').setReadOnly(true);
            					var pic = Ext.getCmp('bro_pic').getValue();
            					var t = pic.substring(0, 3);
            					if (t == 'img'){
            						Ext.getCmp('bro_pic1').setSrc('./upload/' + action.result.data.bro_pic);
            					}
            					if (pic == '' || pic == 'no-image.gif'){
            						Ext.getCmp('pic_btn').setVisible(false);
            					}
    	                    },
    	                    failure : function(form, action) {
    	                    	Ext.Msg.alert('提示', action.result.msg);
            				}
                		});
        			} else {
        				Ext.Msg.alert('提示', '数据加载错误！');
        			}
        			
        		}
        	}
        });
      
        var commentFormpanel=Ext.create('Ext.form.FormPanel',{
        	id:'commentPanel',
        	border:false,
        	height:'30%',
        	title:'用户评论',
        	items: [{
                xtype:'textareafield',
                //fieldLabel:'评价',
                //labelWidth:40,
                anchor:'100%',
                height:'100%',
                name:'comment',
                id:'comment',
                allowBlank : false
            }],
            buttons: [{
                text: '重置',
                buttonAlign:'right',
                handler: function() {
                    this.up('form').getForm().reset();
                }
            },{
            	text:'提交',
            	handler:function(){
            		var form = this.up('form').getForm();
            		if (form.isValid) {
            			form.submit({
            				method : 'post',
            				url : './comment.jxp?action=addComment',
            				params : {
            					tid : tmpValue
            				},
            				success : function(form, action){
            					Ext.Msg.alert('提示信息', action.result.msg);
            					commentsStore.load();
            					form.reset();
            				},
            				failure : function(form, action){
            					Ext.Msg.alert('提示信息', '发布评论失败！');
            				}
            			});
            		}
            	}
            }]
            
        });
        
        
        // 评论列表
		Ext.define('Comment', {
			extend : 'Ext.data.Model',
			fields : [ 'name','posttime','content' ]
		});
		var start = 0;
		var limit = 10;
		var commentsStore = new Ext.data.Store({
			id : 'commentsStore',
			autoLoad : false,
			model : 'Comment',
			autoSync: true,
			pageSize : limit,
			proxy : {
				type : 'ajax',
				url : './comment.jxp?action=ShowAll',
				reader : {
					type : 'xml',
					root : 'comments',
					record : 'comment',
					totalProperty : 'total'
				}
			}
		});
		
		commentsStore.load({
			params : {
				start : start,
				limit : limit,
				tid : tmpValue
			}
		});

		var commentsTpl = new Ext.XTemplate(
				'<tpl for=".">',
					'<div id="x-task">',
					  '<div id="x-t_head">',
					  	'<span id="x-t_author">作者：{name}</span>',
					  '</div>',
					  '<div id="x-t_body">',
					  	'<div id="x-t_content">评论内容：{content}</div>',
					  '</div>',
					  '<div id="x-t_foot">',
					  	'<span id="x-t_posttime">发布时间：{posttime}</span>',
					  '</div>',
					'</div>',
				'</tpl>');
//		commentsTpl.compile();
		var commentsView = new Ext.DataView({
			//title : '问题',
			id : 'commentsView',
			itemSelector : 'div#task',
			store : commentsStore,
			tpl : commentsTpl,
			emptyText : '没有数据！'
		});
		
		var showCommentPanel=Ext.create('Ext.panel.Panel',{
			id:'showCommentPanel',
			name:'showCommentPanel',
			height:'70%',
			autoScroll:true,
			border : false,
			dockedItems : [{
				xtype : 'pagingtoolbar',
				store : commentsStore,
				dock : 'bottom',
				displayInfo : true,
				beforePageText : '第',
				afterPageText : '页',
				inputItemWidth : 20,
				displayMsg : '<font size=2>第{0}-{2}条,共{2}条</font>',
				emptyMsg : '没有记录！'
			}],
			items:[commentsView]
		});
		
        //右边栏
        var homeworkDetialPanel = Ext.create('Ext.panel.Panel',{
        	id : 'homeworkdetial',
        	title : '评论列表',
        	region : 'east',
        	width:'50%',
        	collapsible:true,  
        	items:[showCommentPanel,commentFormpanel]
        });
        

        if(!win){
            win = desktop.createWindow({
                id: 'browserinformation-win',
                title:'浏览信息',
                width:1050,
                height:600,
                iconCls: 'icon-grid',
                border : false,
                animCollapse:false,
                constrainHeader:true,
                layout: 'border',
                items: [homeworkTimesPanel, homeworkDetialPanel],
                listeners : {
                	'show' : function(){
                		Ext.Ajax.request({
	            			url:'task.jxp?action=GetXmlString&id=' + tmpValue,
//                			url :　'./data/tool.xml',
	            			success:function(response,opts){  
								var i;
				                var obj=Ext.decode(response.responseText); 
				                for(i=0;i<obj.length;i++){
				                	//alert(obj[i].driver);
				                	//alert(obj[i].elX)
				                	elArr[i]=obj[i];
				                }
				                console.log("the length of elArr : " + elArr.length);
				            },
				            failure:function(){
				            	Ext.Msg.alert('提示', '数据加载失败！');
				            }
	            		});
                		/*//用于浏览图片
            			Ext.define('umlShape', {
	                        extend: 'Ext.data.Model',
	                        fields: ['id', 'text', 'elX', 'elY', 'x1', 'y1', 'x2', 'y2', 'width', 'height', 'type',  'dw', 'dh', 'other']
	                    });
	        			
	                    store = new Ext.data.Store({
	                        model: 'umlShape',
	                        autoLoad : true,
	                        proxy: {
	                            type: 'ajax',
//	                            url : './task.jxp?action=GetXmlString&id=' + tmpValue,
	                            url : './data/tool.xml',
	                            reader: {
	                                type: 'xml',
	                                root : 'uml',
	                                record: 'shape'
	                            }
	                        },
	                        listeners : {
	                        	'load' : function(me, records, success, operation){
	                        		console.log('store is loading...');
	                        		for (var i = 0; i < records.length; i++){
	                        			elArr[i] = records[i].data;
	                        		}
	                        	}
	                        }
	                    }); 
                		*/
                	}
                }
            });
        }
        win.show();
        return win;
    }

 
});