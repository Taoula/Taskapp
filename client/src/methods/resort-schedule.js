import axios from "axios"
import { TrademarkRegistered } from "phosphor-react";
import addMinutes from "./add-minutes"

async function resortSchedule(setSchedule, wakeDate, sleepDate){
    //get tasks from db
    const taskReq = await axios.get("http://localhost:8282/task/")

    // Store active, completed tasks in a new tasks array
    let tasks = taskReq.data.filter(task => task.isActive).filter(task => (task.completed == false));
    let taskTime = 0

    tasks.forEach(task => taskTime += task.duration);

    console.log("task time is " + taskTime)
    //2. calculate remaining time in day
    let dt = new Date();
    let sleep = new Date(sleepDate)
    let timeRemaining = (sleep.getTime() - dt.getTime())/60000;

    //calculate time remaining
    let minutesRemaining = Math.floor(timeRemaining + (24*60))
    console.log(minutesRemaining + "minutes remaining")

    if (minutesRemaining <= 0){
        console.log("No time remaining. Change your schedule hours or fuck off.")
    } else {}

    if (taskTime < minutesRemaining){
        // SORT AS USUAL
        console.log("sufficient time. sorting schedule")
    } else {
        //Recursively shave time off of lower priority tasks
        /*
            time to remove = x 20
            n priority 3 tasks 50
            m priority 2 tasks 50
            b priority 1 tasks 50

            multipliers for each (nv, nm, nb)
            nv * n + nm * m + nb * b = x

            multipliers are scaled according to priority
            nv > nm > nb

            1. initiate multiplier values
        */
            let priorityOne = [];
            let priorityTwo = [];
            let priorityThree = [];

            for (let i = 0; i < tasks.length; i++) {

                if (tasks[i].priority === 1) {
        
                    priorityOne.push(tasks[i]);
                }
        
                else if (tasks[i].priority === 2) {
        
                    priorityTwo.push(tasks[i]);
                }
        
                else if (tasks[i].priority === 3) {
        
                    priorityThree.push(tasks[i]);
                }
            }

            //let cutTime = taskTime - timeRemaining;
            let cB = 1;
        while(taskTime > minutesRemaining) {
            priorityThree.forEach(task => task.duration -= Math.floor(5))
            taskTime -= Math.floor(cB*3)
            priorityTwo.forEach(task => task.duration -= Math.floor(3))
            taskTime -= Math.floor(cB*2)
            priorityOne.forEach(task => task.duration-= Math.floor(1))
            taskTime -= Math.floor(cB)
            cB += 1;
        }

        tasks = []
        let temptasks = []
        temptasks = priorityOne.concat(priorityTwo).concat(priorityThree);
        temptasks.forEach(task => {
            if (task.duration > 0){
                tasks.push(task);
            }
        })
    }

    const tempSchedule = [];

    for (let i = 0; i < tasks.length; i++) {
        if (i === 0) {
            let {_id, name, duration, completed} = tasks[i];
            let end = addMinutes(dt, duration);
            let toAdd = {"_id": _id, "name": name, "start": dt, "end": end, "completed": completed}
            tempSchedule.push(toAdd);
        } else {
            let {_id, name, duration, completed} = tasks[i];
            let lastTaskEnd = tempSchedule[i - 1].end;
            addMinutes(lastTaskEnd, duration);
            let toAdd = {"_id": _id, "name": name, "start": lastTaskEnd, "end": addMinutes(lastTaskEnd, duration), "completed": completed}
            tempSchedule.push(toAdd);
        }
    }

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
        const {_id, name, start, end, completed} = task
        return {_id: _id, name: name, start: convert12(start), end: end, completed: completed}
    })

    const updatedSchedule = await axios.patch("http://localhost:8282/schedule/", {schedule, start:dt, end:sleepDate})
    setSchedule(schedule)

    //5. push new schedule to database
}

export default resortSchedule;