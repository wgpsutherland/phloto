$(function(){

	$.ajax({
    	type: "GET",
        dataType: "jsonp",
        cache: false,
        url: "https://api.instagram.com/v1/users/43153969/media/recent/?client_id=cde9b68da7084efb88cec85619580eb0",  
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