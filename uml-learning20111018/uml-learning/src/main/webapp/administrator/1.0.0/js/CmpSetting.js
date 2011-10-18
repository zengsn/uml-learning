Ext.define('MyDesktop.CmpSetting', {
    extend: 'Ext.ux.desktop.Module',

    requires: [
        'Ext.data.ArrayStore',
        'Ext.grid.Panel',
        'Ext.form.Panel'
    ],

    id:'CmpSetting-win',

    init : function(){
		
    },
    
    createWindow : function(){
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('CmpSetting-win');
        
        Ext.define('cmpInfo', {
			extend : 'Ext.data.Model',
			fields : [ 'wid_', 'name_', 'author_', 'release_', 'screen_', 'logo_', 'icon_', 'description_', 'status_', 'versions_', 'currentversion_', 'createdtime', 'title_']
		});
		
		var start = 0;
		var limit = 5;
		
		var cmpTemplate = new Ext.XTemplate(
			'<tpl for=".">',
				'<div class="CmpCls" id="cmpid-{wid_}">',
					'<div class="CmpIcon"><img src={icon_} width="64" height="64" /></div>',
					'<div class="CmpDesc">{description_}</div>',
					'<div class="CmpDetail"><div>模块名称：{wid_}</div><div>作者：{author_}</div></div>',
				'</div>',
			'</tpl>'
		);
		
		var cmpStore = Ext.create('Ext.data.Store', {
			id : 'cmpStore',
			autoLoad : true,
			model : 'cmpInfo',
			/*pageSize : limit,
			proxy : {
				url : './webtop.jxp?action=ShowModule',
				reader : {
					type : 'xml',
					root : 'cmpItems',
					record : 'cmpItem',
					totalProperty : 'total'
				}
			}*/
			data :  [
				{ wid_ : 'administrator', name_ : 'name', author_ : 'zsn.cc', release_ : '1.0.0', screen_ : '', logo_ : '', icon_ : 'http://cdn3.iconfinder.com/data/icons/diagram_v2/PNG/96x96/diagram_v2-10.png', description_ : 'abcd', status_ : '1', versions_ : '1.0.0', currentversion_ : '1.0.0', createdtime_ : '2011-09-10'},
				{ wid_ : 'teacher', name_ : 'name', author_ : 'zsn.cc', release_ : '1.0.0', screen_ : '', logo_ : '', icon_ : 'http://cdn3.iconfinder.com/data/icons/diagram_v2/PNG/96x96/diagram_v2-10.png', description_ : 'abcd', status_ : '1', versions_ : '1.0.0', currentversion_ : '1.0.0', createdtime_ : '2011-09-10'},
				{ wid_ : 'student', name_ : 'name', author_ : 'zsn.cc', release_ : '1.0.0', screen_ : '', logo_ : '', icon_ : 'http://cdn3.iconfinder.com/data/icons/diagram_v2/PNG/96x96/diagram_v2-10.png', description_ : 'abcd', status_ : '1', versions_ : '1.0.0', currentversion_ : '1.0.0', createdtime_ : '2011-09-10'},
				{ wid_ : 'uml-drawing', name_ : 'name', author_ : 'zsn.cc', release_ : '1.0.0', screen_ : '', logo_ : '', icon_ : 'http://cdn3.iconfinder.com/data/icons/diagram_v2/PNG/96x96/diagram_v2-10.png', description_ : 'abcd', status_ : '1', versions_ : '1.0.0', currentversion_ : '1.0.0', createdtime_ : '2011-09-10'}
			]
			
		});
		
		/*cmpStore.load({
			params : {
				start : start,
				limit : limit
			}
		});*/
		
		var cmpView = Ext.create('Ext.DataView', {
			store : cmpStore,
			tpl : cmpTemplate,
			itemSelector : 'div.CmpCls',
			listeners : {
				'itemclick' : function(view, record, item, index, e){
					var id = "cmpid-" + view.getStore().getAt(index).data['wid_']
					console.log(id);
					cmpName = view.getStore().getAt(index).data['wid_'];
					cmpVersion = view.getStore().getAt(index).data['currentversion_'];
				} 
			}
		});
		
		var cmpPanel = Ext.create('Ext.panel.Panel', {
			border : false,
			items : [cmpView],
			autoScroll : true,
			dockedItems : [{
				xtype : 'pagingtoolbar',
				id : 'CmpPaging',
				store : cmpStore,
				dock : 'bottom',
				beforePageText : '第',
				afterPageText : '页',
				inputItemWidth : 20,
				displayInfo : true,
				displayMsg : '<font size=2>第{0}-{2}条,共{2}条</font>',
				emptyMsg : '没有记录！'
			}]
		})
        
        if(!win){
            win = desktop.createWindow({
                id: 'CmpSetting-win',
                title:'模块管理',
                layout : 'fit',
                width:500,
                height:350,
                items : [cmpPanel],
                tbar : [{
                	text : '刷新组件',
                	scale : 'large',
                	iconAlign : 'top',
                	iconCls : 'refreshCmp'
                }, {
                	text : '升级组件',
                	scale : 'large',
                	iconAlign : 'top',
                	iconCls : 'updateCmp',
                	handler : function(){
                		var count = cmpView.getStore().count();
                		var arr = new Array();
                		var str = '';
                		for (var i = 0; i < count; i++) {
                			arr[i] = cmpView.getStore().getAt(i).data['wid_'];
                			str += arr[i] + ",";
                		}
                		str = str.substring(0, str.length - 1);
                		Ext.Ajax.request({
                			url : './webtopIndex.jxp',
                			params : {
                				action : 'SaveConfig',
                				cmpName : cmpName,
                				cmpVersion : cmpVersion
                			}, 
                			success : function(response, config){
                				Ext.example.msg('提示', response.responseText, 2000);
                			},
                			failure : function(response, config){
                				Ext.example.msg('提示', response.responseText, 2000);
                			}
                		});
                	}
                }]
            });
        }
        win.show();
        return win;
    }
});