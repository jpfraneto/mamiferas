const functions = {};

functions.calculateWeekFromNow = miracle => {
  const diff = functions.calculateRemainingDays(miracle);
  const totalElapsedDays = 280 - diff;
  const weeks = Math.floor(totalElapsedDays / 7);
  const days = totalElapsedDays % 7;
  return `${weeks}+${days}`;
};

functions.calculateRemainingDays = miracle => {
  if (typeof miracle === 'string') {
    miracle = Date.parse(miracle);
  }
  const now = new Date().getTime();
  const diff = miracle - now;
  return Math.floor(diff / (1000 * 60 * 60 * 24));
};

export default functions;
