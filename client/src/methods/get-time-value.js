function getTimeValue(time, type){
    if (type == "amorpm"){
        return time.slice(-2);
    } else if (type == "hours"){
        return parseInt(time.slice(null, 2));
    } else if (type == "minutes"){
        return parseInt(time.slice(3,5));
    }
}

export default getTimeValue;