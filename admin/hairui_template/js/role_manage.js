// 角色管理
var yy=window.yy || {};
yy.roleManage={};

// 弹出框可以合并，最后优化时再处理吧

/**
 * 获取指定组下的客服
 * @param groupId number 组的id标识
 */
yy.roleManage.getGroupUser=function (groupId){
	// 获取指定组下客服地址
	var URL='';
	// var URL='groupData.txt';
	var oTbody=$('#j-data-tbody');
	var oLoading=$('#j-loading');
	oLoading.show();

	$.ajax({
		url:URL,
		type:'POST', // 一会得改成post
		data: {"groupId":groupId},
		success:function (data){
			var res=JSON.parse(data);
			var tmplHtml=template('j-tbody-list', {datalist:res});
			oTbody.html(tmplHtml);
			oLoading.hide();
		},
		error:function (){
			console.log('请求指定组下客服失败');
		}
	});
};
/**
 * 选项卡
 */
yy.roleManage.tab=function (){
	var aBtn=$('#j-role-list li');

	aBtn.eq(0).addClass('active');
	// yy.roleManage.getGroupUser(aBtn.eq(0).attr('data-group-id'));

	aBtn.click(function (){
		aBtn.removeClass('active');
		$(this).addClass('active');	

		// 处理数据
		var groupId=$(this).attr('data-group-id');
		yy.roleManage.getGroupUser(groupId);
		// 给“管理组成员”按钮加groupId
		$('#j-manage-btn').attr('data-group-id', groupId);
		
	});
};
/**
 * 添加角色
 */
yy.roleManage.addRole=function (){
	var oBtn=$('#j-add-btn');
 	var oPopup=$('#j-role-popup');
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
 		oPopup.hide();
 		// 数据提交到后台
 		alert('添加角色数据：'+str);
 	});

 	oShadow.click(_hide);
 	oCloseBtn.click(_hide);

 	function _hide()
 	{
 		oPopup.hide();
 	}
};
/**
 * 修改角色
 */
yy.roleManage.modifyRole=function (){
	var aBtn=$('.j-mod-rol-btn');
	var oPopup=$('#j-role-popup');
 	var oYesBtn=oPopup.find('.yes');
 	var oCloseBtn=oPopup.find('.close-btn');
 	var oShadow=oPopup.find('.shadow');
 	var oInp=oPopup.find('input');
 	var oTitle=oPopup.find('.title');

	aBtn.click(function (){
 		oPopup.show();
 		oInp.focus();
 		oInp.val($(this).parent().find('span').html());
 		oTitle.html('修改角色');
 	});

 	oYesBtn.click(function (){
 		var str=oInp.val();
 		oPopup.hide();
 		// 数据提交到后台
 		alert('添加角色数据：'+str);
 	});

 	oShadow.click(_hide);
 	oCloseBtn.click(_hide);

 	function _hide()
 	{
 		oPopup.hide();
 	}
};
/*
 * 删除角色
 */
yy.roleManage.removeRole=function (){
	var aBtn=$('.j-del-role-btn');

	aBtn.each(function (index){
		var roleName=$(this).parent().find('span').html();
		var sTitle='删除客服';
		var sMessage='确定删除 '+roleName+' 吗？删除该技能组的客服将回到分组前状态';

		yy.public.confirm($(this), sTitle, sMessage, function (){
			alert('删除角色'+index);
		});
	});
};

/**
 * 向组里添加用户
 */
yy.roleManage._addGroupUser=function (){
	var aBtn=$('#j-manage-role-popup dt');
	// 得到groupId
	var nGroupId=$('#j-manage-btn').attr('data-group-id');
	$('#j-manage-role-popup').mousedown(function (){
		return false;
	});
	// 标题展开收起
	aBtn.click(function (){
		var aDd=$(this).parent().find('dd');

		if ($(this).hasClass('open'))
		{
			// 收起
			$(this).removeClass('open');
			aDd.hide();
		}
		else
		{
			// 展开
			$(this).addClass('open');
			aDd.show();
		}
	});
	// 选中关联右侧列表
	var aDd=$('#j-manage-role-popup dd');
	var oUl=$('#j-manage-role-popup .right-list');

	// 把默认选中
	aDd.each(function (){
		if ($(this).attr('data-group-id') == nGroupId)
		{
			var oName=$(this).find('.name');
			var sName=oName.html();
			var nStaffId=oName.attr('data-staff-id');
			$(this).addClass('choose');
			$('<li data-staff-id="'+nStaffId+'">'+sName+'</li>').appendTo(oUl);
		}
	});
	oUl.children().click(function (){
		$(this).remove();
		aDd.has('.name:contains('+$(this).html()+')').removeClass('choose');
	});

	// 点左增右
	aDd.click(function (){
		var oName=$(this).find('.name');
		var sName=oName.html();

		if($(this).hasClass('choose'))
		{
			// 移除
			$(this).removeClass('choose');
			oUl.find('li:contains('+sName+')').remove();
		}
		else
		{
			// 添加
			var nStaffId=oName.attr('data-staff-id');
			$(this).addClass('choose');
			$('<li data-staff-id="'+nStaffId+'">'+sName+'</li>').appendTo(oUl);
		}
		oUl.children().click(function (){
			$(this).remove();
			aDd.has('.name:contains('+$(this).html()+')').removeClass('choose');
		});
	});

	// 确定，提交后台
	var oYesBtn=$('#j-manage-role-popup .yes');
	oYesBtn.click(function (){
		// 得到所有staffId
		var aStaffId=[];
		oUl.children().each(function (){
			aStaffId.push($(this).attr('data-staff-id'));
		});
		// 发送后台
		$.ajax({
			url:'',
			type:'POST',
			data:{"groupId":nGroupId, "staffId":aStaffId},
			success:function (data){
				var res=JSON.parse(data);
				if (res.err == 0)
				{
					// 成功，局部刷新
					yy.roleManage.getGroupUser(nGroupId);
				}
				else
				{
					alert(res.mes);
				}
			},
			error:function (){
				console.log('管理组成员请求错误');
			}
		});
	});
};
/*
 * 管理组成员
 */
yy.roleManage.manageRole=function (){
	var oBtn=$('#j-manage-btn');
	var oPopup=$('#j-manage-role-popup');
 	var oCloseBtn=oPopup.find('.close-btn');
 	var oShadow=oPopup.find('.shadow');
 	var oInp=oPopup.find('input');

 	oBtn.click(function (){
 		oPopup.show();
 		oInp.focus();
 		yy.roleManage._addGroupUser();
 	});

 	oShadow.click(_hide);
 	oCloseBtn.click(_hide);

 	function _hide()
 	{
 		oPopup.hide();
 	}
};

// 调用
yy.roleManage.tab();
yy.roleManage.addRole();
yy.roleManage.modifyRole();
yy.roleManage.removeRole();
yy.roleManage.manageRole();