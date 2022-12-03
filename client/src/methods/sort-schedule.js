import axios from "axios"
import moment from "moment"
import addMinutes from "./add-minutes"

moment().format();

async function sortSchedule(setSchedule, wakeDate, sleepDate){

    //test this?
    if (wakeDate == null){
        wakeDate = new Date();
    } 

    if (sleepDate == null){
        sleepDate = addMinutes(wakeDate, 16*60)
    } else {
        sleepDate = new Date(sleepDate)
    }

    //get active tasks from db
    const taskReq = await axios.get("http://localhost:8282/task/")
    // Store active tasks in a new tasks array
    let tasks = taskReq.data.filter(task => task.isActive);
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
    fixedTimeTasks.sort((a, b) => Date.parse(a) > Date.parse(b));
    fixedTimeTasks.forEach((task) => {
        console.log(task.time)
    })

    tasks = [];

    tasks = priorityOne.concat(priorityTwo).concat(priorityThree).concat(priorityFour).concat(priorityFive);

    //Set Start & End Hours (Manual right now)

    //const sleep = 23 // 11 PM
    const tempSchedule = [];

    let timeIterator = new Date(wakeDate)
/*
    // calculate total task time
    let taskTime = 0

    tasks.forEach(task => taskTime += task.duration);

    console.log("task time is " + taskTime)
    //2. calculate remaining time in day
    let dt = new Date();
    let sleep = new Date(sleepDate)
    let timeRemaining = (sleep.getTime() - dt.getTime())/60000;

    //calculate time remaining
    let minutesRemaining = Math.floor(timeRemaining /*+ (24*60))
    console.log(minutesRemaining + "minutes remaining")
*/
    // Repeat until all tasks  are added

    let freeTimeCount = 0;

    while (fixedTimeTasks.length != 0 && tasks.length != 0){
        console.log("fixed and unfixed remain")
        // Calculate time before next fixed task. If no more fixed tasks, break.
        let fixedTaskTime = new Date(fixedTimeTasks[0].time)
        let timeBefore = Math.floor((fixedTaskTime.getTime() - timeIterator.getTime())/60000)

        // Iterate tasks in add-order. Add every task that will fit.
        let startLength = tasks.length

        for (let i = 0; i < tasks.length; i++){
            if (tasks[i] == null){
                break;      
            }

            if (tasks[i].duration < timeBefore){
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
        let timeBefore = Math.floor((fixedTaskTime.getTime() - timeIterator.getTime)/60000)
        let end = addMinutes(timeIterator, timeBefore)
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
    
    if (sleepDate.getTime() > timeIterator.getTime()){
        let timeRemaining = Math.floor((sleepDate.getTime() - timeIterator.getTime())/60000)
        let toAdd = {"_id": "freetime" + freeTimeCount.toString(), "name": "Free Time", "start": timeIterator, "end": sleepDate, "completed": false, "duration": timeRemaining, "fixed": false}
        freeTimeCount++;
        tempSchedule.push(toAdd)
    }

    // If time remains before end of the day, pad with free time

    let convert12 = function(dt) {
        dt = new Date(dt)
        let hours = dt.getHours();
        let amOrPm = hours >= 12 ? 'pm' : 'am';
        hours = (hours % 12) || 12;
        let minutes = dt.getMinutes();
        if (minutes < 10) {
            minutes = "0" + minutes
        }
        return hours + ":" + minutes + " " + amOrPm;
    }
        
    const schedule = tempSchedule.map((task) => {
        const {_id, name, start, end, completed, duration, fixed} = task
        return {_id: _id, name: name, start: convert12(start), end: end, completed: completed, duration: duration, fixed: fixed}
    })

    const updatedSchedule = await axios.patch("http://localhost:8282/schedule/", {schedule, start:wakeDate, end:sleepDate})
    setSchedule(schedule)
}

export default sortSchedule;