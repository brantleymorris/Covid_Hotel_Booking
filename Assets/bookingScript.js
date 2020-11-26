var settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://hotels4.p.rapidapi.com/properties/get-hotel-photos?id=1178275040",
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "hotels4.p.rapidapi.com",
		"x-rapidapi-key": "SIGN-UP-FOR-KEY"
	}
}

$.ajax(settings).done(function (response) {
	console.log(response);
});


// var cityName;
// var getCity = function(cityName) {
//      var city = $("#city");
$.ajax(settings).then(function (response) {
	// console.log(url);
	// var suggestions_entitiesLength = response.suggestions[3].entities.length;
	// var hotelgroup_suggestions = response.suggestions[3];
	console.log(response);
	console.log(response.term);
	for(var i=0;i<response.suggestions[3].entities.length;i++){
		console.log(JSON.stringify(response.suggestions[3].entities[i].name));


	}




		// var city = $("#city");
	// var currentName = response.term;
	// var image = (`<img src="https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png">`);
	// h2El.append(`${currentName} ${image}`);
	// var result = response.main;
	// // Appending the values to the elements
	// city.append($("<p>").text(`Humidity:${result.humidity}%`));
	// city.append($("<p>").text(`Temperature:${result.temp}°F`));
	// city.append($("<p>").text(`Wind Speed:${response.wind.speed}MPH`));

});
// }
// $(".button").on("click", function (event) {
//     event.preventDefault();
//     var input_cityEl = $("#input_city").val();
//     getCity(input_cityEl);
// });
