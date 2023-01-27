function sameDate(date1, date2){
    let myDate1 = new Date(date1)
    let myDate2 = new Date(date2)
    return (myDate1.getDate() == myDate2.getDate() && myDate1.getMonth() == myDate2.getMonth() && myDate1.getFullYear() == myDate2.getFullYear())
}

export default sameDate;