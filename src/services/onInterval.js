const OnInterval = (callback, seconds) => {
  let intervalId;
  let active = false;
  return {
    start: () => {
      intervalId = setInterval(callback, seconds * 1000);
      active = true;
    },
    stop: () => {
      clearInterval(intervalId);
      active = false;
    },
    isActive: () => active,
  };
};

export default OnInterval;
