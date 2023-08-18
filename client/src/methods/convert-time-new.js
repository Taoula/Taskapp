import dayjs from "dayjs"

export default function convertTimeNew(timeString){
    const date = dayjs(timeString);

    if (!date.isValid()) {
      return ""; // Return empty string for invalid dates
    }

    const formattedTime = date.format("h:mm A");
    return formattedTime;
}