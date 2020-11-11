import { me } from "appbit";
import * as messaging from "messaging";

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
    console.log(`x:${x}, y:${y}`);
    console.log(`Prev Value=${Number(prevValue) + 1}`);
}

tumbler.onmouseup = function(evt) {
    let yMove = evt.screenY-y;
    let xMove = evt.screenX-x;
    console.log(`delta y: ${evt.screenY} - ${y}`);
    console.log(`= ${yMove}`);
    //swipe up
    if (yMove < -20) {
        tumblerMain.text = Number(prevValue) + 2;
        tumblerTop.text = Number(prevValue) + 1;
        tumblerBottom.text = Number(prevValue) + 3;  
    }
    else if (yMove < 0) {
        tumblerMain.text = Number(prevValue) + 1;
        tumblerTop.text = Number(prevValue);
        tumblerBottom.text = Number(prevValue) + 2;
    };

    //swipe down
    if (yMove > 0) {
        if (prevValue > 2) {
            tumblerTop.text = Number(prevValue) - 2;
            tumblerMain.text = Number(prevValue) - 1;
            tumblerBottom.text = Number(prevValue);
        }
        else if (prevValue = 1) {
            tumblerTop.text = "";
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
}
