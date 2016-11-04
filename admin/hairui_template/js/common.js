// yy 为主空间
window.yy={};
// yy.public 为公共空间
yy.public={};

/**
 * 设置cookie
 * @param c_name string 数据名字
 * @param value 数据
 * @param expiredays number 生效日期
 */
yy.public.setCookie=function (c_name,value,expiredays){
	var exdate=new Date();
	exdate.setDate(exdate.getDate()+expiredays);
	document.cookie=c_name+ "=" +escape(value)+
	((expiredays==null) ? "" : ";expires="+exdate.toGMTString());
};
/**
 * 获取cookie
 * @param c_name string 数据名字
 * @return 找到的数据|''
 */
yy.public.getCookie=function (c_name){
	if (document.cookie.length>0)
	{
		c_start=document.cookie.indexOf(c_name + "=");

		if (c_start!=-1)
		{ 
			c_start=c_start + c_name.length+1;
			c_end=document.cookie.indexOf(";",c_start);
			if (c_end==-1) c_end=document.cookie.length;

			return unescape(document.cookie.substring(c_start,c_end));
		} 
	}
	return '';
};
/**
 * 移除cookie
 * @param c_name string 数据名字
 */
yy.public.removeCookie=function (sName){
	setCookie(sName, '', -1);
};
/**
 * 左侧导航收起效果
 */
yy.public.manageLeftNav=function (oBtn, oList){
	var h=oList.children().eq(0).height()*oList.children.length;
	oBtn.click(function (){
		if (oBtn.hasClass('open'))
		{
			// 收起
			oBtn.removeClass('open');
			oList.stop().animate({'height':0});
		}
		else
		{
			// 展开			
			oBtn.addClass('open');
			oList.stop().animate({'height':h+'px'});
		}
	});
};
/**
 * 全站prompt框
 */
yy.public.prompt=function (){
	
};
/**
 * 全站确认框
 * @param oBtn object 点击弹出框的按钮
 * @param sTitle string 提示框的标题文字
 * @param sMessage string 框体消息
 * @param yesFn function 确认执行的代码
 * @param noFn function 取消执行的代码 可选
 */
yy.public.confirm=function (oBtn, sTitle, sMessage, yesFn, noFn){
	var oPopup=$('#j-manage-confirm');
	sTitle=sTitle || '提示';
	sMessage=sMessage || '确认？';
	
	oBtn.click(function (){
		var tmpHtml=template('manage-confirm-tpl', {title:sTitle, message:sMessage});
		oPopup.html(tmpHtml);
		var oYesBtn=oPopup.find('.yes');
		var oCloseBtn=oPopup.find('.close-btn');
		var oNoBtn=oPopup.find('.no');
		var oShadow=oPopup.find('.shadow');

		oYesBtn.click(function (){
			yesFn && yesFn();
			oPopup.hide();
		});

		oShadow.click(_hide);
		oNoBtn.click(_hide);
		oCloseBtn.click(_hide);

		oPopup.show();
	});

	function _hide()
	{
		oPopup.hide();
		noFn && noFn();
	}
};