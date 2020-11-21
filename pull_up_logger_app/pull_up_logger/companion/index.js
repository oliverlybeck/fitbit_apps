/**
 * Send data to watch app
 */

import document from "document";
import * as messaging from "messaging";
import { settingsStorage } from "settings";

let hrSettingsVal = settingsStorage.getItem("hr");
let tumblerSettingsVal = settingsStorage.getItem("resetTumbler");

var defaultSettings = {"hr": hrSettingsVal,
                       "defaultTumbler": tumblerSettingsVal 
                      }

setTimeout(function() {
  msgWatch(defaultSettings);
}, 50);

function msgWatch(msg){
    console.log(`triggering watch app with message: ${JSON.stringify(msg)}`);
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

// Listens for data getting sent from app
messaging.peerSocket.addEventListener("message", (evt) => {
  if (evt.data) {
    console.log(JSON.stringify(evt.data));
  }
  else {
    console.error("Error: Connection is not open");
  }
});

