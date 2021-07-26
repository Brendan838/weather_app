//Declarations
var searchBar = document.querySelector("#searchBar")
var searchButton = document.querySelector("#searchButton")
var searchHistoryArray = {
cities: []
}
var searchHistory = JSON.parse(localStorage.getItem("searches"))
var historyDisplay = document.querySelector("#historyDisplay")



var temp = document.querySelector("#temp")
var wind = document.querySelector("#wind")
var humidity = document.querySelector("#humidity")
var localTime = document.querySelector("#localTime")



//createButtons();
createButtons()

//search button and search functionality
searchButton.addEventListener("click", function (){
var search = searchBar.value
saveSearch(search)
getApi(search)
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
buttonEl.setAttribute("class", "btn btn-secondary btn-lg btn-block")
historyDisplay.append(buttonEl)
}
}
else {
return
}
}


//functions for displaying weather

function displayWeatherMain(tempData, windData, humidityData) {
temp.textContent = tempData
wind.textContent = windData
humidity.textContent = humidityData
}

function displayWeatherCards(temp, wind, humidity) {
card.childNodes[1].textContent = temp
card.childNodes[2].textContent = wind
card.childNodes[3].textContent = humidity
}


//Main API function with weather app to get weather data, and utilize display functions to populate
var test = document.getElementsByClassName("test")

function testForEach() {

}


function getApi(citySearch) {

  var requestUrl ="https://api.openweathermap.org/data/2.5/forecast?q=" + citySearch + "&units=imperial&appid=d351e52c636b12492f07bd98500999a4"


  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
    //console.log(data)
  /*var cityTemp = data.list[0].main.temp
      var cityWind = data.list[0].wind.speed
      var cityHumid = data.list[0].main.humidity
    displayWeatherMain(cityTemp, cityWind, cityHumid)
  */
    var lat = data.city.coord.lat
    var long = data.city.coord.lon
    getSecondApi(lat,long)

  function getSecondApi(latitude, longitude) {

  var requestUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&exclude=hourly&appid=d351e52c636b12492f07bd98500999a4"

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data)
//Used initial API to get one call API data for lon and lat, then sent it through this API to get the data 
//now we will declare variables for all of the data we want
      var currentTime = moment.unix(data.current.dt).format('LLLL');
      var followingDay = moment.unix(data.daily[1].dt).format('LLLL');
      var day2 = moment.unix(data.daily[2].dt).format('LLLL');
      var day3 = moment.unix(data.daily[3].dt).format('LLLL');
      var day4 = moment.unix(data.daily[4].dt).format('LLLL')
      var day5 = moment.unix(data.daily[5].dt).format('LLLL');
      var day6 = moment.unix(data.daily[6].dt).format('LLLL');
    
      //Today's Time



      console.log(currentTime)
      console.log(followingDay) 
      console.log(day2)
      console.log(day3)
      console.log(day4) 
      console.log(day5)
      console.log(day6)
      console.log(time)
      
    });
  }

    });
}














