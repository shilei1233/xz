//js/products.js
(function(){
	var divPages=document.getElementById("pages");
	var ulList=document.getElementById("show-list");
	function load(pno=0){
	var kw=location.search.slice(4);
  ajax({
    type:"get",
		url:"data/products/getProductsByKw.php",
		data:{kw,pno},
		dataType:"json",
		success:function(output){
		var {products,pageCount,pno}=output;
		var html="";
		for(var p of products){
			var {lid,md,title,price}=p;
			html+=`<li>
            <a href="product-details.html?lid=${p.lid}">
              <img src="${md}" alt="">
            </a>
            <p>
              ¥<span class="price">${parseFloat(price).toFixed(2)}</span>
              <a href="product-details.html?lid=${p.lid}">${title}</a>
            </p>
            <div>
              <span class="reduce">-</span>
              <input type="text" value="1">
              <span class="add">+</span>
              <a href="javascript:;"data-lid="${lid} class="addCart">加入购物车</a>
            </div>
          </li> `
	}
			var ulList=document.getElementById("show-list");
			ul
            
			var html=` <a href="javascript:;" class="previous">上一页</a>
			for(var i=1;i<=pageCount;i++){
				if(i-1!=pno)
					html+=`<a href="javascript:;">${i}</a>`;
				else
					html+=`<a href="javascript:;" class="current">${i}</a>`;
			}
            html+=`<a href="javascript:;" class="next">下一页</a>`;
			var divPages=
				document.getElementById("pages");
			divPages.innerHTML=html;
            if(pno==0)
				divPages.children[0].className="previous disabled";
			if(pno==pageCount-1)
				divPages.lastElementChild.className="next disabled";
		
	}

  })
}
	load();
  	divPages.onclick=function(e){
		var tar=e.target;
		if(tar.nodeName==="A"
		  &&tar.className!=="current")
		  &&tar.className.indexOf("disabled")==-1){
			  if(tar.className.indexOf("previous")!=-1){
                var pno=divPages.querySelector(".current")
					            .innerHTML-1;
				load(pno-1);
			  }else if(tar.className.indexOf("next")!=-1){
                var pno=divPages.querySelector(".current")
					            .innerHTML-1;
				load(pno+1);
			  }else{
				  load(tar.innerHTML-1);
			  }
		  }
	}
	ulList.onclick=function(e){
    var tar=e.target;
	if(tar.className=="reduce"
	||tar.className=="add"){
		var input=tar.parentNode.children[1];
		var n=parseInt(
			tar.parentNode.children[1].value
			);
		if(tar.className=="add")
			n++;
		else if(n>1)
			n--;
		input.value=n;
	}
	}
})();