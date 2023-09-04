type DayDate = {
  day: number;
  weekday: string;
  weekdayNumber: number;
};

const getNextMonthDate = (daysOFFset: number, month: number, year: number) => {
  const quantityOfNextDays = 7 - daysOFFset;
  //7 - 4 = 3
  const nextMonth = month === 11 ? 0 : month + 1;

  const nextDaysArrayTotal = getAllDaysInMonth(
    month === 11 ? year + 1 : year,
    nextMonth,
    false
  );

  // nextDaysArrayTotal.length = 4
  const nextDaysArray = nextDaysArrayTotal.slice(0, quantityOfNextDays);

  return nextDaysArray;
};

const getPastMonthData = (daysOffset: number, month: number, year: number) => {
  const quantityOfPastDays = daysOffset - 1;
  // quantityOfPastDays = 3
  const pastMonth = month - 1;
  // pastMonth = 8

  const pastDaysArrayTotal = getAllDaysInMonth(
    month === 1 ? year - 1 : year,
    pastMonth,
    false
  );
  // pastDaysArrayTotal = [1...31]

  const pastDaysArray = pastDaysArrayTotal.slice(
    pastDaysArrayTotal.length - quantityOfPastDays,
    pastDaysArrayTotal.length
  );
  // pastDaysArrayTotal.slice(28, 31)

  return pastDaysArray;
};

const getDayData = (year: number, month: number, day: number) => {
  const date = new Date(year, month, day);
  const dayOfWeek = date.toLocaleString("en-US", { weekday: "long" });
  const dayOfWeekNumber = date.getDay() + 1;

  return { dayOfWeek, dayOfWeekNumber };
};

export function getAllDaysInMonth(
  year: number,
  month: number,
  shouldGetOtherMonth = true
) {
  const daysInMonth = new Date(year, month === 11 ? 0 : month + 1, 0).getDate();
  const days = [] as DayDate[];

  for (let day = 1; day <= daysInMonth; day++) {
    const { dayOfWeek, dayOfWeekNumber } = getDayData(year, month, day);

    const notSunday = dayOfWeekNumber > 1;
    const notSaturday = dayOfWeekNumber < 7;

    if (day == 1 && notSunday && shouldGetOtherMonth) {
      const pastMonthData = getPastMonthData(dayOfWeekNumber, month, year);
      days.push(...pastMonthData);
      // [{}, {}, {}]
    }

    days.push({
      day: day,
      weekday: dayOfWeek,
      weekdayNumber: dayOfWeekNumber,
    });

    if (day >= daysInMonth && notSaturday && shouldGetOtherMonth) {
      const nextMonthData = getNextMonthDate(dayOfWeekNumber, month, year);
      days.push(...nextMonthData);
      // [{}, {}, {}]
    }
  }

  return days;
}
