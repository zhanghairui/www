
/**
 * 快速点击
 */
FastClick.attach(document.body);

/**
 * 调用JDK使用
 */
function connectWebViewJavascriptBridge(callback){
	if (window.WebViewJavascriptBridge) {
	    callback(WebViewJavascriptBridge)
	} else {
	    document.addEventListener('WebViewJavascriptBridgeReady', function(){
	        callback(WebViewJavascriptBridge)
	    }, false)
	}
}
/**
 * 统一修改右侧按钮为空
 */
connectWebViewJavascriptBridge(function(YonYouJSBridge){
	var data=JSON.stringify({
		'function':'navRightItemList',
		'parameters':{
			'title':document.getElementsByTagName('title')[0].innerHTML,
			'rightTitle':''
		}
	});

	YonYouJSBridge.init(function(message, responseCallback){});
	YonYouJSBridge.send(data, function(responseData){});
});

/**
 * 从地址栏里获取数据
 */
function getLocation(name)
{
	var arr=location.search.split('?')[1].split('&');

	for (var i=0; i<arr.length; i++)
	{
		var aTmp=arr[i].split('=');
		if (aTmp[0] == name)
		{
			return aTmp[1];
		}
	}

	return '';
}

/**
 * 通过localStorage设置用户名、用户头像、会议ID号
 */
function setMeetingData()
{
	var username=localStorage.getItem('meetingUsername');// 用户名
	var portrait=localStorage.getItem('meetingPortrait');// 头像
	var meetingId=localStorage.getItem('meetingId');// 会议ID

	$('#j-username').html(username);
	$('#j-portrait').attr('src', portrait);
	$('#j-meeting-id').html(meetingId);
}

/**
 * 获取cookie
function getCookie(c_name)
{
	if (document.cookie.length > 0)
	{
		c_start=document.cookie.indexOf(c_name + "=");
		if (c_start != -1)
		{ 
			c_start=c_start + c_name.length+1;
			c_end=document.cookie.indexOf(";",c_start);
			if (c_end==-1) c_end=document.cookie.length;
			return unescape(document.cookie.substring(c_start,c_end));
		} 
	}

	return '';
}
*/

/**
 * 设置cookie

function setCookie(c_name, value, expiredays)
{
	var exdate=new Date();
	exdate.setDate(exdate.getDate()+expiredays);
	document.cookie=c_name+ "=" +escape(value)+((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
}
*/

/**
 * 移除cookie
function removeCookie(name)
{
	setCookie(name, '', -1);
}
*/
