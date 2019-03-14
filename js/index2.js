$(function(){
	$.get(
		"data/index/getIndexProducts.php",
		function(products){
			var html="";
			products.forEach((p,i)=>{
				var {title,details,href,pic,price}=p;
				if(i<3){
					html+=`<div>
						<div class="desc">
							<p class="name">${title}</p>
							<p class="details">${details}</p>
							<p class="price">¥${parseFloat(price).toFixed(2)}</p>
							<a href="${href}" class="view">查看详情</a>
						</div>
						<img src="${pic}">
					</div>`;
				}else{
					html+=`<div class="product">
						<img src="${pic}">
						<p class="name">${title}</p>
						<p class="price">¥${parseFloat(price).toFixed(2)}</p>
						<a href="${href}">查看详情</a>
					</div>`
				}
			})
			document.querySelector("#f1>.floor-content")
							.innerHTML=html;
			document.querySelector("#f2>.floor-content")
							.innerHTML=html;
			document.querySelector("#f3>.floor-content")
							.innerHTML=html;
			var $lift=$(".lift_list");
			var $f1=$("#f1");
			var $floors=$(".floor");
			$(window).scroll(function(){
				var scrollTop=$(window).scrollTop();
				if($f1.offset().top<scrollTop+innerHeight/2)
					$lift.parent().show();
				else
					$lift.parent().hide();

				$floors.each(function(i,f){
					var $f=$(f);
					if($f.offset().top<scrollTop+innerHeight/2){
						$lift.children(":eq("+i+")")
							.addClass("lift_item_on")
							.siblings()
							.removeClass("lift_item_on");
					}
				})
			})
			$lift.on("click","li",function(){
				var $li=$(this);
				var i=$li.index();
				var $fi=$($floors[i]);
				var offsetTop=$fi.offset().top;
				$("html,body").stop(true).animate({
					scrollTop:offsetTop-20
				},500)
			})
		},
		"json"
	)
});
//轮播
$(function(){
	var $ulImgs=$("[data-load=bannerImgs]");
	var $ulIdcs=$("[data-load=bannerInds]");
	var LIWIDTH=960,
		  interval=500,wait=3000,moved=0,timer=null;
	$.ajax({
		type:"get",
		url:"data/index/getCarousel.php",
		dataType:"json",
		success:function(products){
			var html="";
			for(var {href,img,title} of products){
				html+=`<li><a href="${href}" title="${title}">
						<img src="${img}">
				</a></li>`
			}
			html+=`<li><a href="${products[0].href}" 
				   title="${products[0].title}">
					<img src="${products[0].img}">
			</a></li>`;
			$ulImgs.html(html)
				.css("width",LIWIDTH*(products.length+1));
			$ulIdcs.html(
				"<li></li>".repeat(products.length))
			.on("click","li",function(){
				var $li=$(this);
				moved=$li.index();
				$ulImgs.stop(true).animate({
					left:-moved*LIWIDTH
				},interval,function(){
					$li.addClass("hover")
						.siblings().removeClass("hover")
				});
			})
			.children(":first-child")
			.addClass("hover");
			function move(){
				moved++;
				$ulImgs.animate({
					left:-moved*LIWIDTH
				},interval,function(){
					if(moved==products.length){
						moved=0;
						$ulImgs.css("left",0);
					}
					$ulIdcs.children(":eq("+moved+")")
						.addClass("hover")
						.siblings().removeClass("hover");
				})
			}
			function autoMove(){
				timer=setInterval(function(){
					move();//动画持续0.5s
				},wait+interval);//每隔3.5s
			}
			autoMove();
			$("#banner").hover(
				function(){
					clearInterval(timer);
					timer=null
				},
				function(){
					autoMove();		
				}
			);
			var $aLeft=$("[data-move=left]"),
					$aRight=$("[data-move=right]");
			$aRight.click(function(){
				if(!$ulImgs.is(":animated"))
					move();
			});
			$aLeft.click(function(){
				if(!$ulImgs.is(":animated")){
					if(moved==0){
						moved=products.length;
						$ulImgs.css("left",-LIWIDTH*moved);
					}
					moved--;
					$ulImgs.animate({
						left:-moved*LIWIDTH
					},interval,function(){
						$ulIdcs.children(":eq("+moved+")")
							.addClass("hover")
							.siblings().removeClass("hover");
					})
				}
			});
		}
	})
	
})