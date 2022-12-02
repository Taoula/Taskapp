import getTimeValue from "./get-time-value";

function modifyTime(time, type, value){
    let hours = getTimeValue(time, "hours")
    let minutes = getTimeValue(time, "minutes")
    let amorpm = getTimeValue(time, "amorpm")

    if (type == "hours"){
        hours = value;
    } else if (type == "minutes"){
        minutes = value;
    } else if (type == "amorpm"){
        amorpm = value;
    }

    let hoursString = hours.toString()
    let minutesString = minutes.toString()

    if (hoursString.length == 1){
        hoursString = "0".concat(hoursString)
    }

    if (minutesString.length == 1){
        minutesString = "0".concat(minutesString)
    }

    return (hoursString + ":" + minutesString + " " + amorpm)
}

export default modifyTime