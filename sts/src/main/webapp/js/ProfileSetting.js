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

Ext.define('MyDesktop.ProfileSetting', {
    extend: 'Ext.ux.desktop.Module',

    requires: [
        'Ext.data.ArrayStore',
        'Ext.util.Format',
        'Ext.grid.Panel',
        'Ext.grid.RowNumberer'
    ],

    id:'profile-win',

    init : function(){
        this.launcher = {
            text: '个人信息设置',
            iconCls:'icon-grid',
            handler : this.createWindow,
            scope: this
        };
    },

    
    
    createWindow : function(){
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('profile-win');
        
        var profileForm = Ext.create('Ext.form.Panel', {
        	baseCls : 'x-plain',
            width: 300,
            border : false,
            url: '',
            padding : '10px',
            layout: 'anchor',
            defaults: {
                anchor: '100%',
                labelWidth : 70
            },
            defaultType: 'textfield',
            items: [{
            	id : 'u_id',
            	fieldLabel : 'ID号',
            	name : 'u_id',
            	hidden : true,
            	value : '081403204'
            }, {
            	id : 'u_name',
                fieldLabel: '用户名',
                name: 'u_name',
                value : 'hzucmj',
                allowBlank: false
            }, {
            	id : 'u_type',
            	fieldLabel : '用户类型',
            	name : 'u_type',
            	value : '学生',
            	allowBlank : false
            }, {
            	id : 'old_pwd',
            	fieldLabel : '旧密码',
            	name : 'old_pwd'
            }, {
            	id : 'new_pwd',
            	fieldLabel : '新密码',
            	name : 'new_pwd'
            }, {
            	id :'re_pwd',
            	fieldLabel : '重新输入',
            	name : 're_pwd'
            }],
            buttons: [{
                text: '保存',
                formBind: true, //only enabled once the form is valid
                handler: function() {
                    
                }
            }, {
            	text : '取消',
            	handler : function(){
            		
            	}
            }]
        });
        
        if(!win){
            win = desktop.createWindow({
                id: 'profile-win',
                title:'个人信息设置',
                width:300,
                height:220,
                resizable : false,
                maximizable : false,
                iconCls: 'icon-grid',
                animCollapse:false,
                layout: 'fit',
                items: [profileForm]
            });
        }
        win.show();
        return win;
    }
});


