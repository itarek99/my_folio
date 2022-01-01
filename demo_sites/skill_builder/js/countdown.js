const uiDay = document.querySelector(".day");
const uiHour = document.querySelector(".hour");
const uiMin = document.querySelector(".min");
const uiSec = document.querySelector(".sec");

const countDown = () => {
  let curretnYear = 2021;
  const countDate = new Date(`November 1, ${curretnYear} 00:00:00`).getTime();
  const now = new Date().getTime();
  const gap = countDate - now;

  const sec = 1000;
  const min = sec * 60;
  const hour = min * 60;
  const day = hour * 24;

  const remainingDay = Math.floor(gap / day);
  const remainingHour = Math.floor((gap % day) / hour);
  const remainingMin = Math.floor((gap % hour) / min);
  const remainingSec = Math.floor((gap % min) / sec);

  if (gap >= 0) {
    uiDay.textContent = remainingDay;
    uiHour.textContent = remainingHour;
    uiMin.textContent = remainingMin;
    uiSec.textContent = remainingSec;
  } else {
    document.querySelector(".content").classList.add("hidden");
    document.querySelector(".wish-box").classList.remove("hidden");
  }
};
setInterval(countDown, 1000);
