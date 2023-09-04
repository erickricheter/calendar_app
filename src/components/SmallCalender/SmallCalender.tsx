import { useState } from "react";
import { getAllDaysInMonth } from "@/utils/date";

export function SmallCalender() {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const onChange = (isPast?: boolean) => {
    if (isPast) {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      } else setCurrentMonth(currentMonth - 1);
    } else {
      if (currentMonth === 11) {
        setCurrentYear(currentYear + 1);
        setCurrentMonth(0);
      } else setCurrentMonth(currentMonth + 1);
    }
  };

  return (
    <main className="grid grid-cols-7 border-2 border-blue-600">
      <div className="col-span-7">
        Current Month: {currentMonth} | Current Year: {currentYear}
      </div>
      {getAllDaysInMonth(currentYear, currentMonth).map((dayDate) => {
        return (
          <div
            className={`col-start-${dayDate.weekdayNumber} col-end-${dayDate.weekdayNumber} hover:`}
          >
            {dayDate.day} {dayDate.weekday} {dayDate.weekdayNumber}
          </div>
        );
      })}
      <button
        className="bg-gray-300 rounded-full"
        onClick={() => onChange(true)}
      >
        Past
      </button>
      <button className="bg-gray-300 rounded-full " onClick={() => onChange()}>
        Future
      </button>
    </main>
  );
}
