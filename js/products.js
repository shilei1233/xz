/*function loadPage(pageNo=1){         //js
  var search=location.search;//?kw=mac i7 356g
   if(search!=""){
   search=decodeURI(search.split("=")[1]);
   }
   var pageSize=9;
   var search=`pageNo=${pageNo}&pageSize=${pageSize}&kw=${search}`;
   ajax({
	   type:"get",
	   url:"data/products/getProductsByKw.php",
	   data:search,
	   dataType:"json"
   }).then(result=>{
	   var {pageNo,pageCount,data}=result;
	   var html="";
	   for(var p of data){
   html+=`<li>
            <a href="product_details.html?lid=${p.lid}">
              <img src="img/product/md/57b12a31N8f4f75a3.jpg" alt="">
            </a>
            <p>
              ¥<span class="price">${p.price}</span>
              <a href="product_details.html?lid=${p.lid}">${p.title}</a>
            </p>
            <div>
              <span class="reduce">-</span>
              <input type="text" value="1">
              <span class="add">+</span>
              <a href="javascript:;" class="addCart">加入购物车</a>
            </div>
          </li> `;
	   }
	   document.getElementById("show-list").
		   innerHTML=html;

	   html=` <a href="javascript:;" class=${pageNo=1?"previous disabled":"previous"}>上一页</a>`;
	   for(var i=1;i<=pageCount;i++){
	   html+=` <a href="javascript:;" class="current">${i}</a>`;
	   }
       html+=`<a href="javascript:;" class=${pageNo=pageCount?"next disabled":"next"}>下一页</a> `;
	   document.getElementById("pages").innerHTML=html;

   
	   
       //点击+ - 数量
       document.getElementById("show-list").onclick=e=>{
       var tar=e.target;
	   if(tar.className=="reduce"||tar.className=="add"){
       var input=tar.parentNode.children[1];
	   var n=parseInt(input.value);
	   if(tar.className==="add")
		   n++;
	   else if(n>1)
		   n--;
	   input.value=n;
	   }
	   }
   })
};*/

 

//jquery 商品列表
function loadPage(pageNo=1){
$(()=>{
	var search=location.search;
	if(search!=""){
    search=decodeURI(search.split("=")[1]);
	};
	var pageSize=9;
	$.ajax({	 
	url:"data/products/getProductsByKw.php",
    type:"get",
	data:`pageNo=${pageNo}&pageSize=${pageSize}&kw=${search}`,
	dataType:"json",
	success:function(result){
    var {pageNo,pageCount,data}=result;
	var html="";
	for(var p of data){
      html+=`<li>
            <a href="product_details.html?lid=${p.lid}">
              <img src="img/product/md/57b12a31N8f4f75a3.jpg" alt="">
            </a>
            <p>
              ¥<span class="price">${p.price}</span>
              <a href="product_details.html?lid=${p.lid}">${p.title}</a>
            </p>
            <div>
              <span class="reduce">-</span>
              <input type="text" value="1">
              <span class="add">+</span>
              <a href="javascript:;" data-lid="${p.lid}" class="addCart">加入购物车</a>
            </div>
          </li> `;
	}
	   $("#show-list").html(html);

	   html=` <a href="javascript:;" class=${pageNo=1?"previous disabled":"previous"}>上一页</a>`;
	   for(var i=1;i<=pageCount;i++){
	   html+=` <a href="javascript:;" class="current">${i}</a>`;
	   }
       html+=`<a href="javascript:;" class=${pageNo=pageCount?"next disabled":"next"}>下一页</a> `;
	   $("#pages").html(html);
      
	$("#show-list")
	.on("click",".reduce,.add",e=>{
    var $tar=$(e.target);
	var $input=$tar.parent().children(":eq(1)");
	var n=parseInt($input.val());
	if($tar.is(".add"))
		n++;
	else 
		n--;
	$input.val(n);
       })
    .on("click",".addCart",e=>{
       var $tar=$(e.target);
	   $.get("data/users/islogin.php")
		   .then(data=>{
		   //console.log(data.ok);
	   if(data.ok==0){
       location="login.html?back="+location.href;
	   }else{
	   var lid=$tar.attr("data-lid"),
		   count=$tar.prev().prev().val();
	   $.post("data/cart/addCart.php",{lid,count})
		   .then(loadCart())
		   $tar.prev().prev().val(1);
	   };
	   })
	   })
	}
	})
})
}
//购物车+-按钮
$(()=>{
$("#cart")
	.on("click",".reduce,.add",e=>{
var $tar=$(e.target);
var $input=$tar.parent().children(":eq(1)");
var count=$input.val();
if($tar.is(".add"))
	count++;
else
	count--;
    $input.val(count);
	var iid=$tar.parent().attr("data-iid");
    $.get("data/cart/updateCount.php",{iid,count})
	    .then(loadCart());
})
    $("#cart").on("click","p.title>a",()=>{
        $.get("data/cart/clearCart.php").then(()=>{
		loadCart();
		//history.go(0);
		//$(".cart_content").empty();
		});
})
});
  function loadCart(){
   $.get("data/users/islogin.php")
	   .then(data=>{
   if(data.ok==1){
      $.get("data/cart/getCart.php")
	   .then(data=>{
   var html="",total=0;
   for(var p of data){
   html+=`<div class="item">
              <span title=${p.title}>${p.title}</span>
              <div data-iid="${p.iid}">
                <span class="reduce">-</span>
                <input type="text" value="${p.count}">
                <span class="add">+</span>
              </div>
              <p>
                <span>￥${(p.price*p.count).toFixed(2)}</span>	
              </p>
            </div>`;
    total+=total+p.price*p.count;
   }
   $(".cart_content").html(html);
   $("#total").html(total.toFixed(2));
   })
   }
   })
   }

   $(()=>{
   loadPage();
   loadCart();
   });
//分页
$(()=>{
    var divPages=document.getElementById("pages");
		divPages.onclick=e=>{
       var tar=e.target;
	   if(tar.nodeName=="A"&&/previous|next|current/.test(tar.className)){
		   if(/previous/.test(tar.className)){
           var a=divPages.querySelectorAll(".current")[i-1];
		   i=parseInt(a.innerHTML)-1;
		   }else if(/next/.test(tar.className)){
		   var a=divPages.querySelectorAll(".current")[i-1];
		   i=parseInt(a.innerHTML)+1;
		   }else{
           i=parseInt(tar.innerHTML);
		   }
		   loadPage(i);
		   }
       }
});

