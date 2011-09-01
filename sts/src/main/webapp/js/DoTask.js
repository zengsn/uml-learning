Ext.define('MyDesktop.DoTask', {
    extend: 'Ext.ux.desktop.Module',
    id : 'dotask-win',

    init : function(){
        this.launcher = {
            text: '完成作业',
            iconCls:'dotask-grid',
            handler : this.createWindow,
            scope: this
        };
    },

    createWindow : function(){
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('dotask-win');
        
        //题目信息栏
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
        	//title:'基本信息',
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
        var basetaskPanel = Ext.create('Ext.Panel',{
        	id : 'basetask',
        	title:'基本信息',
        	collapsible:true,
        	region:'west',
        	width:'80%',
        	//border:false,
        	autoScroll:true,
        	items : [titlePanel,contextPanel,picPanel]
        });
        //答题栏
        var editPanel = Ext.create('Ext.form.Panel', {
        	id : 'editPanel',
        	title:'答题区',
        	collapseDirection:true,
        	region:'center',
        	//border : false,
        	items : [{
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
        //总panel
        
        if(!win){
            win = desktop.createWindow({
                id: 'post-win',
                title:'完成作业',
                width:950,
                height:570,
                iconCls: 'icon-grid',
                layout : 'border',
                items: [basetaskPanel,editPanel],
	        	buttons : [{
	        		text : '发布',
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