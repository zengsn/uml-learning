Ext.require([
    'Ext.form.*',
    'Ext.data.*'
]);

Ext.onReady(function(){
    
    var formPanel = Ext.create('Ext.form.Panel', {
        //renderTo: 'form-ct',
        frame: true,
        title:'欢迎加入UML在线学习系统',
        width: 340,
        height : 260,
        bodyPadding: 5,
        waitMsgTarget: true,
        //standardSubmit: true,
        

        fieldDefaults: {
            labelAlign: 'right',
            labelWidth: 85,
            msgTarget: 'side'
        },

        // configure how to read the XML data
        

        items: [{
            xtype: 'fieldset',
            title: '',
            defaultType: 'textfield',
            defaults: {
                width: 280
            },
            items: [{
                    fieldLabel: '用户名',
                    emptyText: '请输入登录用户名',
                    name: 'uname',
                    allowBlank : false
                }, {
                	id : 'upwd',
                    fieldLabel: '密码',
                    name: 'upwd',
                    emptyText : '请输入密码',
					inputType: 'password',
					allowBlank: false
                }, {
                	id : 'urepwd',
                	fieldLabel : '重复一次',
                	name : 'urepwd',
                	emptyText : '请重复输入密码',
                	allowBlank : false,
                	inputType : 'password'
                }, {
                	fieldLabel : '电子邮箱',
                	name : 'uemail',
                	emptyText : '请输入电子邮箱'
                },{
                	xtype : 'panel',
                	layout : 'column',
                	baseCls : 'pain',
                	items : [{
                		xtype : 'textfield',
                		fieldLabel : '邀请码',
                		value : 'hzu',
                		name : 'inviteCode',
                    	emptyText : '请输入邀请码',
                    	allowBlank : false,
                    	readOnly : true,
                    	//disabled : true,
                    	columnWidth : 0.75
                	}, {
                		xtype : 'button',
                		text : '申请邀请码',
                		name : 'applyCode',
                		columnWidth : 0.25,
                		style : 'text-align : center;',
                		disabled : true,
                		handler : function(){
                			Ext.Msg.alert('提示', '抱歉，本站尚未开通该功能！');
                		}
                	}]
                	
                }
            ]
        }],

        buttons: [{
        	id:'signon',
            text: '确认注册',
            //disabled: true,
			iconCls: 'signin-icon',
            handler: function(){
            	var pwd = Ext.getCmp('upwd').getValue();
            	var repwd = Ext.getCmp('urepwd').getValue();
            	//console.log(pwd + "/" + repwd);
            	if (pwd == repwd ){
            		this.up('form').getForm().submit({
	                	url: './signon.jxp?action=SaveUser',
	                    submitEmptyText: false,
	                    waitMsg: '正在提交信息，请稍候...',
	                    scope : this,
						success: function(form, action) {
							Ext.Msg.alert('提示', action.result.msg);
							this.up('form').getForm().reset();
						},
						failure: function(form, action) {
							Ext.Msg.alert('提示', action.result.msg);
						}
	                });
            	} else {
            		Ext.Msg.alert('提示', '两次密码必须一致！');
            		Ext.getCmp('urepwd').setValue('');
            		Ext.getCmp('upwd').setValue('');
            		Ext.getCmp('upwd').focus(true);
            	}
            }
        }, {
        	text : '返回',
        	iconCls : '',
        	handler : function(){
        		window.location.href = './signin.jxp';
        	}
        }]
    });
	
	var viewport = Ext.create('Ext.Viewport', {
		layout:'border',
		margins: '5 5 5 5',
		items: [{
			region: 'north',
			margins: '0 0 5 0',
			height: 0,
			html: ''
		},{
			region:'center',
			margins: '0 5 5 5',
			//frame: true,
			layout: {
				type: 'vbox',
				padding:'5',
				pack:'center',
				align:'center'
			},
			defaults:{
				width: 340,
				margins:'0 0 5 0'
			},
			items:[formPanel/*, {
				border: false,
				//frame: true,
				layout: {
					type:'hbox',
					padding:'0',
					//pack:'center',
					align:'middle'
				},
				defaults:{margins:'0 5 0 0'},
				items:[{
					xtype:'button',
					text: 'Return',
					flex: 1,	
					//sacle: 'large',
					iconAlign: 'left',
					iconCls: 'back-icon',
					tooltip: '',
					handler: function(btn) {
						window.location.replace('./');
					}
				},{
					xtype:'button',
					text: 'Sign On',
					flex: 1,	
					//sacle: 'large',
					iconAlign: 'right',
					margins: '0',
					iconCls: 'signon-icon',
					tooltip: '创建一个新用户.',
					handler: function(btn) {
						window.location.replace('./signon.jxp');
					}
				}]	
			}*/]
		}]
	});

});
