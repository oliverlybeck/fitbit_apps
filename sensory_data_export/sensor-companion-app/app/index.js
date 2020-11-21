import { me } from "appbit";
import * as messaging from "messaging";
import * as sensorCtl from "./appGui";
import * as questionnaireCtl from "./textSequence";


let document = require("document");
let exit = document.getElementById("exitButton");
let yes = document.getElementById("yesButton");
let no = document.getElementById("noButton");


var questionnaireCounter = 0;
// Initialise JSON file for questionnaire
var finalJSON;

yes.addEventListener("click", (evt) => {
    if (questionnaireCounter == 2) {
      finalJSON = questionnaireCtl.questionnaireResult("yes", questionnaireCounter);
    }
    else {
      questionnaireCtl.questionnaireResult("yes", questionnaireCounter);
    }
    questionnaireCounter += 1;
})

no.addEventListener("click", (evt) => {
  if (questionnaireCounter == 0) {
    questionnaireCounter = "Exit";
    questionnaireCtl.questionnaireResult("no", questionnaireCounter);
    console.log("Exiting questionnaire")
  }
  else if (questionnaireCounter == 2) {
    finalJSON = questionnaireCtl.questionnaireResult("no", questionnaireCounter);
  }
  else {
    questionnaireCtl.questionnaireResult("no", questionnaireCounter);
    questionnaireCounter += 1;
  }
})

var tally;
// Begin monitoring the sensor
messaging.peerSocket.addEventListener("message", (evt) => {
  if (evt.data) {
    var jsonSettings = JSON.parse(evt.data.command);
    if (tally == undefined){
      var maxLength = Object.keys(jsonSettings).length;
      tally = 0;
    }

    for(var sensorname in jsonSettings){
      var sensorOn = jsonSettings[sensorname];
      displayedSensors(sensorname, sensorOn);
      console.log(`${sensorname}: ${jsonSettings[sensorname]}`);
      if (sensorname == "hr"){
        sensorCtl.hrControl(sensorOn);
      }
      else if (sensorname == "bar"){
        sensorCtl.barControl(sensorOn);
      }
    }
    if (tally > maxLength) {
      tally = maxLength;
    }
  }
  else {
   console.error("Error: Connection is not open");
  }
});

function displayedSensors(key, setting) {
  let ele = document.getElementById(key);
  if (setting == 'false'){
    ele.class = "invisible"
    tally -= 1;
    let remainingVisibles = document.getElementsByClassName("visible");
    var count = 0;
    remainingVisibles.forEach((element) => {
      element.y = 25 + count * 25;
      count += 1;
    })
  }
  else {
    ele.class = "visible"
    ele.y = 25 + tally * 25;
    tally += 1;
  }
}

// Send sensor data to companion app
function sendDataToCompanion(data) {
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    messaging.peerSocket.send(data);
  }
}

// Exit the app
exit.addEventListener("click", (evt) => {
  console.log("Terminating app");
  console.log(JSON.stringify(finalJSON));
  const Data = JSON.stringify(finalJSON);
  sendDataToCompanion(Data);
  me.exit();
})



