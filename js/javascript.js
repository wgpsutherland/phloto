function instagramPhotos (userName) {

	//removes the welcome text
	var element = document.getElementById("titleBox");
	element.parentNode.removeChild(element);

	// removes and adds the div so that only the current images are shown
	var element = document.getElementById("instafeed");
	element.parentNode.removeChild(element);
	$("#main").append("<div id='instafeed'></div>");

	$.ajax({ // converts the given username into the user id
    	type: "GET",
        dataType: "jsonp",
        cache: false,
        url: "https://api.instagram.com/v1/users/search?q="+userName+"&client_id=cde9b68da7084efb88cec85619580eb0",  
        success: function(data) {	

			var userId = data.data[0].id;

			$.ajax({ // gets the pictures from the users account using the user id
		    	type: "GET",
		        dataType: "jsonp",
		        cache: false,
		        url: "https://api.instagram.com/v1/users/"+userId+"/media/recent/?client_id=cde9b68da7084efb88cec85619580eb0",  
		        success: function(data) {

			        for (var i = 0; i < 20; i++) { // loops through the 20 latest images on the intagram feed

						$("#instafeed").append("<div class='instaframe smallImage' id='image"+i+"'><img class='instaimage' src='" + data.data[i].images.standard_resolution.url +"'/></div>");  
						$("#image"+i+"").append("<p class='likeCount'>"+data.data[i].likes.count+"</p>"); // inserts the like counts for each image
						$("#image"+i+"").append("<div id='heart'></div>"); // working on this heart css
			      	}
			      	
			      	var d = document.getElementById("image0");
					d.className = "instaframe bigImage"; // the first image in the feed is made larger
		        }
		    });
		}
    });
}

function takeUsername() {

	$('#usernameForm').submit(function(){

		var username = document.getElementById('userNameText').value;

		instagramPhotos(username);

		return false; // doesn't submit the form, so page doesn't reload - allowing this all to work
	});
}

$(document).ready(function() {

	takeUsername();
});


