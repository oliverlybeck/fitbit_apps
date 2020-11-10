import { me } from "appbit";

let document = require("document");
let timer = document.getElementById("timer");
let exit = document.getElementById("exitButton");

var startTime = Date.now()

// Set tracked variables for displayed timer hh:mi:ss format
var displayedTime;
var countHours = 0;
var countMins = 0;

function converMsAgoToString(msago) {
    return Math.round(msago / 1000);
}

function updateDisplay() {
    var currTime = converMsAgoToString(Date.now() - startTime);
    var minutesOverSeconds = currTime % 60;
    var hoursOverSeconds = currTime % 3600;
    if (hoursOverSeconds == 0) {
        countHours = +1;
    }
    
    if (minutesOverSeconds == 0) {
        countMins = +1;
    }
    
    // Maintain 00:00:00 format
    if (minutesOverSeconds <= 9 && countMins <= 9) {
        displayedTime = `0${countHours}:0${countMins}:0${minutesOverSeconds}`;
    } else if (countMins <= 9) {
        displayedTime = `0${countHours}:0${countMins}:${minutesOverSeconds}`;
    } else {
        displayedTime = `0${countHours}:${countMins}:${minutesOverSeconds}`;
    }

    timer.text = displayedTime;
    //dynamicGUITimer(timer.text.length);
}


setInterval(() => {
    updateDisplay()
}, 1000);

function dynamicGUITimer(strLen) {
    if (strLen == 1) {
        timer.x = 281;
    }
    else if (strLen == 2) {
        timer.x = 271;
    }
    else {
        timer.x = 261;
    }
}

// Exit the app
exit.addEventListener("click", (evt) => {
    console.log("Terminating app");
    me.exit();
  })