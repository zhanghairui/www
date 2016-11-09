// 张海瑞 - zhanghairui.com

var hairui={};
hairui.public={};

/**
 * 为 rem 设置文字大小
 */
hairui.public.setFontSize=function (){
	var oHtml=$('html');
	
	$(window).resize(_set);
	$(document).ready(_set);
	
	function _set()
	{
		var nClientW=$(window).width();
		var nSize=(nClientW / 640) * 20;
		
		oHtml.css('fontSize', nSize+'px');
	}
};


/*---- 调用 ----*/
hairui.public.setFontSize();