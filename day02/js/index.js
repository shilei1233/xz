(function(){
	ajax({
		type:"get",
		url:"data/index/getIndexProducts.php",
		dataType:"json",
		success:function(products){
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
		}
	})
})()