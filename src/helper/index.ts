const getDate = (date?: Date) => {
  return {
    year: date ? date.getFullYear() : new Date().getFullYear(),
    month: date ? date.getMonth() : new Date().getMonth(),
    day: date ? date.getDate() : new Date().getDate(),
    hour: date ? date.getHours() : new Date().getHours() + 4,
    minute: date ? date.getMinutes() : new Date().getMinutes(),
  };
};

export { getDate };
