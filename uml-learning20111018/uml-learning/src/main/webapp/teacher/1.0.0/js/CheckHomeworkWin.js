/*Ext.define('MyDesktop.CheckHomeworkWin', {
    extend: 'Ext.ux.desktop.Module',

    requires: [
        'Ext.data.ArrayStore',
        'Ext.util.Format',
        'Ext.grid.Panel',
        'Ext.grid.RowNumberer',
        'Ext.data.Model',
        'Ext.panel.Panel'
    ],

    id:'checkhomework-win',
    
    init : function(){
    	this.launcher = {
			text : '查看作业',
			iconCls : 'icon-grid',
			scope : this,
			handler : this.createWindow
    	};
    },

    createWindow : function(){
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('checkhomework-win');
        
        // 创建作业详细信息列表
		Ext.define('Detail', {
			extend : 'Ext.data.Model',
			fields : [ 'id', 'name', 'score', 'time','detail','flag' ]
		});

		//定义分页
		var itemsPerPage = 2;
		
		var homeworkdetialstore = new Ext.data.Store({
			autoLoad : true,
			pageSize: itemsPerPage,
			model : 'Detail',
			proxy : {
				type : 'ajax',
				url : 'task.jxp?action=checkGrid',
				reader : {
					type : 'xml',
					root:'students',
					record : 'student',
					total:'total'
				}
			}
		});

		homeworkdetialstore.load({
		    params:{
		        start:0,    
		        limit: itemsPerPage
		    }
		});

		//显示作业是否已经修改
		function checkOrNot(value) {
	        if (value == 'true') {
	            return "<img src='./images/reg4.gif' />";
	        } else {
	            return "<img src='./images/reg3.gif' />";
	        }
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
                {header: '批改状态', dataIndex: 'flag',renderer:checkOrNot},
                {header: '操作', 
                	renderer:function(){
                		return "<input type='button' value='查看详细' />";
                	} 
                }
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
            }],
            listeners : {
            	"itemclick":function(view,record,item,index,e){
        			tmpValue=view.getStore().getAt(index).data['id'];
        			desktop.onCreateWindow('checktask-win');
            	}
            }

        });
        
        //创建gridpanel的panel
        var homeworkDetialPanel = Ext.create('Ext.panel.Panel',{
        	id : 'homeworkdetial',
        	title : '作业详情',
        	region : 'center',
        	items:[homeworkDetialGridpanel]
        });
        
        ////////////////////////////////////////////////
        var tree=desktop.generateTree("tree","task.jxp?action=checkTree",true,false,'作业信息');
        
        ///////////////////////////////////////
        function overrideTreeEvent(obj){
        	obj.addListener('itemclick',function(view,record){
        		var nid=record.data.id, ntext=record.data.text;
        		console.log("id : " + nid + ", text : " + ntext);
        		//addEl(treenode);
        		Ext.Ajax.request({
					url:'task.jxp?action=checkGrid',
					params:{
						data:nid
					},
					success:function(response,opts){  
		                var obj=Ext.decode(response.responseText); 
		                if(obj.success==true){
		                	//alert(obj.name);
		                	homeworkdetialstore.load();
		                	//nid=null;
		                }else{
		                	//alert(obj.success);
		                	//homeworkdetialstore.load();
		                }
		            },
					success : function(){
						homeworkdetialstore.load();
					},
					failure:function() {
					}
				});
        	});
        }
        
        overrideTreeEvent(tree);
        //创建树的Panel
        var homeworkTimesPanel = Ext.create('Ext.panel.Panel',{
        	id : 'homeworkTimes',
        	title : '作业信息',
        	width:150,
        	maxWidth : 150,
        	layout:'fit',
        	region : 'west',
        	items : [tree]
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

 
});*/
Ext.define('MyDesktop.CheckHomeworkWin', {
    extend: 'Ext.ux.desktop.Module',

    requires: [
        'Ext.data.ArrayStore',
        'Ext.util.Format',
        'Ext.grid.Panel',
        'Ext.grid.RowNumberer',
        'Ext.data.Model',
        'Ext.panel.Panel'
    ],

    id:'checkhomework-win',
    
    init : function(){
    	this.launcher = {
			text : '查看作业',
			iconCls : 'icon-grid',
			scope : this,
			handler : this.createWindow
    	};
    },

    createWindow : function(){
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('checkhomework-win');
        
        // 创建作业详细信息列表
		Ext.define('Detail', {
			extend : 'Ext.data.Model',
			fields : [ 'id', 'name', 'score', 'time','detail','flag' ]
		});

		//定义分页
		var itemsPerPage = 2;
		
		var homeworkdetialstore = new Ext.data.Store({
			autoLoad : true,
			pageSize: itemsPerPage,
			model : 'Detail',
			proxy : {
				type : 'ajax',
				url : 'task.jxp?action=checkGrid',
				reader : {
					type : 'json',//'xml',
					root:'root',
					//record : 'student',
					totalProperty:'total'
				}
			}
		});

		homeworkdetialstore.load({
		    params:{
		        start:0,    
		        limit: itemsPerPage
		    }
		});

		//显示作业是否已经修改
		function checkOrNot(value) {
	        if (value == 'true') {
	            return "<img src='./images/reg4.gif' />";
	        } else {
	            return "<img src='./images/reg3.gif' />";
	        }
	    }
		
        //创建gridpanel（作业详情）
		var homeworkDetialGridpanel=Ext.create('Ext.grid.Panel', {
           //title: '作业详情',
            store: homeworkdetialstore,
            border : false,
            columns: [
                /*{header: '学生id',  dataIndex: 'id'},*/
                {header: '学生姓名', dataIndex: 'name'},
                {header: '题目详情', dataIndex: 'detail',flex:1},
                {header: '发布时间', dataIndex: 'time'},
                {header: '学生成绩', dataIndex: 'score'},
                {header: '批改状态', dataIndex: 'flag',renderer:checkOrNot},
                {header: '操作', 
                	renderer:function(){
                		return "<input type='button' value='查看详细' />";
                	} 
                }
            ],
            height: '100%',
            layout:'fit',
            dockedItems: [{
                xtype: 'pagingtoolbar',
                store: homeworkdetialstore,   
                dock: 'bottom',
                displayInfo: true,
                beforePageText : '第',
				afterPageText : '页',
				inputItemWidth : 20,
                emptyMsg:'没有记录',
                displayMsg:'<font size=2>第{0}-{2}条,共{2}条</font>'
            }],
            listeners : {
            	"itemclick":function(view,record,item,index,e){
        			tmpValue=view.getStore().getAt(index).data['id'];
        			desktop.onCreateWindow('checktask-win');
            	}
            }

        });
        
        //创建gridpanel的panel
        var homeworkDetialPanel = Ext.create('Ext.panel.Panel',{
        	id : 'homeworkdetial',
        	title : '作业详情',
        	region : 'center',
        	items:[homeworkDetialGridpanel]
        });
        
        var tree=desktop.generateTree("tree","task.jxp?action=checkTree",true,false,'作业标题');
        
        function overrideTreeEvent(obj){
        	obj.addListener('itemclick',function(view,record){
        		var nid=record.data.id, ntext=record.data.text;
        		console.log("id : " + nid + ", text : " + ntext);
        		//addEl(treenode);
        		Ext.Ajax.request({
					url:'task.jxp?action=checkGrid',
					params:{
						data:nid
					},
					success:function(response,opts){  
		                var obj=Ext.decode(response.responseText); 
		                if(obj.success==true){
		                	homeworkdetialstore.load();
		                	nid=null;
		                }else{
		                }
		            }, 
					failure:function() {
						alert("failure");
					}
				});
        	});
        }
        
        overrideTreeEvent(tree);
        //创建树的Panel
        var homeworkTimesPanel = Ext.create('Ext.panel.Panel',{
        	id : 'homeworkTimes',
        	title : '作业列表',
        	width:150,
        	maxWidth : 150,
        	layout:'fit',
        	region : 'west',
        	items : [tree]
        });

        if(!win){
            win = desktop.createWindow({
                id: 'checkhomework-win',
                title:'批改作业',
                width:1050,
                height:600,
                bodyStyle : 'border : none;',
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