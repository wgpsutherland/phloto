function instagramPhotos (userName) {

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
			      	
			      	document.getElementById("image0").className = "instaframe bigImage"; // the first image in the feed is made larger
		        }
		    });
		}
    });
}

function onUsernameSubmit() {

	$('#usernameForm').submit(function(){

		var username = document.getElementById('userNameText').value;

		document.getElementById("buttonID").value = "back";

		removeElements();

		instagramPhotos(username);

		$("#usernameForm").prepend("<div id='usernameDisplay'> // @ "+username.split('').join(' ')+" //</div>"); // adds text of username searched to the header

		document.getElementById("usernameDisplay").style.height = document.getElementById('buttonID').offsetHeight + "px"; // makes the button and text the same height

		return false; // doesn't submit the form, so page doesn't reload - allowing this all to work
	});
}

function removeElements() {

	var element = document.getElementById("titleBox"); element.parentNode.removeChild(element); //removes the welcome text
	var element = document.getElementById("userNameText"); element.parentNode.removeChild(element); //removes the search bar text
}

$(document).ready(function() {

	onUsernameSubmit();
});

