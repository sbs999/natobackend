const getDate = () => {
  return {
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
    day: new Date().getDate(),
    hour: new Date().getHours() + 4,
    minute: new Date().getMinutes(),
  };
};

export { getDate };
