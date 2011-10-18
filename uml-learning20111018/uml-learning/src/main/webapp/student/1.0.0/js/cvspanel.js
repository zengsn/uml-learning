Constants = {	
	STATUS_PK: 'begin',
	STATUS_M0: 'movestart',
	MOUSE_IN : 'mousein',
	MOUSE_OUT: 'mouseout'	
};
Ve = {
	elSelect: -1,
	elCount: -1,
	elArray: new Array(),
	cvsWidth: null,
	cvsHeight: null,
	isDrawLine: 0
};
Ext.define('canvasPanel', {
    extend: 'Ext.panel.Panel',
    alias : 'widget.canvaspanel',  
	initComponent : function() {		
		Ext.apply(this, {
			id: 'canvaspanel',
			listeners: {
				render: function(p){
					/*p.el.on("mouseenter",function(){
						this.onEditting
					},"mouseleave",function(){
						this.stopEditing
					},"mousemove",function(){
						this.checkStatus
					},"mousedown",function(){
						this.recordDown
					})*/
				}
			},
			title : '绘图',
			layout : 'fit',     
			html : '<div id="uml-canvas"><canvas id="myCanvas"></canvas></div>'
		});
		this.callParent(arguments);		
	}
	
});

