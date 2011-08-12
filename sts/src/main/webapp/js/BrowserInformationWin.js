Ext.define('MyDesktop.BrowserInformationWin', {
    extend: 'Ext.ux.desktop.Module',

    requires: [
        'Ext.data.ArrayStore',
        'Ext.util.Format',
        'Ext.grid.Panel',
        'Ext.grid.RowNumberer'
    ],

    id:'browserinformation-win',
    

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
                id:'informationtitle',
                name:'informationtitle',
                editable:false
            },{
                fieldLabel: '发 布 者',
                value:'swyma',
                id:'author',
                name:'author',
                editable:false
            
            },{
                fieldLabel: '发布时间',
                value:'2011-08-10',
                id:'btime',
                name:'btime',
                editable:false
            },{
            	fieldLabel: '隶属课程',
                value:'英语',
                id:'course',
                name:'course',
                editable:false
            }]
        });
        
        //formpanel
        var baseinformationPanel=Ext.create('Ext.panel.Panel',{
        	bodyPadding: 5,
        	border:false,
        	items:[basePanel]
        });
        //标题panel
        var titlePanel = Ext.create('Ext.Panel',{
        	border:false,
        	bodyPadding: 5,
        	id : 'title',
        	title:'基本信息',
        	autoHeight:true,
        	items:[basePanel]
        });
        //context panel
        var contextPanel = Ext.create('Ext.Panel',{
        	border:false,
        	bodyPadding: 5,
        	id : 'context',
        	title:'内容信息',
        	html:'<font size=3>这个是内容栏<br />这个是内容栏<br />这个是内容栏<br />这个是内容栏<br />这个是内容栏<br />这个是内容栏<br />这个是内容栏<br />这个是内容栏<br />这个是内容栏<br />这个是内容栏<br />这个是内容栏<br />这个是内容栏<br />这个是内容栏<br /></font>',
        	autoHeight:true
        });
        //pic
        var picPanel= Ext.create('Ext.panel.Panel',{
        	border:false,
        	bodyPadding: 5,
        	title:'图片信息',
        	items : [Ext.create('Ext.Img', {
        		id:'pic',
            	src : 'http://www.google.com.hk/intl/zh-CN/images/logo_cn.png'
        	})]
        });
        
        //左边栏
        var homeworkTimesPanel = Ext.create('Ext.Panel',{
        	id : 'homeworkTimes',
        	//border:false,
        	region : 'center',
        	autoScroll:true,
        	items : [titlePanel,contextPanel,picPanel]
        });
        
      
        var commentFormpenal=Ext.create('Ext.form.FormPanel',{
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
                id:'comment'
            }],
            buttons: [{
                text: '重置',
                buttonAlign:'right',
                handler: function() {
                    
                }
            },{
            	text:'提交',
            	handler:function(){
            		alert(new MyDesktop.TeacherWin());
            	}
            }]
        });
        
        
        // 评论列表
		Ext.define('Comments', {
			extend : 'Ext.data.Model',
			fields : [ 'name','time','context' ]
		});
		var start = 0;
		var limit = 2;
		var commentsStore = new Ext.data.Store({
			id : 'commentsStore',
			autoLoad : false,
			model : 'Comments',
			pageSize : limit,
			proxy : {
				type : 'ajax',
				url : './data/t_comments.xml',
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
				limit : limit
			}
		});

		var commentsTpl = new Ext.XTemplate(
				'<tpl for=".">',
					'<div id="task">',
					  '<div id="t_head">',
					  	'<span id="t_author">作者：{name}:</span>',
					  '</div>',
					  '<div id="t_body">',
					  	'<div id="t_content">评论内容：{context}</div>',
					  '</div>',
					  '<div id="t_foot">',
					  	'<span id="t_posttime">发布时间：{time}</span>',
					  '</div>',
					'</div>',
				'</tpl>');
		commentsTpl.compile();
		var commentsView = new Ext.DataView({
			//title : '问题',
			store : commentsStore,
			tpl : commentsTpl,
			emptyText : 'No item to display'
		});
		
		var showCommentPanel=Ext.create('Ext.Panel',{
			id:'showCommentPanel',
			name:'showCommentPanel',
			height:'70%',
			autoScroll:true,
			dockedItems : [{
				xtype : 'pagingtoolbar',
				store : commentsStore,
				dock : 'bottom',
				displayInfo : true,
				//displayMsg : '<font size=2> {0}-{2}条,共 {2}条记录</font>',
				emptyMsg : '没有记录！'
			}],
			items:[commentsView]
		});
		
        //右边栏
        var homeworkDetialPanel = Ext.create('Ext.Panel',{
        	id : 'homeworkdetial',
        	title : '评论列表',
        	region : 'east',
        	width:'50%',
        	collapsible:true,  
        	items:[showCommentPanel,commentFormpenal]
        });
        

        if(!win){
            win = desktop.createWindow({
                id: 'browserinformation-win',
                title:'浏览信息',
                width:1050,
                height:600,
                iconCls: 'icon-grid',
                animCollapse:false,
                constrainHeader:true,
                layout: 'border',
                items: [homeworkTimesPanel, homeworkDetialPanel]
            });
        }
        win.show();
        return win;
    }

 
});