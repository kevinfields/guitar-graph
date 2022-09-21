export default function getTimeLeft (timeout) {
  return Math.ceil(
    ((timeout._idleStart + timeout._idleTimeout - Date.now()) / 1000)
  );
};