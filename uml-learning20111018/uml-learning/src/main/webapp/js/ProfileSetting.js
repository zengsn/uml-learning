
Ext.define('MyDesktop.ProfileSetting', {
    extend: 'Ext.ux.desktop.Module',

    requires: [
        'Ext.data.ArrayStore',
        'Ext.grid.Panel',
        'Ext.form.Panel'
    ],

    id:'profile-win',

    init : function(){
    	this.launcher = [{
       		text : '账号设置',
       		iconCls : 'icon-grid',
       		scope : this,
       		handler : this.createWindow
       	}]
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
                anchor: '98%',
                labelWidth : 60
            },
            defaultType: 'textfield',
            items: [{
            	id : 'uid',
            	fieldLabel : 'ID号',
            	name : 'uid',
            	hidden : true
            }, {
            	id : 'uname',
                fieldLabel: '用户名',
                name: 'uname',
                width : 150,
                readOnly : true
            }, {
            	id : 'utype',
            	fieldLabel : '用户类型',
            	name : 'utype',
                readOnly : true
            }, {
            	id : 'old_pwd',
            	fieldLabel : '旧密码',
            	inputType:'password',
            	name : 'old_pwd'
            }, {
            	id : 'upwd',
            	fieldLabel : '新密码',
            	name : 'upwd',
            	inputType:'password'
            }, {
            	id :'urepwd',
            	fieldLabel : '重新输入',
            	name : 'urepwd',
            	inputType:'password'
            }],
            buttons: [{
                text: '保存',
                formBind: true, //only enabled once the form is valid
                handler: function() {
                	var form = this.up('form').getForm();
                    if (form.isValid()) {
                    	var pwd = Ext.getCmp('upwd').getValue();
                    	var repwd = Ext.getCmp('urepwd').getValue();
                    	if ( pwd == repwd){
                    		Ext.Msg.confirm('提示', '您确定要提交吗？', function(btn){
                    			if (btn == 'yes'){
			                        form.submit({
			                        	url:'./signon.jxp?action=UpdateUser',
			                        	method:'post',
			                            success: function(form, action) {
			                            	var a = Ext.Msg.alert('提示', action.result.msg);
			                            	Ext.getCmp('old_pwd').setValue('');
			                            	Ext.getCmp('upwd').setValue('');
			                            	Ext.getCmp('urepwd').setValue('');
			                            	//成功后处理界面 
			                            	win.close();
			                            },
			                            failure: function(form, action) {
			                            	Ext.Msg.alert('注册失败', action.result.msg);
			                            	//this.up('form').getForm().reset();
			                            	Ext.getCmp('profileform').getForm().reset();
			                            }
			                        });
                    			}
                    		});
                    	} else {
                    		Ext.Msg.alert('提示', '操作失败，新密码输入必须一致！');
                    		Ext.getCmp('upwd').setValue('');
                    		Ext.getCmp('urepwd').setValue('');
                    	}
                    }
                }
            }, {
            	text : '取消',
            	scope : this,
            	handler : function(){
            		win.close();
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
                items: [profileForm],
                listeners : {
                	'show' : function(){
                		profileForm.load({
                			url : './signon.jxp?action=LoadInfo',
                			model : 'MyDesktop.user',
			            	type : 'ajax',
			            	reader : {
			            		type : 'json'
			            	},
			    			success : function(form, action){
			    				
			    			},
			    			failure : function(form, action){
			    				Ext.Msg.alert('提示', action.result.msg);
			    				win.close();
			    			}
                		});
                	}
                }
            });
        }
        win.show();
        return win;
    }
});


