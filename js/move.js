//版权 北京智能社©, 保留所有权利

window.onload=function(){
	var oH_u=document.getElementById('home_ul');
	var oLi=oH_u.getElementsByTagName('li');	
	var oDiv=document.getElementById('home_text1');
	
	for(var i=0;i<oLi.length;i++){
	oLi[i].onmouseover=function(){
		for(var i=0;i<oLi.length;i++){
			this.style.opacity='0';
			}
		}
	};
	
	for(var i=0;i<oLi.length;i++){
	oLi[i].onmouseout=function(){
		for(var i=0;i<oLi.length;i++){
			this.style.opacity='100';
			}
		}
	}
		
	oDiv.onclick=function(){
		var index=0;
		function xiaoshi(index){
  		move(oLi[index],{opacity:0,width:0},{time:700,fn:function(){
  	 		index+=1;
  	 		if(index==oLi.length){
  	 			return;
  	 		}
  	 		xiaoshi(index);
     }})
  }
  xiaoshi(0);
	}
};
 

function getStyle(obj,attr){
	return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj,false)[attr];
}
//time,fn	-->json
function move(obj,json,opational){
	
	var opational = opational || {};
	opational.time = opational.time || 300;
	opational.fn = opational.fn || null;
	opational.type = opational.type || 'ease-out';
	
	var start={};
	var dis={};
	for(var key in json){
		start[key]=parseInt(getStyle(obj,key));
		dis[key]=json[key]-start[key];
	}
	
	var count=Math.round(opational.time/30);
	var n=0;
	
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
		n++;
		
		for(var key in json){
			//办事
			switch(opational.type){
				case 'linear':
					var a = n/count;
					var cur=start[key]+dis[key]*a;
					break;
				case 'ease-in':
					var a=n/count;
					var cur=start[key]+dis[key]*a*a*a
					break;
				case 'ease-out':
					var a=1-n/count;
					var cur=start[key]+dis[key]*(1-a*a*a)
					break;	
			}			
			if(key=='opacity'){
				obj.style.opacity=cur;
				obj.style.filter='alpha(opacity:'+cur*100+')';
			}else{
				obj.style[key]=cur+'px';
				
			}	
		}
		
		if(n==count){
			clearInterval(obj.timer);
			opational.fn && opational.fn();
		}
	},30);
}	