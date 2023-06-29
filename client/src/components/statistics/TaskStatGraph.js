import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

const GraphContainer = styled.div`
  height: 50%;
  width: 50%;
`;

export default function TaskStatGraph() {
  const [current, setCurrent] = useState("");
  const [currentName, setCurrentName] = useState("");
  const [tasks, setTasks] = useState([]);
  const [dates, setDates] = useState([]);
  const [durations, setDurations] = useState([]);
  const [netTimeX, setNetTimeX] = useState(0);
  const [timesCompletedX, setTimesCompletedX] = useState(0);
  const [averageDurationX, setAverageDurationX] = useState(0);
  const [reload, setReload] = useState(false);

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Task Duration Over Time",
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
      },
    },

    barPercentage: 0.8,
    minBarLength: 5,
    borderRadius: 6,
  };

  const data = {
    labels: dates,
    datasets: [
      {
        label: "",
        data: durations,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  async function getTaskStats() {
    console.log("task stats current is" + current);
    let statDataReq = await axios.get(
      `http://localhost:8282/taskStat/${current}/`
    );
    let { entries, averageDuration, netTime, timesCompleted } =
      statDataReq.data;
    let tempDates = [];
    let tempDurations = [];
    let lastDate = new Date();
    let today = new Date();
    today = addADay(today);
    let entryIndex = -1;
    //sets date 30 days ago
    lastDate = subtractDays(today, 30);

    //identify first date within the time frame. if none, print no data
    for (let i = 0; i < entries.length; i++) {
      let entryDate = new Date(entries[i].date);
      if (entryDate >= lastDate && entryDate <= today) {
        entryIndex = i;
        break;
      }
    }

    if (entryIndex == -1) {
      //print some shit
      console.log("nothing found");
    } else {
      //There is an entry within the time frame!
      //Starting from last date, loop through every day until you get to today
      while (!isSameDayAs(lastDate, today)) {
        console.log("iterating");
        tempDates.push(dateToText(lastDate));
        //Check if the entry date is equal to the iterated date lastDate
        let entryDate = new Date(entries[entryIndex].date);
        if (isSameDayAs(entryDate, lastDate)) {
          console.log("FOUDN!");
          //Push entry data to temp array
          tempDurations.push(entries[entryIndex].duration);
          //Change this to an inequality
          if (entries.length != entryIndex + 1) {
            entryIndex++;
          }
        } else {
          tempDurations.push(0);
        }
        lastDate = addADay(lastDate);
      }
    }

    /*if (i == 0){
                    //Initializing. Is this necessary on two lines?
                    let tempDate = new Date(entries[0].date)
                    lastDate = tempDate;

                    //Set initial values
                    tempDates.push(dateToText(entries[0].date))
                    tempDurations.push(entries[0].duration)

                    //Adds a day to last date. Probably a nicer way of doing this.
                    console.log("last date before add is " + lastDate)
                    lastDate = (addADay(lastDate))
                    console.log("last date after add is " + lastDate)
                } else {
                    //Check to see if last date is date of entries[i]. If not, add blank entry and increment
                    let entryDate = new Date(entries[i].date)
                    console.log("entryDate is " + entryDate)
                    console.log("lastDate is " + lastDate)
                    while (lastDate.getDate() != entryDate.getDate() || lastDate.getMonth() != entryDate.getMonth() || lastDate.getFullYear() != entryDate.getFullYear()){
                        //Add a blank entry if no entries on the current date
                        tempDates.push(dateToText(lastDate))
                        tempDurations.push(0)
                        lastDate = addADay(lastDate)
                    }

                    //push the next entry once the gaps have been filled
                    tempDates.push(dateToText(entries[i].date))
                    tempDurations.push(entries[i].duration)
                }*/

    //

    setDates(tempDates);
    setDurations(tempDurations);
    setAverageDurationX(averageDuration);
    setNetTimeX(netTime);
    setTimesCompletedX(timesCompleted);
  }

  function dateToText(date) {
    let myDate = new Date(date);
    let fullText = myDate.toDateString();
    return fullText;
  }

  function addADay(date) {
    let myDate = new Date(date);
    myDate.setDate(myDate.getDate() + 1);
    return myDate;
  }

  function isSameDayAs(date1, date2) {
    let myDate1 = new Date(date1);
    let myDate2 = new Date(date2);
    return (
      myDate1.getDate() == myDate2.getDate() &&
      myDate1.getMonth() == myDate2.getMonth() &&
      myDate1.getFullYear() == myDate2.getFullYear()
    );
  }

  function subtractDays(date, days) {
    let myDate = new Date(date);
    myDate.setDate(myDate.getDate() - days);
    return myDate;
  }

  async function getTasks() {
    //Pulls all tasks, saves data locally in state
    let taskReq = await axios.get(`http://localhost:8282/task/`);
    setTasks(taskReq.data);
    console.log("Getting tasks");
  }

  useEffect(() => {
    if (tasks.length == 0) {
      getTasks();
    }

    if (current != "" && reload) {
      getTaskStats();
      setReload(false);
    }
  });

  function handleChange(e) {
    setReload(true);
    setCurrent(e.target.value);
    console.log("setting current to" + e.target.value);
    setCurrentName(e.target.id);
  }

  return (
    <>
      <form className="mt-6 flex">
        <p className="bg-stone-50 border border-gray-200 px-4 rounded-l-lg py-3">
          Selected task
        </p>
        <select
          onChange={(e) => handleChange(e)}
          value={current}
          id="task"
          name="task"
          className="border-l-0 border-gray-200 border rounded-r-lg px-auto py-3"
        >
          {tasks.map((task) => {
            return (
              <option id={task.name} value={task._id}>
                {task.name}
              </option>
            );
          })}
        </select>
      </form>
      <GraphContainer className="p-6 bg-stone-50 rounded-lg border border-gray-200 mt-4">
        {timesCompletedX != 0 && <h3>Completed {timesCompletedX} Times</h3>}
        {averageDurationX != 0 && <h3>Average Duration: {averageDurationX}</h3>}
        {netTimeX != 0 && <h3>Net Time: {netTimeX}</h3>}
        <Bar options={options} data={data} />
      </GraphContainer>
    </>
  );
}
