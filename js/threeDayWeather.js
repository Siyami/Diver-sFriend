(function() {
  'use strict';
  let weatherCondition = [];

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
    let $tdTempMax = $('<td>');
    let $tdTempMaxValue = $('<td>');
    let $tdTempMin = $('<td>');
    let $tdTempMinValue = $('<td>');
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

  const getThreeDays = function(enteredCity) {
    // weatherConditions = [];

    const $xhr = $.ajax({
      method: 'GET',
      url: `http://api.openweathermap.org/data/2.5/forecast/daily?q=${enteredCity}&units=imperial&cnt=7&appid=9e9c8eb46706a6b46d17b3d70a7c3ae1`,
      dataType: 'json',
      units: 'imperial'
    });

    $xhr.done((data) => {

      weatherCondition = {
        tempMax: data.list[0].temp.max,
        tempMin: data.list[0].temp.min,
        description: data.list[0].weather[0].description,
        windSpeed: data.list[0].speed,
        humidity: data.list[0].humidity
      };

      console.log(weatherCondition);

      // weatherConditions.push(weatherCondition);
      // console.log(weatherConditions);
      // renderWeatherConditions(weatherCondition);

    });

    renderThreeDays(weatherCondition);

    $xhr.fail((err) => {
      console.error(err);
    });

  }

  $('#weatherForThreeDays').on('click', (event) => {
    event.preventDefault();

    const enteredCity = $('#search').val();
    console.log(enteredCity);

    if (enteredCity.trim() === '') {
      return;
    }
    getThreeDayConditions(enteredCity);

  });
})();
