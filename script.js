/* global google */
function initMap() {
  
  var singapore = {lat: 1.3521, lng: 103.8198};
  
  var map = new google.maps.Map(
      document.getElementById('map'), {zoom: 12, center: singapore});
      
  var marker = new google.maps.Marker({position: singapore, map: map});
}