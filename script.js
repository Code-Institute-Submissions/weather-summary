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

function twentyfourHourForecast(fullDate) {
  axios.get(
    API_URL + "environment/24-hour-weather-forecast", {
      params: {
        "date": fullDate
      }

    }
  ).then(function(response) {
    let eastStatus = response.data.items[0].periods[1].regions.east
    let westStatus = response.data.items[0].periods[1].regions.west
    let northStatus = response.data.items[0].periods[1].regions.north
    let southStatus = response.data.items[0].periods[1].regions.south
    let centralStatus = response.data.items[0].periods[1].regions.central

    let north = [103.82065830688276, 1.418685141058404];
    let south = [103.82065830688276, 1.3119420932638945];
    let east = [103.94030628661124, 1.3579348547204261];
    let west = [103.71525822143269, 1.3579348547204261];
    let central = [103.8198, 1.3579348547204261];

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

    let weatherLegends = {
      a: {
        legend: "Fair",
        icon: 'weather-icons/Fair.png'
      },
      b: {
        legend: "Fair & Warm",
        icon: 'weather-icons/Fair-and-Warm.png'

      },
      c: { legend: "Partly Cloudy" },
      d: { legend: "Cloudy" },
      e: { legend: "Hazy" },
      f: { legend: "Slightly Hazy" },
      g: { legend: "Windy" },
      h: { legend: "Mist" },
      i: { legend: "Light Rain" },
      j: { legend: "Moderate Rain" },
      k: { legend: "Heavy Rain" },
      l: { legend: "Passing Showers" },
      m: { legend: "Light Shower" },
      n: { legend: "Showers" },
      o: { legend: "Heavy Showers" },
      p: { legend: "Thundery Showers" },
      q: { legend: "Heavy Thundery Showers" },
      r: { legend: "Heavy Thundery Showers with Gusty Winds" }

    };

    function checkStatusNow(status) {
      var y;
      for (y in weatherLegends) {

        let legend = weatherLegends[y].legend;
        let icon = weatherLegends[y].icon;
        let legendIcon = [legend, icon];

        if (status == legend) {

          return legendIcon;
        }

      }
    };



    var x;
    let count = 1;
    
    for (x in dataPoints) {



      let status = dataPoints[x].status;
      let plot = dataPoints[x].plot;

      let checkStatus = checkStatusNow(status);
      
      
      if (status == checkStatus[0]) {

        var popup = new mapboxgl.Popup({ offset: 25 }).setText(
          status
        );

        let markerurl = "url" + "(" + checkStatus[1] + ")";

        // create DOM element for the marker
        var el = document.createElement('div');
        let id = "marker" + count;
        el.id = id;
        
        // create the marker
        new mapboxgl.Marker(el)
          .setLngLat(plot)
          .setPopup(popup) // sets a popup on this marker
          .addTo(map);

        document.getElementById(id).style.backgroundImage = markerurl;
        count = count + 1;
      }

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
  let currentDate = new Date();
  console.log(currentDate)

  let year = currentDate.getFullYear();
  let month = currentDate.getMonth() + 1;
  if (month < 10) {
    month = "0" + month
  }
  let date = currentDate.getDate();
  if (date < 10) {
    date = "0" + date
  }
  let fullDate = year + "-" + month + "-" + date;


  twentyfourHourForecast(fullDate);

});

function fetchDate() {
  let date = document.getElementById("date").value;
  console.log(date);
  
  var erase = document.getElementById("marker1");
  erase.parentNode.removeChild(erase);
  
  var erase = document.getElementById("marker2");
  erase.parentNode.removeChild(erase);
  
  var erase = document.getElementById("marker3");
  erase.parentNode.removeChild(erase);
  
  var erase = document.getElementById("marker4");
  erase.parentNode.removeChild(erase);
  
  var erase = document.getElementById("marker5");
  erase.parentNode.removeChild(erase);
  
  twentyfourHourForecast(date);
}
