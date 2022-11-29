
import { campus } from "./modules/weatherAPI";
import FazerData from "./modules/fazer-data";

let location = campus.karamalmi;
let busses = [];
let destination = [];
let time = [];

let stops = [2132225, 2132226, 2132207, 2132208, 2133225, 2133224];
let busSchedule = [];

const title = document.querySelector("#title");
const date = new Date();
console.log("hello", date);

let day = date.getDate();
let month = date.getMonth() + 1;
console.log("kk", month);
let year = date.getFullYear();

let renderCourseList = (menu) => {
  let courseList = document.querySelector(".lists");
  courseList.innerHTML = "";

  menu.forEach((course) => {
    const mealContainer = document.createElement("div");
    mealContainer.classList.add("meal-container");

    const mealPrices = document.createElement("div");
    mealPrices.classList.add("meal-prices");

    course.forEach((meals) => {
      let floatContainer = document.createElement("div");
      floatContainer.classList.add("float-container");

      let mealName = document.createElement("div");
      mealName.classList.add("meal-name");

      let mealAllergens = document.createElement("div");
      mealAllergens.classList.add("meal-allergens");

      let meal = document.createElement("p");
      let allergens = document.createElement("p");

      meal.innerHTML = meals[0];
      allergens.innerHTML = meals[1];

      mealName.appendChild(meal);
      mealAllergens.appendChild(allergens);
      floatContainer.append(mealName, mealAllergens);
      mealContainer.appendChild(floatContainer);
    });

    /**
     * if currentMenu has prices included - convert to string and split into array. For each value in array create DOM element 'p' and set value
     */
    /*if (course[2]) {
      let priceArr = course[2].toString().split("/");
      priceArr.forEach((value) => {
        let prices = document.createElement("p");
        prices.innerHTML = value;
        mealPrices.appendChild(prices);
      });
    }*/

    courseList.appendChild(mealContainer);
  });
};
/**
 * Change campus data when clicking data-reload links
 */

const init = async () => {
  const fazerKaramalmiFi = await FazerData.karamalmiFi;
  renderCourseList(fazerKaramalmiFi);
  title.innerHTML = day + "." + month + "." + year;

  /* fetchData(HSLData.apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/graphql" },
    body: HSLData.getQueryForStopsByLocation(location),
  }).then((response) => {
    let busNumber = document.querySelector("#busnumber");
    let busDest = document.querySelector("#destination");
    let busArrival = document.querySelector("#arrival");
    busNumber.innerHTML = "";
    busDest.innerHTML = "";
    busArrival.innerHTML = "";
    console.log("hsl-data", response.data.stopsByRadius);
    for (let i = 0; i < response.data.stopsByRadius.edges.length; i++) {
      const stop = response.data.stopsByRadius.edges[i].node.stop;
      let timeHours = new Date(
        (stop.stoptimesWithoutPatterns[0].realtimeArrival +
          stop.stoptimesWithoutPatterns[0].serviceDay) *
          1000
      ).getHours();
      let timeMinutes = new Date(
        (stop.stoptimesWithoutPatterns[0].realtimeArrival +
          stop.stoptimesWithoutPatterns[0].serviceDay) *
          1000
      ).getMinutes();
      console.log(timeMinutes);
      if (timeMinutes < 10) {
        timeMinutes = `0${timeMinutes}`;
      }
      if (timeHours < 10) {
        timeHours = `0${timeHours}`;
      }*/
  /* ${stop.name} *//*
      busses.push(`${stop.stoptimesWithoutPatterns[0].trip.tripHeadsign}`);
      destination.push(
        `${stop.stoptimesWithoutPatterns[0].trip.routeShortName}`
      );
      time.push(`${timeHours}:${timeMinutes}`);
      let busLi = document.createElement("li");
      let destLi = document.createElement("li");
      let arrLi = document.createElement("li");
      busLi.innerHTML = busses[i];
      destLi.innerHTML = destination[i];
      arrLi.innerHTML = time[i];

      busNumber.appendChild(busLi);
      busDest.appendChild(destLi);
      busArrival.appendChild(arrLi);
    }
    busses = [];
    destination = [];
    time = [];*
  });*/
};

init();
