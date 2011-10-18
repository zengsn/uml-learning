<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<% %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<%@page import="java.io.IOException"%><html>
<%@page import="org.springframework.security.core.context.SecurityContextHolder"%>

<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>请稍候……</title>
</head>
<body>
<%
/*
try {
	//request.getRequestDispatcher("index.jxp").forward(request, response);
	request.getRequestDispatcher("webtop.jxp").forward(request, response);
//} catch (ServletException e) {
//	e.printStackTrace();
} catch (IOException e) {
	e.printStackTrace();
}*/
final String currentUser = SecurityContextHolder.getContext().getAuthentication().getName();

if (currentUser == null) {
	response.sendRedirect("./index.jxp");
} else {
	try {
		request.getRequestDispatcher("index.jxp").forward(request, response);
	//} catch (ServletException e) {
	//	e.printStackTrace();
	} catch (IOException e) {
		e.printStackTrace();
	}
}
%>
</body>
</html>