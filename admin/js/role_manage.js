// 角色管理
var yy=window.yy || {};
yy.roleManage={};

/**
 * 添加角色
 */
(function (){
	var oBtn=$('#j-add-btn');
	var oPopup=$('#j-add-role-popup');
	var oYesBtn=oPopup.find('.yes');
	var oCloseBtn=oPopup.find('.close-btn');
	var oShadow=oPopup.find('.shadow');
	var oInp=oPopup.find('input');

	oBtn.click(function (){
		oPopup.show();
		oInp.focus();
	});

	oYesBtn.click(function (){
		var str=oInp.val();
		alert('添加角色提交后台');
		oPopup.hide();
	});

	oShadow.click(function (){
		_hide();
	});

	oNoBtn.click(function (){
		_hide();
	});

	oCloseBtn.click(function (){
		_hide();
	});

	function _hide()
	{
		oPopup.hide();
		noFn && noFn();
	}
})();