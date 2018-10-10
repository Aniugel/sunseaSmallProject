$(document).ready(function(){
//宇宙特效
"use strict";
var canvas = document.getElementsByClassName('canvas')[0],
  ctx = canvas.getContext('2d'),
  w = canvas.width = window.innerWidth,
  h = canvas.height = window.innerHeight,

  hue = 236,//色调
  stars = [],
  count = 0,
  maxStars = 500;//星星数量

var canvas2 = document.createElement('canvas'),
  ctx2 = canvas2.getContext('2d');
canvas2.width = 100;
canvas2.height = 100;
var half = canvas2.width / 2,
  gradient2 = ctx2.createRadialGradient(half, half, 0, half, half, half);
gradient2.addColorStop(0.025, '#CCC');
gradient2.addColorStop(0.1, 'hsl(' + hue + ', 61%, 33%)');
gradient2.addColorStop(0.1, 'hsl(' + hue + ', 64%, 6%)');
gradient2.addColorStop(0.1, 'transparent');//外部的影

ctx2.fillStyle = gradient2;
ctx2.beginPath();
ctx2.arc(half, half, half, 0, Math.PI * 2);
ctx2.fill();

// End cache

function random(min, max) {
  if (arguments.length < 2) {
    max = min;
    min = 0;
  }

  if (min > max) {
    var hold = max;
    max = min;
    min = hold;
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function maxOrbit(x, y) {
  var max = Math.max(x, y),
    diameter = Math.round(Math.sqrt(max * max + max * max));
  return diameter / 2;
  //星星移动范围，值越大范围越小，
}

var Star = function() {

  this.orbitRadius = random(maxOrbit(w, h));
  this.radius = random(60, this.orbitRadius) / 8; 
  //星星大小
  this.orbitX = w / 2;
  this.orbitY = h / 2;
  this.timePassed = random(0, maxStars);
  this.speed = random(this.orbitRadius) / 500000; 
  //星星移动速度
  this.alpha = random(20, 10) / 10;

  count++;
  stars[count] = this;
}

Star.prototype.draw = function() {
  var x = Math.sin(this.timePassed) * this.orbitRadius + this.orbitX,
    y = Math.cos(this.timePassed) * this.orbitRadius + this.orbitY,
    twinkle = random(10);

  if (twinkle === 1 && this.alpha > 0) {
    this.alpha -= 0.05;
  } else if (twinkle === 2 && this.alpha < 1) {
    this.alpha += 0.05;
  }

  ctx.globalAlpha = this.alpha;
  ctx.drawImage(canvas2, x - this.radius / 2, y - this.radius / 2, this.radius, this.radius);
  this.timePassed += this.speed;
}

for (var i = 0; i < maxStars; i++) {
  new Star();
}

function animation() {
  ctx.globalCompositeOperation = 'source-over';
  ctx.globalAlpha = 0.5; //尾巴
  ctx.fillStyle = 'hsla(' + hue + ', 64%, 6%, 2)';
  ctx.fillRect(0, 0, w, h)

  ctx.globalCompositeOperation = 'lighter';
  for (var i = 1, l = stars.length; i < l; i++) {
    stars[i].draw();
  };

  window.requestAnimationFrame(animation);
}

animation();

//自己创建一个数据
var data = {
	letv:[
		{
			"ul":"#",
			"title":"Picture information1",
			"date":"2017.02.01日 11:30",
			"id":11,
			"name":"张三",
			"img":"img/01.png"
		},		
		{
			"ul":"#",
			"title":"Picture information2",
			"date":"2017.02.01日 11:30",
			"id":12,
			"name":"张三",
			"img":"img/02.png"
		},			
		{
			"ul":"#",
			"title":"Picture information3",
			"date":"2017.02.03日 11:30",
			"id":13,
			"img":" img/03.png"
		},
		{
			"ul":"#",
			"title":"Picture information4",
			"date":"2017.02.04日 11:30",
			"id":14,
			"img":" img/04.png"
		},
		{
			"ul":"#",
			"title":"Picture information5",
			"date":"2017.02.05日 11:30",
			"id":15,
			"img":" img/05.png"
		},
		{
			"ul":"#",
			"title":"Picture information6",
			"date":"2017.05.06日 11:30",
			"id":16,
			"img":" img/06.png"
		},
		{
			"ul":"#",
			"title":"Picture information7",
			"date":"2017.04.07日 11:30",
			"id":17,
			"img":" img/07.png"
			
		},
	
	]
}


//下面是获取可视区域的宽高 start
	var body = document.getElementsByTagName("body")[0];
	var numer = body.getBoundingClientRect();
	var getw = Math.floor(numer.width*0.88);
	var getH = Math.floor(numer.height*0.52);
    $(function(){
    	var box_ul=$(".box-con ul");
    	creatLi(data.letv,0)//根据数据生成li
    	function creatLi(newData,start){//根据数据生成li
    		var html='';
    		for(var i= start;i<newData.length;i++){
				html +='<li class=""><a href="javascript:;"></a>' 
		        html += '<img src="'+newData[i].img+'">'; 
		        //html += '<div style="opacity: 0; "></div>'; 
		        html += '<p class="b_tit"><span class="liPOpacity"></span>'; 
		        html += '<span class="tit">';
				html += '<span>'+newData[i].title+'</span>';
				html += '</span></p></li>' ; 		
			}
    		$(".list")[0].innerHTML = html;
    	}
       var prev=$(".prev")[0];
       var next=$(".next")[0];
       var box_li=$(".box-con li");
       //生成超出五个数量li位置和样式
		for(var i =5;i<box_li.length;i++){
			console.log(i);
			box_li.eq(i).stop().animate({
		      	width:Math.floor(getw*0.18),
		      	height:Math.floor(getH* 0.57),     	
		      	top:Math.floor(getH* 0.22),
		     	left:Math.floor(getw*0.82)
		    },500).css("z-index",10);
		}
		
	  //初始化位置
      box_li.eq(0).stop().animate({
      	width:Math.floor(getw*0.18),
      	height:Math.floor(getH* 0.57),     	
      	top:Math.floor(getH* 0.22),
     	left:0
      },500).css("z-index",20);
      box_li.eq(1).stop().animate({
      	width:Math.floor(getw* 0.24),
      	height:Math.floor(getH* 0.72),
      	left:Math.floor(getw*0.12),
      	top:Math.floor(getH* 0.14)
      },500).css("z-index",30);
      box_li.eq(2).stop().animate({//中间最大
        width:Math.floor(getw* 0.42),
        height:Math.floor(getH* 1),
        left:Math.floor(getw* 0.29),
        top:0
      },500).css("z-index",50);

     box_li.eq(3).stop().animate({
     	width:Math.floor(getw* 0.24),
      	height:Math.floor(getH* 0.72),
      	left:Math.floor(getw*0.66),
      	top:Math.floor(getH* 0.14)
     },500).css("z-index",30).next();

   box_li.eq(4).stop().animate({
   		width:Math.floor(getw*0.18),
      	height:Math.floor(getH* 0.57),     	
      	top:Math.floor(getH* 0.22),
     	left:Math.floor(getw*0.82)
	 },500).css("z-index",20);
   
  next.addEventListener('click',nextFun,false);
  prev.addEventListener('click',prevFun,false);
//timer= setInterval(nextFun,10000);
$(".box-con")[0].onmouseover = function(){
	clearInterval(timer);
};

$(".box-con")[0].onmouseout = function(){
	timer = setInterval(nextFun,10000);
};
  
  function nextFun(){//向右点击滑动
  	 box_li=$(".box-con li");
     box_li.eq(0).stop().animate({left:0},500,function(){
     	box_li.eq(0).css("left",Math.floor(getw*0.82)).css("z-index",10).appendTo(box_ul);
     });
     box_li.eq(1).stop().animate({
     	width:Math.floor(getw*0.18),
      	height:Math.floor(getH* 0.57),     	
      	top:Math.floor(getH* 0.22),
     	left:0
     },500).css("z-index",30);
     box_li.eq(2).stop().animate({
     	width:Math.floor(getw* 0.24),
      	height:Math.floor(getH* 0.72),
      	left:Math.floor(getw*0.12),
      	top:Math.floor(getH* 0.14)
     },500).css("z-index",30);

     box_li.eq(3).stop().animate({
     	width:Math.floor(getw* 0.42),
        height:Math.floor(getH* 1),
        left:Math.floor(getw* 0.29),
        top:0
    },500).css("z-index",50);
     box_li.eq(4).stop().animate({
     	width:Math.floor(getw* 0.24),
      	height:Math.floor(getH* 0.72),
      	left:Math.floor(getw*0.66),
      	top:Math.floor(getH* 0.14)
     },500).css("z-index",30);
     box_li.eq(5).stop().animate({
     	width:Math.floor(getw*0.18),
      	height:Math.floor(getH* 0.57),     	
      	top:Math.floor(getH* 0.22),
     	left:Math.floor(getw*0.82)
     }).css("z-index",20);
    
  };
  
  function prevFun(){ //向左滑动
  	box_li=$(".box-con li");
  	$(".box-con li:last").prependTo(box_ul).css("left",0).stop().animate({left:0},500);
     box_li.eq(4).stop().animate({//这是右边隐藏图片
     	width:Math.floor(getw*0.18),
      	height:Math.floor(getH* 0.57),     	
      	top:Math.floor(getH* 0.22),
     	left:Math.floor(getw*0.82)
     },500).css("z-index",10);
     
     box_li.eq(3).stop().animate({//这是第五张
      	width:Math.floor(getw*0.18),
      	height:Math.floor(getH* 0.57),     	
      	top:Math.floor(getH* 0.22),
     	left:Math.floor(getw*0.82)
     },500).css("z-index",20);
     
     box_li.eq(2).stop().animate({//这是第四张
     	width:Math.floor(getw* 0.24),
      	height:Math.floor(getH* 0.72),
      	left:Math.floor(getw*0.66),
      	top:Math.floor(getH* 0.14)
     },500).css("z-index",30);
     
     box_li.eq(1).stop().animate({//这是第三张
     	width:Math.floor(getw* 0.42),
        height:Math.floor(getH* 1),
        left:Math.floor(getw* 0.29),
        top:0
     },500).css("z-index",50);
     box_li.eq(0).stop().animate({ //这是第二张
     	width:Math.floor(getw* 0.24),
      	height:Math.floor(getH* 0.72),
      	left:Math.floor(getw*0.12),
      	top:Math.floor(getH* 0.14)
     },500).css("z-index",30);

  };
// 封装一个弹出层；
var listA = $(".list li a");
console.log(listA);
for(var i = 0;i<listA.length;i++){
	listAclick(i);
}
function listAclick(i){
	listA[i].onclick = function(){
		console.log(i);
		letvIfraem(data.letv[i].ul);
	}
}
function letvIfraem(ul){
	
	var letv3D =  document.createElement("div");
	letv3D.className ="letvIframe";
	var body = document.getElementsByTagName("body")[0];
	body.appendChild(letv3D);
	letv3D.innerHTML ='<span class="letvclose cursor poA">退出</span><iframe src="'+ul+'" width="100%" height="100%"></iframe>';
	var letvclose = document.querySelector(".letvIframe .letvclose");
	//console.log(document.parentNode);
	//var quit3D = document.querySelector(".div3D .quit3D");
	//window.parent.document.querySelector(".div3D .quit3D").style.display ="none";//获取iframe父级的元素
	letvclose.onclick = function(){
		body.removeChild(letv3D);
//		window.parent.document.querySelector(".div3D .quit3D").style.display ="block";
	}
}
//滑动
isTouchDevice();
//touchstart事件
function touchSatrtFunc(evt) {
    try {
        //evt.preventDefault(); //阻止触摸时浏览器的缩放、滚动条滚动等
        var touch = evt.touches[0]; //获取第一个触点
        var x = Number(touch.pageX); //页面触点X坐标
        var y = Number(touch.pageY); //页面触点Y坐标
        //记录触点初始位置
        startX = x;
        startY = y;
 		touchchange = 0;
 		clearInterval(timer);
    } catch (e) {
        alert('touchSatrtFunc：' + e.message);
    }
}
//touchmove事件，这个事件无法获取坐标
var touchchange = 0;
function touchMoveFunc(evt) {
	touchchange = 0;
    try {
        //evt.preventDefault(); //阻止触摸时浏览器的缩放、滚动条滚动等
        var touch = evt.touches[0]; //获取第一个触点
        var x = Number(touch.pageX); //页面触点X坐标
        var y = Number(touch.pageY); //页面触点Y坐标
        
         console.log(x-startX);
        if (x - startX > 70) {
        	touchchange = 1;
        	console.log("向you");
        	
        } else if(x - startX < -70){
        	 console.log("向zuo");
        	 touchchange = 2;
            //swipeLeft();//你自己的方法
        }
    } catch (e) {
//      alert('touchMoveFunc：' + e.message);
    }
}
//touchend事件
function touchEndFunc(evt) {
	timer = setInterval(nextFun,10000);
	if(touchchange === 2){
		nextFun();
	}else if(touchchange === 1){
		prevFun();
	}
    try {
        //evt.preventDefault(); //阻止触摸时浏览器的缩放、滚动条滚动等
    } catch (e) {
        alert('touchEndFunc：' + e.message);
    }
}
//绑定事件
function bindEvent(box) {
    box.addEventListener('touchstart', touchSatrtFunc, false);
    box.addEventListener('touchmove', touchMoveFunc, false);
    box.addEventListener('touchend', touchEndFunc, false);
}
//判断是否支持触摸事件
function isTouchDevice() {
        //document.getElementById("version").innerHTML = navigator.appVersion;
 
    try {
          document.createEvent("TouchEvent");
//        alert("支持TouchEvent事件！");
 
		var box = document.getElementsByClassName("list")[0];
          bindEvent(box); //绑定事件
    } catch (e) {
//      alert("不支持TouchEvent事件！" + e.message);
    }
}
 });
});
//--------------绚丽背景------------
function backgroundShaking(container, canvas, ambient, diffuse) {
	var t = {width: 1.5,height: 1.5,depth: 10,segments: 12,slices: 6,xRange: 0.8,yRange: 0.1,zRange: 1,ambient: "#000000",diffuse: "#ffffff",speed: 0.0002};
	var G = {count: 2,xyScalar: 1,zOffset: 100,ambient: ambient,diffuse: diffuse,speed: 0.001,gravity: 1200,dampening: 0.95,minLimit: 10,maxLimit: null,minDistance: 20,maxDistance: 400,autopilot: false,draw: false,bounds: CAV.Vector3.create(),step: CAV.Vector3.create(Math.randomInRange(0.2, 1), Math.randomInRange(0.2, 1), Math.randomInRange(0.2, 1))};
	var m = "canvas";
	var E = "svg";
	var x = {renderer: m};
	var i, n = Date.now();
	var L = CAV.Vector3.create();
	var k = CAV.Vector3.create();
	var z = document.getElementById(container);
	var w = document.getElementById(canvas);
	var D, I, h, q, y;
	var g;
	var r;
	function C() {
		F();
		p();
		s();
		B();
		v();
		K(z.offsetWidth, z.offsetHeight);
		o()
	}
	function F() {
		g = new CAV.CanvasRenderer();
		H(x.renderer)
	}
	function H(N) {
		if (D) {
			w.removeChild(D.element)
		}
		switch (N) {
			case m:
				D = g;
				break
		}
		D.setSize(z.offsetWidth, z.offsetHeight);
		w.appendChild(D.element)
	}
	function p() {
		I = new CAV.Scene()
	}
	function s() {
		I.remove(h);
		D.clear();
		q = new CAV.Plane(t.width * D.width, t.height * D.height, t.segments, t.slices);
		y = new CAV.Material(t.ambient, t.diffuse);
		h = new CAV.Mesh(q, y);
		I.add(h);
		var N, O;
		for (N = q.vertices.length - 1; N >= 0; N--) {
			O = q.vertices[N];
			O.anchor = CAV.Vector3.clone(O.position);
			O.step = CAV.Vector3.create(Math.randomInRange(0.2, 1), Math.randomInRange(0.2, 1), Math.randomInRange(0.2, 1));
			O.time = Math.randomInRange(0, Math.PIM2)
		}
	}
	function B() {
		var O, N;
		for (O = I.lights.length - 1; O >= 0; O--) {
			N = I.lights[O];
			I.remove(N)
		}
		D.clear();
		for (O = 0; O < G.count; O++) {
			N = new CAV.Light(G.ambient, G.diffuse);
			N.ambientHex = N.ambient.format();
			N.diffuseHex = N.diffuse.format();
			I.add(N);
			N.mass = Math.randomInRange(0.5, 1);
			N.velocity = CAV.Vector3.create();
			N.acceleration = CAV.Vector3.create();
			N.force = CAV.Vector3.create()
		}
	}
	function K(O, N) {
		D.setSize(O, N);
		CAV.Vector3.set(L, D.halfWidth, D.halfHeight);
		s()
	}
	function o() {
		i = Date.now() - n;
		u();
		M();
		requestAnimationFrame(o)
	}
	function u() {
		var Q, P, O, R, T, V, U, S = t.depth / 2;
		CAV.Vector3.copy(G.bounds, L);
		CAV.Vector3.multiplyScalar(G.bounds, G.xyScalar);
		CAV.Vector3.setZ(k, G.zOffset);
		for (R = I.lights.length - 1; R >= 0; R--) {
			T = I.lights[R];
			CAV.Vector3.setZ(T.position, G.zOffset);
			var N = Math.clamp(CAV.Vector3.distanceSquared(T.position, k), G.minDistance, G.maxDistance);
			var W = G.gravity * T.mass / N;
			CAV.Vector3.subtractVectors(T.force, k, T.position);
			CAV.Vector3.normalise(T.force);
			CAV.Vector3.multiplyScalar(T.force, W);
			CAV.Vector3.set(T.acceleration);
			CAV.Vector3.add(T.acceleration, T.force);
			CAV.Vector3.add(T.velocity, T.acceleration);
			CAV.Vector3.multiplyScalar(T.velocity, G.dampening);
			CAV.Vector3.limit(T.velocity, G.minLimit, G.maxLimit);
			CAV.Vector3.add(T.position, T.velocity)
		}
		for (V = q.vertices.length - 1; V >= 0; V--) {
			U = q.vertices[V];
			Q = Math.sin(U.time + U.step[0] * i * t.speed);
			P = Math.cos(U.time + U.step[1] * i * t.speed);
			O = Math.sin(U.time + U.step[2] * i * t.speed);
			CAV.Vector3.set(U.position, t.xRange * q.segmentWidth * Q, t.yRange * q.sliceHeight * P, t.zRange * S * O - S);
			CAV.Vector3.add(U.position, U.anchor)
		}
		q.dirty = true
	}
	function M() {
		D.render(I)
	}
	function J(O) {
		var Q, N, S = O;
		var P = function(T) {
			for (Q = 0, l = I.lights.length; Q < l; Q++) {
				N = I.lights[Q];
				N.ambient.set(T);
				N.ambientHex = N.ambient.format()
			}
		};
		var R = function(T) {
			for (Q = 0, l = I.lights.length; Q < l; Q++) {
				N = I.lights[Q];
				N.diffuse.set(T);
				N.diffuseHex = N.diffuse.format()
			}
		};
		return {set: function() {
			P(S[0]);
			R(S[1])
		}}
	}
	function v() {
		window.addEventListener("resize", j)
	}
	function A(N) {
		CAV.Vector3.set(k, N.x, D.height - N.y);
		CAV.Vector3.subtract(k, L)
	}
	function j(N) {
		K(z.offsetWidth, z.offsetHeight);
		M()
	}
	C();
} 




