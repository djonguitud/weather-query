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
	elLocalStorage.append(
		'<button type="button" class="local-btn btn btn-warning w-100">' + city + '</button>'
	);
}

//!Create buttons from local storage
function retrieveInfoLocalStorage() {
	elLocalStorage.children('button').remove();
	let comeBack = localStorage.getItem('citiesQueue');
	let parsed = JSON.parse(comeBack);
	parsed.forEach((item) => {
		elLocalStorage.append(
			'<button type="button" class="local-btn btn btn-warning w-100">' + item + '</button>'
		);
	});
}

retrieveInfoLocalStorage();

/*=====  End of Section comment block  ======*/

/*=============================================
=            MISC SECTION           =
=============================================*/

//!Convert first letter to Upper Case
function firstUpperCase(word) {
	let upperSet = [];
	let wordSet = word.split(' ');
	wordSet.forEach((w) => {
		let upperLetter = w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();
		upperSet.push(upperLetter);
	});

	let properWord = upperSet.join(' ');
	upperSet.splice(0);
	return properWord;
}

/*=====  End of Section comment block  ======*/
