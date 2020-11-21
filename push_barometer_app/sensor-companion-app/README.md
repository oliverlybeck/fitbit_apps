# Log Sensor Data to Localhost #
## An interactive questionnaire and sensory data logger that feeds data outside FitBit environment ##
A fitbit app that logs barometric and heartrate sensor data and the answers from an interactive questionnaire to a log file via a PHP server on localhost.

### Companion App ###
##### companion/index.js ######
Currently contains configurable settings for enabling/disabling Heart Rate Sensor and the Barometer.
* Comprises of `messaging` event listners to send information to the Watch App and pull the JSON objects from the watch.
* On receiving a message from the watch App, `postData` gets triggered which uses `fetch()` API to POST to `get_data.php` on the php server (currently hardcoded as `http://localhost:8888/get_data.php`).
* Data is logged in `localhost/php_log`.

### Watch App ###
##### app/index.js #####
###### EventListeners ######
* [yes/no]Button: Listens to the questionnaire's `yes` buttons actions. 
** if questionnaireCounter (tally of how many questions has already been presented) is 2 i.e. the final value, the returned JSON string will be stored in finalJSON
** with no being the first option of the questionnaire i.e. `questionnaireCounter == 0`, the questionnaire will hide.
* Sensor Monitoring
** Listens to messages being sent from the Companion App, namely for initial settings configurations and sensor on/off toggles
** Triggers `displayedSensors` that will dynamically reposition the visible sensors on the GUI when hidden/unhidden
* exit
** Triggers the action of sending data back to Companion App. 
** Stringifies `finalJSON`
** exits the app
###### Functions ######
* `displayedSensors`: Dynamic layout of sensor elements in the gui.

##### app/appGUI.js #####
Controls the dynamic layout and positioning of displayed sensor values and timer

##### app/textSequence.js #####
Handles the questionnaire information, generates the JSON object that eventually gets pushed to Companion App

##### timeControl.js #####
* Exports a milliseconds to seconds (Type: String??) function
* Get current time in "YYYY-MM-DD hh24:mi:ss" format.
