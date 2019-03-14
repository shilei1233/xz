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
		   console.log(product);
		   console.log(specs);
		   console.log(pics);
}
})
})()