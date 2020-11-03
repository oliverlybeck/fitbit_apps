import { Barometer } from "barometer";
import { HeartRateSensor } from "heart-rate";
import { display } from "display";
import { convertMsAgoToString } from "./timeControl";


var hrSensor;
var barSensor;
var sensorVal;
var updateDisplayInterval;
let document = require("document");
let barLabel = document.getElementById("barReading");
let hrLabel = document.getElementById("hrReading");
let updatedHrLabel = document.getElementById("updated");
// Keep a timestamp of the last reading received. Start when the app is started.
let lastValueTimestamp = Date.now();

// Initialize the UI with some values
barLabel.text = "--";
hrLabel.text = "--";
updatedHrLabel.text = "...";

export function hrControl(sensorBool) {
    if (sensorBool == "true") {
    if (hrSensor == undefined) {
        hrSensor = new HeartRateSensor();
    }
    hrSensor.start();
        updateDisplayInterval = setInterval(updateDisplay, 1000);
    }
    else {
    if (hrSensor !== undefined) {
        hrSensor.stop();
    }
    clearInterval(updateDisplayInterval);
    }
};

export function barControl(sensorBool) {
    if (sensorBool == "true") {
    if (barSensor == undefined) {
        barSensor = new Barometer();
    }
    barSensor.start();
    updateDisplayInterval = setInterval(updateDisplay, 10000);
    }
    else {
    if (barSensor !== undefined) {
        barSensor.stop();
    }
    clearInterval(updateDisplayInterval);
    }
};

// This function updates the label on the display that shows when data was last updated.
function updateDisplay() {
    if (display.on) {
        if (sensorVal != hrSensor.heartRate) {
        sensorVal = hrSensor.heartRate;
        lastValueTimestamp = Date.now();
        }
        barLabel.text = (barSensor.pressure/1000).toFixed(2);
        hrLabel.text = sensorVal;
        updatedHrLabel.text = convertMsAgoToString(Date.now() - lastValueTimestamp);
    } else {
    hrSensor.stop();
    }
}

