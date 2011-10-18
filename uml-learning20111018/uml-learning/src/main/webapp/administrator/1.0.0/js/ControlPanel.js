
Ext.define('MyDesktop.ControlPanel', {
    extend: 'Ext.ux.desktop.Module',

    requires: [
        'Ext.data.ArrayStore',
        'Ext.grid.Panel',
        'Ext.form.Panel'
    ],

    id:'control-win',

    init : function(){
		this.launcher = [{
			text : '控制面板',
			iconCls : 'icon-grid',
			menu : {
				items : [{
					text : '模块管理',
					iconCls : 'icon-grid',
					scope : this,
					handler : function(){
						this.app.getDesktop().onCreateWindow('CmpSetting-win');
					}
				}, {
					text : '用户管理',
					iconCls : 'icon-grid',
					scope : this,
					handler : function(){
//						this.app.getDesktop().onCreateWindow('');
					}
				}]
			}
		}]
    },

    
    
    createWindow : function(){
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('control-win');
        
        Ext.define('ControlItem', {
			extend : 'Ext.data.Model',
			fields : [ 'icon', 'caption', 'module']
		});
		
		var tpl = new Ext.XTemplate(
			'<tpl for=".">',
				 '<div class="thumb-wrap" id="control-{caption}">',
					'<div class="thumb" style="float:left;padding:15px;text-align:center;">',
						'<table>',
							'<tr>',
								'<td align="center" valign="middle">',
									'<img class="thumb-img" src="{icon}" width="64" height="64" />',
								'</td>',
							'</tr>',
						'</table>',
						'<span class="x-editable" style="width:20px;word-break:break-word;line-height:36px;">{caption}</span>',
					'</div>',
				 '</div>',
			'</tpl>',
			'<div class="x-clear"></div>'
		);
		
		var controlStore = new Ext.data.Store({
			model : 'ControlItem',
			data: [
				{icon : 'http://cdn3.iconfinder.com/data/icons/diagram_v2/PNG/96x96/diagram_v2-10.png', caption : '模块管理', module : 'CmpSetting-win'},
				{icon : 'http://cdn4.iconfinder.com/data/icons/simplicio/128x128/user_manage.png', caption : '用户管理', module : 'UserMgmt-win'}
			]
		});
	
		var controlView = Ext.create('Ext.DataView', {
			store: controlStore,
			tpl: tpl,
			itemSelector: 'div.thumb-wrap',
			emptyText: 'No images available',
			bodyStyle : 'background : #000',
			listeners : {
				'itemclick' : function(view, record, item, index, e){
					var wid = view.getStore().getAt(index).data['module'];
					console.log(wid);
					desktop.onCreateWindow(wid);
				}
			}
		});
        
		var controlPanel = Ext.create('Ext.panel.Panel', {
			layout : 'fit',
			border : false,
			items : controlView
		});
		
        if(!win){
            win = desktop.createWindow({
                id: 'control-win',
                title:'控制面板',
                layout : 'fit',
                width:500,
                height:350,
                items : [controlPanel]
            });
        }
        win.show();
        return win;
    }
});


