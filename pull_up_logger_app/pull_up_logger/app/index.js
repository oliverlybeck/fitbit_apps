import { me } from "appbit";
import * as messaging from "messaging";
import * as tumbl from "./tumblerCtl";

let document = require("document");
let timer = document.getElementById("timer");
let exit = document.getElementById("exitButton");
let submit = document.getElementById("submit");
let total = document.getElementById("total");
let tumbler = document.getElementById("tumbler");
var startTime = Date.now()

// Set tracked variables for displayed timer hh:mi:ss format

var JSONLogger = {};

function converMsAgoToString(msago) {
    return Math.round(msago / 1000);
}

function timeControl() {
    var displayedTime;
    var countHours = 0;
    var countMins = 0;

    var currTime = converMsAgoToString(Date.now() - startTime);
    // Handle Minutes
    var minutesOverSeconds = currTime % 60;
    if (minutesOverSeconds == 0) {
        countMins = currTime / 60;
    }
    // Handle Hours
    var hoursOverSeconds = currTime % 3600;
    if (hoursOverSeconds == 0) {
        countHours = currTime / 3600;
    }

    // Maintain 00:00:00 format
    if (minutesOverSeconds <= 9 && countMins <= 9) {
        displayedTime = `0${countHours}:0${countMins}:0${minutesOverSeconds}`;
    } else if (countMins <= 9) {
        displayedTime = `0${countHours}:0${countMins}:${minutesOverSeconds}`;
    } else {
        displayedTime = `0${countHours}:${countMins}:${minutesOverSeconds}`;
    }

    /** DEBUGGING 
    console.log(`${displayedTime}, ${currTime}`);
    console.log(countMins);
    console.log(minutesOverSeconds);
    */

    return displayedTime;
}

function updateDisplay() {
    timer.text = timeControl();
}


setInterval(() => {
    updateDisplay()
}, 1000);

// Listen for messages from companion app
messaging.peerSocket.addEventListener("message", (evt) => {
    if (evt.data) {
        var jsonSettings = evt.data.command;
        console.log(JSON.stringify(jsonSettings))
    }
    else {
        console.error("Error: Connection is not open");
    }
  });

// Exit the app
exit.addEventListener("click", (evt) => {
    console.log("Terminating app");
    sendDataToCompanion(JSONLogger);
    me.exit();
  })

submit.addEventListener("click", (evt) => {
    var numberOfReps = tumbl.submitCurrVal();
    total.text = Number(total.text) + Number(numberOfReps);
    tumbl.defaultTumbler();
    logToJson(numberOfReps);
    //let test = document.getElementById("someList");
    //let blah = test.createElement("text"["id='new_text'"]);
    //blah.text = "something"


    /** DEBUGGING
    console.log(`Total number of pull ups now: ${total.text}`);
    */
})

function logToJson(value) {
    var set_data = {};
    set_data["reps"] = value;
    set_data["time"] = timeControl();
    var jsonLength = Object.keys(JSONLogger).length;

    if (jsonLength == 0) {
        var setNumber = 1;
    }
    else {
        // Get last entry from json and add one to set number
        var lastKey = Object.keys(JSONLogger).reverse()[0];
        var setNumber = Number(lastKey.match(/\d/g).join("")) + 1;
    }
    var setKey = `Set_${setNumber}`;
    JSONLogger[setKey] = set_data;
}

var y=0;
var prevValue=0;

tumbler.onmousedown = function(evt) {
    y = evt.screenY;
    //x = evt.screenX;
    prevValue = tumbl.currVal();

    /** DEBUGGING 
    console.log(`x:${x}, y:${y}`);
    console.log(`Prev Value=${Number(prevValue)}`);
    */
}

tumbler.onmouseup = function(evt) {
    let yMove = evt.screenY-y;
    //let xMove = evt.screenX-x;

    if (yMove > 0) {
        tumbl.swipeUp(yMove, prevValue);
    }    
    else if (yMove < 0) {
        tumbl.swipeDown(yMove, prevValue);
    }

    /** DEBUGGING 
    console.log(`delta y: ${evt.screenY} - ${y}`);
    console.log(`= ${yMove}`);
    */
}


// Send sensor data to companion app
function sendDataToCompanion(data) {
    if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
      messaging.peerSocket.send(data);
    }
  }