import axios from "axios"
import addMinutes from "./add-minutes"
import sameDate from "./same-date"
import dateSearch from "./date-search"
import rda from "../methods/rda"
import rpa from "../methods/rpa"
const dayjs = require('dayjs')

dayjs().format()

async function newSort(setSchedule, currentDay, resort){
    try{

    
    let functionStart = dayjs(new Date())
    
    function checkTimeout(){
        let rightNow = dayjs(new Date())
        if (rightNow.diff(functionStart, "seconds") > 2){
            throw new Error("Something went wrong. Try again later.")
        }
    }

    console.log("-------INITIALIZING NEWSORT--------")
    const scheduleReq = await axios.get("http://localhost:8282/schedule/")
    let populated = false
    let {entries} = scheduleReq.data
    let entryIndex
    for (let i = 0; i < entries.length; i++){
        if (sameDate(entries[i].wake, currentDay)){
            entryIndex = i
        }
    }

    let wakeDate = entries[entryIndex].wake
    let sleepDate = entries[entryIndex].sleep
    //console.log(entries)
    console.log(scheduleReq.data)
    console.log(wakeDate)
    console.log(sleepDate)


    //1 - ARRAY & VARIABLE INITIALIZATION-------------------------------------------

        //Calculate total time between wake & sleep (minutes)
            let now = dayjs(new Date)
            let wake = resort ? now : dayjs(wakeDate)
            console.log(wake.format('HH:mm:ss'))
            wake = wake.set('second', 0)
            wake = wake.set('millisecond', 0)
            let sleep = dayjs(sleepDate)
            sleep = sleep.set('second', 0)
            sleep = sleep.set('millisecond', 0)
            let totalTime = sleep.diff(wake, "minute")
            
            if (totalTime == 0) {
                throw new Error("There is no time in your day!")
            }

            // TODO: IMPLEMENT IN USER SETTINGS
            let freeTimeProportions = [1, 1, 1]
            let fTPrSum = freeTimeProportions.reduce((sum, value)=> sum + value, 0)

        //Store crude array of tasks marked as active & incomplete on currentDay
            //get active tasks from db
                const taskReq = await axios.get("http://localhost:8282/task/")
                let tasks = []


            //loop through all tasks TODO reoptimize
                //REFERENCE POINT 0

                for (let i = 0; i < taskReq.data.length; i++){
                    let k = dateSearch(currentDay, taskReq.data[i].entries)
                    if (k >= 0){
                        //console.log("task found: ")
                        //console.log(taskReq.data[i].entries[k])
                    }
                    if (k >= 0 && taskReq.data[i].entries[k].isActive && !taskReq.data[i].entries[k].completed) {
                        let {priority, duration, notes, links, completed, time, next, prev, divisions} = taskReq.data[i].entries[k]
                        let {name, _id} = taskReq.data[i]
                        let taskToPush = {
                            name,
                            priority: parseInt(priority),
                            duration: parseInt(duration),
                            notes,
                            links,
                            completed,
                            time,
                            _id,
                            next,
                            prev,
                            divisions
                        }
                        // REFERENCE POINT 1
                        //console.log(taskToPush)
                        tasks.push(taskToPush)
                        //console.log(tasks)
                    } else {
                        console.log(k)
                    }
                }

                console.log(tasks)
                
                //REFERENCE POINT 2
                //console.log(tasks)

                //resort handling
                let tempSchedule
                if (resort){
                    console.log("Resort")
                    tempSchedule = entries[entryIndex]
                    let position = findSchedulePosition(now, tempSchedule)
                    // [1-2, 2-330, 330-530, 530-645, 645-7, 7-720] 6:00
                    if (tempSchedule[position].start == now){
                        tempSchedule = tempSchedule.splice(position)
                    } else {
                        //adjust length of partially completed (current) task
                        let copyLength = tempSchedule[position - 1].end.diff(now)
                        let targetIndex = tasks.findIndex(t => t._id == tempSchedule[position - 1]._id)
                        tempSchedule[position-1].end = now
                        tempSchedule = tempSchedule.splice(position)
                        tasks[targetIndex].duration = copyLength
                    }
                }

        // Calculate task sum time & free time pool
            let taskSum = tasks.reduce((total, task) => total + task.duration, 0)
            let freeTimePool = totalTime - taskSum

        // If task sum > total time, shave time
            if (taskSum > totalTime){
                
                freeTimePool = 0
                shave()
            }

            console.log("init ftp is " + freeTimePool)

        // If free time > 0, calculate length & frequency (RDA & RPA)
            let freeTimes
            let frequencies

            if (freeTimePool > 0){

                // If free time is less than division proportions, put it all in one block
                if (freeTimePool < fTPrSum) {
                    freeTimes = [freeTimePool]
                } else {
                    // Scale each free time block to the desired proportion of the pool
                    freeTimes = rpa(freeTimePool, freeTimeProportions)
                    console.log(freeTimes)
                    //Scale freetimes to intervals of 5
                    let diff = 0
                    for (let i = 0; i < freeTimes.length - 1; i++){
                        let original = freeTimes[i]
                        let rounded = Math.round(original / 5) * 5
                        diff += original - rounded

                        freeTimes[i] = rounded
                    }

                    freeTimes[freeTimes.length - 1] += diff
                    freeTimes = freeTimes.filter(item => item != 0)

                    //Adjust proportions for any deletions
                    if (freeTimes.length < freeTimeProportions.length){
                        freeTimeProportions.splice(0, freeTimeProportions.length - freeTimes.length)
                    }
                    console.log(freeTimes)
                    //Scale frequencies
                    frequencies = rpa(taskSum, freeTimeProportions)
                }
            } else {
                freeTimes = []
                frequencies = []
            }
    //2 - TASK & SCHEDULE INITIALIZATION--------------------------------------------
    /*TODO: 
    
        1. Implement RPA for tasks (scaled task blocks like free time)
        2. Don't allow divisions on fixed time tasks (front end)
        3. Don't allow conflicting fixed time tasks (front end, MUST INCLUDE NEXT TREES)
        4. Save divisions in task (ID? Division ID?) (allow one division to be marked complete, but not entire task, etc.)
    */

    //Clone tasks with divisions > 1 (RDA)
    let schedule = []
    let cTasks = []

    for (let i = 0; i < tasks.length; i++){
            if (tasks[i].divisions == 1){
                cTasks.push(tasks[i])
            } else {
                let durations = rda(tasks[i].duration, tasks[i].divisions)
                console.log(durations)
                for (let k = 0; k < durations.length; k++){
                    let cloneTaskObject = {...tasks[i]};
                    //let cloneTaskObject = tasks[i]
                    cloneTaskObject.duration = durations[k]
                    
                    cloneTaskObject.divisionId = k
                    console.log(cloneTaskObject)
                    cTasks.push(cloneTaskObject)
                }
            }
    }
    console.log(cTasks)
    tasks = cTasks

    //Add fixed time of day tasks to schedule. Add all child task trees (task.next). Remove from crude array.

    let fixedCount = 0
    let fixedArray = []
    for (let i = 0; i < tasks.length; i++){
        if (tasks[i].time != null && tasks[i].time != ''){
            fixedCount++;
        }
    }

    while(fixedCount > 0){
        checkTimeout()
        console.log(fixedCount)
        for (let i = 0; i < tasks.length; i++){
            let currentTask
            if (tasks[i].time != null && tasks[i].time != ''){
                currentTask = tasks[i]
                pushToSchedule(currentTask, schedule.length)
                fixedCount--
                while(currentTask.next != ''){
                    currentTask = currentTask.next
                    pushToSchedule(currentTask, schedule.length)
                }
                 i = 0
            }
        }
    }

    //Sort scheduled fixed tasks by start time
    schedule.sort((a, b) => {

        let dateA = dayjs(a.start);
        let dateB = dayjs(b.start);

        if (dateA.isBefore(dateB)) {
            return -1;
        }

        if (dateA.isAfter(dateB)) {
            return 1;
        }

        return 0; 
    });
    
    for (let i = 0; i < schedule.length; i++){
        console.log(schedule[i])
    }

    //Sort remaining crude task array by priority, any other parameters (TODO)

    let priorityOne = []
    let priorityTwo = []
    let priorityThree = []
    let divided = []


    for (let i = 0; i < tasks.length; i++){
        if(tasks[i].divisions > 1){
            divided.push(tasks[i])
        }
        else if (tasks[i].priority === 1) {
            priorityOne.push(tasks[i]);
        }

        else if (tasks[i].priority === 2) {
            priorityTwo.push(tasks[i]);
        }

        else if (tasks[i].priority === 3) {
            priorityThree.push(tasks[i]);
        }
    }

    tasks = priorityOne.concat(priorityTwo).concat(priorityThree)

    if (divided.length > 0){
        // Calculate the total number of items with the same _id
        const countMap = new Map();
        for (let item of divided) {
        if (countMap.has(item._id)) {
            countMap.set(item._id, countMap.get(item._id) + 1);
        } else {
            countMap.set(item._id, 1);
        }
        }

        // Create a map to track the current index for each unique _id in the tasks array
        const indexMap = new Map();
        for (let [_id, count] of countMap.entries()) {
            indexMap.set(_id, 0);
        }

        // Sort divided based on _id for even distribution
        divided.sort((a, b) => a._id - b._id);

        // Distribute items in divided into tasks based on count
        for (let item of divided) {
            const _id = item._id;
            const count = countMap.get(_id);
            const index = indexMap.get(_id);

            // Calculate the target index in tasks array for the current item
            const targetIndex = Math.floor(index * (tasks.length / count));

            // Insert the item into the tasks array at the calculated index
            tasks.splice(targetIndex, 0, item);

            // Update the current index for this _id in the index map
            indexMap.set(_id, index + 1);
        }

    }

    //3 - SCHEDULE GENERATION-------------------------------------------------------

        function pushToSchedule(task, pos, start) {
            let {_id, name, duration, completed, notes, links, time} = task
            let toAdd
            if (time != '' && time != null){
                time = dayjs(time)
                time = time.set('second', 0)
                time = time.set('millisecond', 0)
                //console.log(time.add(duration, "minutes"))
                toAdd = {"_id": _id, "name": name, "start": time, "end": time.add(duration, "minutes"), "completed": completed, "duration": duration, "fixed": true, "notes": notes, "links": links}
            } else {
                start = dayjs(start)
                toAdd = {"_id": _id, "name": name, "start": start, "end": start.add(duration, "minutes"), "completed": completed, "duration": duration, "fixed": false, "notes": notes, "links": links}
            }
            schedule.splice(pos, 0, toAdd)

            if (_id != "FREETIME"){
                tasks.splice(tasks.findIndex(t => t._id == _id), 1)
            }
        }

        function shave(amount){
            console.log("shaving")
            let cB = 1;
            let p1 = []
            let p2 = []
            let p3 = []
            console.log(tasks.length)
            for (let i = 0; i < tasks.length; i++){
                if (tasks[i].time == '' || tasks[i].time == null){
                    console.log(tasks[i])
                    if (tasks[i].priority.toString() == "1"){
                        p1.push(tasks[i])
                    } else if (tasks[i].priority.toString() == "2"){
                        p2.push(tasks[i])
                    } else if (tasks[i].priority.toString() == "3"){
                        p3.push(tasks[i])
                    }
                }
            }

            //console.log(p1)
            //console.log(p2)
            //console.log(p3)

            while(taskSum > totalTime) {
                checkTimeout()
                console.log(taskSum - totalTime)
                let diff = taskSum - totalTime
                //console.log(taskSum-totalTime)
                //TODO qc for too many tod tasks, in case all non-tods are cut to 0 but time still exceeds sleep/wake.
                /*p3.forEach(task => task.duration -= Math.floor(3*cB))
                taskSum -= Math.floor(p3.length * cB*3)
                if (taskSum <= totalTime){
                    break;
                }
                p2.forEach(task => task.duration -= Math.floor(2*cB))
                taskSum -= Math.floor(p2.length * cB*2)
                if (taskSum <= totalTime){
                    break;
                }
                p1.forEach(task => task.duration-= Math.floor(1*cB))
                taskSum -= Math.floor(p1.length * cB)
                cB += 1;*/

                for (let i = 0; i < p3.length && diff > 0; i++){
                    if (p3[i].duration > 5){
                        if (diff >= 5){
                            p3[i].duration -= 5
                            diff -= 5
                            taskSum -= 5
                        } else {
                            p3[i].duration -= diff
                            taskSum -= diff
                            diff = 0
                        }
                    }
                }

                for (let i = 0; i < p2.length && diff > 0; i++){
                    if (p2[i].duration > 5){
                        if (diff >= 5){
                            p2[i].duration -= 5
                            diff -= 5
                            taskSum -= 5
                        } else {
                            p2[i].duration -= diff
                            taskSum -= diff
                            diff = 0
                        }
                    }
                }

                for (let i = 0; i < p1.length && diff > 0; i++){
                    if (p1[i].duration > 5){
                        if (diff >= 5){
                            p1[i].duration -= 5
                            diff -= 5
                            taskSum -= 5
                        } else {
                            p1[i].duration -= diff
                            taskSum -= diff
                            diff = 0
                        }
                    }
                }
            }

            tasks = p1.concat(p2).concat(p3)
        }

        function findNext(t){
            for (let i = 0; i < schedule.length; i++){
                if (schedule[i].start > t){
                    //console.log("Diff between " + schedule[i].start.format('HH:mm:ss:SSS') + " and " + t.format('HH:mm:ss:SSS') +"is" + schedule[i].start.diff(t, "minutes"))
                    return schedule[i].start.diff(t, "minutes") 
                    
                }
            }

            return sleep.diff(t, "minutes")
        }

        function findSchedulePosition(t, sch){
            for (let i = 0; i <sch.length; i++){
                if (sch[i].start > t){
                    return i;
                }
            }

            return schedule.length;
        }

        // Pushes all unfixed schedule items after a given index by a number of minutes
        function shiftSchedule(index, amount){
            console.log("shifting entries after " + schedule[index].name + " by " + amount)
            for (let i = index + 1; i < schedule.length; i++){
                if (!schedule[i].fixed){
                    schedule[i].start = schedule[i].start.add(amount, "minutes")
                    schedule[i].end = schedule[i].end.add(amount, "minutes")
                }
            }
        }

        function addFreeTime(){
            // TODO Do frequencies need to be adjusted in the case of a cut short free time?
            if (freeTimes[0] > timeBefore){
                console.log("adding forced cut freetime of length " + timeBefore)
                let freeTimeToAdd = {"_id": "FREETIME", "name": "Free Time", "duration": timeBefore, "completed": false, "notes": [], "links": [], "time": ''}
                freeTimePool -= timeBefore
                pushToSchedule(freeTimeToAdd, findSchedulePosition(timeIterator, schedule), timeIterator)
                timeIterator = timeIterator.add(timeBefore, "minutes")
                timeSinceLastFreeTime = 0
                freeTimes = adjust(freeTimes, timeBefore)
                timeBefore = 0
            } else {
                console.log("adding freetime of length " + freeTimes[0])
                let freeTimeToAdd = {"_id": "FREETIME", "name": "Free Time", "duration": freeTimes[0], "completed": false, "notes": [], "links": [], "time": ''}
                timeBefore -= freeTimes[0]
                freeTimePool -= freeTimes[0]
                console.log("new ftp is " + freeTimePool)
                pushToSchedule(freeTimeToAdd, findSchedulePosition(timeIterator, schedule), timeIterator)
                timeIterator = timeIterator.add(freeTimes[0], "minutes")
                timeSinceLastFreeTime = 0
                freeTimes.shift()
                frequencies.shift()
            }

            refreshIterators()
        }

        function refreshIterators(){
            let foundExisting = false
            for (let i = 0; i < schedule.length; i++){
                if (schedule[i].start.isSame(timeIterator, "minutes")){
                    timeIterator = schedule[i].end
                    console.log(schedule[i].end)
                    foundExisting = true
                    console.log("new time iterator is " + timeIterator.format('HH/mm'))
                }
            }
            timeBefore = findNext(timeIterator)
            //console.log("new time iterator is " + timeIterator.format('HH/mm') + " and new timeBefore is " + timeBefore)
        }

        function adjust(arr, cut) {
            let sum = arr.reduce((acc, val) => acc + val, 0);
            let targetSum = sum - cut;
            
            if (cut > sum) {
              throw "Cut can't be greater than the sum of the array elements!";
            }
            
            let result = [];
            let total = 0;
            
            for (let i = 0; i < arr.length; i++) {
              let proportion = arr[i] / sum;
              let new_value = Math.round(proportion * targetSum);
              total += new_value;
              result.push(new_value);
            }
            
            let difference = total - targetSum;
            
            // This loop will correct the rounding error if exists
            for (let i = 0; difference && i < result.length; i++) {
              if (result[i] >= difference) {
                result[i] -= difference;
                break;
              }
              }

            result = result.filter(item => item !== 0);
            //TODO find a better way of adjusting frequencies when freetimes are edited
            let diff = frequencies.length - result.length
            if (diff > 0){
                frequencies.splice(0, diff)
            }
            return result;
          }

    // While there is still unscheduled time: 
        let timeIterator = dayjs(wake)
        let timeSinceLastFreeTime = 0
        
        //console.log(freeTimes)
        //console.log(frequencies)
        let timeBefore
        while (freeTimes.length > 0 || tasks.length > 0){
            checkTimeout()
            //Find time before next schedule block (or sleep, if none)
            
            if (schedule.length == 0){
                timeBefore = totalTime
                console.log("SCHEDULE EMPTY BISH")
            } else {
                //check to make sure timeiterator isn't the start time of an existing task
                refreshIterators()
            }
                //TODO does this block ever run?
            if (timeBefore == 0){
                let index = findSchedulePosition(timeIterator, schedule)
                console.log("336 index is " + index)
                console.log(freeTimes)
                timeIterator = schedule[index].end
            }

            while (timeBefore > 0) {
                checkTimeout()
                console.log("time remains before next task")
                //console.log("time before is " + timeBefore)
                //TODO possible bugs?
                // If time since last free time >= free time frequency, add a free time block
                if (frequencies.length > 0 && timeSinceLastFreeTime >= frequencies[0]){
                    console.log("time for a free time. freetimes[0] is " + freeTimes[0] + "and timeBefore is " + timeBefore)
                    //if free time is less than time remaining, add one to fill time remaining and adjust
                    addFreeTime()
                } else {
                    // Otherwise add next task tree that fits
                    console.log("searching for a fitting task tree")
                    let foundIndex = -1
                    for (let i = 0; i < tasks.length; i++){
                        //console.log(tasks[i])
                        //loop through every task, check its tree length
                        if (tasks[i].prev == ''){
                            //console.log('here 1')
                            let treeLength = 0
                            let currentTask = tasks[i]
    
                            while(foundIndex == -1 && treeLength <= timeBefore){
                                console.log("here two")
                                treeLength += currentTask.duration 
                                if (treeLength <= timeBefore && currentTask.next == ''){
                                    console.log("found a tree starting at " + currentTask.name + ". treelength is " + treeLength + " and time before is " + timeBefore)
                                    foundIndex = i
                                } else if (treeLength < timeBefore){
                                    currentTask = tasks[tasks.findIndex(t => t._id == currentTask.next)]
                                }
                            }
                        }
                    }

                    // Add task tree that fits
                    if (foundIndex > -1){
                        //console.log("index was found")
                        let currentTask = tasks[foundIndex]
                        while (currentTask != null){
                            console.log("adding found task")
                            let nextTask = currentTask.next == '' ? null : tasks[tasks.findIndex(t => t._id == currentTask.next)]
                            timeBefore -= currentTask.duration
                            timeSinceLastFreeTime += currentTask.duration
                            pushToSchedule(currentTask, findSchedulePosition(timeIterator, schedule), timeIterator)
                            timeIterator = timeIterator.add(currentTask.duration, "minutes")
                            currentTask = nextTask
                        }
                    } else {
                        /* If no task tree fits, add remaining time to last free time, 
                        update other schedule items, and subtract from free time pool*/

                        //Check that there are tasks left to add
                        if (tasks.length == 0){
                            console.log("no tasks left. adding ft")
                            addFreeTime()
                        }
                        
                        //START HERE SHIFT
                        //Find last free time (TODO WHAT IF NO FREE TIME YET???)
                         else if (freeTimePool > 0){
                            console.log("searching for existing freetime")
                            console.log(freeTimePool)
                            let foundFreeTime = false
                            for (let i = findSchedulePosition(timeIterator, schedule); i > -1; i--){
                                if (schedule[i]._id == "FREETIME"){
                                    foundFreeTime = true
                                    if (freeTimePool >= timeBefore){
                                        console.log("Freetime was found. Sufficient Time to pad.")
                                        //note: timesincelastfreetime might break on schedule shift?
                                        schedule[i].duration += timeBefore//break
                                        schedule[i].end = schedule[i].end.add(timeBefore, "minutes")
                                        shiftSchedule(i, timeBefore)

                                        timeSinceLastFreeTime = timeIterator.diff(schedule[i].end, "minutes")
                                        freeTimePool -= (timeBefore)
                                        console.log("new ftp is " + freeTimePool)
                                        timeIterator = timeIterator.add(timeBefore, "minutes")
                                        freeTimes = adjust(freeTimes, timeBefore)
                                        timeBefore = 0
                                    } else {
                                        console.log("Freetime was found. Insufficient time to pad. Exhausting FTP")
                                        schedule[i].duration += freeTimePool
                                        schedule[i].end = schedule[i].end.add(freeTimePool, "minutes")
                                        shiftSchedule(i, freeTimePool)

                                        timeSinceLastFreeTime = timeIterator.diff(schedule[i].end, "minutes")
                                        timeIterator = timeIterator.add(freeTimePool, "minutes")
                                        timeBefore -= freeTimePool
                                        freeTimePool = 0
                                        freeTimes = []
                                        frequencies = []
                                    }
                                }
                            }

                            //if no preexisting free time to edit, add one
                            if (!foundFreeTime){
                                console.log("No preexisting freetime to edit")
                                addFreeTime()
                            }
                        } else {
                            // If pool is exhausted, force divide next non-TOD task tree to fill time (clone, subtract difference from original)
                            // add first task tree until no time left
                            let currentTask = tasks[0]
                            while (timeBefore > 0){
                                checkTimeout()
                                console.log("FTP exhausted. Adding all fitting task trees.")
                                if (currentTask.duration <= timeBefore){
                                    pushToSchedule(currentTask, findSchedulePosition(timeIterator, schedule), timeIterator)
                                    timeSinceLastFreeTime += currentTask.duration
                                    timeIterator = timeIterator.add(currentTask.duration, "minutes")
                                    timeBefore -= currentTask.duration
                                    currentTask = tasks[tasks.findIndex(t => t._id == currentTask.next)]
                                } else {
                                    //TODO: make sure readded task is marked as a DIVISION
                                    console.log("adding force divided task")
                                    let replacementDuration = currentTask.duration - timeBefore 
                                    currentTask.duration = timeBefore
                                    pushToSchedule(currentTask, findSchedulePosition(timeIterator, schedule), timeIterator)
                                    timeIterator = timeIterator.add(timeBefore, "minutes")
                                    timeSinceLastFreeTime += timeBefore
                                    timeBefore = 0
                                    currentTask.duration = replacementDuration
                                    tasks.unshift(currentTask)
                                    break;
                                }
                            }
                        }
                    }
                }
            }
        }


    //4 BACK END UPDATE & CLEAN UP --------------------------------------------------
    for (let i = 0; i < schedule.length - 1; i++){
        //TODO BROKEN
        if (schedule[i]._id == schedule[i+1]._id){
            console.log("Combining repeat entries")
            schedule[i].duration += schedule[i+1].duration
            schedule[i].end = schedule[i+1].end
            schedule.splice(i+1, 1)
        }
    }
    console.log(schedule)

    entries[entryIndex].schedule = resort ? tempSchedule.concat(schedule) : schedule

    const updatedSchedule = await axios.patch("http://localhost:8282/schedule/", {entries})
    setSchedule(schedule)
} catch (error){
    console.error(error)
}
}
export default newSort