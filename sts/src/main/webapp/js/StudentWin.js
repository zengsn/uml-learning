Ext.define('MyDesktop.StudentWin', {
	extend : 'Ext.ux.desktop.Module',

	requires : [ 'Ext.data.ArrayStore', 'Ext.util.Format',
			'Ext.grid.Panel', 'Ext.grid.RowNumberer' ],

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
		var n_app = this.app;

		// 创建用户信息列表
		Ext.define('User', {
			extend : 'Ext.data.Model',
			fields : [ 'uid', 'uname', 'utype', 'upic' ]
		});

		var profileStore = new Ext.data.Store({
			autoLoad : true,
			model : 'User',
			proxy : {
				type : 'ajax',
				url : './data/t_profile.xml',
				reader : {
					type : 'xml',
					record : 'user'
				}
			}
		});

		var profileTpl = new Ext.XTemplate(
				'<tpl for=".">',
				'<div>',
				'<div id="u_pic">',
				'<img src="http://www.google.com.hk/intl/zh-CN/images/logo_cn.png" width="48" height="48"/>',
				'</div>', '<div id="u_profile">',
				'<div id="u_name"><p>用户名:{uname}</p></div>',
				'<div id="u_type"><p>类型:{utype}</p></div>',
				'</div>', '</div>', '</tpl>');
		profileTpl.compile();
		var profileView = new Ext.DataView({
			store : profileStore,
			tpl : profileTpl,
			multiSelect : true,
			emptyText : 'No item to display'
		});

		// 创建问题列表
		Ext.define('Tasks', {
			extend : 'Ext.data.Model',
			fields : [ 'tid', 'tauthor', 'tsubject', 'ttype', 'ttitle',
					'tcontent', 'tpic', 'tpost', 'tfinish' ]
		});
		var start = 0;
		var limit = 2;
		var tasksStore = new Ext.data.Store({
			id : 'tasksStore',
			autoLoad : false,
			model : 'Tasks',
			pageSize : limit,
			proxy : {
				type : 'ajax',
				url : './data/t_questions.xml',
				reader : {
					type : 'xml',
					root : 'tasks',
					record : 'question',
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
				'<div id="task">',
				  '<div id="t_head">',
				  	'<span id="t_author">{tauthor}:</span>',
				    '<span id="t_title">[{tsubject}{ttype}] {ttitle}</span>',
				  '</div>',
				  '<div id="t_body">',
				  	'<div id="t_content">作业内容：{tcontent}</div>',
				    '<div id="t_pic"><img src="{tpic}" width="200" /></div>',
				  '</div>',
				  '<div id="t_foot">',
				  	'<span id="t_posttime">发布时间：{tpost}</span>',
				    '<span id="t_finishtime">完成时间：{tfinish}</span>',
				  '</div>',
				'</div>',
			'</tpl>');
		tasksTpl.compile();
		var tasksView = new Ext.DataView({
			title : '作业',
			store : tasksStore,
			tpl : tasksTpl,
			emptyText : 'No item to display',
			listeners : {
				'itemclick' : function(){
					desktop.onCreateWindow('dotask-win');
				}
			}
		});

		if (!win) {
			win = desktop.createWindow({
				id : 'stu-win',
				title : '作业/问题管理',
				x : 100,
				y : 10,
				width : 400,
				height : 630,
				//resizable:false,
				//minWidth : 400,
				iconCls : 'icon-grid',
				animCollapse : false,
				constrainHeader : true,
				border : false,
				layout : 'border',
				items : [ new Ext.Panel({
					region : 'north',
					baseCls : 'x-panel',
					border : false,
					items : [ profileView ]
				}), new Ext.TabPanel({
					id : 'mainStudentTab',
					region : 'center',
					border : false,
					bodyStyle : 'border : none;',
					items : [ 
					          tasksView, 
					          new Ext.Panel({
					        	  title : '问题',
					        	  border : false
					          }), 
					          new Ext.Panel({
					        	  title : '关注',
					        	  border : false
					          }),
					          new Ext.Panel({
					        	  title : '粉丝',
					        	  border : false
					          })
					],
					autoScroll : true,
					dockedItems : [{
						xtype : 'pagingtoolbar',
						store : tasksStore,
						dock : 'bottom',
						displayInfo : true,
						//displayMsg : '<font size=2> {0}-{2}条,共 {2}条记录</font>',
						emptyMsg : '没有记录！'
					}, {
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