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

function twentyfourHourForecast() {
  axios.get(
    API_URL + "environment/24-hour-weather-forecast", {
      params: {
        "date": "2020-02-29"
      }

    }
  ).then(function(response) {
    console.log("API Responded");
    console.log(response.data.api_info.status);

    let eastStatus = response.data.items[0].periods[1].regions.east
    let westStatus = response.data.items[0].periods[1].regions.west
    let northStatus = response.data.items[0].periods[1].regions.north
    let southStatus = response.data.items[0].periods[1].regions.south
    let centralStatus = response.data.items[0].periods[1].regions.central

    let north = [103.82065830688276, 1.418685141058404];
    let south = [103.82065830688276, 1.3119420932638945];
    let east = [103.71525822143269, 1.3579348547204261];
    let west = [103.71525822143269, 1.362396792939947];
    let central = [103.8198, 1.3521];

    let dataPoints = {
      north: {
        status: northStatus,
        plot: north
      },
      south: {
        status: southStatus,
        plot: south
      },
      east: {
        status: eastStatus,
        plot: east
      },
      west: {
        status: westStatus,
        plot: west
      },
      central: {
        status: centralStatus,
        plot: central
      }

    };
    
    var x;
    
    for (x in dataPoints) {
      console.log(dataPoints[x].status);
      console.log(dataPoints[x].plot);
    }

  })
}

let coordinates = [103.8198, 1.3521];

map.on('click', function(e) {
  console.log("click")
  console.log(e.lngLat.lng);
  console.log(e.lngLat.lat);

})

map.on('load', function() {
  twentyfourHourForecast();

});
