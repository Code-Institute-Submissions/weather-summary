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


map.on('click', function(e) {
  console.log("click")
  
})

function checkAPI(){
  axios.get(
      API_URL+"environment/24-hour-weather-forecast",{
        params:{
          "date":"2020-02-29"
        }
        
      }
    ).then(function(response){
    console.log("API Responded");
    console.log(response.data.api_info.status);
  })
}