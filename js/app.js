// `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=AIzaSyA-zAlNCgElfIESK0chL5FG2AWaL6u5aiA`

(function() {
  'use strict';
  let shops = [];
  let weatherCondition = [];
  let picture;

  const renderScubaShops = function() {

    $('#list').empty();

    for (const shop of shops) {
      const $col = $('<div>').addClass('col s12 m3');
      const $card = $('<div>').addClass('card hoverable');
      const $cardImage = $('<div>').addClass('card-image');
      const $image = $('<img>');
      const $span = $('<span>').addClass('card-title');
      $cardImage.append($image, $span);
      const $cardContent = $('<div>').addClass('card-content');
      const $paragraph1 = $('<p>');
      const $paragraph2 = $('<p>');
      const $link = $('<a>');
      const $cardAction = $('<div>').addClass('card-action');
      $cardAction.append($link);
      // <div class="card-action">
      //         <a href="#">This is a link</a>
      //       </div>

      $cardContent.append($paragraph2, $paragraph1);
      $card.append($cardImage, $cardContent, $cardAction);
      $col.append($card);

      // if (shop.image[0]) {
      //   $image.attr('src', shop.image[0]);
      // } else {
      //   $image.attr('alt', shop.name);
      // }
      // $link.attr('href', 'target="_blank"')
      $link.attr({
        href: 'http://www.google.com/search?q=Diving+Shop+' + shop.name,
        target: '_blank'
      });
      $link.text('Search in Google');
      $image.attr('src', 'diver.jpg');

      $span.text(shop.name);

      // $parahraph2.text('Rating: N/A');
      // else if (typeof Number(shop.rating) === 'number')
      $paragraph2.text('Rating: ' + shop.rating);

      $paragraph1.text('Address: ' + shop.address);

      $('#list').append($col);
    }
  };

  // const getPhotoReference = function(ref) {
  //
  //   const $xhr = $.ajax({
  //     method: 'GET',
  //     url: `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${ref}&key=AIzaSyBDdRrZWsRngLGE8i3A1nsfqqap8pzb8FQ`,
  //     dataType: 'json'
  //   });
  //
  //   $xhr.done((data) => {
  //     picture = data;
  //     console.log(picture);
  //
  //   });
  //
  //   $xhr.fail((err) => {
  //     console.error(err);
  //   });
  // };

  const getScubaShops = function(enteredCity) {
    shops = [];

    const $xhr = $.ajax({
      method: 'GET',
      url: `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/textsearch/json?query=scuba+shop+in+${enteredCity}&key=AIzaSyAKruc2E9J1WgBr2NCWHM0bm0tCr1N_Z38`,
      dataType: 'json'
    });

    $xhr.done((data) => {
      const results = data.results;

      for (const result of results) {
        // if (result.photos) {
        //   getPhotoReference(result.photos[0].photo_reference);
        // }

        const shop = {
          address: result.formatted_address,
          name: result.name,
          rating: result.rating,
          icon: result.icon,
          image: picture

          // for (const photo of result.photos) {
          //   image = photo.photo_reference;
          // }
        };
        // if (result.photos) {
        //   shop.image = result.photos[0].html_attributions;
        // }
        shops.push(shop);
      }

      console.log(shops);

      renderScubaShops(enteredCity);
    });

    $xhr.fail((err) => {
      console.error(err);
    });
  };

  const renderWeatherConditions = function(weatherCondition) {
    const $tbody = $('tbody');
    $tbody.empty();

    const $tr1 = $('<tr>');
    const $tr2 = $('<tr>');
    const $tr3 = $('<tr>');
    const $tr4 = $('<tr>');
    const $tr5 = $('<tr>');
    const $tr6 = $('<tr>');
    const $tr7 = $('<tr>');
    let $tdTemp = $('<td>');
    let $tdTempValue = $('<td>');
    let $tdDescription = $('<td>');
    let $tdDescriptionValue = $('<td>');
    let $tdWind = $('<td>');
    let $tdWindValue = $('<td>');
    let $tdVisibility = $('<td>');
    let $tdVisibilityValue = $('<td>');
    let $tdHumidity = $('<td>');
    let $tdHumidityValue = $('<td>');

    $tdTemp.text('Temperature:');
    // $tdTempValue = weatherCondition.temp;
    $tdTempValue.text(weatherCondition.temp);
    $tdDescription.text('Weather Description:');
    $tdDescriptionValue.text(weatherCondition.description);
    $tdWind.text('Wind Speed:');
    $tdWindValue.text(weatherCondition.windSpeed);
    $tdVisibility.text('Visibility:');
    $tdVisibilityValue.text(weatherCondition.visibility);
    $tdHumidity.text('Humidity:');
    $tdHumidityValue.text(weatherCondition.humidity);

    $('#today').text("TODAY'S CONDITIONS");
    $tr1.append($tdTemp);
    $tr1.append($tdTempValue.text() + ' F');
    $tr2.append($tdDescription);
    $tr2.append($tdDescriptionValue);
    $tr3.append($tdWind);
    $tr3.append($tdWindValue.text() + ' mph');
    $tr4.append($tdVisibility);
    $tr4.append($tdVisibilityValue.text() + ' miles');
    $tr5.append($tdHumidity);
    $tr5.append($tdHumidityValue.text() + '%');

    $tbody.append($tr1);
    $tbody.append($tr2);
    $tbody.append($tr3);
    $tbody.append($tr4);
    $tbody.append($tr5);

    // $tdTempValue.addClass('right-align');
    // $tdDescriptionValue.addClass('right-align');
    // $tdWindValue.addClass('right-align');

  };

  const getWeatherConditions = function(enteredCity) {
    // weatherConditions = [];

    const $xhr = $.ajax({
      method: 'GET',
      url: `http://api.openweathermap.org/data/2.5/weather?q=${enteredCity}&appid=9e9c8eb46706a6b46d17b3d70a7c3ae1`,
      dataType: 'json'
    });

    $xhr.done((data) => {

      weatherCondition = {
        description: data.weather[0].description,
        temp: ((data.main.temp - 273) * 9 / 5 + 32).toFixed(1),
        windSpeed: (data.wind.speed * 2.23694).toFixed(1),
        visibility: ((data.visibility) * 0.000621371).toFixed(0),
        humidity: data.main.humidity,
        sunrise: data.sys.sunrise,
        sunset: data.sys.sunset
      };

      // weatherConditions.push(weatherCondition);
      // console.log(weatherConditions);
      renderWeatherConditions(weatherCondition);

    });

    $xhr.fail((err) => {
      console.error(err);
    });
  };

  $('#searchShops').on('click', (event) => {
    event.preventDefault();

    const enteredCity = $('#search').val();

    if (enteredCity.trim() === '') {
      return;
    }

    getScubaShops(enteredCity);

  });

  $('#weatherConditions').on('click', (event) => {
    event.preventDefault();

    const enteredCity = $('#search').val();

    if (enteredCity.trim() === '') {
      return;
    }
    getWeatherConditions(enteredCity);

  });

})();

///////////////////////
//   jQuery is required to run this code
//   $(document).ready(function() {
//
//     scaleVideoContainer();
//
//     initBannerVideoSize('.video-container .poster img');
//     initBannerVideoSize('.video-container .filter');
//     initBannerVideoSize('.video-container video');
//
//     $(window).on('resize', function() {
//       scaleVideoContainer();
//       scaleBannerVideoSize('.video-container .poster img');
//       scaleBannerVideoSize('.video-container .filter');
//       scaleBannerVideoSize('.video-container video');
//     });
//
//   });
//
//   function scaleVideoContainer() {
//
//     var height = $(window).height() + 5;
//     var unitHeight = parseInt(height) + 'px';
//     $('.homepage-hero-module').css('height', unitHeight);
//
//   }
//
//   function initBannerVideoSize(element) {
//
//     $(element).each(function() {
//       $(this).data('height', $(this).height());
//       $(this).data('width', $(this).width());
//     });
//
//     scaleBannerVideoSize(element);
//
//   }
//
//   function scaleBannerVideoSize(element) {
//
//     var windowWidth = $(window).width(),
//       windowHeight = $(window).height() + 5,
//       videoWidth,
//       videoHeight;
//
//     console.log(windowHeight);
//
//     $(element).each(function() {
//       var videoAspectRatio = $(this).data('height') / $(this).data(
//         'width');
//
//       $(this).width(windowWidth);
//
//       if (windowWidth < 1000) {
//         videoHeight = windowHeight;
//         videoWidth = videoHeight / videoAspectRatio;
//         $(this).css({
//           'margin-top': 0,
//           'margin-left': -(videoWidth - windowWidth) / 2 + 'px'
//         });
//
//         $(this).width(videoWidth).height(videoHeight);
//       }
//
//       $('.homepage-hero-module .video-container video').addClass(
//         'fadeIn animated');
//
//     });
//   }
