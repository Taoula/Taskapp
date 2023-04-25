import axios from "axios"
import moment from "moment"
import addMinutes from "./add-minutes"
import convertTime from "./convert-time"
import sameDate from "./same-date";

moment().format();

async function sortSchedule(setSchedule, wakeDate, sleepDate, currentDay){

    //test this?
    if (wakeDate == null){
        wakeDate = new Date();
    } else {
        wakeDate = new Date(wakeDate)
    }

    if (sleepDate == null){
        sleepDate = addMinutes(wakeDate, 16*60)
    } else {
        sleepDate = new Date(sleepDate)
    }

    //get active tasks from db
    const taskReq = await axios.get("http://localhost:8282/task/")
    let tasks = []
    //loop through all tasks TODO reoptimize
    for (let i = 0; i < taskReq.data.length; i++){
        for (let k = 0; k < taskReq.data[i].entries.length; k++){
            if (sameDate(taskReq.data[i].entries[k].date, currentDay)){
                if (taskReq.data[i].entries[k].isActive) {
                    let taskToPush = {
                        name: taskReq.data[i].name,
                        priority: parseInt(taskReq.data[i].entries[k].priority),
                        duration: parseInt(taskReq.data[i].entries[k].duration),
                        time: taskReq.data[i].entries[k].time,
                        _id: taskReq.data[i]._id
                    }

                    tasks.push(taskToPush)
                }

                break;
            }
        }
    }
    // Store active tasks in a new tasks array
    //let tasks = taskReq.data.filter(task => task.isActive);
    //let completedTasks = tasks.filter(task => task.completed);
    //tasks = tasks.filter(task => !task.completed)
    
    // Sort the tasks array in ascending order by the priority value
    tasks.sort((a, b) => parseFloat(a.priority) - parseFloat(b.priority));

    let priorityOne = [];
    let priorityTwo = [];
    let priorityThree = [];
    let priorityFour = [];
    let priorityFive = [];
    let fixedTimeTasks = [];

    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].time != null){
            fixedTimeTasks.push(tasks[i])
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

        else if (tasks[i].priority === 4) {

            priorityFour.push(tasks[i]);
        }

        else if (tasks[i].priority === 5) {

            priorityFive.push(tasks[i]);
        }
    }

    priorityOne.sort((a, b) => parseFloat(a.duration) - parseFloat(b.duration));
    priorityTwo.sort((a, b) => parseFloat(a.duration) - parseFloat(b.duration));
    priorityThree.sort((a, b) => parseFloat(a.duration) - parseFloat(b.duration));
    priorityFour.sort((a, b) => parseFloat(a.duration) - parseFloat(b.duration));
    priorityFive.sort((a, b) => parseFloat(a.duration) - parseFloat(b.duration));
    
    //Account for time zone difference in fixed time tasks
    fixedTimeTasks.forEach((task) => {
        task.time = new Date(task.time)
    })
    fixedTimeTasks.sort((a, b) => Date.parse(a) > Date.parse(b));
    fixedTimeTasks.forEach((task) => {
        console.log(task)
    })


    tasks = [];

    tasks = priorityOne.concat(priorityTwo).concat(priorityThree).concat(priorityFour).concat(priorityFive);

    //Set Start & End Hours (Manual right now)

    //const sleep = 23 // 11 PM
    const tempSchedule = [];

    let timeIterator = new Date(wakeDate)
    console.log("TIME ITERATOR AT INIT IS " + timeIterator)

    // Repeat until all tasks  are added

    let freeTimeCount = 0;

    function differenceBetween(date1, date2){    
        if (date2.getDate() > date1.getDate()){
            return Math.floor((date1.getTime() - date2.getTime())/60000) + 1440
        } else {
            return Math.floor((date1.getTime() - date2.getTime())/60000)
        }
    }

    while (fixedTimeTasks.length != 0 && tasks.length != 0){
        console.log("fixed and unfixed remain")
        // Calculate time before next fixed task. If no more fixed tasks, break.
        let fixedTaskTime = new Date(fixedTimeTasks[0].time)
        let timeBefore = differenceBetween(fixedTaskTime, timeIterator)

        // Iterate tasks in add-order. Add every task that will fit.

        for (let i = 0; i < tasks.length; i++){
            if (tasks[i] == null){
                break;      
            }

            if (tasks[i].duration <= timeBefore){
                // Push task
                let {_id, name, duration, completed} = tasks[i];
                let end = addMinutes(timeIterator, duration);
                let toAdd = {"_id": _id, "name": name, "start": timeIterator, "end": end, "completed": completed, "duration": duration, "fixed": false}
                tempSchedule.push(toAdd)

                // Handle Iterators & Remove Added Task
                timeBefore -= duration;
                timeIterator = addMinutes(timeIterator, duration)
                tasks.splice(i, 1)
                i--;
            }
        }

        // If time still remains before next fixed task, add free time
        if (timeBefore > 0) {
            let end = addMinutes(timeIterator, timeBefore)
            console.log("time before is" + timeBefore)
            let toAdd = {"_id": "freetime" + freeTimeCount.toString(), "name": "Free Time", "start": timeIterator, "end": end, "completed": false, "duration": timeBefore, "fixed": false}
            tempSchedule.push(toAdd)
            freeTimeCount++;
            timeIterator = addMinutes(timeIterator, timeBefore)
        }

        // Add next fixed task
        let {_id, name, duration, completed} = fixedTimeTasks[0];
        let end = addMinutes(timeIterator, duration)
        let toAdd = {"_id": _id, "name": name, "start": timeIterator, "end": end, "completed": completed, "duration": duration, "fixed": true}
        tempSchedule.push(toAdd)
        timeIterator = addMinutes(timeIterator, duration)

        // Remove fixed task from temp array
        fixedTimeTasks.splice(0,1);
    }

    // If fixed tasks remain
    while (fixedTimeTasks.length != 0){
        console.log("fixed tasks remain")
        // Add free time before fixed task
        let fixedTaskTime = new Date(fixedTimeTasks[0].time)
        let timeBefore = differenceBetween(fixedTaskTime, timeIterator)
        let end = addMinutes(timeIterator, timeBefore)
        console.log(" time iterator is " + timeIterator + " and timebefore is " + timeBefore);
        let toAdd = {"_id": "freetime" + freeTimeCount.toString(), "name": "Free Time", "start": timeIterator, "end": end, "completed": false, "duration": timeBefore, "fixed": false}
        tempSchedule.push(toAdd)
        freeTimeCount++;
        timeIterator = addMinutes(timeIterator, timeBefore)

        // Add next fixed task
        let {_id, name, duration, completed} = fixedTimeTasks[0];
        end = addMinutes(timeIterator, duration)
        toAdd = {"_id": _id, "name": name, "start": timeIterator, "end": end, "completed": completed, "duration": duration, "fixed": true}
        tempSchedule.push(toAdd)
        timeIterator = addMinutes(timeIterator, duration)

        // Remove fixed task from temp array
        fixedTimeTasks.splice(0,1);
    }

    // If unfixed tasks remain
    while (tasks.length != 0){
        console.log("unfixed tasks remain")
        let {_id, name, duration, completed} = tasks[0];
        let end = addMinutes(timeIterator, duration);
        let toAdd = {"_id": _id, "name": name, "start": timeIterator, "end": end, "completed": completed, "duration": duration, "fixed": false}
        tempSchedule.push(toAdd)

        timeIterator = addMinutes(timeIterator, duration)
        tasks.splice(0, 1)
    }
    
    // If time remains before end of the day, pad with free time 
   /* if (sleepDate.getTime() > timeIterator.getTime()){
        let timeRemaining = Math.floor((sleepDate.getTime() - timeIterator.getTime())/60000)
        let toAdd = {"_id": "freetime" + freeTimeCount.toString(), "name": "Free Time", "start": timeIterator, "end": sleepDate, "completed": false, "duration": timeRemaining, "fixed": false}
        freeTimeCount++;
        tempSchedule.push(toAdd)
    }*/

   
    const schedule = tempSchedule.map((task) => {
        const {_id, name, start, end, completed, duration, fixed} = task
        return {_id: _id, name: name, start: convertTime(start, "utc"), end: end, completed: completed, duration: duration, fixed: fixed}
    })

    /*
    1. pull entries from schedule
    2. create a clone array
    3. find and edit the matching entry (sameDate)
    4. patch the schedule
     */

    const scheduleReq = await axios.get("http://localhost:8282/schedule/")
    let {entries} = scheduleReq.data;
    for (let i = 0; i < entries.length; i++){
        if (sameDate(entries[i].wake, currentDay)){
            entries[i].schedule = schedule;
        }
    }

    const updatedSchedule = await axios.patch("http://localhost:8282/schedule/", {entries})
    setSchedule(schedule)
}

export default sortSchedule;