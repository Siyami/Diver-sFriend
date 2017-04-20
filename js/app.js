(function() {
  'use strict';

  let shops = [];
  let picture;

  const renderScubaShops = function() {
    $('#list').empty();

    for (const shop of shops) {
      const $col = $('<div>').addClass('col s12 m3');
      const $card = $('<div>').addClass('card hoverable');
      const $cardImage = $('<div>').addClass('card-image');
      const $image = $('<img>');
      const $span = $('<span>').addClass('card-title');
      const $cardContent = $('<div>').addClass('card-content');
      const $paragraph1 = $('<p>');
      const $paragraph2 = $('<p>');
      const $link = $('<a>');
      const $cardAction = $('<div>').addClass('card-action');

      $cardImage.append($image, $span);
      $cardAction.append($link);
      $cardContent.append($paragraph2, $paragraph1);
      $card.append($cardImage, $cardContent, $cardAction);
      $col.append($card);

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
        const shop = {
          address: result.formatted_address,
          name: result.name,
          rating: result.rating,
          image: picture
        };
        shops.push(shop);
      }

      renderScubaShops(enteredCity);
    });

    $xhr.fail((err) => {
      console.error(err);
    });
  };

  const renderWeatherConditions = function(weatherCondition) {
    const $tableToday = $('#tableToday');

    // empty table if user clicks more than once
    $tableToday.empty();
    const $tableThreeDays = $('#tableThreeDays');

    // empty table if user clicks more than once
    $tableThreeDays.empty();
    const $tbody = $('<tbody>');
    const $tr1 = $('<tr>');
    const $tr2 = $('<tr>');
    const $tr3 = $('<tr>');
    const $tr4 = $('<tr>');
    const $tr5 = $('<tr>');

    const $tdTemp = $('<td>');
    const $tdTempValue = $('<td>');
    const $tdDescription = $('<td>');
    const $tdDescriptionValue = $('<td>');
    const $tdWind = $('<td>');
    const $tdWindValue = $('<td>');
    const $tdVisibility = $('<td>');
    const $tdVisibilityValue = $('<td>');
    const $tdHumidity = $('<td>');
    const $tdHumidityValue = $('<td>');

    $tdTemp.text('Temperature:');
    $tdTempValue.text(weatherCondition.temp);
    $tdDescription.text('Weather Description:');
    $tdDescriptionValue.text(weatherCondition.description);
    $tdWind.text('Wind Speed:');
    $tdWindValue.text(weatherCondition.windSpeed);
    $tdVisibility.text('Visibility:');
    $tdVisibilityValue.text(weatherCondition.visibility);
    $tdHumidity.text('Humidity:');
    $tdHumidityValue.text(weatherCondition.humidity);

    // $('#today').text("TODAY'S CONDITIONS");
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
    $tableToday.append($tbody);

    // $tdTempValue.addClass('right-align');
  };

  const getWeatherConditions = function(enteredCity) {
    let weatherCondition;

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
        visibility: ((data.visibility) / 1760).toFixed(1),
        humidity: data.main.humidity,
        sunrise: data.sys.sunrise,
        sunset: data.sys.sunset
      };

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
      Materialize.toast('Please enter a city or zipcode', 2000, 'rounded');

      return;
    }

    getScubaShops(enteredCity);
  });

  $('#weatherConditions').on('click', (event) => {
    event.preventDefault();

    const enteredCity = $('#search').val();

    if (enteredCity.trim() === '') {
      Materialize.toast('Please enter a city or zipcode', 2000, 'rounded');

      return;
    }
    getWeatherConditions(enteredCity);
  });
})();
