<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%request.setAttribute("_EXT_URL_","http://zsn.cc/3rdp/ext/4.0.0"); %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>登录UML在线学习系统</title>
	<link rel="shortcut icon" href="./images/favicon.ico" />
	<link rel="icon" href="./images/favicon.ico" />
	<!-- ExtJS 4 -->
    <link rel="stylesheet" type="text/css" href="./3rdp/sencha/extjs/4.0.2a/resources/css/ext-all.css" />
    <!-- TODO JSBuilder -->
    <script type="text/javascript" src="./3rdp/sencha/extjs/4.0.2a/bootstrap.js"></script>
	<script type="text/javascript" src="./signin.js"></script>
    
</head>
<body>
	<script>
		
	</script>
	<div class="x-hidden">
		<h1>Sign in | <a href="./signon.jxp">Sign on</a></h1>

		<p>The page markup of this example is rewritten with official ExtJS 4 form example:  
			<a href="http://dev.sencha.com/deploy/ext-4.0-beta3/examples/form/xml-form.html">XML Form</a>.</p>
		<ul class="feature-list">
			<li>Username: demo</li>
			<li>Password: demo</li>
		</ul>

		<p><a href="http://www.zengsource.org/demo">Download</a> the demo.</p>
		
		<p><a id="back-url" href="${_BACK_}">${_BACK_}</a></p>
		
		<div id="form-ct"></div>
		</div><c:if test="${not empty param.error}">
		<font color="red" class="x-hidden">
		Login error. <br />
		Reason : ${sessionScope["SPRING_SECURITY_LAST_EXCEPTION"].message}

		
		</font>
		</c:if>
		
    
</body>
</html>