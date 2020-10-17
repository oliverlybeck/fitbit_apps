import document from "document";
import * as messaging from "messaging";

console.log("triggering watch app...");

function triggerSensor(){
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    console.log("sending get command to watch app")
    messaging.peerSocket.send({
    command: "get"
  });
  }
  else {
  console.log("Not ready to transfer data");
  }
};

function receivedMessage(data){
  console.log(`testing the contents: ${data}`);
};

messaging.peerSocket.addEventListener("open", (evt) => {
  console.log("triggering sensor");
  triggerSensor();
});

/**
// Set up API comms
var API_KEY = "";
var ENDPOINT = "";

var local_url = 'http://localhost:8888/get_data.php';
var data_1 = {hello:"world"};

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

// The test_msg sends a json trigger (much like PubSub) to the sensor app on the watch. The watch app will catch this trigger and act upon it.
function triggerSensor(){
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    console.log("sending get command to watch app")
    messaging.peerSocket.send({
    command: "get"
  });
  }
  else {
  console.log("Not ready to transfer data");
  }
};

function receivedMessage(data){
  console.log(`testing the contents: ${data}`);
};

messaging.peerSocket.addEventListener("open", (evt) => {
  console.log("triggering sensor");
  triggerSensor();
});


// Sets up an instance that will listen to messages coming from the app and will trigger the console print of its contents when successful (Asynchronously?).
messaging.peerSocket.addEventListener("message", (evt) => {
  console.log("Posting Data");
  if (evt.data) {
    receivedMessage(evt.data);
    console.log(`posting data containing ${evt.data}`);
    postData(local_url, evt.data);
  }
});
**/