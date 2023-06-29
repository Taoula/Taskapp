import React, { useState } from "react";
import dayjs from "dayjs";
import { CaretRight, CaretLeft, ArrowLeft, ArrowRight } from "phosphor-react";

export default function Datepicker() {
  const [selectedDate, setSelectedDate] = useState(dayjs());

  const handleDateChange = (daysToAdd) => {
    setSelectedDate((prevDate) => prevDate.add(daysToAdd, "day"));
  };

  const formatDate = (date) => {
    const today = dayjs();
    const yesterday = today.subtract(1, "day");

    if (date.isSame(today, "day")) {
      return "Today";
    } else if (date.isSame(yesterday, "day")) {
      return "Yesterday";
    } else if (date.isSame(today.add(1, "day"), "day")) {
      return "Tomorrow";
    } else {
      return "Selected date";
    }
  };

  return (
    <div className="flex">
      <div className="rounded-l-lg px-4 py-2 border border-gray-200 bg-stone-50 text-slate-900">
        {formatDate(selectedDate)}
      </div>
      <div className="px-4 flex items-center gap-3 border border-gray-200 border-l-0 py-2 rounded-r-lg">
        <ArrowLeft
          size={20}
          weight="bold"
          className="text-gray-500 hover:text-slate-900 duration-100 hover:duration-100"
          onClick={() => handleDateChange(-1)}
        />
        <p>{selectedDate.format("MM/DD/YYYY")}</p>
        <ArrowRight
          size={20}
          weight="bold"
          className="text-gray-500 hover:text-slate-900 duration-100 hover:duration-100"
          onClick={() => handleDateChange(1)}
        />
      </div>
    </div>
  );
}
