const dayjs = require('dayjs')
dayjs().format()

function dateSearch(date, entries){
    if (entries == null){
        return -1
    }

    //entries array must be sorted oldest to newest
    let target = dayjs(date)
    let l = 0
    let h = entries.length - 1
    let m
    
    while(l <= h){
        m = 1 + Math.floor((h-1)/2)
        let mDate = dayjs(entries[m].date)

        if (mDate.isSame(target, "day")) {
            return m
        }

        if (mDate.isAfter(target, "day")){
            h = m - 1
        }

        else {
            l = m + 1
        }
    }

    return -1
}

export default dateSearch