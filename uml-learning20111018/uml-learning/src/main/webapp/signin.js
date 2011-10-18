Ext.require([
    'Ext.form.*',
    'Ext.data.*'
]);

Ext.onReady(function(){

	
    Ext.define('example.account', {
        extend: 'Ext.data.Model',
        fields: [
            'username', 'password'
        ]
    });

    Ext.define('example.fielderror', {
        extend: 'Ext.data.Model',
        fields: ['id', 'msg']
    });
    
    var formPanel = Ext.create('Ext.form.Panel', {
        //renderTo: 'form-ct',
    	id : 'loginForm',
    	name:'loginForm',
        frame: true,
        title:'登录UML在线学习系统',
        width: 340,
        height : 190,
        bodyPadding: 5,
        waitMsgTarget: true,
        standardSubmit: true,

        fieldDefaults: {
            labelAlign: 'right',
            labelWidth: 85,
            msgTarget: 'side'
        },

        // configure how to read the XML data
        reader : Ext.create('Ext.data.reader.Xml', {
            model: 'example.account',
            record : 'account',
            successProperty: '@success'
        }),

        // configure how to read the XML errors
        errorReader: Ext.create('Ext.data.reader.Xml', {
            model: 'example.fielderror',
            record : 'field',
            successProperty: '@success'
        }),
        
        items: [{
            xtype: 'fieldset',
            title: '学生用户：student/student，教师账户：teacher/teacher',
            defaultType: 'textfield',
            defaults: {
                width: 280
            },
            items: [{
                    fieldLabel: '用户名',
//                    emptyText: '请输入您的用户名',
                    id : 'j_username',
                    name: 'j_username',
                    allowBlank : false,
                    enableKeyEvents : true,	
					listeners : {
						'render' : function(){
							Ext.getCmp('j_username').focus(true);
						},
						'keypress' : function(me, e){
							if(e.getKey()==Ext.EventObject.ENTER){
								if (me.value != null){
									if (Ext.getCmp('j_password').value != null){
											login();
									} else {
										Ext.Msg.alert('提示', '请填写密码！');
									}
								} else {
									var a = Ext.Msg.alert('提示', '请填写用户名！');
								}	
							}
		            	}
					}
                }, {
                    fieldLabel: '密　码',
//                    emptyText : '请输入您的用户密码',
                    id : 'j_password',
                    name: 'j_password',
					inputType: 'password',
					allowBlank: false,
					enableKeyEvents : true,	
					validator: function(value) {
						//var username = this.previousSibling('[name=username]');
						//return (value === 'demo' && username.getValue() === 'demo') ? true : 'Please use demo/demo.'
						return true;
					},
					listeners : {
						'keypress' : function(me, e){
							if(e.getKey()==Ext.EventObject.ENTER){
								if (me.value != null){
									if (Ext.getCmp('j_username').value != null){
											login();
									} else {
										Ext.Msg.alert('提示', '请填写用户名！');
									}
								} else {
									Ext.Msg.alert('提示', '请填写用户密码！');
								}
							}
		            	}
					}
                }, {
                	xtype: 'checkbox',
                    fieldLabel: '　　　',
                	boxLabel: '记住我',
                	name: '_spring_security_remember_me'
                }
            ]
        }],

        buttons: [{
            text: '登录',
            //disabled: true,
            id : 'login',
            formBind: true,
			iconCls: 'signin-icon',
			handler : login
        }, {
        	text : '注册',
        	formBind : true,
        	iconCls : '',
        	handler : function(){ 
        		window.location.href = './signon.jxp';
        	}
        }, {
        	text : '演示',
        	handler : function(){
        		Ext.create('Ext.window.Window', {
        			title : '操作演示',
        			width : 630,
        			height : 530,
        			closeAction : 'hide',
        			html : '<embed style="border : none" src="http://player.youku.com/player.php/sid/XMzA2MTU5NjEy/v.swf" allowFullScreen="true" quality="high" width="630" height="500" align="middle" allowScriptAccess="always" type="application/x-shockwave-flash"></embed>'
        		}).show();
        	}
        }]
    });
	
    function login(){
    	formPanel.getForm().submit({
            //url: 'signin.jxp',
        	url: './j_spring_security_check',
            submitEmptyText: false,
            waitMsg: '正在登录，请稍候...',
			success: function(form, action) {
				//Ext.Msg.alert('Done!', form.getValues(true));
				//window.location.replace('./user.jxp?id=demo');
				var backUrl = './home.jxp';
				var getParams = document.URL.split("?");
				if (getParams.length > 1) {
					// transforming the GET parameters into a dictionnary
					var params = Ext.urlDecode(getParams[getParams.length - 1]);
					backUrl = params.back;
				}
				window.location.replace(backUrl);
			},
			failure: function(form, action) {
//				Ext.Msg.alert('Failed', form.getValues(true));
				Ext.Msg.alert('登录失败', '用户名或密码输入错误！');
			}
        });
	};
	
    
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
			}*/],
			listeners:{
				'render':function(){
					if (Ext.isIE || Ext.isIE7 || Ext.isIE8 || Ext.isIE9) {
						//alert('ie');
						Ext.getCmp('loginForm').setTitle("欢迎登录UML在线学习系统（<font color=red>请使用firefox浏览器<\/font>）");
					} else if (Ext.isChrome) {
						Ext.getCmp('loginForm').setTitle("欢迎登录UML在线学习系统（<font color=red>请使用firefox浏览器<\/font>）");
					} else if (Ext.isGecko3) {
						//alert('firefox');
					}	
				}
			}
		}]
	});
});
