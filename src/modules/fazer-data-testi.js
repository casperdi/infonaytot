"use strict";

import { fetchData } from "./fetch-data";

let karamalmiFi = [];
let karamalmiFitest = [];

let karamalmiEn = [];

let currentDate = new Date().toISOString().split("T")[0];

/* set the day of the week as index from 0-6 (doesn't work here on sundays but sundays are not needed) */
const todayIndex = () => {
  const weekDay = new Date().getDay() - 1;
  console.log("today", weekDay);
  return weekDay;
};

/**
 * fetch JSON data from fazerUrl and parse menu contents into array
 * uses proxy for CORS config, please refer to fetch-data.js
 * @param {array} menu - array where contents of JSON menu is parsed
 * @param {string} language - language of menu
 * @param {string} restaurantId - restaurant's ID to url
 * @returns - menu (array)
 */
const parseMenu = async (menu, language, restaurantId) => {
  //const fazerUrl = `https://www.foodandco.fi/api/restaurant/menu/week?language=${language}&restaurantPageId=${restaurantId}&weekDate=${currentDate}`;
  const fazerUrl = `https://www.foodandco.fi/api/restaurant/menu/week?language=${language}&restaurantPageId=${restaurantId}&weekDate=${currentDate}`;
  /**fetchData(true) using proxy for CORS */
  const response = await fetchData(fazerUrl, true);
  console.log("testi", response);

  /**parse JSON */
  const parsedResponse = JSON.parse(response.contents);
  console.log("parsed", parsedResponse);
  /** push meal name and diet codes into arrays */
  const setMenus = parsedResponse.LunchMenus[todayIndex()].SetMenus;
  console.log("setmenys", setMenus);
  setMenus.forEach((set) => {
      menu.push(set.Meals);
  });
  console.log("menu", menu);
  return menu;
};

const parseMenuMeals = async (menu) => {

  /** push meal name and diet codes into arrays */
  const setMenus = karamalmiFi;
  console.log("setmenys", setMenus);
  setMenus.forEach((set) => {
    Object.values(set.Meals).forEach((meal) => {
      menu.push([meal.Name, "(" + meal.Diets.join(", ") + ")"]);
    });
  });
  console.log("menu", menu);
  return menu;
};

karamalmiFi = parseMenu(karamalmiFi, "fi", "270540");
karamalmiEn = parseMenu(karamalmiEn, "en", "270540");
karamalmiFitest = parseMenuMeals(karamalmiFi);

const FazerDatatest= { karamalmiFitest };
export default FazerDatatest;
