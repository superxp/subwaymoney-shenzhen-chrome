

var myidno = "myidno"; //地铁卡号
var my = 'myid'; //cookie name
var myacc="myacc";  //checkbox
var search = "search" //搜索超链接
var subWayGenerator = {

  searchUrl_: 'http://121.15.13.49:8080/sztnet/qryCard.do?cardno=',
  
  cardno : '',  
   
   
  validate: function(){
      this.cardno =  document.getElementById(myidno).value;
	  if(this.cardno.length!=9&&this.cardno.length!=12){
        alert("卡号必须是9位或12位");
        return false;
    }else{
	   return true;
	}
  
  },
  
  
  
  requestSubWay: function() {
    var req = new XMLHttpRequest();
	req.open("GET", this.searchUrl_+this.cardno, true);
    req.onload=this.datadeal.bind(this);
	req.send(null);
  },
  
  
  datadeal: function (e) {
    var text =  e.target.responseText;
	var idno = text.match('[0-9]{9}|[0-9]{11}');
	document.getElementById('idno').innerHTML=idno;
	var money = text.match('[0-9]{1,}\.[0-9]{2}元');
    document.getElementById('money').innerHTML=money;
  },
  
  
  

};

var cookier = {
    
	set: function(name,value){
	var Days = 30; 
    var exp = new Date(); 
    exp.setTime(exp.getTime() + Days*24*60*60*1000); 
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString(); 
	},
    
	getCookie: function(name){
	var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg))
        return unescape(arr[2]); 
    else 
        return null;  
	  
	},
    
	delCookie: function (name) 
    { 
    var exp = new Date(); 
    exp.setTime(exp.getTime() - 1); 
    var cval=this.getCookie(name); 
    if(cval!=null) 
        document.cookie= name + "="+cval+";expires="+exp.toGMTString(); 
    } ,

};


document.addEventListener('DOMContentLoaded', function () {
     

    if(cookier.getCookie(my)){
	  document.getElementById(myidno).value  = cookier.getCookie(my);
	  document.getElementById(myacc).checked = true;
	  if(subWayGenerator.validate()){
           subWayGenerator.requestSubWay();
	  }
	}
   
	var box = document.getElementById(myacc);
	box.onclick = function(){
	  if(box.checked){
	    if(subWayGenerator.validate()){
	    	    cookier.set(my,document.getElementById(myidno).value);
	    }
	  }else{
	    cookier.delCookie(my);
	  }
	  
	};
	
   var link = document.getElementById(search);
   link.onclick = function() {
      if(subWayGenerator.validate()){
	    	 subWayGenerator.requestSubWay();
	    }

      
   }


	
	
});
