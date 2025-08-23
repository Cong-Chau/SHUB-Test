export const toSeconds = (timeStr) => {
  const [h, m] = timeStr.split(":").map(Number);
  return h * 3600 + m * 60;
};
