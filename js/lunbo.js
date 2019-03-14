$(()=>{
$.ajax({
     url:"data/index/getCarousel.php",
     type:"get",
	 dataType:"json",
     success:function(data){
	 console.log(data);
	  var html="";
	  for(var p of data){
	  html+=`<li>
				  <a href="${p.href} title="${p.title}">
					<img src="${p.img}">
				  </a>
			 </li> `;
	  };
	  var moved=0,LIWIDTH=960,interval=500,wait=3000,timer=null;
      var $ulImgs=$("[data-load=bannerImgs]");
	  var $ulIdcs=$("[data-load=bannerInds]");
	  $ulImgs.html(html).css("width",960*data.length);
	  $ulIdcs.html("<li></li>".repeat(data.length))
		  .on("click","li",function(){
	          var $li=$(this);
			  moved=$li.index();
			  $ulImgs.animate({left:-moved*LIWIDTH},interval,function(){
			  $li.addClass("hover")
				  .siblings().removeClass("hover")
			  })
	  })
	  .children(":first-child").addClass("hover");
		function move(){
		moved++;
		$ulImgs.animate({left:-moved*LIWIDTH},interval,function(){
		if(moved==data.length){
			moved=0;
		$ulImgs.css("left",0);
		}
		$ulIdcs.children(":eq("+moved+")").addClass("hover")
		.siblings().removeClass("hover");
		})
		}
		function automove(){
		timer=setInterval(function(){
		move();
		},wait+interval)
		};
		automove();
        var $aLeft=$("[data-move=left]"),
			$aRight=$("[data-move=right]");
        $aRight.click(function(){
		if(!$ulImgs.is(":animated"))
			move();
		});
		$aLeft.click(function(){
		if(!$ulImgs.is(":animated")){
		if(moved==0){
		moved=data.length;
		$ulImgs.css("left",-LIWIDTH*moved);
		}
		moved--;
		$ulImgs.animate({left:-LIWIDTH*moved},interval,function(){
		$ulIdcs.children(":eq("+moved+")").addClass("hover")
			.siblings().removeClass("hover");
		})
		}
		})
	 }
})
})