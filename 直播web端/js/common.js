
/**
 * 命名空间
 */
var broadcast={};

/**
 * 全局空间
 */
broadcast.public={};

/**
 * 左侧导航效果
 * @author 张海瑞
 */
broadcast.public.leftNav=function (){
	// 收起
	var oBtn=$('#j-nav-switch');
	var oLi=oBtn.parent();
	var oUl=oLi.find('ul');
	var aLi=oUl.find('li');
	var nH=aLi.eq(0).height()*aLi.length;
	var bFlag=true;
	var duration=50; // 运动执行时间
	oBtn.click(function (){
		if (bFlag)
		{
			// 收起
			oLi.removeClass('open')
			oUl.stop().animate({'height':0}, {duration:duration});
		}
		else{
			// 展开
			oLi.addClass('open');
			oUl.stop().animate({'height':nH}), {duration:duration};
		}
		bFlag=!bFlag;
	});
	
	// 按钮点击后被选中
	var aBtn=$('#j-nav-list a');
	aBtn.click(function (){
		aBtn.removeClass('active');
		$(this).addClass('active');
	});
};

/**
 * 调用
 */
broadcast.public.leftNav();
