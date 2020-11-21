// This function takes a number of milliseconds and returns a string
// such as "5min ago".
export function convertMsAgoToString(millisecondsAgo) {
    return Math.round(millisecondsAgo / 1000);
    /**
    if (millisecondsAgo < 120*1000) {
    return Math.round(millisecondsAgo / 1000);
    }
    else if (millisecondsAgo < 60*60*1000) {
    return Math.round(millisecondsAgo / (60*1000));
    }
    else {
    return Math.round(millisecondsAgo / (60*60*1000))
    }
    */
}

export function getCurrentTime() {
    // Desired time format: "YYYY-MM-DD hh24:mi:ss"
    let currentTime = new Date();
    let date = ("0" + currentTime.getDate()).slice(-2);
    let month = ("0" + (currentTime.getMonth() + 1)).slice(-2);
    let year = currentTime.getFullYear();
    let hours = currentTime.getHours();
    let minutes = currentTime.getMinutes();
    let seconds = currentTime.getSeconds();
    let timeOfMeasurement = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
    return timeOfMeasurement;
}
