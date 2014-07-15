$(document).ready(function() {

	var nextPageUrl;
	var imageNum = 0;

	function displayInitialImages(userName) {

		var clientId = "cde9b68da7084efb88cec85619580eb0";

		$.ajax({ // converts the given username into the user id
	    	type: "GET",
	        dataType: "jsonp",
	        cache: false,
	        url: "https://api.instagram.com/v1/users/search?&client_id="+clientId,
	        data: {
	        	q: userName
	        },
	        success: function(data) {	

				getImages("https://api.instagram.com/v1/users/"+data.data[0].id+"/media/recent/?client_id="+clientId,imageNum);

				$("#main").append("<form id='loadMoreForm' class='buttonWrapper' action='' method='GET'><input type='submit' value='load more' name='loadInput' id='loadMoreButton'/></form>");
			}
	    });
	}

	function getImages(URL, imageNumber) {

		$.ajax({ // gets images 1-20
	    	type: "GET",
	        dataType: "jsonp",
	        cache: false,
	        url: URL,  
	        success: function(data) {        	

	        	nextTwenty(imageNumber, data);
	        	nextPageUrl = data.pagination.next_url;
	        	imageNum = imageNum + 20;
	        	document.getElementById("frame0").className = "imageFrame bigImage"; // the first image in the feed is made larger
	    	}
	    });
	}

	function nextTwenty(start, data) {

		for (var i = 0; i < 20; i++) { // loops through the 20 latest images on the instagram fee
			var id = (i+start);

			$("#instafeed").append("<div class='imageFrame smallImage' id='frame"+id+"'><div class='instaframe' id='image"+id+"'><img class='instaimage' src='" + data.data[i].images.standard_resolution.url +"'/></div></div>");  
			$("#image"+id+"").append("<p class='likeCount'>"+data.data[i].likes.count+"</p>"); // inserts the like counts for each image
			$("#image"+id+"").append("<div id='heart'></div>"); // working on this heart css
	  	}
	}

	$('#usernameForm').submit(function(){

		var username = document.getElementById('userNameText').value;

		document.getElementById("buttonID").value = "back";

		removeElements();

		displayInitialImages(username);

		$("#usernameForm").prepend("<div id='usernameDisplay'> // @ "+username.toLowerCase().split('').join(' ')+" //</div>"); // adds text of username searched to the header

		document.getElementById("usernameDisplay").style.height = document.getElementById('buttonID').offsetHeight + "px"; // makes the button and text the same height

		return false; // doesn't submit the form, so page doesn't reload - allowing this all to work
	});

	$(document).on("click", "#loadNextButton", function() { // this formatting as the element is created new

		getImages(nextPageUrl, imageNum);
	});

	$(document).on("submit", "#loadMoreForm", function() {

		getImages(nextPageUrl, imageNum);
		return false;
	})

	function removeElements() {

		var element = document.getElementById("titleBox"); 
		element.parentNode.removeChild(element); //removes the welcome text
		element = document.getElementById("userNameText"); 
		element.parentNode.removeChild(element); //removes the search bar text
	}
});