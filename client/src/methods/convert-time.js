function convertTime(time, target){
    if (target === "utc"){
        //convert Date to UTC (to be implemented)

    } else {
        //convert UTC to Date e.g "12:00 PM"
        let date = new Date()
        let amOrPm = time.slice(-2)
        console.log(amOrPm)
        let hours = parseInt(time.slice(null, 2))
        console.log(hours)
        let minutes = parseInt(time.slice(3,5))
        console.log(minutes)

        if (amOrPm === "AM") {
            hours === 12 ? date.setHours(0) : date.setHours(hours)
        } else {
            hours === 12 ? date.setHours(12) : date.setHours(hours + 12)
        }

        date.setMinutes(minutes)
        date.setSeconds(0)

        return date
    }
}

export default convertTime