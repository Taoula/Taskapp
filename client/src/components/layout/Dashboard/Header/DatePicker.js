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

export default function Datepicker() {
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

  return (
    <div className="flex">
      <div className="rounded-l-lg hover:cursor-pointer flex gap-2 items-center px-4 py-2 border border-gray-200 bg-stone-50 text-slate-900 hover:bg-gray-200 duration-100 hover:duration-100">
        <Calendar size={20} weight="fill" />
        {formatDate(currentDay)}
      </div>
      <div className="px-4 flex items-center gap-3 border bg-white border-gray-200 border-l-0 py-2 rounded-r-lg">
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
        <p>{currentDay.format("MM/DD/YYYY")}</p>
        <ArrowRight
          size={20}
          weight="bold"
          className="text-gray-500 hover:text-slate-900 duration-100 hover:duration-100 hover:cursor-pointer"
          onClick={incrementDay}
        />
      </div>
    </div>
  );
}