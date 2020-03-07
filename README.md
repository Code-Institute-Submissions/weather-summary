# Weather Summary

Weather Summary tracks the current weather forecast in Singapore! Thanks to the Weather API, users will be able to know the current and previous weather conditions. This application also shows the current temperature and humidity to let users decide what they would like to do for the day!

## Getting Started

You can find the deployed page here: 

No installation or account creation is needed. If you wish to run this file locally, you can clone or download this code by clicking on the “Clone or Download” button. 

To clone the repo, simply type in the following into your terminal :

`git clone https://github.com/eugeneteo88/weather-summary.git`

## UI/UX

The following picture is the wireframe for the weather map. The goal was to make it as simple and least cluttered as possible. It should allow users to find what they need in the least possible clicks.

![img](file:///C:/Users/Muhd%20Arif%20Bin%20Rawi/AppData/Local/Temp/msohtmlclip1/01/clip_image002.png)

## Technologies

HTML and CSS were used to develop the application. Bootstrap framework was used to enhance the overall look of the application. 

JavaScript was used to call up the API and to create the interactive front-end of the application.

NPM Script for AXIOS :

`<script src="https://unpkg.com/axios/dist/axios.min.js"></script>` 

AXIOS Boilerplate :

`axios.get().then(function(response) { });`

Mapbox was used rather than Google Maps for its simpler implementations. 

Mapbox CDN :

`<script src='https://api.mapbox.com/mapbox-gl-js/v1.8.0/mapbox-gl.js'></script> <link href='https://api.mapbox.com/mapbox-gl-js/v1.8.0/mapbox-gl.css' rel='stylesheet' />`

API used: 

`https://api.data.gov.sg/v1/environment/24-hour-weather-forecast`

## Features

The application is a one page application that showcases a map with icons indicating the current weather condition in Singapore. On the top-left section of the page, users can select options using the dropdown function. 

Clicking on the dropdown, users can check the following checkboxes: search date, temperature and humidity. Clicking on any of these would show the respective items. 

Search Date function allows user to check for previous weather conditions if they are keen. Temperature would reveal the current weather condition and humidity would reveal the current relative humidity. 

Icons on the map are done with Mapbox markers and will change according to the weather condition. Clicking on it will trigger a pop-up to appear indicating the marker's name. 

## Testing

Testing was done manually without the help of any automated test program. It was done with the following test sheet: [Weather Map Test Sheet]()

## Issues and Future Implementation

There were several issues while implementing the API.

1. The API would not reflect the current weather properly. 
2. The API does not have forecast for the next day. 

Troubleshooting the issues would require more time. There is a high possibility that the wrong JSON path was called. 

As for future implementations, it would be beneficial if the weather application could show the forecast for the next day at the minimum. More parameters could be added to the application as well if an API is provided for it. 

## Deployment

Deployment was made using GitHub local deployment settings. 

This can be found under Project Repository > Settings > GitHub Pages

## Credits and Acknowledgements

The map is owned by Mapbox. 

Icons were made with the suggestion and help of a friend using PowerPoint and can be found here: [PowerPoint Icons]()

**This project was created for educational purposes only.**
