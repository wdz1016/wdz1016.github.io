// JavaScript Document
/*
360度 = 2Pi弧度

n弧度 = n*180/Pi
*/

function a2d(n){
	return n*180/Math.PI	
}
function getDir(obj,ev){
	var x = ev.clientX - (obj.offsetLeft + obj.offsetWidth/2)
	var y = obj.offsetTop + obj.offsetHeight/2 - ev.clientY;
	
	//0 左边  1 下边 2 右边 3上边
	return Math.round((a2d(Math.atan2(y,x))+180)/90)%4;
}

window.onload = function(){
	var oUl = document.getElementById("ul1");
	var aLi = oUl.children;
	
	for(var i = 0; i < aLi.length; i++){
		lagou(aLi[i]);
	}
	
	
	function lagou(oDiv){
		oDiv.onmouseover = function(ev){
			
			var oFrom = ev.fromElement || ev.releatedTarget;
			
			if(oDiv.contains(oFrom)){
				return ;
			}
			
			var n = getDir(this,ev);
			var oSpan = this.children[0];
			switch(n){
				case 0:
					oSpan.style.left = "-150px";
					oSpan.style.top = "0";
					break;
				case 1:
					oSpan.style.left = "0";
					oSpan.style.top = "150px";
					break;
				case 2:
					oSpan.style.left = "150px";
					oSpan.style.top = "0";
					break;
				case 3:
					oSpan.style.left = "0";
					oSpan.style.top = "-150px";
					break;
			}	
			
			$(oSpan).stop().animate({left:0,top:0});
		};
	
		oDiv.onmouseout = function(ev){
			
			var oTo = ev.toElement || ev.releatedTarget;
			
			if(oDiv.contains(oTo)){
				return ;
			}
			
			var n = getDir(this,ev);
			var oSpan = this.children[0];
			switch(n){
				case 0:
					$(oSpan).stop().animate({left:"-150px",top:0});
					break;
				case 1:
					$(oSpan).stop().animate({left:0,top:"150px"});
					break;
				case 2:
					$(oSpan).stop().animate({left:"150px",top:0});
					break;
				case 3:
					$(oSpan).stop().animate({left:0,top:"-150px"});
					break;
			}	
			
			
		};	
	
	}
	
	
 
};