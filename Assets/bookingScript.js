var hotelSuggestions = $("#suggested-hotels");

const hotelSettings = {
	"async": true,
	"crossDomain": true,
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "a94a55b6bbmsh2098aa9a74c64eap1cd01ejsn1958536b713c",
		"x-rapidapi-host": "hotels4.p.rapidapi.com",
	}
};

// var city = "Austin";

function getCityInfo (city) {
hotelSettings.url = "https://hotels4.p.rapidapi.com/locations/search?query=" + city + "&locale=en_US";

$.ajax(hotelSettings).done(function (response) {
	console.log(response);
	var suggestions = response.suggestions;
	var lon = response.suggestions[0].entities[0].longitude;
	console.log(lon);
	var lat = response.suggestions[0].entities[0].latitude;
	console.log(lat);

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
	
	// put covid and location api here
	var fccAPI = "https://geo.fcc.gov/api/census/area?lat=" + lat + "&lon=" + lon + "&format=json";

	$.ajax({
		url: fccAPI,
		method: "GET"
	}).done(function (response) {
		console.log(response);

		var county = response.results[0].county_name
		var state = response.results[0].state_name

		var stateParsed = "Blank";
		var states = [
			{name: "Alabama", code: "al"},
			{name: "Alaska", code: "ak"},
			{name: "Arizona", code: "az"},
			{name: "California", code: "ca"},
			{name: "Colorado", code: "co"},
			{name: "Connecticut", code: "ct"},
			{name: "Delaware", code: "de"},
			{name: "Florida", code: "fl"},
			{name: "Georgia", code: "ga"},
			{name: "Hawaii", code: "hi"},
			{name: "Idaho", code: "id"},
			{name: "Illinois", code: "il"},
			{name: "Indiana", code: "in"},
			{name: "Iowa", code: "ia"},
			{name: "Kansas", code: "ks"},
			{name: "Kentucky", code: "ky"},
			{name: "Louisiana", code: "la"},
			{name: "Maine", code: "me"},
			{name: "Maryland", code: "md"},
			{name: "Massachusetts", code: "ma"},
			{name: "Michigan", code: "mi"},
			{name: "Minnesota", code: "mn"},
			{name: "Mississippi", code:"ms" },
			{name: "Missouri", code: "mo"},
			{name: "Montana", code: "mt"},
			{name: "Nebraska", code: "ne"},
			{name: "Nevada", code: "nv"},
			{name: "New Hampshire", code: "nh"},
			{name: "New Jersey", code: "nj"},
			{name: "New Mexico", code: "nm"},
			{name: "New York", code: "ny"},
			{name: "North Carolina", code: "nc"},
			{name: "North Dakota", code: "nd"},
			{name: "Ohio", code: "oh"},
			{name: "Oklahoma", code: "ok"},
			{name: "Oregon", code: "or"},
			{name: "Pennsylvania", code: "pa"},
			{name: "Rhode Island", code: "ri"},
			{name: "South Carolina", code: "sc"},
			{name: "South Dakota", code: "sd"},
			{name: "Tennessee", code: "tn"},
			{name: "Texas", code: "tx"},
			{name: "Utah", code: "ut"},
			{name: "Vermont", code: "vt"},
			{name: "Virginia", code: "va"},
			{name: "Washington", code: "wa"},
			{name: "West Virginia", code: "wv"},
			{name: "Wisconsin", code: "wi"},
			{name: "Wyoming", code: "wy"}
		];

		for (let i = 0; i < states.length; i ++) {
			if ( states[i].name === state) {
				stateParsed = states[i].code
				console.log(stateParsed);
			}
		}

		var stateQueryURL = "https://api.covidtracking.com/v1/states/" + stateParsed + "/current.json";

		$.ajax({
			url: stateQueryURL,
			method: "GET"
		}).then(function(response) {
			console.log(response);

			var activeCases = response.positive;
			console.log("Active cases: " + activeCases);
			var newCases = response.positiveIncrease;
			console.log("New cases: " + newCases);

			var countyQueryURL = "https://corona.lmao.ninja/v3/covid-19/jhucsse/counties/" + county;

			$.ajax({
				url: countyQueryURL,
				method: "GET"
			}).then(function(response) {
				console.log(response);

				var confirmedCases = response[0].stats.confirmed;
				console.log("Confirmed cases: " + confirmedCases);
			});
		});
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

