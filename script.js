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
    let eastStatus = response.data.items[0].periods[0].regions.east
    let westStatus = response.data.items[0].periods[0].regions.west
    let northStatus = response.data.items[0].periods[0].regions.north
    let southStatus = response.data.items[0].periods[0].regions.south
    let centralStatus = response.data.items[0].periods[0].regions.central

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
        icon: "weather-icons/Fair.png"
      },
      b: {
        legend: "Fair & Warm",
        icon: "weather-icons/Fair-and-Warm.png"
      },
      c: {
        legend: "Partly Cloudy",
        icon: "weather-icons/Partly-Cloudy.png"
      },
      d: {
        legend: "Cloudy",
        icon: "weather-icons/Cloudy.png"
      },
      e: {
        legend: "Hazy",
        icon: "weather-icons/Hazy.png"
      },
      f: {
        legend: "Slightly Hazy",
        icon: "weather-icons/Slightly-Hazy.png"
      },
      g: {
        legend: "Windy",
        icon: "weather-icons/Windy.png"
      },
      h: {
        legend: "Mist",
        icon: "weather-icons/Mist.png"
      },
      i: {
        legend: "Light Rain",
        icon: "weather-icons/Light-Rain.png"
      },
      j: {
        legend: "Moderate Rain",
        icon: "weather-icons/Moderate-Rain.png"
      },
      k: {
        legend: "Heavy Rain",
        icon: "weather-icons/Heavy-Rain.png"
      },
      l: {
        legend: "Passing Showers",
        icons: "weather-icons/Passing-Showers.png"
      },
      m: {
        legend: "Light Shower",
        icon: "weather-icons/Light-Shower.png"
      },
      n: {
        legend: "Showers",
        icon: "weather-icons/Showers.png"
      },
      o: {
        legend: "Heavy Showers",
        icon: "weather-icons/Heavy-Showers.png"
      },
      p: {
        legend: "Thundery Showers",
        icon: "weather-icons/Thundery-Showers.png"
      },
      q: {
        legend: "Heavy Thundery Showers",
        icon: "weather-icons/Heavy-Thundery-Showers"
      },
      r: {
        legend: "Heavy Thundery Showers with Gusty Winds",
        icon: "weather-icons/Heavy-Thundery-Showers-with-Gusty-Winds"
      },
      s: {
        legend: "Fair (Day)",
        icon: "weather-icons/Fair.png"
      },
      t: {
        legend: "Partly Cloudy (Day)",
        icon: "weather-icons/Partly-Cloudy.png"
      },
      u: {
        legend: "Fair (Night)",
        icon: "weather-icons/Fair.png"
      },
      v: {
        legend: "Partly Cloudy (Night)",
        icon: "weather-icons/Partly-Cloudy.png"
      }

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

map.on('load', function() {

  let fullDate = checkDate();
  twentyfourHourForecast(fullDate);

});

function fetchDate() {
  let date = document.getElementById("date").value;
  let yearSlice = date.slice(0, 4);
  let monthSlice = date.slice(5, 7);
  let dateSlice = date.slice(8, 10);

  let currentDate = checkDate();
  let cYearSlice = currentDate.slice(0, 4);
  let cMonthSlice = currentDate.slice(5, 7);
  let cDateSlice = currentDate.slice(8, 10);

  if (cYearSlice < yearSlice || cMonthSlice < monthSlice || cDateSlice < dateSlice) {
    $('#staticBackdrop').modal("show");
  }
  
  else if (date == ""){
    document.getElementById("custom-modal-content").innerHTML = "Please enter a date.";
    $('#staticBackdrop').modal("show");
  }

  else {

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


}

function checkDate() {
  let currentDate = new Date();

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
  return fullDate;
}

function showSearchBar() {
  let dateChk = document.getElementById("searchDateChk").checked;
  if(dateChk == true){
    document.getElementById("date-input").style.display = "block";
  }
  else{
    document.getElementById("date-input").style.display = "none";
  }
}

function checkHumidityandTemp(fullDate) {
  axios.get(
    API_URL + "environment/24-hour-weather-forecast", {
      params: {
        "date": fullDate
      }

    }
  ).then(function(response) {

    let currentLowTemp = response.data.items[0].general.temperature.low;
    let currentHighTemp = response.data.items[0].general.temperature.high;
    let currentLowHum = response.data.items[0].general.relative_humidity.low;
    let currentHighHum = response.data.items[0].general.relative_humidity.high;

    document.getElementById("lowTemp").innerHTML = currentLowTemp + "°C";
    document.getElementById("highTemp").innerHTML = currentHighTemp + "°C";
    document.getElementById("lowHum").innerHTML = currentLowHum + "%";
    document.getElementById("highHum").innerHTML = currentHighHum + "%";

  })
}

checkHumidityandTemp(checkDate());

function tempStatusChk() {
  let tempChk = document.getElementById("temperatureChk").checked;
  if(tempChk == true){
    document.getElementById("temperature").style.display = "block";
  }
  else{
    document.getElementById("temperature").style.display = "none";
  }
}

function humStatusChk() {
  let humChk = document.getElementById("humidityChk").checked;
  if(humChk == true){
    document.getElementById("humidity").style.display = "block";
  }
  else{
    document.getElementById("humidity").style.display = "none";
  }
}
