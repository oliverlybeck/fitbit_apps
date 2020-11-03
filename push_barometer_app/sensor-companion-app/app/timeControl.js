// This function takes a number of milliseconds and returns a string
// such as "5min ago".
export function convertMsAgoToString(millisecondsAgo) {
    if (millisecondsAgo < 120*1000) {
    return Math.round(millisecondsAgo / 1000);
    }
    else if (millisecondsAgo < 60*60*1000) {
    return Math.round(millisecondsAgo / (60*1000));
    }
    else {
    return Math.round(millisecondsAgo / (60*60*1000))
    }
}
