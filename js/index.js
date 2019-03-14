(()=>{
ajax({
      type:"get",
      url:"data/index/getFloor1.php",
	  dataType:"json"
}).then(resData=>{
  var html="";
  for(var i=0;i<resData.length;i++){
	  var p=resData[i];
        html+=
          i<2?`<div>
          <div class="desc">
            <p class="name">${p.title}</p>
            <p class="details">${p.details}</p>
            <p class="price">${p.price}</p>
            <a href="${p.href}" class="view">查看详情</a>
          </div>
          <img src="${p.pic}">
        </div> `:
          i==2?`<div>
          <div class="desc">
            <p class="name">${p.title}</p>
            <p class="price">${p.price}</p>
            <a href="${p.href}" class="view">查看详情</a>
          </div>
          <img src="${p.pic}">
        </div> `:
		`<div class="product">
		    <img src="${p.pic}">
            <p class="name">${p.title}</p>
            <p class="price">${p.price}</p>
            <a href="${p.href}" class="view">查看详情</a>   
         </div>`;
        }
		document.querySelector("#f1 .floor-content").innerHTML=html;
        document.querySelector("#f2 .floor-content").innerHTML=html;
		document.querySelector("#f3 .floor-content").innerHTML=html;
})
})();

$(()=>{
  $(window).scroll(()=>{
  var scrollTop=document.documentElement.scrollTop
	          ||document.body.scrollTop;
      
  var offsetTop=$(".floor:first").offset().top;
  if(offsetTop<=scrollTop+innerHeight/2){
  $("#lift").show();
  }else{
  $("#lift").hide();
  }
  var $floors=$(".floor");
  for(var i=0;i<$floors.length;i++){
  var $f=$($floors[i]);
  if($f.offset().top>scrollTop+innerHeight/2){
    break;
    }
  }
 // console.log(i);
  $(`#lift>ul>li:eq(${i-1})`)
	  .addClass("lift_item_on")
	  .siblings().removeClass("lift_item_on")
  })


  $("#lift>ul").on("click","a.lift_btn",function(){
  var $a=$(this);
  var i=$a.parent().index();
  var offsetTop=$(`.floor:eq(${i})`).offset().top;
  $("html").animate(
	  {scrollTop:offsetTop-50},500	  
  )
  })
  //滚动显示搜索框
  $(()=>{
  $(window).scroll(()=>{
  var scrollTop=$(window).scrollTop();
  if(scrollTop>=41+385-34){
  $("#header-top").addClass("fixed_nav");
  // $("#header-top").clone(true).addClass("fixed_nav").appendTo(document.body)克隆搜索框追加到页面;
  }else{
  $("#header-top").removeClass("fixed_nav");
  }
  })
  })
})