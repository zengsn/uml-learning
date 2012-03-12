Ext.define('MyDesktop.UmlUp', {
    extend: 'Ext.ux.desktop.Module',
    id : 'umlup-win',
    requires: [
        'Ext.panel.Panel',
        'Ext.form.Panel'
    ],

    init : function(){
    },

    createWindow : function(){
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('umlup-win');
        var upanel=Ext.create('Ext.form.Panel', {
			//title: 'Upload',
			width: 400,
			bodyPadding: 10,
			baseCls: true,
			frame: true, 
			fileUpload: true,
			items: [{
				xtype: 'filefield',
				name: 'umlxml',
				fieldLabel: 'XML文件',
				labelWidth: 50,
				msgTarget: 'side',
				allowBlank: false,
				anchor: '100%',
				buttonText: '选择文件...'
			}],

			buttons: [{
				text: '确定',
				handler: function() {
					var form = this.up('form').getForm();
					var fileName="";
					if(form.isValid()){
						form.submit({
							url: './getlocalxml.jxp',
							method : 'post',
	    					success : function(form, action){
	    						Ext.Msg.alert('提示信息', action.result.msg);
	    						win.close();
	    						fileName=action.result.data;
	    						console.log('filename:'+fileName);
	    						var i;
				                var obj=Ext.decode(fileName); 
				                for(i=0;i<obj.length;i++){
					                var a=new Array();
					                a[i]=obj[i];
					                console.log('json   array:'+a[i]);
					                xmlDraw(a[i]);
					               } 
	    					},
	    					failure : function(form, action){
	    						Ext.Msg.alert('提示信息', action.result.msg);
	    						win.close();
	    					}														
						});
					}
				}
			}]
		});      
        if(!win){
            win = desktop.createWindow({
                id: 'umlup-win',
                title: '导入XML',
    			width: 412,
    			height: 120,
    			resizable: false,
    			items: upanel   	
            });
        }
        win.show();
        return win;
    }

 
});