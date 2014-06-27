function instagramPhotos (userName) {

	$.ajax({ // converts the given username into the user id
    	type: "GET",
        dataType: "jsonp",
        cache: false,
        url: "https://api.instagram.com/v1/users/search?q="+userName+"&client_id=cde9b68da7084efb88cec85619580eb0",  
        success: function(data) {	

			var userId = data.data[0].id;

			getImages("https://api.instagram.com/v1/users/"+userId+"/media/recent/?client_id=cde9b68da7084efb88cec85619580eb0",0,5,0);
		}
    });
}

function getImages(URL, currentDepth, maxDepth, imageNum) {

	$.ajax({ // gets images 1-20
    	type: "GET",
        dataType: "jsonp",
        cache: false,
        url: URL,  
        success: function(data) {

        	nextTwenty(imageNum, data);

        	if(currentDepth!=maxDepth) {

        		getImages(data.pagination.next_url, currentDepth+1, maxDepth, imageNum+20);
        	}

        	document.getElementById("image0").className = "instaframe bigImage"; // the first image in the feed is made larger
    	}
    });
}

function nextTwenty(start, data) {

	for (var i = 0; i < 20; i++) { // loops through the 20 latest images on the instagram fee
		var id = (i+start);

		$("#instafeed").append("<div class='instaframe smallImage' id='image"+id+"'><img class='instaimage' src='" + data.data[i].images.standard_resolution.url +"'/></div>");  
		$("#image"+id+"").append("<p class='likeCount'>"+data.data[i].likes.count+"</p>"); // inserts the like counts for each image
		$("#image"+id+"").append("<div id='heart'></div>"); // working on this heart css
  	}
}

function onUsernameSubmit() {

	$('#usernameForm').submit(function(){

		var username = document.getElementById('userNameText').value;

		document.getElementById("buttonID").value = "back";

		removeElements();

		instagramPhotos(username);

		$("#usernameForm").prepend("<div id='usernameDisplay'> // @ "+username.toLowerCase().split('').join(' ')+" //</div>"); // adds text of username searched to the header

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

