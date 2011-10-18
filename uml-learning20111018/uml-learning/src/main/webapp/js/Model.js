//
Ext.define('MyDesktop.t', {
	extend : 'Ext.data.Model',
	fields : [ 'bro_id', 'bro_author', 'bro_subject', 'bro_type', 'bro_title',
			'bro_content', 'bro_pic', 'bro_post', 'bro_finish' ]
});
//问题模型
Ext.define('MyDesktop.Tasks', {
	extend : 'Ext.data.Model',
	fields : [ 'tid', 'tauthor', 'tsubject', 'ttype', 'ttitle',
			'tcontent', 'tpic', 'tpost', 'tfinish' ]
});
//
Ext.define('MyDesktop.Follow', {
	extend : 'Ext.data.Model',
	fields : [ 'id', 'follow','follower','date']
});

Ext.define('MyDesktop.user', {
	extend: 'Ext.data.Model',
    fields: ['uid', 'uname', 'utype']
});

Ext.define('MyDesktop.rightMenu', {
	
	extend : 'Ext.menu.Menu',
	
	init : function(){
		
		var rmenu = Ext.create('Ext.menu.Menu', {
			width : 100,
			height : 150,
			items : [{
				text : 'a'
			}, {
				text : 'b'
			}, {
				text : 'c'
			}]
		});
		return rmenu;
	}
	
});