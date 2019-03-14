//js/header.js
$(function(){
	var link=document.createElement("link");
	link.rel="stylesheet";
	link.href="css/header.css";
	document.head.appendChild(link);
	$("#header").load("header.html",function(html){
		document.getElementById("header")
						.innerHTML=html;
		var btnSearch=
			document.querySelector("[data-trigger=search]")
		var txtSearch=
			document.getElementById("txtSearch")
		btnSearch.onclick=function(){
			if(txtSearch.value.trim()!=="")
				location.href=
					"products.html?kw="+txtSearch.value.trim()
		}
		txtSearch.onkeydown=function(e){
			if(e.keyCode===13){
				btnSearch.onclick();
			}
		}
		
		if(location.search.indexOf("kw=")!=-1){
			var kw=decodeURI(location.search.slice(4))
			txtSearch.value=kw;
		}

		$.ajax({
			type:"get",
			url:"data/users/islogin.php",
			dataType:"json",
			success:function(res){
				if(res.ok==0)
					$("#loginList").show().next().hide();
				else{
					var uname=res.uname;
					$("#loginList").hide()
						.next().show()
						.find("#uname").html(uname);
				}
			} 
		})
		$("#welcomeList>li:last-child>a")
		.click(function(e){
			e.preventDefault();
			$.ajax({
				type:"get",
				url:"data/users/signout.php",
				success:function(){
					location.reload(true);
				}
			});
		})
		$("#loginList>li:last-child>a")
		.click(function(){
			location.href=
				"login.html?back="+location.href
		})
	})
});