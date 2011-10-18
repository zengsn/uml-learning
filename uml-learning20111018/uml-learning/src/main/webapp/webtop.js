/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

GNU General Public License Usage
This file may be used under the terms of the GNU General Public License version 3.0 as published by the Free Software Foundation and appearing in the file LICENSE included in the packaging of this file.  Please review the following information to ensure the GNU General Public License version 3.0 requirements will be met: http://www.gnu.org/copyleft/gpl.html.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
/*!
 * Ext JS Library 4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */

Ext.define('MyDesktop.App', {
    extend: 'Ext.ux.desktop.App',

    getRequires : function(){
    	var role = this.getUserAuthentication();
    	var requireCls;
    	if (role == "ROLE_ADMIN") {
    		requireCls = [
    			'Ext.window.MessageBox', 
    			'Ext.ux.desktop.ShortcutModel',
    			'MyDesktop.Settings',
    			'MyDesktop.ProfileSetting',
    			'MyDesktop.ControlPanel',
    			'MyDesktop.CmpSetting'
    		];
    	} else if (role == "ROLE_TEACHER") {
    		requireCls = [
    			'Ext.window.MessageBox', 
    			'Ext.ux.desktop.ShortcutModel',
    			'MyDesktop.Settings',
    			'MyDesktop.ProfileSetting',
    			'MyDesktop.UmlWin',
    			'MyDesktop.TeacherWin',
    			'MyDesktop.PostQuestion',
    			'MyDesktop.CheckTask',
    			'MyDesktop.CheckHomeworkWin',
    			'MyDesktop.BrowserInformationWin',
    			'MyDesktop.ShowImg',
    			'MyDesktop.DrawWin'
    		];
    	} else if (role == "ROLE_STUDENT") {
    		requireCls = [
    			'Ext.window.MessageBox', 
    			'Ext.ux.desktop.ShortcutModel',
    			'MyDesktop.Settings',
    			'MyDesktop.ProfileSetting',
    			'MyDesktop.UmlWin',
    			'MyDesktop.StudentWin',
    			'MyDesktop.PostQuestion',
    			'MyDesktop.DoTask',
    			'MyDesktop.BrowserInformationWin',
    			'MyDesktop.ShowImg',
    			'MyDesktop.DrawWin'
    		];
    	} else {
    	
    	}
    	return requireCls;
    },
    
    //requires : this.getRequires(),
    
    /*requires: [
        'Ext.window.MessageBox',

        'Ext.ux.desktop.ShortcutModel',
        'MyDesktop.Settings',
        'MyDesktop.UmlWin',
        'MyDesktop.TeacherWin',
        'MyDesktop.StudentWin',
        'MyDesktop.PostQuestion',
        'MyDesktop.CheckTask',
        'MyDesktop.CheckHomeworkWin',
        'MyDesktop.BrowserInformationWin',
        'MyDesktop.DoTask',
        'MyDesktop.ShowImg',
        'MyDesktop.ControlPanel',
        'MyDesktop.CmpSetting'

        //'MyDesktop.SystemStatus',
        //'MyDesktop.VideoWindow',
        //'MyDesktop.GridWindow',
        //'MyDesktop.TabWindow',
        //'MyDesktop.AccordionWindow',
        //'MyDesktop.Notepad',
        //'MyDesktop.BogusMenuModule',
        //'MyDesktop.BogusModule',

//        'MyDesktop.Blockalanche',
    ],*/

    init: function() {
        // custom logic before getXYZ methods get called...

        this.callParent();

        this.requires = this.getRequires();
        // now ready...
    },

    getModules : function(){

    	var role = this.getUserAuthentication();
    	var requireModules;
    	if (role == "ROLE_ADMIN") {
    		requireModules = [
    			//new MyDesktop.Settings(),
    			new MyDesktop.ProfileSetting(),
    			new MyDesktop.ControlPanel(),
    			new MyDesktop.CmpSetting()
    		];
    	} else if (role == "ROLE_TEACHER") {
    		requireModules = [
    			//new MyDesktop.Settings(),
    			new MyDesktop.ProfileSetting(),
    			new MyDesktop.UmlWin(),
    			new MyDesktop.TeacherWin(),
    			new MyDesktop.PostQuestion(),
    			new MyDesktop.CheckTask(),
    			new MyDesktop.CheckHomeworkWin(),
    			new MyDesktop.BrowserInformationWin(),
    			new MyDesktop.ShowImg(),
    			new MyDesktop.DrawWin()
    		];
    	} else if (role == "ROLE_STUDENT") {
    		requireModules = [
    			new MyDesktop.ProfileSetting(),
    			new MyDesktop.UmlWin(),
    			new MyDesktop.StudentWin(),
    			new MyDesktop.PostQuestion(),
    			new MyDesktop.BrowserInformationWin(),
    			new MyDesktop.ShowImg(),
    			new MyDesktop.DoTask(),
    			new MyDesktop.DrawWin()
    		];
    	} else {
    	
    	}
    	
    	return requireModules;
    	
    	/*return [
            //new MyDesktop.VideoWindow(),
            //new MyDesktop.Blockalanche(),
            //new MyDesktop.SystemStatus(),
            //new MyDesktop.GridWindow(),
            //new MyDesktop.TabWindow(),
            //new MyDesktop.AccordionWindow(),
            //new MyDesktop.Notepad(),
            //new MyDesktop.BogusMenuModule(),
            //new MyDesktop.BogusModule(),
            new MyDesktop.TeacherWin(),
            new MyDesktop.UmlWin(),
            new MyDesktop.StudentWin(),
            new MyDesktop.ProfileSetting(),
            new MyDesktop.PostQuestion(),
            new MyDesktop.CheckTask(),
            new MyDesktop.CheckHomeworkWin(),
            new MyDesktop.BrowserInformationWin(),
            new MyDesktop.DoTask(),
            new MyDesktop.ShowImg(),
            new MyDesktop.ControlPanel(),
            new MyDesktop.CmpSetting()
        ];*/
    },

    getUserAuthentication : function(){
    	//获取当前用户权限
       	return Ext.get('authentication').dom.innerHTML;
    },
    
    getUserName : function(){
    	return Ext.get('username').dom.innerHTML;
    },
    
    getDesktopConfig: function () {
        var me = this, ret = me.callParent();
        
        //获取当前用户权限
       	var userAuthentication = this.getUserAuthentication();
       	
       	//管理员桌面
       	var adminShortcuts = [
       		{ name: '帐号设置', iconCls: 'user-shortcut', module: 'profile-win' },
       		{ name: '控制面板', iconCls: 'user-shortcut', module: 'control-win' }
       	]
        //教师桌面
       	var teacherShortcuts =  [
             { name: '帐号设置', iconCls: 'user-shortcut', module: 'profile-win' },
             //{ name: '查看成绩', iconCls: 'notepad-shortcut', module: 'notepad' },
             //{ name: '学习资料', iconCls: 'cpu-shortcut', module: 'systemstatus'},
             { name: 'Uml在线画图', iconCls: 'uml-shortcut', module: 'uml-win'},
             { name: '教师工具', iconCls: 'teacher-shortcut', module: 'teacher-win'},
             { name: '发布问题', iconCls: 'post-shortcut', module: 'post-win'},
             { name: '查看作业', iconCls:'homework-shortcut', module: 'checkhomework-win'},
             { name: 'umldraw', iconCls: 'draw-shortcut', module: 'draw-win'}
         ];
         //学生桌面
         var studentShortcuts = [
             { name: '帐号设置', iconCls: 'user-shortcut', module: 'profile-win' },
             { name: 'Uml在线画图', iconCls: 'uml-shortcut', module: 'uml-win'},
             { name: '学生工具', iconCls: 'student-shortcut', module: 'stu-win'},
             { name: '发布问题', iconCls: 'post-shortcut', module: 'post-win'},
             { name: 'umldraw', iconCls: 'draw-shortcut', module: 'draw-win'}
         ];
       	
//       	var shortCuts = (userAuthentication == 'ROLE_ADMIN') ? teacherShortcuts : studentShortcuts;
       	
       	if (userAuthentication == 'ROLE_ADMIN') {
			shortCuts = adminShortcuts;       	
       	} else if (userAuthentication == 'ROLE_TEACHER'){
       		shortCuts = teacherShortcuts;
       	} else if (userAuthentication == 'ROLE_STUDENT') {
       		shortCuts = studentShortcuts;
       	} else {
       		shortCuts = "";
       	}
       	
        return Ext.apply(ret, {
            //cls: 'ux-desktop-black',

        	//桌面右键菜单
            contextMenuItems: [
                { text: '系统设置', handler: me.onSettings, scope: me }
            ],

            
            //桌面快捷方式
            shortcuts: Ext.create('Ext.data.Store', {
                model: 'Ext.ux.desktop.ShortcutModel',
                data: shortCuts
            }),

            wallpaper: './3rdp/sencha/extjs/4.0.2a/examples/desktop/wallpapers/desk.jpg',
            wallpaperStretch: false
        });
    },

    // config for the start menu
    getStartConfig : function() {
        var me = this, ret = me.callParent();

        return Ext.apply(ret, {
            title: Ext.get('username')?Ext.get('username').dom.innerHTML:'GUEST',
            iconCls: 'user',
            height: 300,
            toolConfig: {
                width: 100,
                items: [
                    {
                        text:'系统设置',
                        iconCls:'settings',
                        handler: me.onSettings,
                        scope: me
                    },
                    '-',
                    {
                        text:'退出',
                        iconCls:'logout',
                        handler: me.onLogout,
                        scope: me
                    }
                ]
            }
        });
    },

    getTaskbarConfig: function () {
        var ret = this.callParent();

        return Ext.apply(ret, {
            quickStart: [
                { name: '发布问题', iconCls: 'post-shortcut', module: 'post-win' },
                { name: '在线画图', iconCls: 'icon-grid', module: 'uml-win' }
            ],
            trayItems: [{ 
            	xtype : 'button', 
            	iconCls : 'keyboard-shortcut',
            	tooltip : '输入法',
            	handler : function(){
            		//QQ拼音
//            		(function(q){q?q.toggle():function(d,j){j=d.createElement('script');j.async=true;j.src='//ime.qq.com/fcgi-bin/getjs';j.setAttribute('ime-cfg','lt=2');d=d.getElementsByTagName('head')[0];d.insertBefore(j,d.firstChild)}(document)})(window.QQWebIME)
            		/*(function(){
            			var e = document.createElement('script');
            			e.setAttribute('src', 'http://ime.qq.com/fcgi-bin/getjs');
            			document.body.appendChild(e);
            		})()*/
            		//搜狗拼音
					(function(){
						var e=document.createElement('script');
						e.setAttribute('src','http://web.pinyin.sogou.com/web_ime/init.js');
						document.body.appendChild(e);
					})()
            	}
            }, { 
            	xtype: 'trayclock', 
            	flex: 1 
            }]
        });
    },

    onLogout: function () {
        Ext.Msg.confirm('退出系统', '你确定要退出吗? 退出前请保存好相关数据！', function(btn){
        	if (btn == 'yes') {
        		window.location.href = "./j_spring_security_logout";
        	}
        });
    },

    onSettings: function () {
        var dlg = new MyDesktop.Settings({
            desktop: this.desktop
        });
        dlg.show();
    }
});

