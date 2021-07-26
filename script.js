//Declarations
var searchBar = document.querySelector("#searchBar")
var searchButton = document.querySelector("#searchButton")
var searchHistoryArray = {
cities: []
}
var searchHistory = JSON.parse(localStorage.getItem("searches"))
var historyDisplay = document.querySelector("#historyDisplay")
var weatherDiv = document.querySelector("#weatherDiv")


// creating display text for weather data
var dateClass = document.getElementsByClassName("dateClass")
var tempClass = document.getElementsByClassName("tempClass")
var windClass = document.getElementsByClassName("windClass")
var humidClass = document.getElementsByClassName("humidClass")
var iconClass = document.getElementsByClassName("icon")
var uvIndex = document.querySelector("#uvIndex")
var cityDisplay = document.querySelector("#cityDisplay")
// Creating variable for search history buttons
var historyButtons = document.getElementsByClassName("historyButton")
var uvSeverity = document.querySelector("#uvSeverity")


//createButtons();
createButtons();
//create click functionality for created buttons
window.onload = function() {
        var historyButtons = document.getElementsByClassName('historyButton');
        for(var i = 0; i < historyButtons.length; i++) {
            var historyButton = historyButtons[i];
            historyButton.onclick = function() {
                getApi(this.textContent)
            }
        }
    }


//search button and search functionality
searchButton.addEventListener("click", function (){
var search = searchBar.value
getApi(search)
saveSearch(search)
createSingleButton();

})

// function to save search to local storage
function saveSearch(searchItem) {
if (searchHistory !== null) {
searchHistory.cities.unshift(searchItem)
localStorage.setItem("searches", JSON.stringify(searchHistory))
}
else {
searchHistoryArray.cities.push(searchItem)
localStorage.setItem("searches", JSON.stringify(searchHistoryArray))
}
}
//function to generate search buttons upon loading the page
function createButtons() {
if (searchHistory !== null) {
for (var i = 0; i < searchHistory.cities.length; i++){
var buttonEl = document.createElement("button");
buttonEl.textContent = searchHistory.cities[i]
buttonEl.setAttribute("class", "btn btn-secondary btn-lg btn-block historyButton")
historyDisplay.append(buttonEl)
}
}
else {
return
}
}

//Main API function with weather app to get weather data, and utilize display functions to populate
function getApi(citySearch) {

  var requestUrl ="https://api.openweathermap.org/data/2.5/forecast?q=" + citySearch + "&units=imperial&appid=d351e52c636b12492f07bd98500999a4"


  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
    console.log(data)
    if (data.cod == 404) {
    alert("That is not a city name. Please check your spelling and try again.")
    return
    }
    var lat = data.city.coord.lat
    var long = data.city.coord.lon
    cityDisplay.textContent = data.city.name
    getSecondApi(lat,long)
    

  function getSecondApi(latitude, longitude) {

  var requestUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&exclude=hourly&units=imperial&appid=d351e52c636b12492f07bd98500999a4"

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data)
      
//Used initial API to get one call API data for lon and lat, then sent it through this API to get the data 
//now we will declare variables for all of the data we want
      for (var i = 0; i < 6; i++) {
     
      tempClass[i].textContent = "Temp: " + data.daily[i].temp.day + " °F"
      windClass[i].textContent = "Wind: " + data.daily[i].wind_speed + " MPH"
      humidClass[i].textContent = "Humidity: " + data.daily[i].humidity + "%"
      dateClass[i].textContent = moment.unix(data.daily[i].dt).format('LL')
      iconClass[i].setAttribute("src", "http://openweathermap.org/img/wn/" + data.daily[i].weather[0].icon +"@2x.png")
      }
      
      uvIndex.textContent = "UV Index: " + data.daily[0].uvi
      uvIndexSeverity(data.daily[0].uvi)
      weatherDiv.style.display = "block"
      
      
    });
  }

    });
}

function uvIndexSeverity(number){
if (number < 3){
uvSeverity.textContent = " (Favorable)"
uvSeverity.style.color = "blue"
}
if (2 < number < 6){
uvSeverity.textContent = " (Moderate)"
uvSeverity.style.color = "green"
}
if (7 < number){
uvSeverity.textContent = " (Severe)"
uvSeverity.style.color = "red"
}

}




function createSingleButton (){
var buttonEl = document.createElement("button");
buttonEl.textContent = searchHistory.cities[0]
buttonEl.setAttribute("class", "btn btn-secondary btn-lg btn-block historyButton")
historyDisplay.prepend(buttonEl)
buttonEl.onclick = function (){
getApi(buttonEl.textContent)
}
}





