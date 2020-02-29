/* global mapboxgl */
/* global axios */


mapboxgl.accessToken = 'pk.eyJ1IjoiZXVnZW5ldGVvMTk4OCIsImEiOiJjazc2MnBrem4wYWo0M2VvenNzcmcxNHkwIn0.vTWAuusBOsObe6-hKtokBg';
let API_URL = "https://api.data.gov.sg/v1/"


var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [103.8198, 1.3521],
  zoom: 11
});

function twentyfourHourForecast(){
  axios.get(
      API_URL+"environment/24-hour-weather-forecast",{
        params:{
          "date":"2020-02-29"
        }
        
      }
    ).then(function(response){
    console.log("API Responded");
    console.log(response.data.api_info.status);
    
    let description = response.data.api_info.status
    
    forecastPopup(description);
    
  })
}

let coordinates = [103.8198, 1.3521];

map.on('click', function(e) {
  console.log("click")
  
})

map.on('load', function(){
  twentyfourHourForecast();
  
})

function forecastPopup(description){
  console.log(description)
  
  new mapboxgl.Popup()
  .setLngLat(coordinates)
  .setHTML(description)
  .addTo(map);
}