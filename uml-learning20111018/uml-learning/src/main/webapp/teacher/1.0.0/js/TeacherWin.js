
function addFollow(value){
	Ext.Ajax.request({
		url:'follow.jxp?action=addFollower',
		params:{
			data:value
		},
		success: function(response, config) {
        	Ext.Msg.alert('提示',"关注成功！");
        },
		failure:function(response, config) {
			Ext.Msg.alert("提示", "您已经关注此人了！");
		}
	});
}

//deleteFollow Function
function deleteFollow(value){
	Ext.Ajax.request({
		url:'follow.jxp?action=deleteFollow',
		params:{
			data:value
		},
		success:function(response, config){
			Ext.Msg.alert('提示',"成功移除粉丝！");
		},
		failure:function(response, config){
			Ext.Msg.alert("提示", "移除粉丝失败！");
		}
	});
}

//deleteFollower Function(取消关注)
function deleteFollower(value){
	Ext.Ajax.request({
		url:'follow.jxp?action=deleteFollower',
		params:{
			data:value
		},
		success:function(response, config){
			Ext.Msg.alert('取消关注成功',"成功取消关注！");
		},
		failure:function(response, config){
			Ext.Msg.alert("取消关注失败", "取消关注失败！");
		}
	});
}

Ext.define('MyDesktop.TeacherWin',{
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

	id : 'teacher-win',
	
	
	init : function() {
		
		this.launcher = [{
			text : '发布作业/问题',
			iconCls : 'icon-grid',
			scope : this,
			handler : this.createWindow
		}]
		
		/*var userAuth = Ext.get('authentication').dom.innerHTML;
		
		//管理员开始菜单
		var adminStartMenu = [{
			text : '账号设置',
       		iconCls : 'icon-profile',
       		scope : this,
       		handler : function(){
       			this.app.getDesktop().onCreateWindow('profile-win');
       		}
		}];
		
		//学生开始菜单
		var studentStartMenu = [{
       		text : '账号设置',
       		iconCls : 'icon-profile',
       		scope : this,
       		handler : function(){
       			this.app.getDesktop().onCreateWindow('profile-win');
       		}
       	}, {
       		text : '作业/问题管理工具',
       		iconCls : 'icon-student',
       		scope : this,
       		handler : function(){
       			this.app.getDesktop().onCreateWindow('stu-win');
       		}
       	}, {
       		text : '发布问题',
       		iconCls : 'icon-post',
       		scope : this,
       		handler : function(){
       			this.app.getDesktop().onCreateWindow('post-win');
       		}
       	}];
       	
       	//教师开始菜单
       	var teacherStartMenu = [ {
       		text : '账号设置',
       		iconCls : 'icon-profile',
       		scope : this,
       		handler : function(){
       			this.app.getDesktop().onCreateWindow('profile-win');
       		}
       	},  {
       		text : '作业/问题管理工具',
       		iconCls : 'icon-teacher',
       		scope : this,
       		handler : function(){
       			this.app.getDesktop().onCreateWindow('teacher-win');
       		}
       	}, {
       		text : '发布作业/问题',
       		iconCls : 'icon-post',
       		scope : this,
       		handler : function(){
       			this.app.getDesktop().onCreateWindow('post-win');
       		}
       	}, {
       		text : '查看作业',
       		iconCls : '',
       		scope : this,
       		handler : function(){
       			this.app.getDesktop().onCreateWindow('checkhomework-win');
       		}
       	}, {
       		text : 'UML在线画图',
       		iconCls : 'icon-uml',
       		scope : this,
       		handler : function(){
       			this.app.getDesktop().onCreateWindow('uml-win');
       		}
       	}];
       	//根据权限显示相应开始菜单
       	
       	if (userAuth == 'ROLE_ADMIN') {
       		userAuth = adminStartMenu;
       	} else if (userAuth == 'ROLE_TEACHER') {
       		userAuth = teacherStartMenu;
       	} else if (userAuth == 'ROLE_STUDENT') {
       		userAuth = studentStartMenu;
       	}
       	
       	this.launcher = userAuth;*/
	},

	createWindow : function() {
		
		var desktop = this.app.getDesktop();
		var win = desktop.getWindow('teacher-win');

		var userName = this.app.getUserName();
		
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
		
		// 创建问题列表
		Ext.define('Tasks', {
			extend : 'Ext.data.Model',
			fields : [ 'tid', 'tauthor', 'tsubject', 'ttype', 'ttitle','tcontent', 'tpic', 'tpost', 'tfinish' ]
		});
		var start = 0;
		var limit = 10;
		var tasksStore = new Ext.data.Store({
			id : 'tasksStore',
			autoLoad : false,
			model : 'Tasks',
			pageSize : limit,
			proxy : {
				type : 'ajax',
				url : 'task.jxp?action=showTask&type=teachertask',
				reader : {
					type : 'xml',
					root : 'tasks',
					record : 'task',
					totalProperty : 'total'
					/*type : 'json',//'xml',
					root:'root',
					totalProperty:'total'*/
				}
			}
		});
		
		tasksStore.load({
			params : {
				start : start,
				limit : limit
			}
		});

		/*var tasksTpl = new Ext.XTemplate(
			'<tpl for=".">',
				'<div id="x-task">',
				  '<div id="x-t_head">',
				  	'<span id="x-t_author">{tauthor}:</span>',
				    '<span id="x-t_title">[{tsubject}{ttype}] {ttitle}</span>',
				  '</div>',
				  '<div id="x-t_body">',
				  	'<div id="x-t_content">作业内容：{tcontent}</div>',
				    '<div id="x-t_pic"><img src="{tpic}" width="200" /></div>',
				  '</div>',
				  '<div id="x-t_foot">',
				  	'<span id="x-t_posttime">发布时间：{tpost}　</span>',
				    '<span id="x-t_finishtime">{tfinish}</span>',
				  '</div>',
				'</div>',
			'</tpl>');*/
		//tasksTpl.compile();
		function preventDefaultMenu(){
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
						//hidden : userName == tauthor ? false : true,
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
						handler :　function(){
							Ext.getCmp('taskPaging').moveFirst();
						}
					}, {
						text : '上一页',
						handler :　function(){
							Ext.getCmp('taskPaging').movePrevious();
						}
					}, {
						text : '下一页',
						handler :　function(){
							Ext.getCmp('taskPaging').moveNext();
						}
					}, {
						text : '最后一页',
						handler :　function(){
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
		
		var tasksView = Ext.create('Ext.DataView', {
			id : 'tasksview',
			title : '作业',
			store : tasksStore,
			tpl : tasksTpl,
			emptyText : '暂无数据！',
			scope : this,
			itemSelector : 'div#x-task',
			listeners : {
				scope : this,
				//hzucmj======================================
				'itemclick' : function(view, record, item, index, e){
//					tmpValue = view.getStore().getAt(index).data['tid'];
//					console.log('传送值为：' + tmpValue);
//					desktop.onCreateWindow('browserinformation-win');
				},
				'itemcontextmenu' : rightClick
			}
		});
		
		var taskPanel = Ext.create('Ext.panel.Panel', {
			title : '作业',
//			layout : 'fit',
			border : false,
			autoScroll : true,
			//deferredRender:true,
			items : [tasksView],
			dockedItems : [{
				xtype : 'pagingtoolbar',
				id : 'taskPaging',
				store : tasksStore,
				dock : 'bottom',
				beforePageText : '第',
				afterPageText : '页',
				inputItemWidth : 20,
				displayInfo : true,
				displayMsg : '<font size=2>第{0}-{2}条,共{2}条</font>',
				emptyMsg : '没有记录！'
			}]
		});
		
		/*-------------------------------------question panel-------------------------------------*/
		Ext.define('Questions', {
			extend : 'Ext.data.Model',
			fields : [ 'tid', 'tauthor', 'tsubject', 'ttype', 'ttitle','tcontent', 'tpic', 'tpost', 'tfinish' ]
		});
		
		var start = 0;
		var limit = 10;
		var questionsStore = new Ext.data.Store({
			id : 'questionsStore',
			autoLoad : false,
			model : 'Questions',
			pageSize : limit,
			proxy : {
				type : 'ajax',
				url : 'task.jxp?action=showQuestion&type=question',
				reader : {
					type : 'xml',
					root : 'tasks',
					record : 'task',
					totalProperty : 'total'
					/*type : 'json',//'xml',
					root:'root',
					totalProperty:'total'*/
				}
			}
		});
		
		questionsStore.load({
			params : {
				start : start,
				limit : limit
			}
		});

		/*var questionsTpl = new Ext.XTemplate(
			'<tpl for=".">',
				'<div id="x-task">',
				  '<div id="x-t_head">',
				  	'<span id="x-t_author">{tauthor}:</span>',
				    '<span id="x-t_title">[{tsubject}{ttype}] {ttitle}</span>',
				  '</div>',
				  '<div id="x-t_body">',
				  	'<div id="x-t_content">作业内容：{tcontent}</div>',
				    '<div id="x-t_pic"><img src="/upload/{tpic}" width="200" /></div>',
				  '</div>',
				  '<div id="x-t_foot">',
				  	'<span id="x-t_posttime">发布时间：{tpost}　</span>',
				    '<span id="x-t_finishtime">{tfinish}</span>',
				  '</div>',
				'</div>',
			'</tpl>');
		questionsTpl.compile();*/
		var questionsView = new Ext.DataView({
			id : 'questionsview',
			title : '问题',
			store : questionsStore,
			tpl : tasksTpl,
			emptyText : '暂无数据！',
			scope : this,
			itemSelector : 'div#x-task',
			listeners : {
				/*'itemclick' : function(){
					
					desktop.onCreateWindow('browserinformation-win');
				}*/
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
//			layout : 'fit',
			border : false,
			autoScroll : true,
			//deferredRender:true,
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
		/*-------------------------------------edited by swyma------------------------------------		
		//关注gridPanel
		Ext.define('Follow', {
			extend : 'Ext.data.Model',
			fields : [ 'id', 'follow','follower','date']
		});

		//定义分页
		var itemsPerPage = 2;
		
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
			return "<span><a href='#' onclick='deleteFollower(\""+follower+","+follow+"\")'><font size=2 color=blue><br />取消关注</font></a><span>";
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
		------------------------------------end of followpanel----------------------------------
		----------------------------------begin of followerpanel--------------------------------
		//关注gridPanel
		Ext.define('Follower', {
			extend : 'Ext.data.Model',
			fields : [ 'id', 'follow','follower','date']
		});

		//定义分页
		var itemsPerPage = 2;
		
		var followerStore = new Ext.data.Store({
			id : 'followerStore',
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
			return "<a href='#' onclick='addFollow(\""+follower+","+follow+"\")'><font size=2 color=blue>加关注</font></a><br /><br /><a href='#' onclick='deleteFollow(\""+follower+","+follow+"\")'><font size=2 color=blue>移除粉丝</font></a>";
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
		
		
		----------------------------------end of followerpanel----------------------------------		
		-------------------------------------edited by swyma------------------------------------
		
		 ==============================所有用户列表============================================ 
		//Model
		Ext.define('allUser', {
			extend : 'Ext.data.Model',
			fields : [ 'id', 'username_']
		});
		
		//定义分页
		var itemsPerPage = 10;
		
		var alluserStore = new Ext.data.Store({
			autoLoad : true,
			pageSize: itemsPerPage,
			model : 'allUser',
			proxy : {
				type : 'ajax',
				url : 'register.jxp?action=allUsers',
				reader : {
					type : 'xml',
					root:'allusers',
					record : 'alluser',
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
			return "<a><font size=2 color=blue>加关注</font></a>";
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
		 =====================================================================================*/
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
		/*-------------------------------------edited by swyma------------------------------------*/
		
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
				id : 'teacher-win',
				title : '作业/问题管理',
				//hzucmj=======================================
				x : 100,
				y : 10,
				width : 350,
				height : 630,
				resizable:false,
				//minWidth : 400,
				iconCls : 'icon-grid',
				animCollapse : false,
				constrainHeader : true,
				border : false,
				layout : 'border',
				maximizable : false,
				items : [new Ext.TabPanel({
					id : 'mainTeacherTab',
					region : 'center',
					border : false,
					dockedItems : [{
						xtype : 'toolbar',
						dock : 'top',
						items : ['->',{
							text : '检查作业',
							scope : this,
							handler : function(){
								desktop.onCreateWindow('checkhomework-win');
							}
						}, {
							text : '发布问题',
							scope : this,
							handler : function(){
								desktop.onCreateWindow('post-win');
							}
						}]
					}],
					items : [ taskPanel, questionPanel, followPanel, followerPanel ,AllUserPanel],
					autoScroll : true
					
				})]
			});
		}
		win.show();
		return win;
	}

});