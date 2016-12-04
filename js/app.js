// key for NOAA
// Token: 'CisYEDcjXuEBcrDsHicYhyAVmpTGDjBt'

// Google Places API key
// AIzaSyA-zAlNCgElfIESK0chL5FG2AWaL6u5aiA

// 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?name=Seattle&key=AIzaSyA-zAlNCgElfIESK0chL5FG2AWaL6u5aiA'
//
// 'https://maps.googleapis.com/maps/api/place/textsearch/xml?query=scubashop+in+Seattle&key=AIzaSyA-zAlNCgElfIESK0chL5FG2AWaL6u5aiA' ?
// location = -33.8670522, 151.1957362 & radius = 500 & types = food & name =
//   harbour & key = YOUR_API_KEY


/////////////
//OPEN WEATHER API

// (function() {
//   'use strict';
//   const $xhr = $.ajax({
//     method: 'GET',
//     url: 'http://api.openweathermap.org/data/2.5/weather?q=Seattle&appid=9e9c8eb46706a6b46d17b3d70a7c3ae1',
//     dataType: 'json',
//     // headers: {
//     //   token: 'thisismytoken'
//     // }
//   });
//
//   $xhr.done((data) => {
//     if ($xhr.status !== 200) {
//       return;
//     }
//
//     console.log(data);
//     console.log('weather description: ' + data.weather[0].description);
//     console.log('wind speed: ' + data.wind.speed);
//   });
//
// })();


///////////////////
//Google Places

(function() {
  'use strict';
  const $xhr = $.ajax({
    method: 'GET',
    url: 'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/textsearch/json?query=scuba+shop+in+Seattle&key=AIzaSyA-zAlNCgElfIESK0chL5FG2AWaL6u5aiA',
    dataType: 'json',
    // headers: {
    //   token: 'thisismytoken'
    // }
  });

  $xhr.done((data) => {
    if ($xhr.status !== 200) {
      return;
    }

    console.log(data);
    // console.log('weather description: ' + data.weather[0].description);
    // console.log('wind speed: ' + data.wind.speed);
  });

})();



////////////////////
//NOAA
// (function() {
//   'use strict';
//
//   const $xhr = $.ajax({
//     url: 'http://www.ncdc.noaa.gov/cdo-web/api/v2/locations',
//     data: {
//       data
//     },
//     headers: {
//       token: 'CisYEDcjXuEBcrDsHicYhyAVmpTGDjBt'
//     }
//   });
//
//   // $.ajax({ url:<url>, data:{<data>}, headers:{ token:<token> } })
//
//   $xhr.done((data) => {
//     if ($xhr.status !== 200) {
//       return;
//     }
//
//     console.log(data);
//
//   });
// })();
