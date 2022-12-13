'use strict';

import { fetchData } from './fetch-data';

let karamalmiFi = [];
let karamalmiEn = [];

let currentDate = new Date().toISOString().split('T')[0];

/* set the day of the week as index from 0-6 (doesn't work here on sundays but sundays are not needed) */
const todayIndex = () => {
  const weekDay = new Date().getDay() - 1;
  console.log('today', weekDay);
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
  //const fazerUrl = `https://www.foodandco.fi/api/restaurant/menu/week?language=fi&restaurantPageId=270540&weekDate=2022-12-13`;
  const fazerUrl = `https://www.compass-group.fi/menuapi/feed/json?costNumber=3202&language=${language}`;
  /**fetchData(true) using proxy for CORS 3202*/
  //const fazerUrl = `https://users.metropolia.fi/~casperdi/Mediatekniikka/Kevat22/js/proxy/fazer-proxy.php/menu/week?language=${language}&restaurantPageId=${restaurantId}&weekDate=${currentDate}`;
  console.log(fazerUrl);
  const response = await fetchData(fazerUrl, true);
  console.log('testi',response.contents);

  /*try {
    JSON.parse(response.contents);
}
catch (error) {
    console.log('Error parsing JSON:', error, data);
}

  /**parse JSON */
  const parsedResponse = JSON.parse(response.contents);
  
  console.log('parsed', parsedResponse);
  /** push meal name and diet codes into arrays */
  const setMenus = parsedResponse.MenusForDays[0].SetMenus[0].Components;
  console.log('setmenys', setMenus);

  setMenus.forEach((set) => {
    menu.push(set);
  });
/*
  setMenus.forEach((set) => {
    let submenu = [];
    Object.values(set.Meals).forEach((meal) => {
      submenu.push([meal.Name, '(' + meal.Diets.join(', ') + ')']);
    });
    menu.push(submenu);
  });*/
  console.log('menu', menu);
  return menu;
};

karamalmiFi = parseMenu(karamalmiFi, 'fi', '270540');
karamalmiEn = parseMenu(karamalmiEn, 'en', '270540');

const FazerData = {karamalmiFi, karamalmiEn, currentDate };
export default FazerData;
