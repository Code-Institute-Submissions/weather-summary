/* global mapboxgl */

mapboxgl.accessToken = 'pk.eyJ1IjoiZXVnZW5ldGVvMTk4OCIsImEiOiJjazc2MnBrem4wYWo0M2VvenNzcmcxNHkwIn0.vTWAuusBOsObe6-hKtokBg';

var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [103.8198, 1.3521],
  zoom: 11
});