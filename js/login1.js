$(function(){
  $("input:button").click(function(){
     $.ajax({
       type:"get",
	   url:"data/users/signin.php",
	   data:$("#login").serialize(),
	   success:function(res){
          if(res==="false"){
			  alert("用户名或密码错误！");
		  }else{	
			  alert("登录成功！");
			  var back=location.search.slice(6);//?uname=dingding&upwd=123456
			  location.href=back;
	   }
	   }
		 });
  })
})