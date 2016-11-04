// yy Ϊ���ռ�
window.yy={};
// yy.public Ϊ�����ռ�
yy.public={};

/**
 * ����cookie
 * @param c_name string ��������
 * @param value ����
 * @param expiredays number ��Ч����
 */
yy.public.setCookie=function (c_name,value,expiredays){
	var exdate=new Date();
	exdate.setDate(exdate.getDate()+expiredays);
	document.cookie=c_name+ "=" +escape(value)+
	((expiredays==null) ? "" : ";expires="+exdate.toGMTString());
};
/**
 * ��ȡcookie
 * @param c_name string ��������
 * @return �ҵ�������|''
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
 * �Ƴ�cookie
 * @param c_name string ��������
 */
yy.public.removeCookie=function (sName){
	setCookie(sName, '', -1);
};
/**
 * ��ർ������Ч��
 */
yy.public.manageLeftNav=function (oBtn, oList){
	var h=oList.children().eq(0).height()*oList.children.length;
	oBtn.click(function (){
		if (oBtn.hasClass('open'))
		{
			// ����
			oBtn.removeClass('open');
			oList.stop().animate({'height':0});
		}
		else
		{
			// չ��			
			oBtn.addClass('open');
			oList.stop().animate({'height':h+'px'});
		}
	});
};
/**
 * ȫվprompt��
 */
yy.public.prompt=function (){
	
};
/**
 * ȫվȷ�Ͽ�
 * @param oBtn object ���������İ�ť
 * @param sTitle string ��ʾ��ı�������
 * @param sMessage string ������Ϣ
 * @param yesFn function ȷ��ִ�еĴ���
 * @param noFn function ȡ��ִ�еĴ��� ��ѡ
 */
yy.public.confirm=function (oBtn, sTitle, sMessage, yesFn, noFn){
	var oPopup=$('#j-manage-confirm');
	sTitle=sTitle || '��ʾ';
	sMessage=sMessage || 'ȷ�ϣ�';
	
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