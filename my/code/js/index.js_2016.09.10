
$(function (){
	/**
	 * 页面滚动
	 */
	var oBox=$('.box');
	var oHeader=$('.header');
	var aThumbnail=$('.thumbnail');
	var timer=null;
	var n=0;
	
	$('#container').fullpage({
		navigation:true,
		anchors:['page1', 'page2'],
		afterRender:function (){
			oBox.delay(300).animate({
				opacity:1,
				top:0
			}, {
				duration:200
			});
		},
		afterLoad:function (anchor, index){
			if (index == 1)
			{
				oBox.animate({
					opacity:1,
					top:0
				}, {
					duration:200
				});
			}
			
			if (index == 2)
			{
				oHeader.animate({
					opacity:1
				}, {
					duration:200
				});
				
				clearInterval(timer);
				timer=setInterval(function (){
					aThumbnail.eq(n).animate({
						opacity:1,
						marginTop:0
					}, {
						complete:function (){
							n++;
							
							if (n == aThumbnail.length)
							{
								clearInterval(timer);
								n=0;
							}
						}
					});
				}, 50);
			}
		},
		onLeave:function (index){
			/*
			if (index == 1)
			{
				oBox.animate({
					opacity:0,
					top:'300px'
				}, {
					duration:200
				});
			}
			
			if (index == 2)
			{

				oHeader.animate({
					opacity:0
				}, {
					duration:200
				});
				// aThumbnail.css({opacity:0, marginTop:'60px'});
			}
			*/
		}
	});
});






