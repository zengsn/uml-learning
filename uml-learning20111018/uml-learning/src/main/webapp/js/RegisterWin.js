Ext.define('MyDesktop.Register', {
    extend: 'Ext.ux.desktop.Module',

    requires: [
        'Ext.form.Panel'
    ],

    id:'register-win',
    
    init : function(){
    	/*this.launcher = {
			text : '用户注册',
			iconCls : 'icon-grid',
			scope : this,
			handler : this.createWindow
    	};*/
    },

    createWindow : function(){
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('register-win');
        
        var registerForm=Ext.create('Ext.form.Panel', {
            bodyPadding: 5,
            width: 300,
            layout: 'anchor',
            defaults: {
                anchor: '100%'
            },
            defaultType: 'textfield',
            items: [{
                fieldLabel: '用  户  名',
                name: 'u_name',
                allowBlank: false
            },{
                fieldLabel: '用户密码',
                name: 'u_password',
                allowBlank: false,
                inputType : 'password'
            },{
                fieldLabel: '确认密码',
                name: 'u_password2',
                allowBlank: false,
                inputType : 'password'
            },{
            	xtype : 'fieldcontainer',
	            fieldLabel : '用户类型',
	            defaultType: 'radiofield',
	            //style:'text-indent:20px',
	            layout : 'column',
	            items: [{
                    boxLabel  : '学生',
                    checked : true,
                    name : 'u_type',
                    style:'padding-left:20px',
                    inputValue: 'student',
                    id  : 'student'
                }, {
                    boxLabel  : '教师',
                    name : 'u_type',
                    style:'padding-left:40px',
                    inputValue: 'teacher',
                    id : 'teacher'
                }]
            }],
            buttons: [{
                text: '重置',
                handler: function() {
                    this.up('form').getForm().reset();
                }
            }, {
                text: '注册',
                handler: function() {
                    var form = this.up('form').getForm();
                    if (form.isValid()) {
                        form.submit({
                        	url:'register.jxp',
                        	method:'post',
                        	params:{
                        		action:'register'
                        	},
                            success: function(form, action) {
                            	Ext.Msg.alert('注册成功', action.result.msg);
                            	this.close();
                            	//成功后处理界面 
                            },
                            failure: function(form, action) {
                            	Ext.Msg.alert('注册失败', action.result.msg);
                            	this.up('form').getForm().reset();
                            }
                        });
                    }
                }
            }]
        });
        

        if(!win){
            win = desktop.createWindow({
                id: 'register-win',
                title:'用户注册',
                //width:350,
                //height:600,
                iconCls: 'icon-grid',
                animCollapse:false,
                constrainHeader:true,
                items: [registerForm]
            });
        }
        win.show();
        return win;
    }

 
});