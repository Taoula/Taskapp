import axios from "axios"

async function sortSchedule(setSchedule, options){
    //get active tasks from db
    const timeBlockLength = 5
    const taskReq = await axios.get("http://localhost:5000/task/")

    const tasks = taskReq.data.filter(task => task.isActive);



    //Set Start & End Hours (Manual right now)

    const start = 7 // 7 AM
    const end = 23 // 11 PM

    //total time
    let totalTime = ((end-start) * 60)

    //calculate amount of minutes for all tasks
    let totalTaskTime = 0
    tasks.forEach(task => {
        totalTaskTime += task.duration
    })

    //calculate total number of time blocks, free time blocks
    let freeTime = (totalTime - totalTaskTime)
    console.log("freetime: " + freeTime)
    let freeTimeLength = Math.floor(Math.floor(freeTime/tasks.length)/5)*5
    console.log("avg ft length: " + freeTimeLength)
    let freeTimeRemainder = (freeTime % tasks.length + (Math.floor(freeTime/tasks.length)%5))*5
    console.log("freetimeremainder:" + freeTimeRemainder)
    const timeBlocks = Math.floor(totalTime/timeBlockLength)

    //calculate length of each break, remainder
   /* const freeTimeLength = Math.floor(freeTimeBlocks / tasks.length)
    const freeTimeRemainder = freeTimeBlocks % tasks.length*/

    
    let newTasks = []

    /*tasks.forEach(task => {
        newTasks.push(task)
        newTasks.push({_id: null, name: "Free Time", duration:freeTimeLength})
    })*/

    for (let i = 0; i < tasks.length; i++){
        newTasks.push(tasks[i])
        if (i + 1 < tasks.length){
            newTasks.push({_id: null, name: "Free Time", duration:freeTimeLength})
        } else {
            newTasks.push({_id: null, name: "Free Time", duration:freeTimeLength + freeTimeRemainder})
        }
    }

    //initialize schedule
    let tempSchedule = []

    for (let i = 0; i < timeBlocks; i++){
        tempSchedule.push({block: i, name: null})
    }

    let blockIndex = 0;

    for (let i = 0; i < newTasks.length;i++){
        const {_id, name, duration} = newTasks[i]
        let blockDuration = Math.floor(duration/timeBlockLength)
        
        while (blockDuration > 0){
            if (tempSchedule[blockIndex].name === null){
                tempSchedule[blockIndex].name = name
                blockDuration--
            }
            blockIndex++
        }
    }
    

    //scheduling loop
    let currentBlock = 0;
    /*tasks.forEach(task => {
        const {_id, name, duration} = task
        const blockDuration = Math.floor(duration / timeBlockLength)
        tempSchedule.push({_id, name, start: currentBlock, end: currentBlock + blockDuration})
        currentBlock += (blockDuration + 1)
    })*/

    /*for (let i=0; i<tasks.length; i++){
        let task = tasks[i]
        const {_id, name, duration} = task
        const blockDuration = Math.floor(duration / timeBlockLength)
        tempSchedule.push({_id, name, start: currentBlock, end: currentBlock + blockDuration-1})
        currentBlock += (blockDuration-1)

        //add free time
        console.log(freeTimeBlocks)
        if (freeTimeBlocks - (freeTimeLength) > 0){
            tempSchedule.push({_id: null, name: "Free Time", start: currentBlock, end: currentBlock + freeTimeLength-1})
            currentBlock += (freeTimeLength )
            freeTimeBlocks -= freeTimeLength;
            console.log("remaining free time blocks: " + freeTimeBlocks)
        } else if (freeTimeBlocks > 0) {
            tempSchedule.push({_id: null, name: "Free Time", start: currentBlock, end:currentBlock + freeTimeBlocks-1})
            freeTimeBlocks = 0;
        } 
    }*/


    console.log(tempSchedule)
    /* 
        The hard part

        ---Stage 1---

        1. Calculate # of 5 minute time blocks between start and end hours
        2. Calculate # of 5 minute time blocks for all tasks combined, subtract this from step 1 to get amount of freetime
        3. Divide freetime blocks based on the number of desired free time periods (options). Determine either an interval of tasks or time to place these.
        4. In a new schedule array, add tasks in the format {taskId, timeBlockStart, timeBlockEnd}. Free time will have a taskId of null.
        
        ---Stage 2---

        1. Add options for preferred time of day.
        2. If there isn't enough time left for all tasks, shorten tasks based on priority until the overall task time <= remaining time in the day

        ---Stage 3---

        1. Monitor 
    */
    //TEMP display tasks in order
    const schedule = tasks.map((task) => {
        const {_id, name} = task
        return {/*_id: _id,*/ name: name}
    })

    const updatedSchedule = await axios.patch("http://localhost:5000/schedule/", {schedule})
    setSchedule(schedule)
    //console.log(schedule);
}

export default sortSchedule;