/**
 * This module handles the sequence of events for the questionnaire buttons
 * Prompt "Ready to start"
 * If yes, log time and sensory data. Proceed.
 * Log "yes" and "no" answers that follow into a dict/array/json.
 * Once done, push to companion.
 */

import * as fs from "fs";
import { getCurrentTime } from "./timeControl";

let document = require("document");
let questionnaire = document.getElementById("questionnaire");
let yes = document.getElementById("yesButton");
let no = document.getElementById("noButton");

let barLabel = document.getElementById("barReading");
let hrLabel = document.getElementById("hrReading");
let barUnit = document.getElementById("barUnit");
let hrUnit = document.getElementById("hrUnit");

var questionnaireJSON;

try {
  questionnaireJSON = fs.readFileSync("/mnt/assets/resources/questionnaire.json", "json");
  console.log("Template json initiated!");
} catch(e){
  console.log("Oh snap we have an error???");
  console.log(e);
}

export function logSensorData() {
  questionnaire.text = "Sensor data and time is logged!";
  // log the sensor readings and time

  const timeOfMeasurement = getCurrentTime();
  questionnaireJSON.pressure = barLabel.text + " " + barUnit.text;
  questionnaireJSON.hr_avg = hrLabel.text + " " + hrUnit.text;
  questionnaireJSON.time = timeOfMeasurement;
  questionnaire.text = "Tired?";
}

export function questionnaireResult(bool, counter) {
  switch (counter) {
    case 1:
        questionnaireJSON.tired = bool;
        questionnaire.text = "Workout?";
        break;
    case 2:
        questionnaireJSON.workout = bool;
        hideButtons();
        //console.log(JSON.stringify(questionnaireJSON));
        return questionnaireJSON;
    default:
        logSensorData();
        break;
  }
}

function hideButtons() {
    questionnaire.class = "invisible";
    yes.class = "invisible";
    no.class = "invisible";
}

