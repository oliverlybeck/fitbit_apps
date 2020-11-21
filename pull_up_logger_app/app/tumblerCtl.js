let document = require("document");
let tumblerTop = document.getElementById("counterTumblerFaderTop");
let tumblerBottom = document.getElementById("counterTumblerFaderBottom");
let tumblerMain = document.getElementById("counterTumbler");


// Get current tumblerMain value
export function currVal() {
    var someVal = tumblerMain.text;
    return someVal;
}

// Default tumbler value
export function defaultTumbler() {
    tumblerTop.text = "";
    tumblerMain.text = 0;
    tumblerBottom.text = 1;
}

// Value goes up
export function swipeDown(swipeMagnitude, prevValue) {
    if (swipeMagnitude < -35) {
        tumblerMain.text = Number(prevValue) + 2;
        tumblerTop.text = Number(prevValue) + 1;
        tumblerBottom.text = Number(prevValue) + 3;  
    }
    else if (swipeMagnitude < 0) {
        tumblerMain.text = Number(prevValue) + 1;
        tumblerTop.text = Number(prevValue);
        tumblerBottom.text = Number(prevValue) + 2;
    }
}

// Value goes down
export function swipeUp(swipeMagnitude, prevValue) {
    if (swipeMagnitude > 35) {
        if (prevValue <= 2) {
            defaultTumbler();
        }
        else {
            tumblerTop.text = Number(prevValue) - 3;
            tumblerMain.text = Number(prevValue) - 2;
            tumblerBottom.text = Number(prevValue) - 1;
        }
    }
    else if (swipeMagnitude > 0) {
        if (prevValue <= 1) {
            defaultTumbler();
        }
        else {
            tumblerTop.text = Number(prevValue) - 2;
            tumblerMain.text = Number(prevValue) - 1;
            tumblerBottom.text = Number(prevValue);
        } 
    }
}

export function submitCurrVal() {
    console.log(`SUBMIT THIS VALUE: ${tumblerMain.text}`);
    var repCount = tumblerMain.text;
    return repCount;
}