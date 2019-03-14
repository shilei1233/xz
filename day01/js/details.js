//js/details.js
(function(){
	var lid=location.search.slice(5);
	ajax({
		type:"get",
		url:"data/products/getProductById.php",
		data:{lid},
		dataType:"json",
		success:function(output){
			var {product,specs,pics}=output;
			var div=document.getElementById("show-details");
			var {title,subtitle,price,promise}=product;
			div.children[0].innerHTML=title;
			div.children[1].children[0].innerHTML=subtitle;
			div.children[2].children[0].children[1]
				.innerHTML="¥"+parseFloat(price).toFixed(2);
			div.children[2].children[1].children[0]
				.innerHTML="服务承诺："+promise;

			var html="";
			for(var s of specs){
				var {lid,spec}=s;
				html+=`<a href="product_details.html?lid=${lid}" class="${lid==product.lid?'active':''}">${spec}</a>`
			}
			div.querySelector(".spec>div")
				 .innerHTML=html;
			
			var {lname,os,memory,resolution,video_card,cpu,video_memory,category,disk}=product;
			var html=`<li>
					<a href="javascript:;">商品名称：${lname}</a>
				</li>
				<li>
					<a href="javascript:;">系统：${os}</a>
				</li>
				<li>
					<a href="javascript:;">内存容量：${memory}</a>
				</li>
				<li>
					<a href="javascript:;">分辨率：${resolution}</a>
				</li>
				<li>
					<a href="javascript:;">显卡型号：${video_card}</a>
				</li>
				<li>
					<a href="javascript:;">处理器：${cpu}</a>
				</li>
				<li>
					<a href="javascript:;">显存容量：${video_memory}</a>
				</li>
				<li>
					<a href="javascript:;">分类：${category}</a>
				</li>
				<li>
					<a href="javascript:;">硬盘容量：${disk}</a>
			</li>`;
			document.querySelector("#param>ul")
							.innerHTML=html;

			//放大镜:
			var ulList=
				document.getElementById("icon_list");
			var html="";
			for(var p of pics){
				var {sm,md,lg}=p;
				html+=`<li class="i1"><img src="${sm}" data-md="${md}" data-lg="${lg}"></li>`;
			}
			ulList.innerHTML=html;
			var LIWIDTH=62;
			ulList.style.width=LIWIDTH*pics.length+"px";
			var mImg=document.getElementById("mImg");
			mImg.src=pics[0].md;
			var lgDiv=
					document.getElementById("largeDiv");
			lgDiv.style.backgroundImage=
				"url("+pics[0].lg+")";

			var moved=0,OFFSET=22;
			var aFor=
				document.getElementsByClassName("forward")[0];
			var aBack=
				document.getElementsByClassName("backward")[0];
			aFor.onclick=function(){
				if(aFor.className.indexOf("disabled")==-1){
					moved++;
					ulList.style.left=
						-LIWIDTH*moved+OFFSET+"px";
					aBack.className="backward";
					if(moved+5==pics.length)
						aFor.className="forward disabled";
				}
			}
			aBack.onclick=function(){
				if(aBack.className.indexOf("disabled")==-1){
					moved--;
					ulList.style.left=
						-LIWIDTH*moved+OFFSET+"px";
					aFor.className="forward";
					if(moved==0)
						aBack.className="backward disabled";
				}
			}

			ulList.onmouseover=function(e){
				if(e.target.nodeName==="IMG"){
					var img=e.target;
					var md=img.getAttribute("data-md");
					var lg=img.getAttribute("data-lg");
					mImg.src=md;
					lgDiv.style.backgroundImage=
						"url("+lg+")"
				}
			}

			var mask=document.getElementById("mask");
			var smask=
				document.getElementById("superMask");
			smask.onmouseover=function(){
				mask.style.display="block";
				lgDiv.style.display="block";
			}
			smask.onmouseout=function(){
				mask.style.display="none";
				lgDiv.style.display="none";
			}
			var MSIZE=175,SMSIZE=350;
			smask.onmousemove=function(e){
				var top=e.offsetY-MSIZE/2;
				var left=e.offsetX-MSIZE/2;
				//?
				//?
				mask.style.top=top+"px";
				mask.style.left=left+"px";
				//?
			}
		}
	})
})()