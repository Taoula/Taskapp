import React, { useState, useEffect } from "react";
import axios from "axios";
import ScheduleBlock from "./schedule-block";
import useGlobalStore from "../../context/useGlobalStore";
import sortSchedule from "../../methods/sort-schedule";
import resortSchedule from "../../methods/resort-schedule";
import getDateValue from "../../methods/get-date-value";
import addDays from "../../methods/add-days";
import styled from "styled-components";
import sameDate from "../../methods/same-date";
import {
  Alarm,
  CheckSquare,
  FunnelSimple,
  Square,
  X,
  CheckCircle,
} from "phosphor-react";
import Countdown from "./countdown";
import { TimeField } from "@mui/x-date-pickers/TimeField";
import newSort from "../../methods/new-sort";
import convertTimeNew from "../../methods/convert-time-new";
import { Popover, Transition, Dialog } from "@headlessui/react";

const dayjs = require("dayjs");
dayjs().format();

const ScheduleButton = styled.button`
  background-color: rgb(48, 128, 242);
  border: none;
  border-radius: 10px;
`;

const SubHeading = styled.h3`
  font-family: Lola;
  text-transform: lowercase;
  font-weight: 400;
  margin-left: 20px;
`;

const ScheduleText = styled.p`
  font-family: Nunito;
  text-transform: uppercase;
  padding: 0px 5px 0px 5px;
  color: white;
  font-weight: 700;
  font-size: 0.75rem;
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  text-transform: uppercase;
  font-weight: 300;
  margin-left: 20px;
`;

export default function ScheduleDisplay() {
  const [calendarEntries, setCalendarEntries] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [wake, setWake] = useState(new Date(null));
  const [sleep, setSleep] = useState(new Date(null));
  const [hoursExpanded, setHoursExpanded] = useState(false);
  const [focusMode, setFocusMode] = useState(false);
  const [updateDefault, setUpdateDefault] = useState(false);

  const currentDay = useGlobalStore((state) => state.currentDay);
  const isToday = useGlobalStore((state) => state.isToday)();

  async function getSchedule() {
    const scheduleReq = await axios.get("http://localhost:8282/schedule/");
    let { entries, defaults } = scheduleReq.data;
    setCalendarEntries(entries);
    let found = false;
    // TODO set the schedule based on a state value representing which day is being edited
    for (let i = 0; i < entries.length; i++) {
      // If an entry matching the selected day is found
      if (sameDate(entries[i].wake, currentDay)) {
        console.log(i);
        console.log(entries);
        console.log(entries.length);
        console.log(
          "current date is " +
            currentDay +
            " and wake entry is " +
            entries[i].wake
        );
        setSchedule(entries[i].schedule);
        console.log(entries[i].schedule);
        setWake(entries[i].wake);
        setSleep(entries[i].sleep);
        found = true;
      }
    }

    // Add an entry for the selected day if none exists, then get data again
    if (!found) {
      console.log("an entry was not found :(");
      let entryToAdd;

      if (defaults.wake == null || defaults.sleep == null) {
        console.log("null defaults");
        entryToAdd = { schedule: [], wake: currentDay, sleep: null };
      } else {
        console.log(
          "valid defaults: " + defaults.wake + " , " + defaults.sleep
        );
        let tempWake = dayjs(currentDay);
        let tempSleep = dayjs(currentDay);
        let defaultWake = dayjs(defaults.wake);
        let defaultSleep = dayjs(defaults.sleep);
        console.log(defaultWake);
        console.log(defaultSleep);

        tempWake = tempWake.hour(defaultWake.get("hour"));
        tempWake = tempWake.minute(defaultWake.get("minute"));
        tempSleep = tempSleep.hour(defaultSleep.get("hour"));
        tempSleep = tempSleep.minute(defaultSleep.get("minute"));

        console.log(tempWake);
        console.log(tempSleep);
        if (tempWake.diff(tempSleep, "minute") > 0) {
          tempSleep = tempSleep.add(1, "day");
        }
        entryToAdd = { schedule: [], wake: tempWake, sleep: tempSleep };
      }
      entries.push(entryToAdd);
      if (entries.length > 1) {
        entries.sort((a, b) => Date.parse(a.wake) - Date.parse(b.wake));
      }

      await axios.patch(
        "http://localhost:8282/schedule/",
        { entries },
        { new: true }
      );
      console.log("get schedule call");
      getSchedule();
    }
    /* TODO CONDITIONAL SCHEDULE RELOADING - IS IT NECESSARY? IF SO, NEEDS TO BE REDONE
        
        const taskReq = await axios.get("http://localhost:8282/task/")
        let tasks = taskReq.data.filter(task => task.isActive)

        if (scheduleReq.data.schedule.length != tasks.length) {
            sortSchedule(setSchedule, start, end)
            //await axios.patch(`http://localhost:8282/schedule/`, {schedule})
        }*/
  }

  async function refreshSchedule() {
    //Loop through JSON tasks in schedule
    for (let i = 0; i < schedule.length; i++) {
      // Update completed value of each task (only refresh value currently)
      let currentID = schedule[i]._id;
      let cTaskReq = await axios.get(`http://localhost:8282/task/${currentID}`);
      let cTask = cTaskReq.data;
      schedule[i].completed = cTask.completed;
    }
    //Patch updated schedule to server
    await axios.patch(`http://localhost:8282/schedule/`, {
      schedule,
      wake,
      sleep,
    });
  }
  /*
    start time: 2 + (hours since wake * 12)
    height: duration in hours * 12
    schedule => gridStyles ={...}
    foreach(item in schedule){
      
        const gridRowStyles3 = {
    gridRow: "2 / span 12",
  };
    }
  */
  function renderSchedule() {
    console.log("rendering schedule!");
    console.log(schedule);
    const scWake = dayjs(wake).second(0).millisecond(0);

    return schedule.map((task) => {
      let taskStart = dayjs(task.start).second(0).millisecond(0);
      let gridStart = taskStart.diff(scWake, "minute") + 1;
      let gridHeight = task.duration;
      let gridRowStyles = {
        gridRow: `${gridStart} / span ${gridHeight}`,
      };

      console.log(gridRowStyles);
      if (task.name == "Free Time") {
        return;
      }
      return (
        <ScheduleBlock
          task={task}
          refreshSchedule={refreshSchedule}
          getSchedule={getSchedule}
          currentDay={currentDay}
          gridRowStyles={gridRowStyles}
        ></ScheduleBlock>
      );
    });

    console.log("render complete");
  }

  async function updateStats() {
    //update task stats
    let today = new Date(wake);
    let dayDurationToAdd = 0;

    schedule.forEach(async (task) => {
      //loop through completed tasks
      if (task.completed) {
        let { _id, duration } = task;
        let taskStatReq = await axios.get(
          `http://localhost:8282/taskStat/${_id}/`
        );
        let { entries, timesCompleted, netTime } = taskStatReq.data;
        let entryDate = new Date();
        if (entries.length != 0) {
          let tempEntryDate = new Date(entries[entries.length - 1].date);
          entryDate = tempEntryDate;
        }

        //CHECK TO MAKE SURE TASK HAS NOT BEEN COMPLETED TODAY, then push stats
        if (
          entries.length == 0 ||
          !(
            entryDate.getMonth() == today.getMonth() &&
            entryDate.getDate() == today.getDate()
          )
        ) {
          let entryToPush = { date: wake, duration: duration };
          dayDurationToAdd += duration;
          entries.push(entryToPush);
          await axios.patch(`http://localhost:8282/taskStat/${_id}/`, {
            entries: entries,
            timesCompleted: timesCompleted + 1,
            netTime: netTime + duration,
            averageDuration: (netTime + duration) / (timesCompleted + 1),
          });
        } else {
          console.log("task already completed today");
        }
      } else {
        console.log("task not completed");
      }
    });

    //update user stats
    // Pull user stats

    let userStatReq = await axios.get("http://localhost:8282/userStat/");
    let { entries, daysCompleted, streak } = userStatReq.data;

    let entryDate = new Date();
    if (entries.length != 0) {
      let tempEntryDate = new Date(entries[entries.length - 1].date);
      entryDate = tempEntryDate;
    }

    if (
      entries.length == 0 ||
      !(
        entryDate.getMonth() == today.getMonth() &&
        entryDate.getDate() == today.getDate()
      )
    ) {
      //if no entry for today
      let entryToPush = { date: wake, duration: dayDurationToAdd };
      entries.push(entryToPush);
      await axios.patch("http://localhost:8282/userStat/", {
        entries,
        daysCompleted: daysCompleted + 1,
        streak: streak + 1,
      });
    } else if (dayDurationToAdd > 0) {
      let entryToPush = {
        date: wake,
        duration: entries[entries.length - 1].duration + dayDurationToAdd,
      };
      entries.push(entryToPush);
      await axios.patch("http://localhost:8282/userStat/", {
        entries,
        daysCompleted,
        streak,
      });
    }
  }

  async function updateHours() {
    console.log("updating");
    try {
      // Find entry matching selected day. Update hours. Get Schedule.

      const scheduleReq = await axios.get("http://localhost:8282/schedule/");
      console.log(scheduleReq.data);
      let { entries, defaults } = scheduleReq.data;
      let found = false;

      //If sleep is before wake, add a day
      let tempSleep = dayjs(sleep);
      let tempWake = dayjs(wake);
      if (tempWake.diff(tempSleep, "minutes") > 0) {
        tempSleep = tempSleep.add(1, "day");
      }

      //Update defaults if selected ; TODO: store defaults better
      if (updateDefault) {
        defaults = { wake: tempWake, sleep: tempSleep };
      }

      for (let i = 0; i < entries.length; i++) {
        // If an entry matching the selected day is found

        if (sameDate(entries[i].wake, currentDay)) {
          entries[i].wake = tempWake;
          entries[i].sleep = tempSleep;
          // TODO should wake & start be set manually? Or does sorting call getSchedule and reset?
          await axios.patch("http://localhost:8282/schedule/", {
            entries,
            defaults,
          });

          //TODO if resort schedule on edit hours, do so here
        }
      }

      setHoursExpanded(false);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getSchedule();
    console.log("useeffect");
  }, [currentDay]);

  // calendar styles (convert to tailwind later)

  let djSleep = dayjs(sleep).second(0).millisecond(0);
  let djWake = dayjs(wake).second(0).millisecond(0);
  let totalTime = djSleep.diff(djWake, "minutes");
  const gridStyles = {
    gridTemplateRows: `repeat(${Math.floor(
      totalTime / 60
    )}, minmax(6rem, 1fr))`,
  };
  const gridStyles1 = {
    gridTemplateRows: `2rem repeat(${totalTime}, minmax(0, 1fr)) auto`,
  };

  function renderGridLines() {
    let arr = [];

    for (let i = 0; i < totalTime / 60; i++) {
      let toPush = (
        <>
          <div>
            <div className="-ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
              {convertTimeNew(djWake.add(i, "hour"))}
            </div>
          </div>
        </>
      );

      arr.push(toPush);
    }
    return arr;
  }

  let [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* <PageTitle>{getDateValue(currentDay, "numeric")}</PageTitle>
        <SubHeading>A scheduling app</SubHeading> */}
      {/* {
          <button onClick={() => setHoursExpanded(!hoursExpanded)}>
            Edit Hours
          </button>
        }
        {hoursExpanded && (
          <ExpandableContainer>
            <TimeField
              label="Start Time"
              value={dayjs(wake)}
              onChange={(newWake) => {
                setWake(newWake.toDate());
              }}
            />

            <TimeField
              label="End Time"
              value={dayjs(sleep)}
              onChange={(newSleep) => {
                setSleep(newSleep.toDate());
              }}
            />
            <div>
              {updateDefault ? (
                <CheckSquare
                  size={20}
                  onClick={() => setUpdateDefault(false)}
                  classNameName="text-gray-500"
                />
              ) : (
                <Square
                  size={20}
                  onClick={() => setUpdateDefault(true)}
                  classNameName="text-gray-500"
                />
              )}
              <p>Set As Default Hours</p>
            </div>
            <button onClick={() => updateHours()}>Done</button>
          </ExpandableContainer>
        )} */}

      <div className="flex h-full flex-col">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-3xl font-medium">Today's schedule</h1>
          <div className="flex gap-4 items-center">
            <div className="flex gap-1 items-center">
              {isToday && (
                <>
                  <p>Focus mode:</p>
                  <Square size={20} onClick={() => setIsOpen(true)} />
                </>
              )}
              <Dialog
                open={isOpen}
                onClose={() => setIsOpen(false)}
                className="relative z-50 "
              >
                <div className="fixed inset-0 flex items-center justify-center p-4 backdrop-blur-xl">
                  <Dialog.Panel>
                    <Countdown
                      schedule={schedule}
                      currentDay={currentDay}
                      getSchedule={getSchedule}
                    />
                    <div className="fixed-top flex justify-end pt-10 px-16">
                      <button onClick={() => setIsOpen(false)}>
                        <X size={30} className="hover:scale-75 duration-300" />
                      </button>
                    </div>
                  </Dialog.Panel>
                </div>
              </Dialog>
            </div>
            {/* edit hours */}
            <Popover className="relative flex text-left">
              <p className="border border-gray-200 bg-stone-50 text-slate-900 rounded-l-lg px-4 py-2 text-sm">
                Edit hours
              </p>
              <Popover.Button>
                <div className="px-2 py-2 rounded-r-lg border border-gray-200 border-l-0 hover:bg-gray-200 hover:cursor-pointer hover:duration-100 duration-100">
                  <Alarm size={20} />
                </div>
              </Popover.Button>

              <Transition
                as={React.Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Popover.Panel className="z-10 origin-top-right absolute right-0 mt-12 w-72 rounded-md shadow-xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  {({ close }) => (
                    <div
                      className="px-4 py-6 space-y-8"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex gap-2">
                        <TimeField
                          label="Start Time"
                          value={dayjs(wake)}
                          onChange={(newWake) => {
                            setWake(newWake.toDate());
                          }}
                        />

                        <TimeField
                          label="End Time"
                          value={dayjs(sleep)}
                          onChange={(newSleep) => {
                            setSleep(newSleep.toDate());
                          }}
                        />
                      </div>
                      <div className="flex gap-1 items-center justify-end">
                        <p>Set As Default Hours</p>
                        <div>
                          {updateDefault ? (
                            <CheckSquare
                              size={20}
                              onClick={() => setUpdateDefault(false)}
                              classNameName="text-gray-500"
                            />
                          ) : (
                            <Square
                              size={20}
                              onClick={() => setUpdateDefault(true)}
                              classNameName="text-gray-500"
                            />
                          )}
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <button
                          onClick={() => {
                            updateHours();
                            close();
                          }}
                          className="px-4 py-2 rounded-md border border-green-500 bg-green-500/10 border-solid hover:bg-green-500 hover:text-white duration-200 text-green-600 font-normal"
                        >
                          Done
                        </button>
                      </div>
                    </div>
                  )}
                </Popover.Panel>
              </Transition>
            </Popover>

            {wake != null &&
            wake != "Invalid Date" &&
            sleep != null &&
            sleep != "Invalid Date" ? (
              <div className="flex gap-4">
                <div className="flex">
                  <p className="border border-gray-200 bg-stone-50 text-slate-900 rounded-l-lg px-4 py-2 text-sm">
                    Generate schedule
                  </p>
                  <button
                    onClick={() => newSort(setSchedule, currentDay, false)}
                    className="px-2 py-2 rounded-r-lg border border-solid border-gray-200 border-l-0 hover:bg-gray-200 hover:cursor-pointer hover:duration-100 duration-100"
                  >
                    <FunnelSimple size={20} />
                  </button>
                </div>
                {isToday && (
                  <div className="flex">
                    <p className="border border-gray-200 bg-stone-50 text-slate-900 rounded-l-lg px-4 py-2 text-sm">
                      Call it a day
                    </p>
                    <button
                      onClick={() => updateStats()}
                      className="px-2 py-2 rounded-r-lg border border-solid border-gray-200 border-l-0 hover:bg-gray-200 hover:cursor-pointer hover:duration-100 duration-100"
                    >
                      <CheckCircle size={20} />
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <p>Set your wake and sleep times before generating a schedule!</p>
            )}
          </div>
        </div>
        <div className="isolate flex flex-auto overflow-hidden bg-white border rounded-md">
          <div className="flex flex-auto flex-col overflow-auto">
            <div className="flex w-full flex-auto">
              <div className="w-14 flex-none bg-white ring-1 ring-gray-100"></div>
              <div className="grid flex-auto grid-cols-1 grid-rows-1">
                {/* <!-- Horizontal lines --> */}
                <div
                  className="col-start-1 col-end-2 row-start-1 grid divide-y divide-gray-900"
                  style={gridStyles}
                >
                  <div className="row-end-1 h-7"></div>
                  {renderGridLines()}
                </div>

                {/* <!-- Events --> */}
                <ol
                  className="col-start-1 col-end-2 row-start-1 grid grid-cols-1"
                  style={gridStyles1}
                >
                  {renderSchedule()}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
