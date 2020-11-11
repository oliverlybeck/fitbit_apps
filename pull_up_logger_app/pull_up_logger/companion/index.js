/**
 * Send data to watch app
 */

import document from "document";
import * as messaging from "messaging";
import { settingsStorage } from "settings";

setTimeout(function() {
    msgWatch("test");
  }, 50);

function msgWatch(msg){
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

  messaging.peerSocket.addEventListener("message", (evt) => {
    if (evt.data) {
      receivedMessage(evt.data);
    }
    else {
      console.error("Error: Connection is not open");
    }
  });