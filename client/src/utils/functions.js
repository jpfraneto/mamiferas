const functions = {};

functions.calculateWeekFromNow = miracle => {
  if (typeof miracle === 'string') {
    miracle = Date.parse(miracle);
  }
  const now = new Date().getTime();
  const diff = miracle - now;
  const totalElapsedDays = 280 - Math.floor(diff / (1000 * 60 * 60 * 24));
  const weeks = Math.floor(totalElapsedDays / 7);
  const days = totalElapsedDays % 7;
  return `${weeks}+${days}`;
};

export default functions;
