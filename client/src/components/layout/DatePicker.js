import React, { useState } from "react";
import dayjs from "dayjs";
import { CaretRight, CaretLeft } from "phosphor-react";

export default function Datepicker() {
  const [selectedDate, setSelectedDate] = useState(dayjs());

  const handleDateChange = (daysToAdd) => {
    setSelectedDate((prevDate) => prevDate.add(daysToAdd, "day"));
  };

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
    <div className="flex items-center text-lg">
      <div className="rounded-l-lg px-4 py-2 border border-gray-200 bg-stone-50">
        {formatDate(selectedDate)}
      </div>
      <div className="px-4 flex items-center border border-gray-200 border-l-0 py-2 rounded-r-lg">
        <CaretLeft
          size={20}
          weight="bold"
          className="mr-2"
          onClick={() => handleDateChange(-1)}
        />
        <p>{selectedDate.format("MM/DD/YYYY")}</p>
        <CaretRight
          size={20}
          weight="bold"
          className="ml-2"
          onClick={() => handleDateChange(1)}
        />
      </div>
    </div>
  );
}
