var hotelSuggestions = $("#suggested-hotels");
$("#hotelWeatherCardContainer").append(hotelSuggestions);
$("#hotelWeatherCardContainer").attr("class","hide");
const hotelSettings = {
	"async": true,
	"crossDomain": true,
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "fe41d0e134msh55d2cd6373f32ccp1c3111jsn2291e5088ca3",
		"x-rapidapi-host": "hotels4.p.rapidapi.com",
	}
};

function getCityInfo (city) {
hotelSettings.url = "https://hotels4.p.rapidapi.com/locations/search?query=" + city + "&locale=en_US";

$.ajax(hotelSettings).done(function (response) {
	console.log(response);
	var suggestions = response.suggestions;

	var lon = response.suggestions[0].entities[0].longitude;
	var lat = response.suggestions[0].entities[0].latitude;
	var fccAPI = "https://geo.fcc.gov/api/census/area?lat=" + lat + "&lon=" + lon + "&format=json";

	$.ajax({
		url: fccAPI,
		method: "GET"
	}).done(function (response) {
		$("#covid-data").empty();

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

			var activeCases = response.positive;

			var countyQueryURL = "https://corona.lmao.ninja/v3/covid-19/jhucsse/counties/" + county;

			$.ajax({
				url: countyQueryURL,
				method: "GET"
			}).then(function(response) {

				var confirmedCases = response[0].stats.confirmed;

				var covidTarget = $("#covid-data");
				var covidCard = $("<div>").attr("class", "mdl-card mdl-card--border");

				var covidTitleDiv = $("<div>").attr("class", "mdl-card__title mdl-shadow--4dp");
				var covidTitle = $("<h1>").attr("class", "mdl-card__title-text").text("Covid Data");
					
				var covidGrid = $("<div>").attr("class", "mdl-layout mdl-js-layout");
				var covidData = $("<div>").attr("class", "mdl-grid");

				var covidCountyData = $("<div>").attr("class", "mdl-cell mdl-cell--6-col mdl-shadow--4dp");
				var covidCountyTitle = $("<div>").attr("class", "mdl-card__title");
				var covidCountyTitleText = $("<h4>").attr("class", "mdl-card__title-text").text(county + " county data:");
				var countyActive = $("<body>").attr("class", "mdl-card__supporting-text").text("Confirmed cases: " + confirmedCases);
		
				var covidStateData = $("<div>").attr("class", "mdl-cell mdl-cell--6-col mdl-shadow--4dp");
				var covidStateTitle = $("<div>").attr("class", "mdl-card__title");
				var covidStateTitleText = $("<h4>").attr("class", "mdl-card__title-text").text(state + " data")
				var stateActive = $("<body>").attr("class", "mdl-card__supporting-text").text("Active cases: " + activeCases);

				covidCountyTitle.append(covidCountyTitleText);
				covidCountyData.append(covidCountyTitle, countyActive);

				covidStateTitle.append(covidStateTitleText);
				covidStateData.append(covidStateTitle, stateActive); 
		
				covidData.append(covidCountyData, covidStateData);
				covidGrid.append(covidData);
					
				covidTitleDiv.append(covidTitle);
				covidCard.append(covidTitleDiv, covidGrid)
				covidTarget.append(covidCard);
			});
		});
	});

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
 
			$("#hotelWeatherCardContainer").removeClass("hide");
			var hotelImages = response.hotelImages;

			console.log(hotel.name);
			var hotelImage = hotelImages[0].baseUrl.replace("{size}", "z");
			var cardWrapper = $("<div>").attr("class", "mdl-cell mdl-cell--" + layoutSize + "-col");
			var card = $("<div>").attr("class", "demo-card-wide mdl-card mdl-shadow--2dp");

			var titleWrapper = $("<div>").attr("class", "mdl-card__title").css("background-image", "url(" + hotelImage + ")");

			
			var title = $("<h2>").attr("class", "mdl-card__title-text").text(hotel.name);
			titleWrapper.append(title);
            card.append(titleWrapper);
			hotelSettings.url = "https://hotels4.p.rapidapi.com/properties/get-details?locale=en_US&currency=USD&checkOut=2020-01-15&adults1=1&checkIn=2020-01-08&id=" + hotel.id;

		$.ajax(hotelSettings).done(function (response) {
			console.log(response.data);
		// var arrayLength=response.data.body.amenities[0].listItems[3].listItems.length;
		// console.log(arrayLength);
    //   data.overview.overviewSections[0].content[0];
	for(var i=0;i<6;i++){
		var hotelDetails=(`* ${response.data.body.amenities[0].listItems[0].listItems[i]}`);
// var hotelDetails=JSON.stringify(response.data.body.amenities[0].listItems[i]);
	// response.data.body.amenities[0].listItems[0].listItem[i]

			var caption = $("<div>").attr("class", "mdl-card__supporting-text").text(hotelDetails);
			
			card.append(caption);
			cardWrapper.append(card);

			hotelSuggestions.append(cardWrapper);
		
	}
			
		})

		}).fail(function(failReason) {
			console.log(failReason);
		});
		
		
	})
})
.fail(function(failReason) {
	console.log(failReason);
});
};


$("#submitButton").on("click", function(event) {
	event.preventDefault();
    var city = $("#search").val();                                                      

    getCityInfo(city);
})

