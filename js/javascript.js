$(function(){

	$.ajax({
    	type: "GET",
        dataType: "jsonp",
        cache: false,
        url: "https://api.instagram.com/v1/users/43153969/media/recent/??access_token=222716143.cde9b68.04e77477b2fd4524a0d2a91fb170142f",
        success: function(data) {

	        for (var i = 0; i < 20; i++) {

				$("#instafeed").append("<div class='instaframe' id='image"+i+"'><img class='instaimage' src='" + data.data[i].images.standard_resolution.url +"'/></div>");  

				document.getElementById("image"+i+"").style.width = "25%";

				$("#image"+i+"").append("<p id='likeCount'>"+data.data[i].likes.count+"</p>");

	      	}

	      	document.getElementById("image0").style.width = "50%";
	      	//document.getElementById("image0").style.opacity = "0.5";
	      	//document.getElementById("likeCount").style.position = "absolute";
	      	//document.getElementById("likeCount").style.zindex = "10";
	      	//document.getElementById("likeCount").style.top = "0";
	      	//document.getElementById("likeCount").style.bottom = "0";
	      	//document.getElementById("likeCount").style.left = "0";
	      	//document.getElementById("likeCount").style.right = "0";
        }
    });
});