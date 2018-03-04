var feedURL = "https://www.metaweather.com/api/location/44418/";

//----------- JQM ONLOAD ---------------- //
// JQuery Mobile pageloaded event listener
$(document).on('pageshow', '#pageone', initialise);

function initialise() {

    console.log("loaded");

    <!-- Use an HTML GET request to obtain data from an API  -->
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            <!-- parse the resulting JSON into Javascript Data Object -->
            <!-- you can use a live parser to inspect the contents of the JSON
            <!-- http://json.parser.online.fr/ -->

            var weather = JSON.parse(xmlhttp.responseText);

            //console.log(weather.title);
            // Print location
            $('#labelLocation').text("Location: " + weather.title);
            // Print date of first consolidated_weather element
            $('#labelDate').text("Date: " + weather.consolidated_weather[0].applicable_date);

            <!-- Define Ractive binding -->
            var ractive = new Ractive({
                el: 'container', <!-- where -->
                template: '#myTemplate', <!-- how -->
                data: {
                    weather: weather.consolidated_weather
                } <!-- what - specify the list of weather reports using dot notation-->
            });

            //$('#labelTest').text("Test Date: " + getDate());

        }
    };


    xmlhttp.open("GET", feedURL, true);
    xmlhttp.send();

}


// Get todays date
function getDate() {
    var today = new Date();   
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!

        var yyyy = today.getFullYear();    
    var formatedDate = yyyy + '/' + mm + '/' + dd;
    return formatedDate;
        //$('#caseDate').val(dd + '-' + mm + '-' + yyyy);    
}
