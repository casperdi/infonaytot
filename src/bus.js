import HSLData, { apiUrl } from "./modules/hslAPI";
import { fetchData } from "./modules/network";


let stops = [2132225, 2132226, 2132207, 2132208, 2133225, 2133224];
let busSchedule = [];
let today = new Date();
const title = document.querySelector("#time");

let hours = today.getHours();
let minutes = today.getMinutes();

if(hours < 10){
    hours = "0" + hours;
} else if (minutes < 10) {
    minutes = '0' + minutes;
}

let time = hours + ":" + minutes;   

const karamalmiHSL = () => {
  stops.forEach((s) => {
    fetchData(HSLData.apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/graphql" },
      body: HSLData.getQueryForNextRidesByStopId(s),
    }).then((response) => {
      for (let i = 0; i < 2; i++) {
        const stop = response.data.stop;
        let time = new Date(
          (stop.stoptimesWithoutPatterns[i].realtimeArrival +
            stop.stoptimesWithoutPatterns[i].serviceDay) *
            1000
        );
        let localeSpecificTime = time.toLocaleTimeString("fi-FI", {
          hour: "numeric",
          minute: "numeric",
        });

        /* console.log(
          'HSL',
          stop.name,
          stop.stoptimesWithoutPatterns[i].trip.routeShortName,
          stop.stoptimesWithoutPatterns[i].headsign,
          localeSpecificTime
        );
*/
        let bus = {
          route: stop.stoptimesWithoutPatterns[i].headsign,
          number: stop.stoptimesWithoutPatterns[i].trip.routeShortName,
          time: localeSpecificTime,
          stop: stop.name,
        };

        busSchedule.push(bus);
        busSchedule.sort((a, b) => {
          return a.time - b.time;
        });
      }
    });
  });
};

const renderHsl = (busses) => {
  let busList = document.querySelector(".hsl-data");
  console.log("bussejanii pirusti", busses.length);
  console.log("yeet", busses);

    const busHeader = document.createElement("tr");
    busHeader.classList.add("headers");
    busHeader.classList.add("bus-container");

    let number = document.createElement("td");
    let headsign = document.createElement("td");
    let time = document.createElement("td");
    let stop = document.createElement("td");

    number.innerHTML = 'Linja';
    headsign.innerHTML = 'Suunta';
    time.innerHTML = 'Aika';
    stop.innerHTML = 'Pysäkki';

    busHeader.appendChild(number);
    busHeader.appendChild(headsign);
    busHeader.appendChild(time);
    busHeader.appendChild(stop);

    busList.appendChild(busHeader);

  busses.forEach((b) => {
    const busContainer = document.createElement("tr");
    busContainer.classList.add("bus-container");

    let number = document.createElement("td");
    let headsign = document.createElement("td");
    let time = document.createElement("td");
    let stop = document.createElement("td");

    number.innerHTML = b.number;
    headsign.innerHTML = b.route;
    time.innerHTML = b.time;
    stop.innerHTML = b.stop;

    busContainer.appendChild(number);
    busContainer.appendChild(headsign);
    busContainer.appendChild(time);
    busContainer.appendChild(stop);

    busList.appendChild(busContainer);
  });
};

/**
 * Change campus data when clicking data-reload links
 */

const init = async () => {
  karamalmiHSL();
  title.innerHTML = time;

  setTimeout(() => {
    renderHsl(busSchedule);
  }, "1500");

  console.log("bussit", busSchedule);
   /*

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
