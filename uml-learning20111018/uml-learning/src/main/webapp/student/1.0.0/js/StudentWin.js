Ext.define('MyDesktop.StudentWin', {
	extend : 'Ext.ux.desktop.Module',

	requires : [ 
	             'Ext.data.ArrayStore', 
	             'Ext.util.Format',
	             'Ext.grid.Panel', 
	             'Ext.grid.RowNumberer',
	             'MyDesktop.Tasks',
	             'Ext.panel.Panel',
	             'MyDesktop.Follow'
    ],

	id : 'stu-win',
	
	init : function() {
		this.launcher = {
			text : '学生作业/问题管理',
			iconCls : 'icon-grid',
			handler : this.createWindow,
			scope : this
		};
	},

	createWindow : function() {
		
		var desktop = this.app.getDesktop();
		var win = desktop.getWindow('stu-win');
		
		var userName = this.app.getUserName();
		
		var preventDefaultMenu = function(){
			Ext.getBody().on("contextmenu", Ext.emptyFn, null, {preventDefault: true});
		};
		
		function rightClick (view, record, item, index, e) {
			tmpValue = view.getStore().getAt(index).data['tid'];
			tauthor = view.getStore().getAt(index).data['tauthor'];
			if(!view.menu) {
				view.menu=new Ext.menu.Menu({
					items:[{
						text:'查看详情',
						handler : function(){
							console.log('查看详情，传送值为：' + tmpValue);
							desktop.onCreateWindow('browserinformation-win');
						}
					}, {
						id : 'delRecord',
						text:'删除记录',
						handler : function(){
							Ext.Msg.confirm('提示', '确认删除吗？', function(btn){
								if (btn == 'yes'){
									Ext.Ajax.request({
										url : './task.jxp?action=delTask',
										params : {
											t_id : tmpValue
										},
										success : function(response, config){
											Ext.Msg.alert('提示', response.responseText);
											view.getStore().load();
										},
										failure : function(){
											Ext.Msg.alert('提示', response.responseText);
										}
									});
								}
							});
						}
					}, {
						text:'刷新',
						handler : function(){
							view.getStore().load();
						}
					}, '-', {
						text : '第一页',
						handler :function(){
							Ext.getCmp('taskPaging').moveFirst();
						}
					}, {
						text : '上一页',
						handler :function(){
							Ext.getCmp('taskPaging').movePrevious();
						}
					}, {
						text : '下一页',
						handler :function(){
							Ext.getCmp('taskPaging').moveNext();
						}
					}, {
						text : '最后一页',
						handler :function(){
							Ext.getCmp('taskPaging').moveLast();
						}
					}],
					listeners : {
						'show' : function(){
							Ext.getCmp('delRecord').setVisible(userName == tauthor ? true : false);
						}
					}
				});
			}
			view.menu.showAt(e.getXY());
			e.stopEvent();
		};
		
		var start = 0;
		var limit = 10;
		var tasksStore = new Ext.data.Store({
			id : 'tasksStore',
			autoLoad : false,
			model : 'MyDesktop.Tasks',
			pageSize : limit,
			proxy : {
				type : 'ajax',
				url : 'task.jxp?action=showTask',
				reader : {
					/*type : 'json',
					root : 'root',
					totalProperty : 'total'*/
					type : 'xml',
					root : 'tasks',
					record : 'task',
					totalProperty : 'total'
				}
			}
		});
		
		tasksStore.load({
			params : {
				start : start,
				limit : limit
			}
		});

		var tasksTpl = new Ext.XTemplate(
			'<tpl for=".">',
				'<div id="x-task">',
				  '<div id="x-t_head">',
				  	'<span id="x-t_author">{tauthor}:</span>',
				    '<span id="x-t_title">[{ttype}--{tsubject}] {ttitle}</span>',
				  '</div>',
				  '<div id="x-t_body">',
				  	'<div id="x-t_content">内容：{tcontent}</div>',
				    '<div id="x-t_pic"><img src="./upload/{tpic}" width="150" /></div>',
				  '</div>',
				  '<div id="x-t_foot">',
				  	'<span id="x-t_posttime">发布时间：{tpost}　</span>',
				    '<span id="x-t_finishtime">{tfinish}</span>',
				  '</div>',
				'</div>',
			'</tpl>');

		var tasksView = new Ext.DataView({
			id : 'tasksview',
			title : '作业',
			store : tasksStore,
			tpl : tasksTpl,
			emptyText : '暂无数据！',
			scope : this,
			itemSelector : 'div#x-task',
			listeners : {
				'itemdblclick' : function(view, record, item, index, e){
					tmpValue = view.getStore().getAt(index).data['tid'];
					console.log('传送值为：' + tmpValue);
					desktop.onCreateWindow('dotask-win');
				},
				'itemcontextmenu' : rightClick,
				'render':  preventDefaultMenu
			}
		});
		var taskPanel = Ext.create('Ext.panel.Panel', {
			title : '作业',
			autoScroll : true,
			items : [tasksView],
			dockedItems : [{
				xtype : 'pagingtoolbar',
				store : tasksStore,
				dock : 'bottom',
				displayInfo : true,
				beforePageText : '第',
				afterPageText : '页',
				inputItemWidth : 20,
				displayMsg : '<font size=2>第{0}-{2}条,共{2}条</font>',
				emptyMsg : '没有记录！'
			}]
		});
		
////////////////////////////////////////////////////////////////////////////////////////
		var start = 0;
		var limit = 10;
		var questionsStore = new Ext.data.Store({
			id : 'questionsStore',
			autoLoad : false,
			model : 'MyDesktop.Tasks',
			pageSize : limit,
			proxy : {
				type : 'ajax',
				url : 'task.jxp?action=showQuestion',
				reader : {
					type : 'xml',
					root : 'tasks',
					record : 'task',
					totalProperty : 'total'
				}
			}
		});
		
		questionsStore.load({
			params : {
				start : start,
				limit : limit
			}
		});

		var questionsView = new Ext.DataView({
			id : 'questionsview',
			title : '问题',
			store : questionsStore,
			tpl : tasksTpl,
			emptyText : '暂无数据！',
			scope : this,
			itemSelector : 'div#x-task',
			listeners : {
				'itemclick' : function(view, record, item, index, e){
					/*tmpValue = view.getStore().getAt(index).data['tid'];
					console.log('传送值为：' + tmpValue);
					desktop.onCreateWindow('browserinformation-win');*/
				},
				'itemcontextmenu' : rightClick,
				'render':  preventDefaultMenu
			}
		
		});
		
		var questionPanel = Ext.create('Ext.panel.Panel', {
			title : '问题',
			autoScroll : true,
			items : [questionsView],
			dockedItems : [{
				xtype : 'pagingtoolbar',
				store : questionsStore,
				dock : 'bottom',
				displayInfo : true,
				beforePageText : '第',
				afterPageText : '页',
				inputItemWidth : 20,
				displayMsg : '<font size=2>第{0}-{2}条,共{2}条</font>',
				emptyMsg : '没有记录！'
			}]
		});
		//////////////////////////////////////////////////////////////////////////////////
		var start = 0;
		var limit = 10;
		var homeworkStore = new Ext.data.Store({
			id : 'homeworkStore',
			autoLoad : false,
			model : 'MyDesktop.Tasks',
			pageSize : limit,
			proxy : {
				type : 'ajax',
				url : 'task.jxp?action=showHomework',
				reader : {
					/*type : 'json',
					root : 'root',
					totalProperty : 'total'*/
					type : 'xml',
					root : 'tasks',
					record : 'task',
					totalProperty : 'total'
				}
			}
		});
		
		homeworkStore.load({
			params : {
				start : start,
				limit : limit
			}
		});

		var homeworkView = new Ext.DataView({
			id : 'homeworkView',
			title : '问题',
			store : homeworkStore,
			tpl : tasksTpl,
			emptyText : '暂无数据!',
			scope : this,
			itemSelector : 'div#x-task',
			listeners : {
				'itemclick' : function(view, record, item, index, e){
					/*tmpValue = view.getStore().getAt(index).data['tid'];
					console.log('传送值为：' + tmpValue);
					desktop.onCreateWindow('browserinformation-win');*/
				},
				'itemcontextmenu' : rightClick,
				'render':  preventDefaultMenu
			}
		
		});
		
		var homeworkPanel = Ext.create('Ext.panel.Panel', {
			title : '已完成作业',
			autoScroll : true,
			items : [homeworkView],
			dockedItems : [{
				xtype : 'pagingtoolbar',
				store : homeworkStore,
				dock : 'bottom',
				displayInfo : true,
				beforePageText : '第',
				afterPageText : '页',
				inputItemWidth : 20,
				displayMsg : '<font size=2>第{0}-{2}条,共{2}条</font>',
				emptyMsg : '没有记录！'
			}]
		});
		/////////////////////////////////////////////////////////////////////////////////
/*		-------------------------------------edited by swyma------------------------------------		
		//关注gridPanel
		Ext.define('Follow', {
			extend : 'Ext.data.Model',
			fields : [ 'id', 'follow','follower','date']
		});

		//定义分页
		var itemsPerPage = 10;
		
		var followStore = new Ext.data.Store({
			autoLoad : true,
			pageSize: itemsPerPage,
			model : 'MyDesktop.Follow',
			proxy : {
				type : 'ajax',
				url : 'follow.jxp?action=follow',
				reader : {
					type : 'xml',
					root:'allfollows',
					record : 'follows',
					totalProperty : 'total'
				}
			}
		});

		followStore.load({
		    params:{
		        start:0,    
		        limit: itemsPerPage
		    }
		});

		//创建链接
		function Handler(value,p,record){
			var follower=record.data.follower;
			var follow=record.data.follow;
			return "<span><a href='#' onclick='deleteFollower(\""+follower+","+follow+"\")'><font size=2 color=blue>取消关注</font></a><span>";
		}
		//图片链接
		function Pic(value){
			return "<img src='./images/user.png' />";
		}
        //创建gridpanel
        var followGridpanel=Ext.create('Ext.grid.Panel', {
            store: followStore,
            border : false,
            hideHeaders :true,
            id:'followGridpanel',
            columns: [
                {header:'头像',renderer:Pic},
                {header: '关注者', dataIndex: 'follow',flex:1,align:'center'},
                {header: '操作', renderer:Handler}
            ],
            height: '100%',
            layout:'fit'
        });
		//关注 followpanel
		var followPanel = Ext.create('Ext.panel.Panel', {
			title : '关注',
			layout : 'fit',
			autoScroll : true,
			items : [followGridpanel],
			dockedItems : [{
				xtype : 'pagingtoolbar',
				store : followStore,
				dock : 'bottom',
				displayInfo : true,
				beforePageText : '第',
				afterPageText : '页',
				inputItemWidth : 20,
				displayMsg : '<font size=2>第{0}-{2}条,共{2}条</font>',
				emptyMsg : '没有记录！'
			}]
		});
		------------------------------------end of followpanel----------------------------------
		////////////////////////////////////////////////////////////////////////////////////
		----------------------------------begin of followerpanel--------------------------------
		//关注gridPanel
		Ext.define('Follower', {
			extend : 'Ext.data.Model',
			fields : [ 'id', 'follow','follower','date']
		});

		//定义分页
		var itemsPerPage = 10;
		
		var followerStore = new Ext.data.Store({
			autoLoad : true,
			pageSize: itemsPerPage,
			model : 'MyDesktop.Follow',
			proxy : {
				type : 'ajax',
				url : 'follow.jxp?action=follower',
				reader : {
					type : 'xml',
					root:'allfollows',
					record : 'follows',
					totalProperty : 'total'
				}
			}
		});

		followerStore.load({
		    params:{
		        start:0,    
		        limit: itemsPerPage
		    }
		});

		
		//创建链接
		function FollowerHandler(value,p,record){
			var follower=record.data.follower;
			var follow=record.data.follow;
			return "<a href='#' onclick='addFollow(\""+follower+","+follow+"\")'><font size=2 color=#00f>加关注</font></a><br /><a href='#' onclick='deleteFollow(\""+follower+","+follow+"\")'><font size=2 color=#00f>移除粉丝</font></a>";
		}
		function FollowPic(){
			return "<img src='./images/user.png'/>";
		}
        //创建gridpanel（）
        var followerGridpanel=Ext.create('Ext.grid.Panel', {
            store: followerStore,
            border : false,
            hideHeaders :true,
            columns: [
                {header:'用户头像',renderer:FollowPic},
                {header: '关注者', dataIndex: 'follower',flex:1,align:'center'},
                {header: '操作', renderer:FollowerHandler}
            ],
            height: '100%',
            layout:'fit'
        });
		//关注 followpanel
		var followerPanel = Ext.create('Ext.panel.Panel', {
			title : '粉丝',
			layout : 'fit',
			autoScroll : true,
			items : [followerGridpanel],
			dockedItems : [{
				xtype : 'pagingtoolbar',
				store : followerStore,
				dock : 'bottom',
				displayInfo : true,
				beforePageText : '第',
				afterPageText : '页',
				inputItemWidth : 20,
				displayMsg : '<font size=2>第{0}-{2}条,共{2}条</font>',
				emptyMsg : '没有记录！'
			}]
		});
		*/
		
		/*-------------------------------------edited by swyma------------------------------------*/		
		//关注gridPanel
		/*Ext.define('Follow', {
			extend : 'Ext.data.Model',
			fields : [ 'id', 'follow','follower','date']
		});*/

		//定义分页
		var itemsPerPage = 15;
		
		var followStore = new Ext.data.Store({
			id : 'followStore',
			autoLoad : true,
			pageSize: itemsPerPage,
			model : 'MyDesktop.Follow',
			proxy : {
				type : 'ajax',
				url : 'follow.jxp?action=follow',
				reader : {
					type : 'xml',
					root:'allfollows',
					record : 'follows',
					totalProperty : 'total'
				}
			}
		});

		followStore.load({
		    params:{
		        start:0,    
		        limit: itemsPerPage
		    }
		});

		//创建链接
		function Handler(value,p,record){
			var follower=record.data.follower;
			var follow=record.data.follow;
			return "<span><a href='#' onclick='deleteFollower(\""+follow+"\")'><font size=2 color=blue><br />取消关注</font></a><span>";
		}
		//图片链接
		function Pic(value){
			return "<img src='./images/user.png' />";
		}
        //创建gridpanel
        var followGridpanel=Ext.create('Ext.grid.Panel', {
            store: followStore,
            hideHeaders :true,
            border : false,
            id:'followGridpanel',
            columns: [
                {header:'头像',renderer:Pic},
                {header: '关注者', dataIndex: 'follow',flex:1,align:'left'},
                {header: '操作', renderer:Handler}
            ],
            height: '100%',
            layout:'fit'
        });
		//关注 followpanel
		var followPanel = Ext.create('Ext.panel.Panel', {
			title : '关注',
			layout : 'fit',
			border : false,
			//deferredRender:true,
			autoScroll : true,
			items : [followGridpanel],
			dockedItems : [{
				xtype : 'pagingtoolbar',
				store : followStore,
				dock : 'bottom',
				displayInfo : true,
				beforePageText : '第',
				afterPageText : '页',
				inputItemWidth : 20,
				displayMsg : '<font size=2>第{0}-{2}条,共{2}条</font>',
				emptyMsg : '没有记录！'
			}]
		});
		/*------------------------------------end of followpanel----------------------------------*/
		/*----------------------------------begin of followerpanel--------------------------------*/
		//关注gridPanel
		/*Ext.define('Follower', {
			extend : 'Ext.data.Model',
			fields : [ 'id', 'follow','follower','date']
		});*/

		//定义分页
		var itemsPerPage = 15;
		
		var followerStore = new Ext.data.Store({
			autoLoad : true,
			pageSize: itemsPerPage,
			model : 'MyDesktop.Follow',
			proxy : {
				type : 'ajax',
				url : 'follow.jxp?action=follower',
				reader : {
					type : 'xml',
					root:'allfollows',
					record : 'follows',
					totalProperty : 'total'
				}
			}
		});

		followerStore.load({
		    params:{
		        start:0,    
		        limit: itemsPerPage
		    }
		});

		
		//创建链接
		function FollowerHandler(value,p,record){
			var follower=record.data.follower;
			var follow=record.data.follow;
			return "<a href='#' onclick='addFollow(\""+follower+"\")'><font size=2 color=blue>加关注</font></a><br /><br /><a href='#' onclick='deleteFollow(\""+follower+"\")'><font size=2 color=blue>移除粉丝</font></a>";
		}
		function FollowPic(){
			return "<img src='./images/user.png'/>";
		}
        //创建gridpanel（）
        var followerGridpanel=Ext.create('Ext.grid.Panel', {
            store: followerStore,
            hideHeaders :true,
            border : false,
            columns: [
                {header:'用户头像',renderer:FollowPic},
                {header: '关注者', dataIndex: 'follower', flex:1, align:'left'},
                {header: '操作', renderer:FollowerHandler}
            ],
            height: '100%',
            layout:'fit'
        });
		//关注 followpanel
		var followerPanel = Ext.create('Ext.panel.Panel', {
			title : '粉丝',
			layout : 'fit',
			border : false,
			//deferredRender:true,
			autoScroll : true,
			items : [followerGridpanel],
			dockedItems : [{
				xtype : 'pagingtoolbar',
				store : followerStore,
				dock : 'bottom',
				displayInfo : true,
				beforePageText : '第',
				afterPageText : '页',
				inputItemWidth : 20,
				displayMsg : '<font size=2>第{0}-{2}条,共{2}条</font>',
				emptyMsg : '没有记录！'
			}]
		});
		
		
		/*----------------------------------end of followerpanel----------------------------------*/	
		
				/* ==============================所有用户列表============================================ */
		//Model
		Ext.define('allUser', {
			extend : 'Ext.data.Model',
			fields : [ 'id', 'username_']
		});
		
		//定义分页
		var itemsPerPage = 15;
		
		var alluserStore = new Ext.data.Store({
			autoLoad : true,
			pageSize: itemsPerPage,
			model : 'allUser',
			proxy : {
				type : 'ajax',
				url : 'signon.jxp?action=allUsers',
				reader : {
					type : 'json',
					root:'root',
					totalProperty : 'total'
				}
			}
		});

		alluserStore.load({
		    params:{
		        start:0,    
		        limit: itemsPerPage
		    }
		});

		
		//创建链接
		function AllUserHandler(value,p,record){
			var username_=record.data.username_;
			return "<a href='#' onclick='addFollow(\""+username_+"\")'><font size=2 color=blue><br />加关注</font></a>";
		}
		function AllUserPic(){
			return "<img src='./images/user.png'/>";
		}
        //创建gridpanel（）
        var allUserGridpanel=Ext.create('Ext.grid.Panel', {
            store: alluserStore,
            hideHeaders :true,
            border : false,
            columns: [
                {header:'用户头像',renderer:AllUserPic},
                {header: '用户名', dataIndex: 'username_', flex:1, align:'left'},
                {header: '操作', renderer:AllUserHandler}
            ],
            height: '100%',
            layout:'fit'
        });
		//关注用户列表
		var AllUserPanel = Ext.create('Ext.panel.Panel', {
			title : '用户列表',
			layout : 'fit',
			border : false,
			autoScroll : true,
			items : [allUserGridpanel],
			dockedItems : [{
				xtype : 'pagingtoolbar',
				store : alluserStore,
				dock : 'bottom',
				displayInfo : true,
				emptyMsg : '没有记录！'
			}]
		});
		
		
		if (!win) {
			win = desktop.createWindow({
				id : 'stu-win',
				title : '作业/问题管理',
				x : 100,
				y : 10,
				width : 350,
				height : 630,
				//resizable:false,
				//minWidth : 400,
				iconCls : 'icon-grid',
				animCollapse : false,
				constrainHeader : true,
				border : false,
				layout : 'fit',
				resizable : false,
				maximizable : false,
				items : [new Ext.TabPanel({
					id : 'mainStudentTab',
					border : false,
					bodyStyle : 'border : none;',
					items : [ 
				          taskPanel, 
				          questionPanel, 
				          homeworkPanel,
				          followPanel,
				          followerPanel,
				          AllUserPanel
					],
					autoScroll : true,
					dockedItems : [{
						xtype : 'toolbar',
						dock : 'top',
						items : ['->',{
							text : '发布问题',scope : this,
							listeners : {
								'click' : function(){
									desktop.onCreateWindow('post-win');
								}
							}
						}]
					}]
				})]
			});
		}
        win.show();
        return win;
    }

 
});