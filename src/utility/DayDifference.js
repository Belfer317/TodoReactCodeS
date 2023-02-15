import { today } from "../App";
export const DayDefference = (todoDate) => {
  const msInADay = 24 * 60 * 60 * 1000;
  const endDate = new Date(todoDate);

  const timeDifference = endDate.getTime() - today.getTime();
  const eDaysToDate = timeDifference / msInADay;
  const daysToDate = Math.floor(eDaysToDate);
  return daysToDate;
};
