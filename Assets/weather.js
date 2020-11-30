
// method to get city name and give value of temp, humidity etc
var getCityWeather = function(input_cityEl) {
   var weatherCard=$("#weatherCard");
    yourKey = "0ac03fde2ce68a22887f1b9d8af1d003";
    // URL  for current weather
    queryURL1 = "https://api.openweathermap.org/data/2.5/weather?q=" + input_cityEl + "&appid=" + yourKey + "&units=imperial";
    // empty the city and containerforecast jumbostron so that the current will not concatenate with the older one
    // $("#weatherCard").empty();
    // ajax call
    $.ajax({
        url: queryURL1,
        method: "GET"
    }).then(function (response) {
        var currentName = response.name;
        var result = response.main;
        var h5El=$("<h5>");
        var image = (`<img src="https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png">`);
           weatherCard.append(h5El);
           h5El.append(`${currentName} Weather ${image}`);
           weatherCard.append($("<p>").text(`Humidity:${result.humidity}%`)); 
          weatherCard.append($("<p>").text(`Temperature:${result.temp}°F`));
          weatherCard.append($("<p>").text(`Wind Speed:${response.wind.speed}MPH`)); 
          });    
}

// Event Listener // main handler
$("#submitButton").on("click", function (event) {
    event.preventDefault();
    var input_cityEl = $("#search").val();
    getCityWeather(input_cityEl);
});

