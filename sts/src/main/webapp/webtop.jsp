<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="security" uri="http://www.springframework.org/security/tags" %> 
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
<title>ExtTop - Desktop Sample App</title>

    <link rel="stylesheet" type="text/css" href="./3rdp/sencha/extjs/4.0.2a/resources/css/ext-all.css" />
    <link rel="stylesheet" type="text/css" href="./3rdp/sencha/extjs/4.0.2a/examples/desktop/css/desktop.css" />

    <!-- TODO JSBuilder -->
    <script type="text/javascript" src="./3rdp/sencha/extjs/4.0.2a/bootstrap.js"></script>
    <!-- Dev -->    
    <script type="text/javascript" src="./3rdp/sencha/extjs/4.0.2a/examples/desktop/js/Module.js"></script>
    <script type="text/javascript" src="./3rdp/sencha/extjs/4.0.2a/examples/desktop/js/ShortcutModel.js"></script>
    <script type="text/javascript" src="./3rdp/sencha/extjs/4.0.2a/examples/desktop/js/Desktop.js"></script>
    <script type="text/javascript" src="./3rdp/sencha/extjs/4.0.2a/examples/desktop/js/App.js"></script>
    <script type="text/javascript" src="./3rdp/sencha/extjs/4.0.2a/examples/desktop/js/Video.js"></script>
    <script type="text/javascript" src="./3rdp/sencha/extjs/4.0.2a/examples/desktop/js/Wallpaper.js"></script>
    <script type="text/javascript" src="./3rdp/sencha/extjs/4.0.2a/examples/desktop/js/FitAllLayout.js"></script>
    <script type="text/javascript" src="./3rdp/sencha/extjs/4.0.2a/examples/desktop/js/StartMenu.js"></script>
    <script type="text/javascript" src="./3rdp/sencha/extjs/4.0.2a/examples/desktop/js/TaskBar.js"></script>
    
    <script type="text/javascript" src="./3rdp/sencha/extjs/4.0.2a/examples/desktop/VideoWindow.js"></script>
    <script type="text/javascript" src="./3rdp/sencha/extjs/4.0.2a/examples/desktop/BogusModule.js"></script>
    <script type="text/javascript" src="./3rdp/sencha/extjs/4.0.2a/examples/desktop/BogusMenuModule.js"></script>
    <script type="text/javascript" src="./3rdp/sencha/extjs/4.0.2a/examples/desktop/Settings.js"></script>
    <script type="text/javascript" src="./3rdp/sencha/extjs/4.0.2a/examples/desktop/TabWindow.js"></script>
    <script type="text/javascript" src="./3rdp/sencha/extjs/4.0.2a/examples/desktop/WallpaperModel.js"></script>
    <script type="text/javascript" src="./3rdp/sencha/extjs/4.0.2a/examples/desktop/GridWindow.js"></script>
    <script type="text/javascript" src="./3rdp/sencha/extjs/4.0.2a/examples/desktop/AccordionWindow.js"></script>
    <script type="text/javascript" src="./3rdp/sencha/extjs/4.0.2a/examples/desktop/SystemStatus.js"></script>
    <script type="text/javascript" src="./3rdp/sencha/extjs/4.0.2a/examples/desktop/Notepad.js"></script>
    
    <!-- script type="text/javascript" src="./3rdp/sencha/extjs/4.0.2a/examples/desktop/App.js"></script-->
    <script type="text/javascript" src="./webtop.js"></script>

    <script type="text/javascript">
    	Ext.Loader.setConfig({ enabled: true });
    	Ext.Loader.setPath({
            'Ext.ux.desktop': 'js',
            MyDesktop: ''
        });
		Ext.require('MyDesktop.SystemStatus');
		Ext.require('MyDesktop.GridWindow');
		Ext.require('MyDesktop.AccordionWindow');
		Ext.require('MyDesktop.Notepad');
        Ext.require('MyDesktop.App');

        var myDesktopApp;
        Ext.onReady(function () {
            myDesktopApp = new MyDesktop.App();
        });
    </script>
</head>

<body>
	<span id="username" class="x-hidden"><security:authentication property="name" /></span>
    <a href="http://www.sencha.com" target="_blank" alt="Powered by Ext JS"
       id="poweredby"><div></div></a>

</body>
</html>