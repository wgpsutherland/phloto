$(function(){

	$.ajax({
    	type: "GET",
        dataType: "jsonp",
        cache: false,
        url: "https://api.instagram.com/v1/users/43153969/media/recent/?client_id=cde9b68da7084efb88cec85619580eb0",  
        success: function(data) {

	        for (var i = 0; i < 20; i++) {

				$("#instafeed").append("<div class='instaframe smallImage' id='image"+i+"'><img class='instaimage' src='" + data.data[i].images.standard_resolution.url +"'/></div>");  


				$("#image"+i+"").append("<p class='likeCount'>"+data.data[i].likes.count+"</p>");
	      	}

	      	var d = document.getElementById("image0");
			d.className = "instaframe bigImage";
        }
    });
});




