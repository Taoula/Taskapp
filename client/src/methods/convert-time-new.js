import dayjs from "dayjs"

export default function convertTimeNew(timeString, hideMinutes){
    const date = dayjs(timeString);

    if (!date.isValid()) {
      return ""; // Return empty string for invalid dates
    }
    if (hideMinutes){
      return date.format("hA")
    }
    const formattedTime = date.format("h:mm A");
    return formattedTime;
}