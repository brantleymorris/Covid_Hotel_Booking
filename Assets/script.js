$(".button1").on("click", function (event) {
    event.preventDefault();
    const settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://hotels-com-free.p.rapidapi.com/suggest/v1.7/json?query=San%20Francisco&locale=en_US",
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "796a68a262msh108500e56718027p13b834jsnd9c1d0fed544",
            "x-rapidapi-host": "hotels-com-free.p.rapidapi.com"
        }
    }
        $.ajax(settings).then(function (response) {
            console.log(response);
            result= response.suggestions[3].entities[0].destinationId;
            console.log(result);
            // result1= response.suggestions[3].entities[0].redirectPage;
            // console.log(result1);
           $("#default").text(result);

        //    Incomplete work
        // $.ajax(settings).then(function (response) {
        //     console.log(response);
        //     result= response.suggestions[3].entities[0].destinationId;
        //     console.log(result);
        //     // result1= response.suggestions[3].entities[0].redirectPage;
        //     // console.log(result1);
        //    $("#default").text(result);
        //    $("#default").
        })
    
//     http://api.tripadvisor.com/api/partner/2.0/location/155507?key=<YOUR KEY HERE>
 });

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