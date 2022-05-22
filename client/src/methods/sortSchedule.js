import axios from "axios"
import moment from "moment"

moment().format();

async function sortSchedule(setSchedule, options){

    
    //get active tasks from db
    const taskReq = await axios.get("http://localhost:5000/task/")

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

        if (tasks[i].priority == 1) {

            priorityOne.push(tasks[i]);
        }

        else if (tasks[i].priority == 2) {

            priorityTwo.push(tasks[i]);
        }

        else if (tasks[i].priority == 3) {

            priorityThree.push(tasks[i]);
        }

        else if (tasks[i].priority == 4) {

            priorityFour.push(tasks[i]);
        }

        else if (tasks[i].priority == 4) {

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
        return new Date(dt.getTime() + minutes*60000);
    }

    let wake = new Date();  
    wake.setHours(7);
    wake.setMinutes(0);
    wake.setSeconds(0);


    //const sleep = 23 // 11 PM
    const tempSchedule = [];

    for (let i = 0; i < tasks.length; i++) {
        if (i === 0) {
            let {_id, name, duration} = tasks[i];
            let end = add_minutes(wake, duration);
            let toAdd = {"_id": _id, "name": name, "start": wake, "end": end}
            tempSchedule.push(toAdd);
        } else {
            let {_id, name, duration} = tasks[i];
            let lastTaskEnd = tempSchedule[i - 1].end;
            add_minutes(lastTaskEnd, duration);
            let toAdd = {"_id": _id, "name": name, "start": lastTaskEnd, "end": add_minutes(lastTaskEnd, duration)}
            tempSchedule.push(toAdd);
        }
    }

    let convert12 = function(dt) {
        let hours = dt.getHours();
        let amOrPm = hours >= 12 ? 'pm' : 'am';
        hours = (hours % 12) || 12;
        let minutes = dt.getMinutes();
        if (minutes === 0) {
            minutes = "00"
        }
        return hours + ":" + minutes + " " + amOrPm;
    }
        
    const schedule = tempSchedule.map((task) => {
        const {_id, name, start, end} = task
        return {_id: _id, name: name, start: convert12(start), end: end}
    })

    const updatedSchedule = await axios.patch("http://localhost:5000/schedule/", {schedule})
    setSchedule(schedule)
}

export default sortSchedule;