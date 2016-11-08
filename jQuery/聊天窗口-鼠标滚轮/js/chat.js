// 聊天

/**
 * 自定义滚动条
 */
function scroll()
{
	var oBox=$('#j-chat-box');
	var oItem=$('#j-chat-item');
	var oScrollBox=$('#j-chat-scroll-box');
	var oScrollItem=$('#j-chat-scroll-item');
	oScrollBox.hide();
	var top=0;
	
	// 计算滑块高度
	var scale=oItem.height()/oBox.height();
	if(scale >= 1)
	{
		oScrollBox.show();
		var nScrollItemHeight=oScrollBox.height()/scale;
		(nScrollItemHeight<50) && (nScrollItemHeight=50);
		oScrollItem.css('height', nScrollItemHeight+'px');

		// 滑块能拖拽
		var nMaxTop=oScrollBox.height()-oScrollItem.height();
		var nMaxItemTop=oItem.height()-oBox.height();
		oScrollItem.mousedown(function (ev){
			var disY=ev.clientY-oScrollItem.position().top;

			$(document).bind('mousemove', move);
			$(document).bind('mouseup', up);

			function move(ev)
			{
				top=ev.clientY-disY;
				_setTop();

				return false;
			}

			function up()
			{
				$(document).unbind('mousemove', move);
				$(document).unbind('mouseup', up);
			}
		});

		// 加鼠标滚轮
		oBox.scroll(function (down){
			var speed=20;
			if (down)
			{
				top+=speed;
			}
			else
			{
				top-=speed;
			}

			_setTop();
		});

		// 页面加载完成，到最底部
		top=nMaxItemTop;
		_setTop();

		function _setTop()
		{
			// 左右联动
			if (top < 0)
			{
				top=0;
			}
			else if (top > nMaxTop)
			{
				top=nMaxTop;
			}
			oScrollItem.css('top', top+'px');
			var scale=top/nMaxTop;
			var nItemTop=-Math.floor(nMaxItemTop*scale);
			oItem.css('top', nItemTop+'px');
		}
	}
}

// 调用
scroll();
$(window).resize(scroll);