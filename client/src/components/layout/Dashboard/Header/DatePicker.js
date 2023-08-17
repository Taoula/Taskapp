import React, { useState } from "react";
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
import { Popover, Transition } from "@headlessui/react";

export default function Datepicker() {
  let [referenceElement, setReferenceElement] = useState();
  let [popperElement, setPopperElement] = useState();
  let { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: "bottom",
  });

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  function toggleCalendar() {
    setIsCalendarOpen(!isCalendarOpen);
  }

  const { currentDay, incrementDay, decrementDay, isToday } = useGlobalStore(
    (state) => ({
      currentDay: state.currentDay,
      incrementDay: state.incrementDay,
      decrementDay: state.decrementDay,
      isToday: state.isToday(),
    })
  );

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

  const [currentMonth, setCurrentMonth] = useState(new Date());

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

  const isPreviousMonthDisabled = () => {
    const today = new Date();
    return (
      currentMonth.getMonth() === today.getMonth() &&
      currentMonth.getFullYear() === today.getFullYear()
    );
  };

  const renderCalendar = () => {
    const days = [];
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(
        <td key={day}>
          <div className="px-2 py-2 cursor-pointer flex hover:bg-slate-100 w-full justify-center">
            <p className="text-base text-gray-500 font-medium">{day}</p>
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

  return (
    <>
      <Popover className="relative flex text-left">
        <Popover.Button ref={setReferenceElement}>
          <div className="px-4 py-2 rounded-l-lg flex gap-2 items-center border border-gray-200 border-r-0 hover:bg-gray-200 hover:cursor-pointer hover:duration-100 duration-100">
            <Calendar size={20} />
            <p className="font-normal text-md">{formatDate(currentDay)}</p>
          </div>
        </Popover.Button>
        <p className="border border-gray-200 bg-stone-50 flex items-center gap-3 text-slate-900 rounded-r-lg px-4 py-2 text-sm">
          {!isToday ? (
            <>
              <ArrowLeft
                size={20}
                weight="bold"
                className="text-gray-500 hover:text-slate-900 duration-100 hover:duration-100 hover:cursor-pointer"
                onClick={decrementDay}
              />
            </>
          ) : (
            <>
              <ArrowLeft
                size={20}
                weight="bold"
                className="text-gray-200 duration-100 hover:duration-100 hover:cursor-not-allowed"
              />
            </>
          )}
          <p className="">{currentDay.format("MM/DD/YYYY")}</p>
          <ArrowRight
            size={20}
            weight="bold"
            className="text-gray-500 hover:text-slate-900 duration-100 hover:duration-100 hover:cursor-pointer"
            onClick={incrementDay}
          />
        </p>

        <Transition
          as={React.Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Popover.Panel
            className="z-10 absolute w-full rounded-md shadow-xl bg-white focus:outline-none"
            ref={setPopperElement}
            style={styles.popper}
            {...attributes.popper}
          >
            <div className="px-8 py-6 mt-4 bg-white max-w-sm shadow-xl rounded-md border absolute">
              <div className="flex items-center justify-between">
                <div className="flex items-center justify-between w-full">
                  <button
                    aria-label="calendar backward"
                    className={`focus:text-gray-400 hover:text-gray-400 text-gray-800 ${
                      isPreviousMonthDisabled() === true
                        ? "cursor-not-allowed"
                        : ""
                    }`}
                    onClick={handlePrevMonth}
                    disabled={isPreviousMonthDisabled()}
                  >
                    <CaretLeft size={20} />
                  </button>
                  <span className="focus:outline-none text-base font-bold text-gray-800">
                    {currentMonth.toLocaleString("en-US", {
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                  <button
                    aria-label="calendar forward"
                    className="focus:text-gray-400 hover:text-gray-400 ml-3 text-gray-800"
                    onClick={handleNextMonth}
                  >
                    <CaretRight size={20} />
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between pt-8 overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr>
                      {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((day) => (
                        <th key={day}>
                          <div className="w-full flex justify-center">
                            <p className="text-base font-medium text-center text-gray-800 pb-4">
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
          </Popover.Panel>
        </Transition>
      </Popover>
    </>
  );
}
