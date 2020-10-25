//const sensors = [];
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


import { me } from "appbit";
import * as messaging from "messaging";
import * as sensorCtl from "./sensorControl";

let document = require("document");

// Fetch UI elements we will need to change
//let updatedHrLabel = document.getElementById("updated");
let myRect = document.getElementById("myButton");

myRect.addEventListener("click", (evt) => {
  console.log("Terminating app");
  me.exit();
})

/**
display.addEventListener("change", () => {
  display.on ? hrSensor.start() : hrSensor.stop();
  if (display.on != 'True') {
    me.exit();
  } 
})
*/

// Begin monitoring the sensor
messaging.peerSocket.addEventListener("message", (evt) => {
  if (evt.data) {
    var jsonSettings = JSON.parse(evt.data.command);
    console.log("testing that app gets to loop thingy")
    for(var sensorname in jsonSettings){
      var sensorOn = jsonSettings[sensorname];
      console.log(`${sensorname}: ${jsonSettings[sensorname]}`);
      if (sensorname == "hr"){
        sensorCtl.hrControl(sensorOn);
      }
      else if (sensorname == "bar"){
        sensorCtl.barControl(sensorOn);
      }
    }
  }
  else {
   console.error("Error: Connection is not open");
  }
});

function sensorReading() {
  const Data =  "none";
  Data = JSON.stringify({
    hr: sensor.heartRate,
    unit: "bpm"
  });
  sendDataToCompanion(Data);
}

// Send sensor data to companion app
function sendDataToCompanion(data) {
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    messaging.peerSocket.send(data);
  }
}





