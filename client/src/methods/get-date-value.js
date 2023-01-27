function getDateValue(dt, format){
    let date = new Date(dt)
    let months = ["January","February","March","April","May","June","July","August","September","October","November","December"]
    let day = date.getDate()
    let year = date.getFullYear()

    if (format == "written"){
        let month = months[date.getMonth()]
        return month + " " + day + ", " + year
    } else if (format == "numeric"){
        let month = date.getMonth() + 1
        return month + "/" + day + "/" + year
    } else {
        return "invalid format parameter"
    }
}

export default getDateValue;