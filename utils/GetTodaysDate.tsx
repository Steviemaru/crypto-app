import { format } from "date-fns";

const todaysDate = new Date();

export const GetToday = () => {
  const today = todaysDate.getDay();
  return today;
};

function GetTodaysDate() {
  const formattedDate = format(todaysDate, "EEEE/dd/MM/yyyy");

  return <div>{formattedDate}</div>;
}

export default GetTodaysDate;
