import addDays from "./add-days"

function convertTime(time, target, handleDateChange){
    //console.log("RUNNING")
    if (target == "utc"){
        //console.log(" converting " + time + "to utc")
        //convert Date to UTC (to be implemented)
        let dt = new Date(time)
        let hours = dt.getHours();
        //console.log("hours is " + hours)
        let amOrPm = hours >= 12 ? 'pm' : 'am';
        hours = (hours % 12) || 12;
        let minutes = dt.getMinutes();
        if (minutes < 10) {
            minutes = "0" + minutes
        }
        //console.log(hours + ":" + minutes + " " + amOrPm)
        return hours + ":" + minutes + " " + amOrPm;
    } else {
        //convert UTC to Date e.g "12:00 PM"
        //console.log("converting " + time + "to date")
        let date = new Date()
        let amOrPm = time.slice(-2)
        //console.log(amOrPm)
        let hours = parseInt(time.slice(null, 2))
        //console.log(hours)
        let minutes = parseInt(time.slice(3,5))
        //console.log(minutes)

        if (amOrPm === "AM") {
            hours === 12 ? date.setHours(0) : date.setHours(hours)
        } else {
            hours === 12 ? date.setHours(12) : date.setHours(hours + 12)
        }

        date.setMinutes(minutes)
        date.setSeconds(0)

        //console.log("date before handle is " + date);

        // Check and see if time has passed on current date. if so, add a day
        if (handleDateChange){
            let today = new Date()
            //console.log("today is " + today);
            //console.log("date is " + date)
    
            if (date < today){
                date = addDays(date, 1)
               console.log("adding date")
            }
    
            //console.log("converted date is " + date)
        }

       // console.log("date as pushed is " + date)
        return date
    }
}

export default convertTime