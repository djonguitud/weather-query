'use strict';

/*=============================================
=            VARIABLES  SECTION           =
=============================================*/

//!API  INFO
//https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

const apiKey = '0caa83d5194f964f7490af6e5c39d537';
const elInputUser = $('#input');
const elLocalStorage = $('.local-storage');
const elNextDays = $('.next-days__wraper');
const elBtn = $('.btn');
let city;
const queryURL = 'https://api.openweathermap.org/data/2.5/weather?' + city + '&appid=' + apiKey;

/*=====  End of Section comment block  ======*/

/*=============================================
=            EVENTS SECTION           =
=============================================*/

elBtn.on(click, () => {});

/*=====  End of Section comment block  ======*/

/*=============================================
=            FUNCTIONS SECTION           =
=============================================*/

/*=====  End of Section comment block  ======*/

/*=============================================
=            MISC SECTION           =
=============================================*/

/*=====  End of Section comment block  ======*/
