export const dateToString = (date: Date) => {
  return date.toLocaleDateString("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};

export const stringToDate = (date: string): Date => {
  return new Date(`${date}T00:00:00`);
};