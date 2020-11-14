import { me } from "appbit";
import * as messaging from "messaging";

let document = require("document");
let timer = document.getElementById("timer");
let exit = document.getElementById("exitButton");
let submit = document.getElementById("submit");
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
    timer.text = displayedTime;


    /** DEBUGGING 
    console.log(`${displayedTime}, ${currTime}`);
    console.log(countMins);
    console.log(minutesOverSeconds);
    */
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
    me.exit();
  })

submit.addEventListener("click", (evt) => {
    console.log(`SUBMIT THIS VALUE: ${tumblerMain.text}`);
})

var tumbler = document.getElementById("tumbler");
let dragBox = document.getElementById("dragBox");
let tumblerTop = document.getElementById("counterTumblerFaderTop");
let tumblerBottom = document.getElementById("counterTumblerFaderBottom");
let tumblerMain = document.getElementById("counterTumbler");

var y = 0;
var x=0;
var prevValue=0;

tumbler.onmousedown = function(evt) {
    y = evt.screenY;
    x = evt.screenX;
    prevValue = tumblerMain.text;

    /** DEBUGGING 
    console.log(`x:${x}, y:${y}`);
    console.log(`Prev Value=${Number(prevValue)}`);
    */
}

tumbler.onmouseup = function(evt) {
    let yMove = evt.screenY-y;
    let xMove = evt.screenX-x;

    //swipe up -> larger numbers
    if (yMove < -35) {
        tumblerMain.text = Number(prevValue) + 2;
        tumblerTop.text = Number(prevValue) + 1;
        tumblerBottom.text = Number(prevValue) + 3;  
    }
    else if (yMove < 0) {
        tumblerMain.text = Number(prevValue) + 1;
        tumblerTop.text = Number(prevValue);
        tumblerBottom.text = Number(prevValue) + 2;
    };

    //swipe down -> smaller numbers
    if (yMove > 35) {
        if (prevValue < 3) {
            tumblerTop.text = "";
            tumblerMain.text = Number(prevValue) - 2;
            tumblerBottom.text = Number(prevValue) - 1;
        }
        else {
            tumblerTop.text = Number(prevValue) - 3;
            tumblerMain.text = Number(prevValue) - 2;
            tumblerBottom.text = Number(prevValue) - 1;
        }
    }
    else if (yMove > 0) {
        if (prevValue <= 1) {
            tumblerTop.text = "";
            tumblerMain.text = 0;
            tumblerBottom.text = 1; 
        }
        else {
            tumblerTop.text = Number(prevValue) - 2;
            tumblerMain.text = Number(prevValue) - 1;
            tumblerBottom.text = Number(prevValue);
        } 
    };

    //swipe left  
    if (xMove< -60) {

    };

    //swipe right
    if (xMove> 60) {

    }; 

    /** DEBUGGING 
    console.log(`delta y: ${evt.screenY} - ${y}`);
    console.log(`= ${yMove}`);
    */
}
