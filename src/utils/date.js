function addZero(z) {
  return z < 10 ? "0" + z : z;
}

function getUserTime(time) {
  const date = new Date(time);
  let Y = date.getFullYear();
  let M = addZero(date.getMonth() + 1);
  let D = addZero(date.getDate());
  let h = addZero(date.getHours());
  let m = addZero(date.getMinutes());
  let s = addZero(date.getSeconds());

  return `${D}.${M}.${Y} ${h}:${m}:${s}`;
}

export { getUserTime };
