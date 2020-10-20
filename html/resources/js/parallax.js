/*
아래로 스크롤할때마다 100씩 위로
<div rate="100" limit="1" class="parallax">

아래로 스크롤할때마다 100씩 밑으로
<div rate="-100" limit="-1" class="parallax">

*/
function parallaxScrollHandler() {
	//if(_kglobal.mobile) return;
	if(_kglobal.parallax != null) _kglobal.parallax.scrollHandler();
	if(_kglobal.parallax != null) 	_kglobal.parallax.scrollHandler2();
}
function ParallaxTween(){
	//if(_kglobal.mobile) return;
	this.time = {min:0, sec:0, sec2:0}
	this._delay = false;
	this._wheelActive = false;
	this.scrollTop = 0;
	this.scrollIndex = 0;
	this._objs = [];

	this.init();
	this.init2();
}

ParallaxTween.prototype.init = function (){
	var _this = this;
	for(var i = 0;i<this._objs.length;i++){
		var obj = this._objs[i];
		obj.attr({"play":"false"});
		TweenMax.to(obj, 0, {alpha:0, ease:Sine.easeInOut});
	}
}
function pageLoadAnimation($tg, $sp){
	
	//객체의 자식들 트윈.
	var len = $tg.children().length;
	for(var i = 0;i<len;i++){
		var mc = $tg.children().eq(i);
		if($tg.hasClass("break")) continue;
		TweenMax.to(mc, 0, {alpha:0, y:50, ease:Sine.easeOut});
		var sp = $sp == null ? 0.4 + i*0.2 : 0;
		TweenMax.to(mc, sp, {delay:0.2*i + 0.2, alpha:1, y:0, ease:Sine.easeOut, onComplete:function ($tg){
			$tg.attr({"play":"true"});
		}, onCompleteParams:[$tg]});
	}

	//객체가 하나면 자식을 트윈시킨다.
	if(len == 1) pageLoadAnimation($tg.children());
}

ParallaxTween.prototype.scrollHandler = function (){
	if(this._objs.length == 0) return;
	var scrollTop = $(window).scrollTop();
	var top = scrollTop + window.innerHeight - 100;
	if(scrollTop == 0){
		for(var i = 0;i<this._objs.length;i++){
			var obj = this._objs[i];
			obj.attr({"play":"false"});
			TweenMax.to(obj, 0, {alpha:0, ease:Sine.easeInOut});
		}
	}

	for(var i = 0;i<this._objs.length;i++){
		var obj = this._objs[i];
		try{
			var obj_top = obj.offset().top;
		}catch(e){}
		var play = obj.attr("play");
		if(top > obj_top && top < top + window.innerHeight){
			if(play == "false"){
				obj.attr({"play":"true"});
				var sp = Math.random()*0.3 + 0.4;
				var delay = 0.3;
				var ty = 40;
				var alphas = 0;
				if(obj.hasClass("particleMotion")){
					globalParticleTween();
					TweenMax.to(obj, sp, {delay:delay, alpha:1,  ease:Sine.easeOut});
					continue;
				}
				TweenMax.to(obj, 0, {alpha:alphas,  ease:Sine.easeInOut});
				TweenMax.to(obj, sp, {delay:delay, alpha:1,  ease:Sine.easeOut});
				pageLoadAnimation(obj);
			}
		}
		
		if( obj_top > scrollTop+ window.innerHeight){
			obj.attr({"play":"false"});
			TweenMax.to(obj, 0, {alpha:0, ease:Sine.easeInOut});
		}
	}// end for
}

ParallaxTween.prototype.init2 = function (){
	var _this = this;
	_this.initParallax();
	_this.scrollHandler2();
}

ParallaxTween.prototype.initParallax = function (){
	var _this = this;
	var h = _kglobal.sh;
	this.scrollTop = $(window).scrollTop();
	var cont = $(".k-content");
	var len = cont.find(".parallax").length;
	
	for(var i = 0;i<len;i++){
		var tg = cont.find(".parallax").eq(i);
		var oTop = tg.offset().top;
		var ty = oTop - this.scrollTop - h*0.5;
		var Index = Math.ceil(oTop/100);
		tg.attr({"offsetTop":oTop, "Index":Index});
	}

	this.parallaxInit();
}

ParallaxTween.prototype.scrollHandler2 = function () {
	var scrollTop = $(window).scrollTop();
	var scrollIndex = Math.ceil(scrollTop/600);
	if(scrollIndex != this.scrollIndex){
		this.scrollIndex = scrollIndex;
	}
	this.parallax();
}

ParallaxTween.prototype.parallax = function () {
	if( $(".parallax").length == 0) return;
	var _this = _kglobal.parallax;
	var scrollTop = $(window).scrollTop();
	var cont = $(".k-content");
	var len = cont.find(".parallax").length;
	for(var i = 0;i<cont.length;i++){
		for(var j = 0;j<cont.eq(i).find(".parallax").length;j++){
			var tg = cont.eq(i).find(".parallax").eq(j);
			var scaleTween = tg.hasClass("scale") ? true : false;
			var randalphabool = tg.hasClass("randalpha") ? true : false;
			var randalpha = tg.hasClass("randalpha") ? Math.random()*1 : 0;
			var randSize = tg.hasClass("size") ? true : false;
			var oFirstTop = Number(cont.eq(i).find(".parallax").eq(j).attr("offsetTop"));
			var oTop = Number(tg.attr("offsetTop"));
			var Index = Number(tg.attr("Index"));
			var rate = Number(tg.attr("rate"));
            var limit = Number(tg.attr("limit"));
            var unlimit = tg.attr("unlimit");
			var unlimitNo = Number(tg.attr("unlimit"));
			var direction = tg.attr("direction");
			var directionNo = Number(tg.attr("directionNo"));
			var alphaNo = Number(tg.attr("alphaNo"));
            var alphaBool = tg.hasClass("alpha") ? true : false;
            var shRate = tg.attr("shRate") ? Number(tg.attr("shRate")) : 0;

			var mid = oFirstTop - scrollTop - _kglobal.sh * (0.6 + shRate);
			var tgIndex = Math.ceil(mid/100);
			var noIndex = tgIndex-limit;
			var ty = noIndex*rate;

			if(!alphaBool){
				alphaNo = 1;
			}else{
				alphaNo = 1-tgIndex*0.3;
			}
            if(unlimit == null || unlimit == undefined){
                if(limit < 0){
                    if(ty > 0) ty = 0;
                }else{
                    if(ty < 0) ty = 0;
                }
            }

			if(randSize){
				if(!$(".parallax.size").hasClass("active")){
					$(".parallax.size").addClass("active");
					setTimeout(function  () {
						var arr = [0,1];
						$(".parallax.size li").removeClass("x y");
						var randN = Math.floor(Math.random()*2);
						$(".parallax.size li").eq(arr[randN]).addClass("x");
						$(".parallax.size").removeClass("active");
						var arr = [0,1,2];
						var randN2 = Math.floor(Math.random()*3);
						$(".parallax .size2 li").eq(arr[randN2]).addClass("x");
						$(".parallax .size2").removeClass("active");
					}, 500);
				}
				continue;
			}


			var scale = 1;
			if(scaleTween && noIndex > 0){
				var mid = scrollTop;
				scale = 1+Math.abs(noIndex)/50;
				if(scale < 1) scale = 1;
			}

			tg.attr({"tgIndex":tgIndex, "noIndex":noIndex});
			
			if(randalphabool ){
				TweenMax.to(tg, 1, {alpha:randalpha-tgIndex*0.4,  ease:Sine.easeOut});
				//continue;
			}
			if(randalphabool) continue;

			if(direction == "x"){
				TweenMax.to(tg, 1, {x:ty, alpha:alphaNo, ease:Sine.easeOut});
			}else if(direction == "xy"){
				TweenMax.to(tg, 1, {x:ty*directionNo*0.5, y:ty*0.5, alpha:alphaNo, ease:Sine.easeOut});
			}else {
				TweenMax.to(tg, 1, {y:ty, scaleX:scale, scaleY:scale, alpha:alphaNo, ease:Sine.easeOut});
			}
			
			
		}
	}
}

ParallaxTween.prototype.parallaxInit = function () {
	//if(_kglobal.mobile) return;
	//console.log("----------------------parallaxInit----------------------");
	var scrollTop = -3000;
	var cont = $(".k-content");
	var len = cont.find(".parallax").length;
	var windowHalfPos = scrollTop + _kglobal.sh*5;
	for(var i = 0;i<cont.length;i++){
		for(var j = 0;j<cont.eq(i).find(".parallax").length;j++){
			var tg = cont.eq(i).find(".parallax").eq(j);
			var oTop = Number(tg.attr("offsetTop"));
			var rate = Number(tg.attr("rate"));
            var limit = Number(tg.attr("limit"));
			var mid = oTop - scrollTop - _kglobal.sh*0.5;
			var windowIndex = Math.ceil(windowHalfPos/100);
			var tgIndex = Math.ceil(mid/100);
			var ty = tgIndex*rate;
			//console.log(oTop, ty);
			//TweenMax.to(tg, 4, {y:ty,  ease:Sine.easeOut});
		}
	}

}

ParallaxTween.prototype.wheel = function (event) {
	var _this = _kglobal.parallax;
	if(_this.mouseWheelDelay() == true) return;
	
	if(!event) event = window.event;
	if(event.wheelDelta) {
		delta = event.wheelDelta/120;
		if (window.opera) delta = -delta;
	}else if(event.detail){
		delta = -event.detail/3;
	}
	_this._wheelActive = true;
	setTimeout(function (){
		_this._wheelActive = false;
	}, 1000);
	_this.loop(delta);
}

ParallaxTween.prototype.mouseWheelDelay = function () {
	if(this._delay == true){
		return true;
	}else{
		setTimeout(this.delay, 500);
		this._delay = true;
		return false;
	}
}

ParallaxTween.prototype.delay = function () {
	_kglobal.parallax._delay = false;
}

$(function (){
	if(AgentDetect.isMobile()){
		$(".root-pc").remove();
	}else{
		$(".root-mobile").remove();
	}
    _kglobal.parallax = new ParallaxTween();
	$(window).scroll(function(){
		parallaxScrollHandler();
	});
    
});




