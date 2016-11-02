// 登录
var yy=window.yy || {};
yy.login={};

/**
 * 登录验证
 */
yy.login.validate=function (){
	var oUsername=$('#j-username');
	var oPassword=$('#j-password');
	var oError=$('#j-error');
	var oSubmit=$('#j-submit');
	var bFlag=false;

	oUsername.focus();

	// 改变透明度
	oPassword.focus(function (){
		setInterval(function (){
			var sUsername=$.trim(oUsername.attr('value'));
			var sPassword=$.trim(oPassword.attr('value'));

			if (sUsername.length==0 || sPassword.length==0)
			{
				oSubmit.css('opacity', 0.5);
				bFlag=false;
			}
			else
			{
				oSubmit.css('opacity', 1);
				bFlag=true;
			}
		}, 30);
	});

	// 点击登录
	oSubmit.click(function (){
		if ( ! bFlag) return false;
		
		doSubmit();
	});

	// 回车登录
	$(document).keydown(function (ev){
		if (ev.keyCode == 13)
		{
			if ( ! bFlag) return false;

			doSubmit();
		}
	});

	// 登录请求后台
	function doSubmit()
	{
		var sUsername=$.trim(oUsername.attr('value'));
		var sPassword=$.trim(oPassword.attr('value'));

		// 到后台请求数据...
		alert('登录去了');
	}
};

/**
 * 登录前获取用户信息
 */
yy.login.getUserInfo=function (){
	var oPortrait=$('#j-portrait');
	var oUsername=$('#j-username');
	var oPassword=$('#j-password');
	var jUserInfo=yy.public.getCookie('userInfo');

	if (jUserInfo.logined === true)
	{
		oPortrait.attr('src', jUserInfo.src);
		oUsername.attr('value', jUserInfo.username);
		oPassword.focus();
	}
};

// 调用
yy.login.validate();
yy.login.getUserInfo();