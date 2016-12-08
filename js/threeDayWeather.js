(function() {
  'use strict';
  // let weatherConditions = [];


  const renderThreeDayConditions = function(weatherForThree) {
    console.log(weatherForThree);
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

    let $tdTempMax = $('<td>');
    let $tdTempMaxValue = $('<td>');
    let $tdTempMin = $('<td>');
    let $tdTempMinValue = $('<td>');
    let $tdDescription = $('<td>');
    let $tdDescriptionValue = $('<td>');
    let $tdWind = $('<td>');
    let $tdWindValue = $('<td>');
    let $tdHumidity = $('<td>');
    let $tdHumidityValue = $('<td>');

    $tdTempMax.text('Max Temperature:');
    $tdTempMaxValue.text(weatherForThree.tempMax);
    $tdTempMin.text('Min Temperature:');
    $tdTempMinValue.text(weatherForThree.tempMin);
    $tdDescription.text('Weather Description:');
    $tdDescriptionValue.text(weatherForThree.description);
    $tdWind.text('Wind Speed:');
    $tdWindValue.text(weatherForThree.windSpeed);
    $tdHumidity.text('Humidity:');
    $tdHumidityValue.text(weatherForThree.humidity);

    // $('#today').text("TODAY'S CONDITIONS");
    $tr1.append($tdTempMax);
    $tr1.append($tdTempMaxValue.text() + ' F');
    $tr2.append($tdTempMin);
    $tr2.append($tdTempMinValue.text() + ' F');
    $tr3.append($tdDescription);
    $tr3.append($tdDescriptionValue);
    $tr4.append($tdWind);
    $tr4.append($tdWindValue.text() + ' mph');
    $tr5.append($tdHumidity);
    $tr5.append($tdHumidityValue.text() + '%');

    $tbody.append($tr1);
    $tbody.append($tr2);
    $tbody.append($tr3);
    $tbody.append($tr4);
    $tbody.append($tr5);
    $tableThreeDays.append($tbody);
    // $tableThreeDays.append($table);

    // $tdTempValue.addClass('right-align');
    // $tdDescriptionValue.addClass('right-align');
    // $tdWindValue.addClass('right-align');
  };

  const getThreeDayConditions = function(enteredCity) {
    let weatherForThree;
    const $xhr = $.ajax({
      method: 'GET',
      url: `http://api.openweathermap.org/data/2.5/forecast/daily?q=${enteredCity}&units=imperial&cnt=7&appid=9e9c8eb46706a6b46d17b3d70a7c3ae1`,
      dataType: 'json',
    });

    $xhr.done((data) => {

      weatherForThree = {
        tempMax: data.list[1].temp.max,
        tempMin: data.list[1].temp.min,
        description: data.list[1].weather[0].description,
        windSpeed: data.list[1].speed,
        humidity: data.list[1].humidity
      };

      // console.log(weatherCondition);

      // weatherConditions.push(weatherCondition);
      // console.log(weatherConditions);
      // renderWeatherConditions(weatherCondition);

      renderThreeDayConditions(weatherForThree);
    });


    $xhr.fail((err) => {
      console.error(err);
    });

  };

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
