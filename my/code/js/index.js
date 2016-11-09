// 张海瑞 - zhanghairui.com

hairui.index={};

/**
 * 头部效果
 */
hairui.index.showHideHeader=function (){
	var oHeader=$('header');
	var nHeaderH=oHeader.height();

	$(window).scroll(function (ev){
		var nScrollTop=document.documentElement.scrollTop || document.body.scrollTop;
		
		if (nScrollTop > 20)
		{
			moveHeader({'top':'-'+nHeaderH+'px', 'opacity':0});
		}
		else
		{
			moveHeader({'top':0, 'opacity':1});
		}
		
		function moveHeader(target)
		{
			oHeader.stop().animate(target, {
				'duration':200,
				'easing':'easeInOutBounce'
			});
		}
	});
};

/**
 * 尾部透明效果
 */
hairui.index.opacityFooter=function (){
	var oBox=$('.foot-content');
	
	$(window).scroll(function (){
		var nMaxH=$(document).height();
		var nScrollTop=document.documentElement.scrollTop || document.body.scrollTop;
		var nClientH=document.documentElement.clientHeight;
		var nH=nScrollTop+nClientH;
	
		oBox.css({opacity:nH/nMaxH});
	});
};

/*---- 调用 ----*/
hairui.index.showHideHeader();
hairui.index.opacityFooter();




