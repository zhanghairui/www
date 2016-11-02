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