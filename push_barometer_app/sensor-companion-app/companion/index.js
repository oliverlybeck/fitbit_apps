import document from "document";
import * as messaging from "messaging";
import { settingsStorage } from "settings";

settingsStorage.setItem("hr", "true");
settingsStorage.setItem("bar", "true");

let hrSettingsVal = settingsStorage.getItem("hr");
let barSettingsVal = settingsStorage.getItem("bar");


var defaultSettings = {"hr": hrSettingsVal,
                       "bar": barSettingsVal 
                      }

setTimeout(function() {
  triggerSensors(JSON.stringify(defaultSettings));
}, 50);

function triggerSensors(msg){
  console.log(`triggering watch app with message: ${msg}`);
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    console.log("Sending get command to watch app")
    messaging.peerSocket.send({
    command: msg
  });
  }
  else {
    console.log("Not ready to transfer data");
  }
};

// Gets triggered when setting for sensor is toggled
settingsStorage.addEventListener("change", (evt) => {
  var key = evt.key;
  var val = evt.newValue;
  var alterationJSON = `{"${key}": "${val}"}`;
  console.log(alterationJSON);
  triggerSensors(alterationJSON);
});

//####################################
// Set up API comms
var API_KEY = "";
var ENDPOINT = "";

var local_url = 'http://localhost:8888/get_data.php';

function postData(url = '', data = {}){
  console.log("commencing fetch()")
  fetch(url, {
    method: "POST",
    mode: "same-origin",
    credentials: "same-origin",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  }).then(response => {
    console.log("response=" + response + ", " + response.status);
    console.log("response.text:" + response.text);
    console.log();
  })
  .catch((error) => {
    console.error('Error:', error);
  })
};

// Sets up an instance that will listen to messages coming from the app and will trigger the console print of its contents when successful (Asynchronously?).
messaging.peerSocket.addEventListener("message", (evt) => {
  console.log("Posting Data");
  if (evt.data) {
    receivedMessage(evt.data);
    console.log(`posting data containing ${evt.data}`);
    postData(local_url, evt.data);
  }
});

function receivedMessage(data){
  console.log(`testing the contents: ${data}`);
};