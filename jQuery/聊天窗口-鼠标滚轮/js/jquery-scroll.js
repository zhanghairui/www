
/**
 * 鼠标滚路插件
 */
$.fn.scroll=function (fn){
	this.each(function (index){
		var obj=this;

		if (window.navigator.userAgent.toLowerCase().indexOf('firefox') == -1)
		{
			// 非FF
			addEvent(obj, 'mousewheel', _wheel);
		}
		else
		{
			// FF
			addEvent(obj, 'DOMMouseScroll', _wheel);
		}
		
		function _wheel(ev)
		{
			var ev=ev || event;
			var down=false;

			if(ev.wheelDelta)
			{
				// down=ev.wheelDelta>0
				down=ev.wheelDelta>0 ? false : true;
			}
			else
			{
				down=ev.detail>0 ? true : false;
			}

			fn.call(this, down);
		}
	});


	function addEvent(obj, fnName, fn)
	{
		if (obj.addEventListener)
		{
			obj.addEventListener(fnName, fn, false);
		}
		else
		{
			obj.attachEvent('on'+fnName, fn);
		}
	}
};