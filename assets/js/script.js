'use strict';
/*=============================================
=            VARIABLES  SECTION           =
=============================================*/
const apiKey = '021da88feaf1b9241beccb1c30ea00c4&units=imperial';
const elInputUser = $('#input');
const elLocalStorage = $('.local-storage');
const elNextDays = $('.next-days__wraper');
const elQueryForm = $('#form-query');
let elToday = $('#today-date');
let currentDay = moment().format('MMM Do YY');
const citiesQueue = [];

/*=====  End of Section comment block  ======*/

/*=============================================
=            EVENTS SECTION           =
=============================================*/
elQueryForm.submit(citySearch);

elLocalStorage.on('click', function (event) {
	if (event.target.tagName === 'BUTTON') {
		queryTodayWeather(event.target.textContent);
		queryURLForecast(event.target.textContent);
		$('#today-city').html(
			event.target.textContent +
				" <span id='today-date' class='text-success h5'>" +
				'(' +
				currentDay +
				')' +
				'</span>'
		);
	}
});

/*=====  End of Section comment block  ======*/

/*=============================================
=            FUNCTIONS SECTION           =
=============================================*/
//! Function to get head from http request
const responseHttp = (response) => {
	if (response.ok) {
		return response.json();
	} else if (response.status === 404) {
		alert('Wrong city name');
	} else {
		throw new Error(response.status);
	}
};

//!Fetch today's weather from API Open Weather
function queryTodayWeather(city) {
	let queryURLWeather =
		'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey;
	fetch(queryURLWeather)
		.then((resp1) => responseHttp(resp1))
		.then((data) => {
			todaysWeather(data.main.temp, data.wind.speed, data.main.humidity);
			iconRender(data);
		})
		.catch((err) => {
			console.error('ERROR: ', err.message);
			return;
		});
}

//!Fetch forecast weather from API Open Weather
function queryURLForecast(city) {
	let queryURLForecast =
		'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=' + apiKey;
	fetch(queryURLForecast)
		.then((resp2) => responseHttp(resp2))
		.then((data) => {
			renderday1(
				data.list[4].dt_txt,
				data.list[4].main.temp,
				data.list[4].wind.speed,
				data.list[4].main.humidity,
				data.list[4].weather[0].icon
			);
			renderday2(
				data.list[11].dt_txt,
				data.list[11].main.temp,
				data.list[11].wind.speed,
				data.list[11].main.humidity,
				data.list[11].weather[0].icon
			);
			renderday3(
				data.list[19].dt_txt,
				data.list[19].main.temp,
				data.list[19].wind.speed,
				data.list[19].main.humidity,
				data.list[19].weather[0].icon
			);
			renderday4(
				data.list[25].dt_txt,
				data.list[25].main.temp,
				data.list[25].wind.speed,
				data.list[25].main.humidity,
				data.list[25].weather[0].icon
			);
			renderday5(
				data.list[35].dt_txt,
				data.list[35].main.temp,
				data.list[35].wind.speed,
				data.list[35].main.humidity,
				data.list[35].weather[0].icon
			);
		})
		.catch((err) => {
			console.error('ERROR: ', err.message);
			return;
		});
}

//! Input task send to local storage
function citySearch(event) {
	event.preventDefault();
	let issuedCity = firstUpperCase(this[0].value);

	if (issuedCity !== '') {
		createCitiesButtons(issuedCity);
		queryTodayWeather(issuedCity);
		queryURLForecast(issuedCity);
		$('#today-city').html(
			issuedCity +
				" <span id='today-date' class='text-success h5'>" +
				'(' +
				currentDay +
				')' +
				'</span>'
		);
	} else {
		return;
	}
}

//!Cities buttons creation
function createCitiesButtons(city) {
	if (citiesQueue.includes(city)) {
		return;
	} else {
		citiesQueue.push(city);
		createLocalStorage();
		elLocalStorage.append(
			'<button type="button" class="local-btn btn btn-warning w-100">' + city + '</button>'
		);
	}
}

//!Extract cities buttons to send to local storage
function createLocalStorage() {
	elLocalStorage.each((btn) => {
		localStorage.setItem('citiesQueue', JSON.stringify(citiesQueue));
	});
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

//! Render openweather on today's weather card
function todaysWeather(temp, wind, humidity) {
	$('#today-temp').text('Temp: ' + temp + ' ℉');
	$('#today-wind').text('Wind Speed: ' + wind + ' km/h');
	$('#today-humidity').text('Humidity: ' + humidity + ' %');
}

//!Render forecast day1
function renderday1(date, temp, wind, humidity, icon) {
	$('#dayOne-date').text(date);
	$('#dayOne-temp').text('Temp: ' + temp + ' ℉');
	$('#dayOne-wind').text('Wind Speed: ' + wind + ' km/h');
	$('#dayOne-humidity').text('Humidity: ' + humidity + ' %');
	$('#dayOne-icon').attr('src', 'http://openweathermap.org/img/w/' + String(icon) + '.png');
}

//!Render forecast day2
function renderday2(date, temp, wind, humidity, icon) {
	$('#dayTwo-date').text(date);
	$('#dayTwo-temp').text('Temp: ' + temp + ' ℉');
	$('#dayTwo-wind').text('Wind Speed: ' + wind + ' km/h');
	$('#dayTwo-humidity').text('Humidity: ' + humidity + ' %');
	$('#dayTwo-icon').attr('src', 'http://openweathermap.org/img/w/' + String(icon) + '.png');
}

//!Render forecast day3
function renderday3(date, temp, wind, humidity, icon) {
	$('#dayThree-date').text(date);
	$('#dayThree-temp').text('Temp: ' + temp + ' ℉');
	$('#dayThree-wind').text('Wind Speed: ' + wind + ' km/h');
	$('#dayThree-humidity').text('Humidity: ' + humidity + ' %');
	$('#dayThree-icon').attr('src', 'http://openweathermap.org/img/w/' + String(icon) + '.png');
}

//!Render forecast day4
function renderday4(date, temp, wind, humidity, icon) {
	$('#dayFour-date').text(date);
	$('#dayFour-temp').text('Temp: ' + temp + ' ℉');
	$('#dayFour-wind').text('Wind Speed: ' + wind + ' km/h');
	$('#dayFour-humidity').text('Humidity: ' + humidity + ' %');
	$('#dayFour-icon').attr('src', 'http://openweathermap.org/img/w/' + String(icon) + '.png');
}

//!Render forecast day5
function renderday5(date, temp, wind, humidity, icon) {
	$('#dayFive-date').text(date);
	$('#dayFive-temp').text('Temp: ' + temp + ' ℉');
	$('#dayFive-wind').text('Wind Speed: ' + wind + ' km/h');
	$('#dayFive-humidity').text('Humidity: ' + humidity + ' %');
	$('#dayFive-icon').attr('src', 'http://openweathermap.org/img/w/' + String(icon) + '.png');
}

//!Render weather icon
function iconRender(i) {
	let iconcode = i.weather[0].icon;
	let iconurl = 'http://openweathermap.org/img/w/' + iconcode + '.png';
	$('#today-icon').attr('src', iconurl);
}

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

/*=============================================
=            Code Execution block            =
=============================================*/

retrieveInfoLocalStorage();

/*=====  End of Section comment block  ======*/
