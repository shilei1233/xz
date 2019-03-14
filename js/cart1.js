$(function(){
	var $cart=
		$("#content-box-body");
	var $imgAll=
		$(".check-top>img,.foot>.base>.all img");
  function load(){
	  $.ajax({
		  type:"get",
		  url:"data/cart/getCart.php",
			  dataType:"json",
			  success:function(items){
			  var html="";
			  var sum=0;
			  var total=0;
			  var checkAll=true;
			  for(var {is_checked,iid,sm,lid,title,spec,price,count} of items){
				  if(is_checked==1){
					  sum+=parseInt(count);
					  total+=parseInt(count);
					  total+=price*count;
				  }else checkAll=false;
				  html+=`<div class="imfor">
					  </div>`;
			  }
			  var src=checkAll?
				  "img/cart/product_true.png":
				  "img/cart/product_normal.png";
			  $imgAll.attr("src",src);

			  $cart.html(html);
			  $(".total,.totalOne").html(sum);
			  $(".totalPrices,.foot-price")
				  .html("￥"+total.toFixed(2));

		  }
	  })
              <div class="check">
                <img src="img/cart/product_${is_checked==0?'normal.png':'true.png'}" data-iid="${iid}" alt="">
              </div>
              <div class="product">
                <a href="product_details.html?lid=${lid}" title="${title}">
                  <img src="${sm}" alt="">
                </a>
                <span class="desc">
                  <a href="product_details.html?lid=${lid}">${title}</a>
                </span>
                <p class="col">
                  <span>规格：</span>
                  <span class="color-desc">${spec}</span>
                </p>
              </div>
				 <div class="price">
                <p class="price-desc">阿甲专享价</p>
                <p>
                  <b>￥</b>${parseFloat(price).toFixed(2)}
                </p>
              </div>
              <div class="num" data-iid="${iid}">
                <span class="reduce">-</span>
                <input type="text" value="${count}">
                <span class="add">+</span>
              </div>
              <div class="total-price">
                <span>￥</span>
                <span>${(price*count).toFixed(2)}</span>
              </div>
              <div class="del">
                <a href="#" data-iid="${iid}">删除</a>
              </div>
            </div>`;
			  }
                   $cart.html(html);
		  }
	  })
  }
	  $.ajax({
		type:"get",
	    url:"data/users/islogin.phg",
		dataType:"json",
		success:function(res){
			if(res.ok==0){
				alert("请您先登录！");
				location.href=
					"login.html?back="+location.href
			}else load();
		}


})
       $cart
	   .on("click",".add,.reduce,.del>a,.check>img",function(){
		   var $tar=$(this);
		   if($tar.is(".add,.reduce")){
			   var count=parseInt($tar.siblings("input").val(
				   $tar.is(".add")?count++:count--；
				   var iid=$tar.parent().attr("data-iid");
			   $.ajax({
				   type:"get",
					   url:"data/cart/updateCart.php",
					   data:{iid,count},
					   success:function(){
					   load();
				   }
			   })
		   }
        $imgAll.click(function(){
			var $img=$(this);
			var checked=
				$img.attr("src").endsWith("normal.png")?1:0;
			$.ajax({
				type:"get",
				url:"data/cart/checkAll.php",
				data:{checked},
				success:function(){
					load();
				   }
			   })
		   }else if($tar.is(".check>img")){
				var iid=$tar.attr("data-iid");
				var checked=
					$tar.attr("src").endsWith("normal.png")?1:0;
				$.ajax({
					type:"get",
					url:"data/cart/check.php",
					data:{iid,checked},
					success:function(){
						load();
					}
				})
			   }
})
			   
			   var pname=$tar.parent().attr("title");
			   if(count!=0
			   ||count==0&&confirm("是否删除"+pname+"吗？")
			   var iid=$tar.parent().attr("data-iid");
			   $.ajax({
			   })
			   }
			   }else if($tar.is(".check>img")){
			   }else
			   e.preventDefault();
			   var pname=$tar.attr("title");
			   if(confirm("是否继续删除"+pname+"吗？")){
				   var iid=$tar.attr("data-iid");
				   $.ajax({
					   type:"get",
						   url:"data/cart/delete.php",
						   data:{iid},
						   success:function(){
						   load();
					   }
				   })
			   }
			   
			   
			   
			   
			  
 })