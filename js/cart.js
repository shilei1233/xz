function loadCart(){
$.get("data/users/islogin.php").then(data=>{
     if(data.ok==0)
		 location="login.html?back="+location.href;
	 else{
	     $.get("data/cart/getCart.php").then(items=>{
		 var html="",total=0,count=0,checkAll=true;
		 for(var p of items){
		 html+=`<div class="imfor">
              <div class="check">
                <img data-iid=${p.iid} src="img/cart/${p.is_checked==1?'product_true.png':'product_normal.png'}" alt="">
              </div>
              <div class="product">
                <a href="#">
                  <img src="${p.sm}" alt="">
                </a>
                <span class="desc">
                  <a href="product_details.html?lid=${p.lid}">${p.title}</a>
                </span>
                <p class="col">
                  <span>规格：</span>
                  <span class="color-desc">${p.spec} </span>
                </p>
              </div>
              <div class="price">
                <p class="price-desc">阿甲专享价</p>
                <p>
                  <b>￥</b><b>${p.price}</b>
                </p>
              </div>
              <div class="num" data-iid="${p.iid}">
                <span class="reduce">&nbsp;-&nbsp;</span>
                <input type="text" value="${p.count}">
                <span class="add">&nbsp;+&nbsp;</span>
              </div>
              <div class="total-price">
                <span>￥</span>
                <span>${(p.price*p.count).toFixed(2)}</span>
              </div>
              <div class="del">
                <a href="#" data-iid="${p.iid}">删除</a>
              </div>
            </div>`;
		 if(p.is_checked==1){
		 total+=p.price*p.count;
		 count+=parseInt(p.count);
		 }else{
		 checkAll=false;
		 }
		 };
		   $("#content-box-body").html(html);
		   $(".total,.totalOne").html(count);
		   $(".totalPrices,.foot-price").html(total.toFixed(2));
		   if(checkAll)
		   $(".xz-check-box").addClass("checked");
		   else
		   $(".xz-check-box").removeClass("checked");
		 });
	 }
})
};
$(()=>{
   loadCart();
});
$("#content-box-body")
	.on("click",".reduce,.add",e=>{
   var $tar=$(e.target);
   var input=$tar.parent().children(":eq(1)");
   var count=parseInt(input.val());
   if($tar.is(".add"))
	   count++;
   else 
	   count--;
   input.val(count);
   var iid=$tar.parent().attr("data-iid");
   $.get("data/cart/updateCount.php",{iid,count}).then(loadCart());
})
   .on("click",".del>a",e=>{
   var $tar=$(e.target);
   var iid=$tar.attr("data-iid");
   var title=$tar.parent().parent().find(".product>.desc>a").html();
   if(confirm("是否确认删除"+title+"吗？"))
   $.post("data/cart/deleteItem.php",{iid}).then(loadCart());
   })
   .on("click",".imfor>.check>img",e=>{
   var $tar=$(e.target);
   var src=$tar.attr("src");
   var iid=$tar.attr("data-iid");
   if(src.endsWith("product_true.png"))
	   var is_checked=0;
   else
	   var is_checked=1;
   $.get("data/cart/checkItem.php",{iid,is_checked}).then(loadCart());
   })
   
   $(".xz-check-box").click(e=>{
   var check_all=$(e.target).is(".checked")?0:1;
   $.get("data/cart/checkAll.php",{check_all}).then(loadCart());
   })
   $(".foot>.base>a").click(e=>{
	   if(confirm("是否继续删除？"))
   $.get("data/cart/deleteCheck.php").then(loadCart());
   })
