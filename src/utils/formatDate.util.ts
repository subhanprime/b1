/* eslint-disable @typescript-eslint/comma-dangle */
import IEventDocument from "../interfaces/event.schema.interface";

// Utility function to get the suffix for a number
const getNumberSuffix = (day: number): string => {
  if (day >= 11 && day <= 13) {
    return "th";
  }

  const lastDigit = day % 10;
  switch (lastDigit) {
    case 1:
      return "ST";
    case 2:
      return "ND";
    case 3:
      return "RD";
    default:
      return "TH";
  }
};

// Utility function to format a single date
const formatDate = (date: Date | undefined | null): string | null => {
  if (!date) return null;

  const day = date.getDate();
  const month = date
    .toLocaleDateString("en-US", { month: "short" })
    .toUpperCase();
  const suffix = getNumberSuffix(day);

  return `${day}${suffix} ${month}`;
};

// Utility function to format an array of events
const formatEventArray = (events: IEventDocument[]): any[] =>
  events.map((event) => ({
    // Copy other properties as-is
    ...event.toObject(),

    // Format the date
    formattedDate: formatDate(event.eventDate),
  }));

const formatDateFull = (dateString: string): string => {
  const date = new Date(dateString);

  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    month: "long",
    day: "numeric",
    year: "numeric",
  };

  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);

  // Add 'TH', 'ST', 'ND', or 'RD' to the day part
  const day = date.getDate();
  const suffix = getNumberSuffix(day);
  const finalFormattedDate = formattedDate.replace(/\d+/, `${day}${suffix}`);

  // Remove the comma after the date
  const formattedDateWithoutComma = finalFormattedDate.replace(
    /,(?=\s*\d)/,
    ""
  );

  return formattedDateWithoutComma.toUpperCase();
};

export { formatEventArray, formatDateFull };
