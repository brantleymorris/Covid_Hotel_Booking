// covid api - https://covidtracking.com/data/api - data by state
var state = "tx";
var covidQueryURL = "https://api.covidtracking.com/v1/states/" + state + "/current.json";

$.ajax({
    url: covidQueryURL,
    method: "GET"
}).then(function(response) {
    console.log(response);

    var activeCases = response.positive;
    console.log(activeCases);
    var newCases = response.positiveIncrease;
    console.log(newCases);
}); 

// covid api - https://corona.lmao.ninja/docs/ - data by county
var county = "Travis";
var queryURL = "https://corona.lmao.ninja/v3/covid-19/jhucsse/counties/" + county;

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response) {
    console.log(response);

    var confirmedCases = response[0].stats.confirmed;
    console.log(confirmedCases);
}); 