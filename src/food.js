import { campus } from "./modules/weatherAPI";
import FazerData from "./modules/fazer-data";


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

  menu.forEach((meals) => {
    const mealContainer = document.createElement("div");
    mealContainer.classList.add("meal-container");

    let floatContainer = document.createElement("div");
    floatContainer.classList.add("float-container");

    const mealPrices = document.createElement("div");
    mealPrices.classList.add("meal-prices");

    let mealName = document.createElement("div");
    mealName.classList.add("meal-name");

    let meal = document.createElement("p");
    let allergens = document.createElement("p");

    meal.innerHTML = meals;

    mealName.appendChild(meal);
    floatContainer.append(mealName);
    

    /*

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
    });*/

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
    floatContainer.appendChild(mealName);
    courseList.appendChild(floatContainer);
  });
};
/**
 * Change campus data when clicking data-reload links
 */

const init = async () => {
  const fazerKaramalmiFi = await FazerData.karamalmiFi;
  renderCourseList(fazerKaramalmiFi);
  title.innerHTML = day + "." + month + "." + year; 

  
};

init();
