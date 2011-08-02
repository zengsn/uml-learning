// --- ��ȡClassName
document.getElementsByClassName = function(cl) {
var retnode = [];
var myclass = new RegExp('\\b'+cl+'\\b');
var elem = this.getElementsByTagName('*');
for (var j = 0; j < elem.length; j++) {
	var classes = elem[j].className;
	if (myclass.test(classes))
		retnode.push(elem[j]);
}
return retnode;
}
// --- ��������
function HideAll() {
	var items = document.getElementsByClassName("optiton");
	for (var j=0; j<items.length; j++) {
		items[j].style.display = "none";
	}
}

// --- ����cookie
function setCookie(sName,sValue,expireHours) {
	var cookieString = sName + "=" + escape(sValue);
	//;�ж��Ƿ����ù���ʱ��
	if (expireHours>0) {
		var date = new Date();
		date.setTime(date.getTime + expireHours * 3600 * 1000);
		cookieString = cookieString + "; expire=" + date.toGMTString();
	}
	document.cookie = cookieString;
}

//--- ��ȡcookie
function getCookie(sName) {
	var aCookie = document.cookie.split("; ");
	for (var j=0; j < aCookie.length; j++) {
		var aCrumb = aCookie[j].split("=");
		if (escape(sName) == aCrumb[0])
			return unescape(aCrumb[1]);
	}
	return null;
}

window.onload = function() {
	var show_item = "opt_1";
	if (getCookie("show_item") != null) {
		show_item= "opt_" + getCookie("show_item");
	}
	document.getElementById(show_item).style.display = "block";
	var items = document.getElementsByClassName("title");
	for (var j=0; j<items.length; j++) {
		items[j].onclick = function() {
			var o = document.getElementById("opt_" + this.name);
			if (o.style.display != "block") {
				HideAll();
				o.style.display = "block";
				setCookie("show_item",this.name);
			} else {
				o.style.display = "none";
			}
		}
	}
}