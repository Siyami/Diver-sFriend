(function() {
  'use strict';
  let shops = [];
  let weatherCondition = [];

  const renderScubaShops = function() {
    $('#listings').empty();
    $('.material-tooltip').remove();

    for (const shop of shops) {
      const $col = $('<div>').addClass('col s4');
      const $card = $('<div>').addClass('card hoverable');
      const $content = $('<div>').addClass('card-content center');
      const $title = $('<h6>').addClass('card-title truncate');

      $title.attr({
        'data-position': 'top',
        'data-tooltip': shop.name
      });

      $title.tooltip({
        delay: 50
      }).text(shop.name);

      const $poster = $('<img>').addClass('poster');

      $poster.attr({
        src: shop.icon,
        alt: `${shop.icon} Poster`
      });

      $content.append($title, $poster);
      $card.append($content);

      const $action = $('<div>').addClass('card-action center');

      $card.append($action);

      const $modal = $('<div>').addClass('modal').attr('rating', shop.rating);
      const $modalContent = $('<div>').addClass('modal-content');
      const $modalHeader = $('<h4>').text(shop.name);
      // const $movieYear = $('<h6>').text(`Released in ${shop.year}`);
      // const $modalText = $('<p>').text(shop.plot);

      $modalContent.append($modalHeader);
      $modal.append($modalContent);

      $col.append($card, $modal);

      $('#listings').append($col);

      $('.modal-trigger').leanModal();
    }
  };

  const getScubaShops = function(enteredCity) {
    shops = [];

    const $xhr = $.ajax({
      method: 'GET',
      url: `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/textsearch/json?query=scuba+shop+in+${enteredCity}&key=AIzaSyA-zAlNCgElfIESK0chL5FG2AWaL6u5aiA`,
      dataType: 'json'
    });

    $xhr.done((data) => {
      // console.log(data);
      const results = data.results;

      for (const result of results) {
        const shop = {
          address: results.formatted_address,
          name: results.name,
          rating: results.rating,
          icon: results.icon

        };

        // getPlot(shop);
        shops.push(shop);
        renderScubaShops();
      }
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
    // let $tdSunRise = $('<td>');
    // let $tdSunRiseValue = $('<td>');
    // let $tdSunSet = $('<td>');
    // let $tdSunSetValue = $('<td>');

    $tdTemp.text('Temperature:');
    // $tdTempValue = weatherCondition.temp;
    $tdTempValue.text(weatherCondition.temp);
    $tdDescription.text('Description:');
    $tdDescriptionValue.text(weatherCondition.description);
    $tdWind.text('Wind:');
    $tdWindValue.text(weatherCondition.windSpeed);
    $tdVisibility.text('Visibility:');
    $tdVisibilityValue.text(weatherCondition.visibility);
    $tdHumidity.text('Humidity:');
    $tdHumidityValue.text(weatherCondition.humidity);


    // $tdSunRise = 'SunRise: ';
    // $tdSunRiseValue = weatherCondition.sunrise;
    // $tdSunSet = 'SunSet: ';
    // $tdSunSetValue = weatherCondition.sunset;

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
    // $tr6.append($tdSunRise);
    // $tr6.append($tdSunRiseValue);
    // $tr7.append($tdSunSet);
    // $tr7.append($tdSunSetValue);

    $tbody.append($tr1);
    $tbody.append($tr2);
    $tbody.append($tr3);
    $tbody.append($tr4);
    $tbody.append($tr5);
    // $tbody.append($tr6);
    // $tbody.append($tr7);

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
      console.log(data);

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

  $('form').on('submit', (event) => {
    event.preventDefault();

    const enteredCity = $('#search').val();

    if (enteredCity.trim() === '') {
      return;
    }

    getScubaShops(enteredCity);
    getWeatherConditions(enteredCity);
  });

})();
