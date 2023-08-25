import React, { useState, useEffect } from "react";
import useGlobalStore from "../../../../context/useGlobalStore";
import dayjs from "dayjs";
import {
  CaretRight,
  CaretLeft,
  ArrowLeft,
  ArrowRight,
  Calendar,
} from "phosphor-react";
import { usePopper } from "react-popper";
import { Transition } from "@headlessui/react";

export default function Datepicker() {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // positioning for calendar dropdown
  let [referenceElement, setReferenceElement] = useState();
  let [popperElement, setPopperElement] = useState();
  let { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: "bottom",
  });

  const { currentDay, incrementDay, decrementDay, isToday } = useGlobalStore(
    (state) => ({
      currentDay: state.currentDay,
      incrementDay: state.incrementDay,
      decrementDay: state.decrementDay,
      isToday: state.isToday(),
    })
  );

  // displays message depending on selected date
  const formatDate = (date) => {
    const today = dayjs();

    if (date.isSame(today, "day")) {
      return "Today";
    } else if (date.isSame(today.add(1, "day"), "day")) {
      return "Tomorrow";
    } else {
      return "Selected date";
    }
  };

  // calculates days and weeks for calendar dropdown
  const getDaysInMonth = (year, month) =>
    new Date(year, month + 1, 0).getDate();
  const getFirstDayOfWeek = (year, month) => new Date(year, month, 1).getDay();

  const daysInMonth = getDaysInMonth(
    currentMonth.getFullYear(),
    currentMonth.getMonth()
  );
  const firstDayOfWeek = getFirstDayOfWeek(
    currentMonth.getFullYear(),
    currentMonth.getMonth()
  );

  // disables previous month toggle if on current month
  const isPreviousMonthDisabled = () => {
    const today = new Date();
    return (
      currentMonth.getMonth() === today.getMonth() &&
      currentMonth.getFullYear() === today.getFullYear()
    );
  };

  // formats and renders dates in calendar dropdown
  const renderCalendar = () => {
    const days = [];
    const today = dayjs(); // Get the current real-life date

    for (let day = 1; day <= daysInMonth; day++) {
      const date = dayjs(
        new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
      );

      days.push(
        <td key={day}>
          {/* highlights current day and removes styling for all days before current day */}
          <div
            className={`px-2 py-2 cursor-pointer rounded-md flex   ${
              date.isSame(today, "day")
                ? "bg-blue-500 text-white "
                : date.isBefore(today, "day")
                ? "hover:cursor-not-allowed"
                : "dark:hover:bg-gray-500 hover:bg-slate-100"
            } w-full justify-center`}
          >
            {/* muted color for all days before current day */}
            <p
              className={`text-base font-medium text-gray-500 dark:text-gray-200 ${
                date.isBefore(today, "day") ? "dark:text-gray-500" : ""
              }`}
            >
              {day}
            </p>
          </div>
        </td>
      );
    }

    const weeks = [];
    let week = [];
    for (let i = 0; i < firstDayOfWeek; i++) {
      week.push(<td key={`empty-${i}`} />);
    }

    days.forEach((day, index) => {
      week.push(day);
      if ((index + firstDayOfWeek + 1) % 7 === 0 || index === days.length - 1) {
        weeks.push(<tr key={`week-${weeks.length}`}>{week}</tr>);
        week = [];
      }
    });

    return weeks;
  };

  // handles month switching in calendar dropdown
  const handlePrevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
    );
  };

  // closes calendar dropdown if clicked outside of calendar
  const handleClickOutsideCalendar = (event) => {
    if (
      popperElement &&
      !popperElement.contains(event.target) &&
      referenceElement &&
      !referenceElement.contains(event.target)
    ) {
      setIsCalendarOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideCalendar);

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideCalendar);
    };
  }, [popperElement, referenceElement]);

  return (
    <>
      <div className="flex">
        {/* dropdown button */}
        <div
          ref={setReferenceElement}
          onClick={(e) => setIsCalendarOpen(!isCalendarOpen)}
          className="rounded-l-lg hover:cursor-pointer flex gap-2 items-center px-4 py-2 bg-gray-200 text-slate-900 hover:bg-gray-300 duration-200 hover:duration-100 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-800/50"
        >
          <Calendar size={20} weight="fill" />
          <p className="font-normal text-md">{formatDate(currentDay)}</p>
        </div>

        {/* calendar dropdown */}
        <Transition
          show={isCalendarOpen}
          enter="transition-opacity duration-100"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className="p-8 mt-4 bg-white w-1/4 shadow-xl rounded-md border absolute dark:bg-gray-600 dark:border-gray-500"
            ref={setPopperElement}
            style={styles.popper}
            {...attributes.popper}
          >
            <div className="px-4 flex items-center justify-between">
              <div className="focus:outline-none text-base font-bold text-gray-800 dark:text-gray-200">
                {currentMonth.toLocaleString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </div>
              <div className="flex items-center">
                <button
                  aria-label="calendar backward"
                  className={`${
                    isPreviousMonthDisabled() === true
                      ? "dark:text-gray-500 cursor-not-allowed"
                      : "hover:text-gray-400 text-gray-800 dark:text-gray-200"
                  }`}
                  onClick={handlePrevMonth}
                  disabled={isPreviousMonthDisabled()}
                >
                  <CaretLeft size={20} />
                </button>
                <button
                  aria-label="calendar forward"
                  className=" hover:text-gray-400 ml-3 text-gray-800 dark:text-gray-200"
                  onClick={handleNextMonth}
                >
                  <CaretRight size={20} />
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between pt-12 overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr>
                    {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((day) => (
                      <th key={day}>
                        <div className="w-full flex justify-center">
                          <p className="text-base font-medium text-center text-gray-800 pb-4 dark:text-gray-200">
                            {day}
                          </p>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>{renderCalendar()}</tbody>
              </table>
            </div>
          </div>
        </Transition>

        {/* date toggler */}
        <div className="px-4 flex items-center gap-3 border bg-white border-gray-200 border-l-0 py-2 rounded-r-lg dark:bg-gray-600 dark:border-gray-800">
          {!isToday ? (
            <>
              <ArrowLeft
                onClick={decrementDay}
                size={20}
                weight="bold"
                className="text-gray-500 hover:text-slate-900 duration-100 hover:duration-100 hover:cursor-pointer dark:text-gray-200"
              />
            </>
          ) : (
            <>
              <ArrowLeft
                size={20}
                weight="bold"
                className="text-gray-200 duration-100 hover:duration-100 hover:cursor-not-allowed dark:text-gray-500"
              />
            </>
          )}
          <p className="dark:text-gray-200">
            {currentDay.format("MM/DD/YYYY")}
          </p>
          <ArrowRight
            size={20}
            weight="bold"
            className="text-gray-500 hover:text-slate-900 duration-100 hover:duration-100 hover:cursor-pointer dark:text-gray-200"
            onClick={incrementDay}
          />
        </div>
      </div>
    </>
  );
}
