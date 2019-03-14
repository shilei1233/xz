/*(()=>{
ajax({
	type:"get",
	url:"header.html"
	}).then(html=>{
document.getElementById("header").innerHTML=html;
   var aSearch=document.querySelector("[data-trigger=search]");
   var txtSearch=document.getElementById("txtSearch");
   //
   aSearch.onclick=function(){
   if(txtSearch.value.trim()!=="")
    location.href="products.html?kw="+txtSearch.value.trim();
 //  alert(location);
   }

   txtSearch.onkeyup=e=>{
   if(e.keycode==13){
      aSearch.onclick();
      }
   }
   //地址栏与搜索框搜素子内容
   var search=location.search;//kw=mac i7 356g
   if(search!="")
	   txtSearch.value=decodeURI(search.split("=")[1]);
})
})()*/


$(()=>{
   $("#header").load("header.html",()=>{
   $(document.body).on("click","[data-trigger=search]",
   function(){
   var $img=$(this);
   var $txtSearch=$img.prev().prev();
   console.log($txtSearch.val().trim());
   if($txtSearch.val().trim()!=="")
   location.href="products.html?kw="+$txtSearch.val().trim();
   else
   location.href="products.html";
   });
   $(document.body).on("keyup","#txtSearch",
	   e=>{
   var $txtSearch=$(e.target);
   var $shelper=$("#shelper");
   //console.log($txtSearch.parent().children(".search-img"));
   if(e.keyCode==13){
	   $txtSearch.next().next().click();//模拟触发
   }else if(e.keyCode==38){
        if(!$shelper.is(":has(.focus)"))
		   $shelper.children().last().addClass("focus")
	   else if($shelper.children().first().is(".focus"))
		   $shelper.children().removeClass("focus")
		   .last().addClass("focus")
	   else
		   $shelper.children(".focus").removeClass("focus")
		   .prev().addClass("focus")
   $("#txtSearch").val($shelper.children(".focus").children().text());
   }else if(e.keyCode==40){
	   if(!$shelper.is(":has(.focus)"))
		   $shelper.children().first().addClass("focus")
	   else if($shelper.children().last().is(".focus"))
		   $shelper.children().removeClass("focus")
		   .first().addClass("focus")
	   else
		   $shelper.children(".focus").removeClass("focus")
		   .next().addClass("focus")
   $("#txtSearch").val($shelper.children(".focus").children().html());
   }else{
   $(".txtSearch").val($txtSearch.val().trim());
   $.get("data/products/autocomplete.php",{term:$txtSearch.val().trim()})
    .then(data=>{
   var html="";
   for(var p of data){
   html+=`<li>
              <div class="search-item" title="">${p.title}</div>
            </li>`;
   }
   $("#shelper").html(html);
   })
   }
   });
    //地址栏与搜索框搜素子内容
  var search=location.search;//kw=mac i7 356g
   if(search!="")
	   $("#txtSearch").val(decodeURI(search.split("=")[1]));
   //登陆状态
   function isLogin(){
   $.get("data/users/islogin.php")
	  .then(data=>{
   //data={ok:0};
  // data={ok:1,uname:"dingding"};
  //console.log(data);
  //console.log(data.uname);
   if(data.ok==0){
   $("[data-toggle=loginList]").show()
	   .next().hide();
   }else{
   $("[data-toggle=loginList]").hide()
	   .next().show().find("[data-name=uname]").html(data.uname);
       // console.log(data.uname);
   }
   })
   };
   isLogin();
   $(document.body).on("click","[data-toggle=loginList]>li:last-child>a",
   e=>{
   var $tar=$(e.target);
   location.href="login.html?back="+location.href;
   });
   $(document.body).on("click","[data-toggle=welcomeList]>li:last-child>a",
   e=>{
   $.get("data/users/signout.php")
	   .then(
	   isLogin()
	   //history.go(0)
	   //location.reload(true)
   );
   })
})
})










 
