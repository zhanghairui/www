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
	var timer=null;

	oUsername.focus();

	// 改变透明度
	oPassword.focus(function (){
		oError.css('opacity', 0);
		clearInterval(timer);
		timer=setInterval(function (){
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
		clearInterval(timer);
		var sUsername=$.trim(oUsername.attr('value'));
		var sPassword=$.trim(oPassword.attr('value'));
		// 登录成功后跳转的地址
		var targetUrl='http://zhanghairui.com';

		// 到后台请求数据...
		$.ajax({
			url:'/controller/authorization/login',
			type:'post',
			data:{'username':sUsername, 'password':sPassword},
			success:function (data){
				var res=JSON.parse(data);

				switch (res.result)
				{
					case 'multiEnterprise': // 多家企业
						multiEnterprise(res.datalist);
						break;

					case 'success': // 一家企业
						window.open(targetUrl+'?id='+res.data.id, '_self');
						break;

					case 'failed': // 用户名或密码不正确
						_failed();
						break;
				}
			},
			error:function (){
				alert('登录失败，网络故障');
			}
		});

		function _multiEnterprise(datalist)
		{
			var oPopup=$('#j-company-list');
			datalist=[{name:'李宁', id:1}, {name:'adidas', id:2}];

			for (var i=0; i<datalist.length; i++)
			{
				datalist[i].url=targetUrl+'?id='+datalist[i].id;
			}

			var tplHtml = template('company-list',{'datalist':datalist});
			oPopup.html(tplHtml);
			oPopup.show();
		}

		function _failed()
		{
			$('#j-error').css('opacity', 1);
		}
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