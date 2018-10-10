$(document).ready(function(){
//	首页第二版样式
	$('.twoBg ul li').mouseover(function(){
		$('.twoBg ul li').removeClass('on');
		$('.twoBg ul li button').removeClass('on');
		$('.twoBg ul li button a').removeClass('on');
		$(this).addClass('on');
		$(this).find('button').addClass('on');
		$(this).find('a').addClass('on');
	});
	$('.twoBg ul li').mouseleave(function(){
		$('.twoBg ul li').removeClass('on');
		$('.twoBg ul li button').removeClass('on');
		$('.twoBg ul li button a').removeClass('on');
	});
	//	首页第三版样式
$('.three li .cover').click(function(){

	if($('.slideDown').css('display')=='block'){
//			alert('ll')
		$('.three li span img').removeClass('on');
		$('.three li p').removeClass('on');
		$('.slideDown').stop().first().slideUp();
	}
	});
	$('.three li .cover').click(function(){
	if($('.slideDown').css('display')=='none'){
//		alert('kkk')
		$('.three li span img').removeClass('on');
		$('.three li p').removeClass('on');
		$(this).find('img').addClass('on');
		$(this).next('p').addClass('on');
		$('.slideDown').stop().slideDown();
	}
	});
});
