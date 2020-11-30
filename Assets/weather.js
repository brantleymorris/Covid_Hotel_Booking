
// method to get city name and give value of temp, humidity etc
var getCityWeather = function(input_cityEl) {
    yourKey = "0ac03fde2ce68a22887f1b9d8af1d003";
    // URL  for current weather
    queryURL1 = "https://api.openweathermap.org/data/2.5/weather?q=" + input_cityEl + "&appid=" + yourKey + "&units=imperial";
    // empty the city and containerforecast jumbostron so that the current will not concatenate with the older one
    $("#weatherCard").empty();
    // ajax call
    $.ajax({
        url: queryURL1,
        method: "GET"
    }).then(function (response) {
        var currentName = response.name;
        var result = response.main;
        var h4El=$("<h4>");
        var image = (`<img src="https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png">`);
           var cardWeather = $("<div>").attr("class", "demo-card-event mdl-card mdl-shadow--2dp");
           var cardText = $("<div>").attr("class", "mdl-card__title mdl-card--expand");
           cardText.append(h4El);
           h4El.append(`${currentName}  ${image}`);
           cardText.append($("<div>").text(`Humidity:${result.humidity}%`)); 
           cardText.append($("<div>").text(`Temperature:${result.temp}°F`));
           cardText.append($("<div>").text(`Wind Speed:${response.wind.speed}MPH`)); 

           cardWeather.append(cardText);
           $("#weatherCard").append(cardWeather);
           $("#hotelWeatherCardContainer").append(weatherCard);

        //    $(document).ready(function(){
        //     $("button").click(function(){
        //       $("hotelWeatherCardContainer").toggle();
        //     });
          });
       
  
    
}


// Event Listener // main handler
$("#submitButton").on("click", function (event) {
    event.preventDefault();
    var input_cityEl = $("#search").val();
    getCityWeather(input_cityEl);
});

