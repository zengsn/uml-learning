function initImgCanvas(){
	
	var imgCanvas = document.getElementById('imgCanvas');
	if (picTmpValue != ''){
		var img = new Image();
		img.src = picTmpValue;
		
		Ext.getCmp('img-panel').width = img.width;
		Ext.getCmp('img-panel').height = img.height;
		imgCanvas.width = img.width;
		imgCanvas.height = img.height;
		drawFromImg(imgCanvas, img);
		
	}
	if (xmlTmpValue != ''){
        
//		Ext.getCmp('img-panel').width = this.width;
//		Ext.getCmp('img-panel').height = this.height;
		imgCanvas.width = this.width;
		imgCanvas.height = this.height;
		for (var i = 0; i < elArr.length; i++){
			allEl[i] = generateClass(elArr[i]);
			//allEl[i].drawImage(ctx);
		}
		drawFromXml(imgCanvas, allEl);
	}
};

function drawFromImg(canvas, img){
	var ctx = get2dContext(canvas);
	img.onload = function(){
		DCI.DrawImg(ctx, img);
	};
};

function drawFromXml(canvas, allEl){
	console.log('start drawing from xml data...');
	console.log("count of shapes : " + elArr.length);
	imgCtx = get2dContext(canvas);
	
//	for (var i = 0; i < elArr.length; i++){
//		allEl[i] = generateClass(elArr[i]);
//					console.log("id : " + elArr[i].id);
//					allEl[i].id = elArr[i].id;
//					allEl[i].text = elArr[i].text;
//					allEl[i].elX = elArr[i].elX;
//					allEl[i].elY = elArr[i].elY;
//					allEl[i].x1 = elArr[i].x1;
//					allEl[i].y1 = elArr[i].y1;
//					allEl[i].x2 = elArr[i].x2;
//					allEl[i].y2 = elArr[i].y2;
//					allEl[i].type = elArr[i].type;
//					allEl[i].width = elArr[i].width;
//					allEl[i].height = elArr[i].height;
//					allEl[i].dw = elArr[i].dw;
//					allEl[i].dh = elArr[i].dh;
//					allEl[i].other = elArr[i].other;
//		console.log(typeof(allEl[i]));
		//allEl[i].drawImage(ctx);
//	}
//				for (var i = 0; i < elArr.length; i++){
//					allEl[i].drawImage(ctx);
//					console.log("i==================================" + i);
//				}


//	allEl[0].drawImage(imgCtx);
//
	for (i in allEl[0]){
		if (allEl[0].hasOwnProperty(i)){
			console.log(i + "===>" + allEl[0][i]);
		}
	}
//	
//	alert(allEl[0].drawImage);
//	
	for (var i = 0; i < elArr.length; i++){
		allEl[i].drawImage(imgCtx);
	}
	
	console.log('stop drawing from xml dataXXX...');
};

Ext.define('MyDesktop.ShowImg', {
    extend: 'Ext.ux.desktop.Module',
    id : 'showimg-win',

    requires : [
    	'Ext.panel.Panel'
    ],
    
    createWindow : function(){
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('showimg-win');
        
        if(!win){
        	
        	

        	
            var imgPanel = Ext.create('Ext.panel.Panel', {
            	id : 'img-panel',
            	//title : 'img-panel',
            	html : '<canvas id="imgCanvas" width=200 height=200 ></canvas>',
            	autoScroll : true
            	/*,
            	listeners : {
            		'afterrender' : function(){
            			store.load({
                    	    scope   : this,
                    	    callback: function(records, operation, success) {
                    	    	console.log('store is loading...');
                        		//alert(records.length + "records.length");
                        		for (var i = 0; i < records.length; i++){
                        			elArr[i] = records[i].data;
                        			console.log(elArr[i].type);
                        		}
                        		console.log(elArr.length);
                    	    }
                    	});
            		}
            	}*/
            });
            
            win = desktop.createWindow({
                id: 'showimg-win',
                title:'查看图片',
                width:950,
                height:570,
                border : false,
                iconCls: 'icon-grid',
                layout : 'fit',
                items: [imgPanel],
                listeners : {
                	'afterrender' : initImgCanvas,
                	'resize' : initImgCanvas,
                	'minimize' : initImgCanvas
                },
            	buttons : [{
            		text : '关闭',
            		handler :  function(){
            			picTmpValue = '';
            			xmlTmpValue = '';

            			win.close();
            		}
            	}]
            });
        }
        win.show();
        return win;
    }
	
});