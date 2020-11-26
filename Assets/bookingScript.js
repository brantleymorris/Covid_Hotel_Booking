var hotelSuggestions = $("#suggested-hotels");

const hotelSettings = {
	"async": true,
	"crossDomain": true,
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "d1b2086cbfmshc413b7cedb10ce8p18aa2ajsn8809ec199a93",
		"x-rapidapi-host": "hotels4.p.rapidapi.com",
	}
};

// var city = "Austin";

function getCityInfo (city) {
hotelSettings.url = "https://hotels4.p.rapidapi.com/locations/search?query=" + city + "&locale=en_US";

$.ajax(hotelSettings).done(function (response) {
	var suggestions = response.suggestions;

	var hotelGroups = suggestions.find(function (element) {
		return element.group === "HOTEL_GROUP"
	});

	if (hotelGroups && hotelGroups.entities.length === 0) return;

	var hotels = hotelGroups.entities.map(function (element) {
		return {
			caption: element.caption,
			name: element.name,
			id: element.destinationId
		}
	});

	// Determine layout size by number of hotels
	var layoutSize = 12;

	if(hotels.length == 2) {
		layoutSize = 6;
	} else if(hotels.length >= 3) {
		layoutSize = 4;
	}
	hotelSuggestions.empty();
	hotels.forEach(function (hotel) {
		hotelSettings.url = "https://hotels4.p.rapidapi.com/properties/get-hotel-photos?id=" + hotel.id;

		$.ajax(hotelSettings).done(function (response) {
			$("#container_destinations").attr("class", "hide");
			
			var hotelImages = response.hotelImages;

			console.log(hotel.name);
			var hotelImage = hotelImages[0].baseUrl.replace("{size}", "z");

		
			var cardWrapper = $("<div>").attr("class", "mdl-cell mdl-cell--" + layoutSize + "-col");
			var card = $("<div>").attr("class", "demo-card-wide mdl-card mdl-shadow--2dp");

			var titleWrapper = $("<div>").attr("class", "mdl-card__title").css("background-image", "url(" + hotelImage + ")");

			
			var title = $("<h2>").attr("class", "mdl-card__title-text").text(hotel.name);
			titleWrapper.append(title);

			var caption = $("<div>").attr("class", "mdl-card__supporting-text").text("Lorem ipsum dolor sit amet");

			card.append(titleWrapper, caption);
			cardWrapper.append(card);

			hotelSuggestions.append(cardWrapper);
		})
		.fail(function(failReason) {
			console.log(failReason);
		});
	})
})
.fail(function(failReason) {
	console.log(failReason);
});
}; // end of function

$("#submitButton").on("click", function(event) {
	event.preventDefault();
    var city = $("#search").val();                                                      

    getCityInfo(city);
})