$(function(){
		$.ajax({
	    	type: "GET",
	        dataType: "jsonp",
	        cache: false,
	        url: "https://api.instagram.com/v1/users/43153969/media/recent/?access_token=222716143.cde9b68.04e77477b2fd4524a0d2a91fb170142f",
	        success: function(data) {
		        for (var i = 0; i < 20; i++) {
					$("#instafeed").append("<div class='instaframe'><a target='_blank' href='"+ data.data[i].link +"'><img class='instaimage' src='" + data.data[i].images.standard_resolution.url +"'/></a></div>");   
		      	}
	        }
	    });
});