//js/products.js
(function(){
	var kw=location.search.slice(4);
	var pno=0;
	ajax({
		type:"get",
		url:"data/products/getProductsByKw.php",
		data:{kw,pno},
		dataType:"json",
		success:function(output){
			console.log(output);
		}
	})
})();