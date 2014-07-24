$(document).ready(function() {

	var nextPageUrl;
	var imageNum;

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

	        	imageNum = 0;

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

	$(document).on("submit", ".submitForm", function(e) {

		$("#searchWrapper-main").attr("id","searchWrapper-result");
		$("#usernameForm-main").attr("id","usernameForm-result");
		$("#buttonID-main").attr("id","buttonID-result");
		$("#userNameText-main").attr("id","userNameText-result");

		e.preventDefault(); // prevents the page from reloading when submitting the form

		var username = $(".userNameText").val();

		cleanSlate();

		displayInitialImages(username);

		$("#usernameForm").append("<div id='usernameDisplay'> // @ "+username.toLowerCase().split('').join(' ')+" //</div>"); // adds text of username searched to the header

		document.getElementById("usernameDisplay").style.height = document.getElementById('buttonID').offsetHeight + "px"; // makes the button and text the same height

	});

	$(document).on("submit", "#loadMoreForm", function(e) {

		e.preventDefault(); // prevents the page from reloading when submitting the form
		getImages(nextPageUrl, imageNum);
	})

	// removes results from previous search to allow for a new one
	function cleanSlate() {

		// removes the title if coming from the main page
		var title = document.getElementById("titleBox"); 
		if(title) {
			title.parentNode.removeChild(title); //removes the welcome text
		}

		// wipes the instafeed
		var instafeed = document.getElementById("instafeed");
		instafeed.parentNode.removeChild(instafeed);
		$("#main").append("<div id='instafeed'></div>");

		// removes the load button if not coming from the main page
		var loadButton = document.getElementById("loadMoreForm");
		if(loadButton) {
			loadButton.parentNode.removeChild(loadButton);
		}

		// removes the old username from the title if not coming from the main page
		var username = document.getElementById("usernameDisplay");
		if(username) {
			username.parentNode.removeChild(username);
		}
		
		//element = document.getElementById("userNameText"); 
		//element.parentNode.removeChild(element); //removes the search bar text
	}
});