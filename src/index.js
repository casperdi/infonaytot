
import HSLData, { apiUrl } from './modules/hslAPI';
import { fetchData } from './modules/network';
import { campus } from './modules/weatherAPI';
import FazerData from './modules/fazer-data';
import FazerDatatest from './modules/fazer-data-testi';


let location = campus.karamalmi;
let busses = [];
let destination = [];
let time = [];

const title = document.querySelector('#title');
const date = new Date();

let day = date.getDate();
let month = date.getMonth();
let year = date.getFullYear();






let renderCourseList = (menu) => {
  let courseList = document.querySelector(".lists");
  courseList.innerHTML = "";

  menu.forEach((course) => {
    const mealContainer = document.createElement("div");
    mealContainer.classList.add("meal-container");

    const mealName = document.createElement("div");
    mealName.classList.add("meal-name");

    const mealAllergens = document.createElement("div");
    mealAllergens.classList.add("meal-allergens");

    const mealPrices = document.createElement("div");
    mealPrices.classList.add("meal-prices");

    let meal = document.createElement("p");
    let allergens = document.createElement("p");

    meal.innerHTML = course[0];
    allergens.innerHTML = course[1];

    /**
     * if currentMenu has prices included - convert to string and split into array. For each value in array create DOM element 'p' and set value
     */
    if (course[2]) {
      let priceArr = course[2].toString().split("/");
      priceArr.forEach((value) => {
        let prices = document.createElement("p");
        prices.innerHTML = value;
        mealPrices.appendChild(prices);
      });
    }
    mealName.appendChild(meal);
    mealAllergens.appendChild(allergens);
    mealContainer.append(mealName, mealAllergens, mealPrices);
    courseList.appendChild(mealContainer);
  });
};

/**
 * Change campus data when clicking data-reload links
 */

const init = async () => {
  const fazerKaramalmiFi = await FazerData.karamalmiFi;
  const fazerKaramalmiFitest = await FazerData.karamalmiFitest;
  const fazerKaramalmiEn = await FazerData.karamalmiEn;
  console.log('testii', fazerKaramalmiFitest);
  renderCourseList(fazerKaramalmiFi);
  title.innerHTML = day + "." + month + "." + year;

  fetchData(HSLData.apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/graphql' },
    body: HSLData.getQueryForStopsByLocation(location)
  }).then(response => {
    let busNumber = document.querySelector('#busnumber');
    let busDest = document.querySelector('#destination');
    let busArrival = document.querySelector('#arrival');
    busNumber.innerHTML = '';
    busDest.innerHTML = '';
    busArrival.innerHTML = '';
    console.log('hsl-data', response.data.stopsByRadius);
    for (let i = 0; i < response.data.stopsByRadius.edges.length; i++) {
      const stop = response.data.stopsByRadius.edges[i].node.stop;
      let timeHours = new Date((stop.stoptimesWithoutPatterns[0].realtimeArrival + stop.stoptimesWithoutPatterns[0].serviceDay) * 1000).getHours();
      let timeMinutes = new Date((stop.stoptimesWithoutPatterns[0].realtimeArrival + stop.stoptimesWithoutPatterns[0].serviceDay) * 1000).getMinutes();
      console.log(timeMinutes);
      if (timeMinutes < 10){
        timeMinutes = `0${timeMinutes}`;
      }
      if(timeHours < 10){
        timeHours = `0${timeHours}`;
      }
      /* ${stop.name} */
      busses.push(`${stop.stoptimesWithoutPatterns[0].trip.tripHeadsign}`);
      destination.push(`${stop.stoptimesWithoutPatterns[0].trip.routeShortName}`);
      time.push(`${timeHours}:${timeMinutes}`);
      let busLi = document.createElement('li');
      let destLi = document.createElement('li');
      let arrLi = document.createElement('li');
      busLi.innerHTML = busses[i];
      destLi.innerHTML = destination[i];
      arrLi.innerHTML = time[i];

      busNumber.appendChild(busLi);
      busDest.appendChild(destLi);
      busArrival.appendChild(arrLi);
    }
    busses = [];
    destination = [];
    time = [];
  });
};
init();
