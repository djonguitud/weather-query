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
const elQueryForm = $('#form-query');
/* const queryURL = 'https://api.openweathermap.org/data/2.5/weather?' + city + '&appid=' + apiKey; */
const citiesQueue = [];

/*=====  End of Section comment block  ======*/

/*=============================================
=            EVENTS SECTION           =
=============================================*/

/*=====  End of Section comment block  ======*/

/*=============================================
=            FUNCTIONS SECTION           =
=============================================*/
elQueryForm.submit(citySearch);

//! Input task send to local storage
function citySearch(event) {
	event.preventDefault();
	let issuedCity = firstUpperCase(this[0].value);

	if (issuedCity !== '') {
		console.log(issuedCity);
		sendLocalStorage(issuedCity);
	} else {
		return;
	}
}

//!Local storage
function sendLocalStorage(city) {
	if (citiesQueue.includes(city)) {
		return;
	} else {
		citiesQueue.push(city);
		localStorage.setItem('citiesQueue', JSON.stringify(citiesQueue));
	}
}

//!Create buttons from local storage
function retrieveInfoLocalStorage() {
	let comeBack = localStorage.getItem('citiesQueue');
	let parsed = JSON.parse(comeBack);
	parsed.forEach((index) => {
		elLocalStorage.append(
			'<button type="button" class="local-btn btn btn-warning w-100">' + index + '</button>'
		);
	});
}

retrieveInfoLocalStorage();

/* 	elChameleon.each(function (i) {
		let valueText = this.value;
		tasks['task' + String(counter)] = valueText.trim();

		counter += 1;
	});
	localStorage.setItem('tasks', JSON.stringify(tasks));
 */

/*=====  End of Section comment block  ======*/

/*=============================================
=            MISC SECTION           =
=============================================*/

//!Convert first letter to Upper Case
function firstUpperCase(word) {
	switch (word) {
		case word.toUpperCase():
			return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
			break;
		case word.toLowerCase():
			return word.charAt(0).toUpperCase() + word.slice(1);
			break;
		default:
			return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
			break;
	}
}

/*=====  End of Section comment block  ======*/

/* return arr.map(element => {
  return element.charAt(0).toUpperCase() + element.slice(1).toLowerCase();
}); */
