// 客服管理
var yy=window.yy || {};
yy.customerManage={};

// 与后台交互数据

/**
 * 左侧导航
 */
(function (){
	var aBtn=$('.manage-nav-list .j-on-off');
	aBtn.each(function (index){
		var oBtn=$(this).find('.btn');
		var oList=$(this).find('.list');;
		yy.public.manageLeftNav(oBtn, oList);
	});
})();
/**
 * _复选框
 * @param oParent object 父级，从哪个父级下获取checkbox
 */
yy.customerManage.checkbox=function (oParent){
	var aChk=$(oParent).find('.chk');

	aChk.click(function (){
		var oHide=$(this).parent().find('input[name=isAdmin]');
		if ($(this).hasClass('active'))
		{
			// 不选中
			$(this).removeClass('active');
			oHide.attr('value', 0);
		}
		else
		{
			// 选中
			$(this).addClass('active');
			oHide.attr('value', 1);
		}
	});

	aChk.mousedown(function (){
		return false;
	});
};
/**
 * _统计字数
 */
yy.customerManage.wordCount=function (){
	var aInp=$('.j-count-inp');
	var aNum=$('.j-count-num');

	aNum.each(function (index){
		var str=$(this).html();
		var nMax=parseInt(str.split('/')[1]);
		var nNow=aInp.eq(index).attr('value').length;

		if (nNow >= nMax)
		{
			aInp.eq(index).on('keydown', function (){
				return false;
			});
		}

		$(this).html(nNow+'/'+nMax);
	});
};
/**
 * _显示错误消息
 */
yy.customerManage.showErrorMsg=function (msg){
	// success成功 remind提醒 warning警告 error错误
	var oError=$('#j-manage-msg');
	oError.addClass('error');
	oError.html(msg);
	oError.stop().animate({bottom:0});
};
/**
 * _隐藏错误消息
 */
yy.customerManage.hideErrorMsg=function (){
	// success成功 remind提醒 warning警告 error错误
	var oError=$('#j-manage-msg');
	oError.removeClass('error');
	oError.css({bottom:'-36px'});
};
/**
 * _校验表单（必填项，邮箱、手机）
 */
yy.customerManage.validate=function (aRules){
	var errMsg={nickname:'请输入昵称', accounts:'请输入账号', password:'请输入密码', 'chk-password':'两次密码不一致', email:'邮箱格式不正确', phone:'请输入正确的手机号'};

	var validator=new FormValidator('j-form', aRules, function (error, event){
		if (error.length > 0)
		{
			// 用户填写信息有误
			var msg=error[0].message+errMsg[error[0].id];
			yy.customerManage.showErrorMsg(msg);
		}
		else
		{
			// 用户填写信息无误
			yy.customerManage.hideErrorMsg();
			// 与后台交互数据 修改/添加
			console.log('提交');
		}
	});

	validator.setMessage('required', ' ');
	validator.setMessage('matches', ' ');
	validator.setMessage('valid_email', ' ');
	validator.setMessage('min_length', ' ');
};
/**
 * 侧边栏展开/收起
 * @param oBtn object 展开的按钮
 * @param tplName string 模板的id名
 * @param jData json  绑定模板的数据
 * @param aRules array 表单校验规则
 */
yy.customerManage.openCloseSideBar=function (oBtn, tplName, jData, aRules){
	var duration=100;
	var oSideBar=$('#j-side');
	var timer=null;

	oBtn.click(function (){
		var tplHtml=template(tplName, jData);
		oSideBar.html(tplHtml);
		var oSubmit=$('#j-submit-btn');

		oSideBar.stop().animate({right:0}, {duration:duration,complete:_openComplete});

		function _openComplete()
		{
			// 统计字数
			clearInterval(timer);
			timer=setInterval(function (){
				yy.customerManage.wordCount();
			}, 30);
			// 处理复选框
			yy.customerManage.checkbox(oSideBar);
			// 校验表单
			oSubmit.click(function (){
				yy.customerManage.validate(aRules);
			});
		}

		var oCloseBtn=$('#j-close-btn');
		oCloseBtn.click(function (){
			yy.customerManage.hideErrorMsg();
			oSideBar.stop().animate({right:'-380px'}, {duration:duration,complete:function (){
				clearInterval(timer);
			}});
		});
	});
};
/**
 * 添加客服
 */
(function (){
	var oBtn=$('#j-add-btn');
	var aRules=[{
		name:'nickname',
		rules:'required'
	}, {
		name:'accounts',
		rules:'required'
	}, {
		name:'password',
		rules:'required'
	}, {
		name:'chk-password',
		rules:'required|matches[password]'
	}, {
		name:'email',
		rules:'valid_email'
	}, {
		name:'phone',
		rules:'required|min_length[11]'
	}];

	yy.customerManage.openCloseSideBar(oBtn, 'add-tpl', {}, aRules);
})();
/**
 * 编辑客服
 */
(function (){
	var aBtn=$('.editor-btn');
	var aTr=$('#j-user-list').find('tbody tr');

	aBtn.each(function (index){
		var oTr=aTr.eq(index);
		var jData={
			name:oTr.find('td[data-name=name]').html(),
			accounts:oTr.find('td[data-name=accounts]').html(),
			isAdmin:oTr.find('td[data-name=isAdmin]').html(),
			nickname:oTr.find('td[data-name=nickname]').html(),
			email:oTr.find('td[data-name=email]').html(),
			phone:oTr.find('td[data-name=phone]').html(),
			num:oTr.find('td[data-name=num]').html()
		};

		var aRules=[{
				name:'nickname',
				rules:'required'
			}, {
				name:'email',
				rules:'valid_email'
			}, {
				name:'phone',
				rules:'required|min_length[11]'
		}];

		yy.customerManage.openCloseSideBar($(this), 'editor-tpl', jData, aRules);
	});
})();
/**
 * 删除客服
 */
(function (){
	var aDelBtn=$('.j-del-btn');
	var sTitle='删除客服';
	var sMessage='确定删除客服技术支持吗？删除后，该客服账号将无法继续使用';

	aDelBtn.each(function (index){
		yy.public.confirm($(this), sTitle, sMessage, function (){
			// 向服务发送删除请求
			alert('向服务发送删除请求');
		});
	});
})();