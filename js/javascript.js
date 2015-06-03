$(function() {

	var nextPageUrl;
	var imageNum;
	var clientId = "cde9b68da7084efb88cec85619580eb0";

	$(document).on("submit", ".submitForm", function(e) {

		// changes the ids to activate the CSS animation from the main page to the photo page
		$("#searchWrapper-main").attr("id","searchWrapper-result");
		$("#usernameForm-main").attr("id","usernameForm-result");
		$("#buttonID-main").attr("id","buttonID-result");
		$("#userNameText-main").attr("id","userNameText-result");
		$("#title-main").attr("id","title-result");

		e.preventDefault(); // prevents the page from reloading when submitting the form
		cleanSlate();

		var username = $(".userNameText").val();
		displayInitialImages(username);
	});

	$(document).on("submit", "#loadMoreForm", function(e) {

		e.preventDefault(); // prevents the page from reloading when submitting the form
		getImages(nextPageUrl, imageNum);
	});

	function displayInitialImages(userName) {

		// converts the given username into the user id
		$.ajax({
	    	type: "GET",
	        dataType: "jsonp",
	        cache: false,
	        url: "https://api.instagram.com/v1/users/search",
	        data: {
				client_id: clientId,
	        	q: userName
	        },
	        success: function(response) {

	        	imageNum = 0;

				console.log(response);

				if(response.data.length > 0) {

					var userId = response.data[0].id;

					getImages("https://api.instagram.com/v1/users/" + userId + "/media/recent/", imageNum);

					var buttonString = "<form id='loadMoreForm' class='buttonWrapper' action='' method='GET'>"+
						"<button type='submit' value='load more' name='loadInput' id='loadMoreButton'>"+
						"<i class='fa fa-chevron-circle-down'>" +
						"</i>" +
						"</button>" +
						"</form>";

					$("#main").append(buttonString);

				} else {
					$("#instafeed").append("<h1 class='no-user'>This user does not exist.</h1>");
				}
			}
	    });
	}

	function getImages(URL, imageNumber) {

		$.ajax({
	    	type: "GET",
	        dataType: "jsonp",
	        cache: false,
	        url: URL,
			data: {
				client_id: clientId
			},
	        success: function(response) {
				var numImages = response.data.length;
	        	nextX(imageNumber, response, numImages);
	        	nextPageUrl = response.pagination.next_url;
	        	imageNum = imageNum + numImages;
				$("#frame0").removeClass("smallImage").addClass("bigImage"); // the first image in the feed is made larger
	    	}
	    });
	}

	function nextX(start, data, num) {

		for (var i = 0; i < num; i++) { // loops through the 20 latest images on the instagram feed
			var id = (i+start);
			var imageElementString = "<div class='imageFrame smallImage' id='frame"+id+"'>" +
				"<div class='instaframe' id='image"+id+"'>" +
				"<img class='instaimage' src='" + data.data[i].images.standard_resolution.url +"'/>" +
				"</div>" +
				"</div>";
			$("#instafeed").append(imageElementString);
			$("#image"+id).append("<p class='likeCount'>"+data.data[i].likes.count+"</p>"); // inserts the like counts for each image
	  	}
	}

	// removes results from previous search to allow for a new one
	function cleanSlate() {

		// removes the title if coming from the main page
		var titleBox = $('#titleBox');
		if(titleBox) { titleBox.remove(); }

		// removes the load button if not coming from the main page
		var loadMoreForm = $("#loadMoreForm");
		if(loadMoreForm) { loadMoreForm.remove(); }

		$("#instafeed").empty();
	}
});