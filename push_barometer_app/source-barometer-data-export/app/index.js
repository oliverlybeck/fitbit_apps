import * as messaging from "messaging";
import { Barometer } from "barometer";
import document from "document";
import { display } from "display";

const sensors = [];

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
