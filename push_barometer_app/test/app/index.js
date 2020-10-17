import * as messaging from "messaging";
import { Barometer } from "barometer";
import document from "document";
import { display } from "display";

const sensors = [];
/** 
// The function that reads the barometer sensor's reading and then processes the value into a json format
// Note: the sendBarometricData function needs to be withing the event handler, as the values do not get stored in the original variables
// The variables do not update due to event handlers creating a new instance (with new variables ) each time when triggered.
function barometerReading() {
  const barData =  "none";
  if (Barometer) {
    const barometer = new Barometer({ frequency: 10 });
    barometer.addEventListener("reading", () => {
      console.log(`${barometer.pressure}`)
      barData = JSON.stringify({
        pressure: barometer.pressure ? parseInt(barometer.pressure) : 0,
        unit: "Pa"
      });
      console.log(`On completion of sensor collect: ${barData}`)
      sendBarometricData(barData);
    });
    display.addEventListener("change", () => {
      display.on ? barometer.start() : barometer.stop();
    });
    barometer.start();
  }
  else {
    barData = "none";
  };
}

// Use this function to send data to companion app
function sendBarometricData(data) {
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    console.log(`On the watch: ${data}. Sending data to phone.`)
    messaging.peerSocket.send(data);
  }
}

// "main trigger". Receive a trigger from companion app and trigger the barometer reading
messaging.peerSocket.addEventListener("message", (evt) => {
  if (evt.data && evt.data.command == "get") {
      barometerReading();
    }
  else {
    console.error("Error: Connection is not open");
  }
});
**/

/** App idea:
 * Have a setInterval in companion app that triggers a call on watch app every X minutes.
 * The watch app then will then trigger an alert on the watch and ask a series of "yes/no" questions.
 * * * Question Ideas:
 * Are you feeling drowsy today?
 * Have you exercised today?
 * * (if yes) What type of exercise was it?
 * * Cardio, Weights, Parkour
 * * (depending on the workout) specify the workouts. 
 * The response data is then stored in an array and pushed to the companion app.
 ** Close watch app at this point
 * The Companion app then pushes the data forward to another DB
 * Done
 **/

let document = require("document");
import { HeartRateSensor } from "heart-rate";
import { Barometer } from "barometer";
import { display } from "display";
import { me } from "appbit";

// Fetch UI elements we will need to change
let barLabel = document.getElementById("bar");
let updatedLabel = document.getElementById("updated");
let myRect = document.getElementById("myButton");

// Keep a timestamp of the last reading received. Start when the app is started.
let lastValueTimestamp = Date.now();

// Initialize the UI with some values
barLabel.text = "--";
updatedLabel.text = "...";

// This function takes a number of milliseconds and returns a string
// such as "5min ago".
function convertMsAgoToString(millisecondsAgo) {
  if (millisecondsAgo < 120*1000) {
    return Math.round(millisecondsAgo / 1000);
  }
  else if (millisecondsAgo < 60*60*1000) {
    return Math.round(millisecondsAgo / (60*1000));
  }
  else {
    return Math.round(millisecondsAgo / (60*60*1000))
  }
}

// This function updates the label on the display that shows when data was last updated.
function updateDisplay() {
  if (display.on) {
    sensor.start();
    if (lastValueTimestamp !== undefined) {
      updatedLabel.text = convertMsAgoToString(Date.now() - lastValueTimestamp);
    }
  } else {
    sensor.stop();
  }
}

myRect.addEventListener("click", (evt) => {
  console.log("Terminating app");
  me.exit();
})

display.addEventListener("change", () => {
  display.on ? sensor.start() : sensor.stop();
  if (display.on != 'True') {
    me.exit();
  } 
})

// Begin monitoring the sensor
messaging.peerSocket.addEventListener("message", (evt) => {
  if (evt.data && evt.data.command == "get") {
    console.log("barometer supposed to start");
    setInterval(updateDisplay, 1000);
    }
  else {
    console.error("Error: Connection is not open");
  }
});

// Create a new instance of the HeartRateSensor object
var sensor = new HeartRateSensor();

// Declare an event handler that will be called every time a new HR value is received.

sensor.onreading = function() {
  // Peek the current sensor values
  //barLabel.text = (bar.pressure/1000).toFixed(2) + "kPa";
  barLabel.text = sensor.heartRate;
  lastValueTimestamp = Date.now();
}


// And update the display every second

//setInterval(updateDisplay, 1000);






