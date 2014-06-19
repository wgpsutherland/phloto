function instagramPhotos (userName) {

	// removes and adds the div so that only the current images are shown
	var element = document.getElementById("instafeed");
	element.parentNode.removeChild(element);
	$("#main").append("<div id='instafeed'></div>");

	// need to work on this so that multiple usernames are not shown
	$("#userHeader").append("// @ "+userName.split('').join(' ')+" //");

	// converts the given username into the user id
	$.ajax({
    	type: "GET",
        dataType: "jsonp",
        cache: false,
        url: "https://api.instagram.com/v1/users/search?q="+userName+"&client_id=cde9b68da7084efb88cec85619580eb0",  
        success: function(data) {	

			var userId = data.data[0].id;

			// gets the pictures from the users account using the user id
			$.ajax({
		    	type: "GET",
		        dataType: "jsonp",
		        cache: false,
		        url: "https://api.instagram.com/v1/users/"+userId+"/media/recent/?client_id=cde9b68da7084efb88cec85619580eb0",  
		        success: function(data) {

		        	// loops through the 20 latest images on the intagram feed
			        for (var i = 0; i < 20; i++) {

			        	// inserts the images to the page
						$("#instafeed").append("<div class='instaframe smallImage' id='image"+i+"'><img class='instaimage' src='" + data.data[i].images.standard_resolution.url +"'/></div>");  

						// inserts the like counts for each image
						$("#image"+i+"").append("<p class='likeCount'>"+data.data[i].likes.count+"</p>");

						// working on this heart css
						$("#image"+i+"").append("<div id='heart'></div>");
			      	}

			      	// the first image is made larger
			      	var d = document.getElementById("image0");
					d.className = "instaframe bigImage";

					console.log(data.data[0].likes.count);
		        }
		    });
		}
    });
}

function takeUsername() {

	$('#usernameInput').submit(function(){

		var username = document.getElementById('userNameText').value;

		instagramPhotos(username);

		return false;	
	});
}

$(document).ready(function() {

	takeUsername();

});


