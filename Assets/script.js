
    // gets data for the searched county
    function getData(county) {

        // covid api - https://corona.lmao.ninja/docs/ - data by county
        var countyQueryURL = "https://corona.lmao.ninja/v3/covid-19/jhucsse/counties/" + county;

        $.ajax({
            url: countyQueryURL,
            method: "GET"
        }).then(function(response) {
            console.log(response); // only logs first three responses

            // covid api - https://covidtracking.com/data/api - data by state
            var state = response[0].province; // logs correct, need to create array of objects to convert state to state code
            console.log(state);
            var stateParsed = "Not working";
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

            var confirmedCases = response[0].stats.confirmed;
            console.log("Confirmed cases: " + confirmedCases);

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
            }); 
        });
    }; // end of function

getData("Travis");

// eventListener to getData for county entered
$("#submitButton").on("click", function(event) {
    event.preventDefault();
    var county = $("#inputCity").val();                                                      
    console.log(county);
    getData(county);
});