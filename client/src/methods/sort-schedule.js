import axios from "axios"
import moment from "moment"

moment().format();

async function sortSchedule(setSchedule, wakeDate, sleepDate){

    
    //get active tasks from db
    const taskReq = await axios.get("http://localhost:8282/task/")
    // Store active tasks in a new tasks array
    let tasks = taskReq.data.filter(task => task.isActive);
    
    // Sort the tasks array in ascending order by the priority value
    tasks.sort((a, b) => parseFloat(a.priority) - parseFloat(b.priority));

    let priorityOne = [];
    let priorityTwo = [];
    let priorityThree = [];
    let priorityFour = [];
    let priorityFive = [];

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

        else if (tasks[i].priority === 4) {

            priorityFour.push(tasks[i]);
        }

        else if (tasks[i].priority === 4) {

            priorityFive.push(tasks[i]);
        }
    }

    priorityOne.sort((a, b) => parseFloat(a.duration) - parseFloat(b.duration));
    priorityTwo.sort((a, b) => parseFloat(a.duration) - parseFloat(b.duration));
    priorityThree.sort((a, b) => parseFloat(a.duration) - parseFloat(b.duration));
    priorityFour.sort((a, b) => parseFloat(a.duration) - parseFloat(b.duration));
    priorityFive.sort((a, b) => parseFloat(a.duration) - parseFloat(b.duration));

    tasks = [];

    tasks = priorityOne.concat(priorityTwo).concat(priorityThree).concat(priorityFour).concat(priorityFive);

    //Set Start & End Hours (Manual right now)

    let add_minutes = function(dt, minutes){
        console.log(dt)
        dt = new Date(dt)
        return new Date(dt.getTime() + minutes*60000);
    }

    //const sleep = 23 // 11 PM
    const tempSchedule = [];

    for (let i = 0; i < tasks.length; i++) {
        if (i === 0) {
            let {_id, name, duration, completed} = tasks[i];
            let end = add_minutes(wakeDate, duration);
            let toAdd = {"_id": _id, "name": name, "start": wakeDate, "end": end, "completed": completed}
            tempSchedule.push(toAdd);
        } else {
            let {_id, name, duration, completed} = tasks[i];
            let lastTaskEnd = tempSchedule[i - 1].end;
            add_minutes(lastTaskEnd, duration);
            let toAdd = {"_id": _id, "name": name, "start": lastTaskEnd, "end": add_minutes(lastTaskEnd, duration), "completed": completed}
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

    const updatedSchedule = await axios.patch("http://localhost:8282/schedule/", {schedule, start:wakeDate, end:sleepDate})
    setSchedule(schedule)
}

export default sortSchedule;