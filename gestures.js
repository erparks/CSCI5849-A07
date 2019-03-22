
const GESTURE_HISTORY_SIZE = 10

let performedGestures = getArrayWithLimitedLength(GESTURE_HISTORY_SIZE);

let downX = 0
let upX = 0


//Taken from https://stackoverflow.com/questions/31023330/drop-last-element-of-javascript-array-when-array-reaches-specific-length
function getArrayWithLimitedLength(length) {
    var array = new Array();

    array.push = function () {
        if (this.length >= length) {
            this.shift();
        }
        return Array.prototype.push.apply(this, arguments);
    }

    return array;

}

function updateGestureResult(gesture) {
    performedGestures.push(gesture)
    list = "<ul id='gestureList'>"

    performedGestures.forEach((gesture) => {
        list += "<li>" + gesture + "</li>"
    })

    list += "</ul>"

    console.log(list)

    $("#gestureList").replaceWith(list)
}

$("#gestureArea").mousedown((e) => {
    console.log("Mouse down")
    updateGestureResult("Mouse Down")
    downX = e.pageX
})

$("#gestureArea").mouseup((e) => {
    console.log("Mouse up")


    if (downX == e.pageX) {
        updateGestureResult("Mouse Up")
    }
    else if (downX < e.pageX) {
        updateGestureResult("Swipe Right")
    }
    else {
        updateGestureResult("Swipe Left")
    }
})
