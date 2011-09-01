Ext.define('MyDesktop.CheckHomeworkWin', {
    extend: 'Ext.ux.desktop.Module',

    requires: [
        'Ext.data.ArrayStore',
        'Ext.util.Format',
        'Ext.grid.Panel',
        'Ext.grid.RowNumberer'
    ],

    id:'checkhomework-win',
    
    init : function(){
    	this.launcher = {
			text : '查看作业',
			iconCls : 'icon-grid',
			scope : this,
			handler : this.createWindow
    	}
    },

    createWindow : function(){
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('checkhomework-win');
        
        //id, data, rootvisible, expand, roottext
        var tree=desktop.generateTree("tree","./data/time.txt",true,false,'作业信息');
        
        //创建树的Panel
        var homeworkTimesPanel = Ext.create('Ext.Panel',{
        	id : 'homeworkTimes',
        	title : '作业信息',
        	width:150,
        	maxWidth : 150,
        	layout:'fit',
        	region : 'west',
        	items : [tree]
        });
        
        // 创建作业详细信息列表
		Ext.define('Detial', {
			extend : 'Ext.data.Model',
			fields : [ 'id', 'name', 'score', 'time','detail' ]
		});

		//定义分页
		var itemsPerPage = 2;
		
		var homeworkdetialstore = new Ext.data.Store({
			autoLoad : true,
			pageSize: itemsPerPage,
			model : 'Detial',
			proxy : {
				type : 'ajax',
				url : './data/t_homeworkdetial.xml',
				reader : {
					type : 'xml',
					root:'students',
					record : 'student'
				}
			}
		});

		homeworkdetialstore.load({
		    params:{
		        start:0,    
		        limit: itemsPerPage
		    }
		});

		//创建链接
		function Handler(value){
			return "<a href=#><font color=red id=\"checkdetail\">查看详细</font></a>";
		}
		
        //创建gridpanel（作业详情）
        var homeworkDetialGridpanel=Ext.create('Ext.grid.Panel', {
           //title: '作业详情',
            store: homeworkdetialstore,
            columns: [
                {header: '学生id',  dataIndex: 'id'},
                {header: '学生姓名', dataIndex: 'name'},
                {header: '题目详情', dataIndex: 'detail',flex:1},
                {header: '发布时间', dataIndex: 'time'},
                {header: '学生成绩', dataIndex: 'score'},
                {header: '操作',dateIndex:'handler', renderer:Handler}
            ],
            height: '100%',
            layout:'fit',
            dockedItems: [{
                xtype: 'pagingtoolbar',
                store: homeworkdetialstore,   
                dock: 'bottom',
                displayInfo: true,
                emptyMsg:'没有记录',
                displayMsg:'第{0}条到第{1}条  共{2}条记录'
            }]

        });
        
        //创建gridpanel的panel
        var homeworkDetialPanel = Ext.create('Ext.Panel',{
        	id : 'homeworkdetial',
        	title : '作业详情',
        	region : 'center',
        	items:[homeworkDetialGridpanel]
        });
        

        if(!win){
            win = desktop.createWindow({
                id: 'checkhomework-win',
                title:'评改作业',
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