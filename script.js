let startTime;
let running = false;
let interval;
let lapCounter = 1;

function startStopwatch() {
  if (!running) {
    running = true;
    startTime = Date.now();
    interval = setInterval(updateStopwatch, 10); // Update every 10 milliseconds
    document.getElementById('startBtn').disabled = true;
    document.getElementById('stopBtn').disabled = false;
    document.getElementById('lapBtn').disabled = false;
  }
}

function stopStopwatch() {
  if (running) {
    running = false;
    clearInterval(interval);
    document.getElementById('startBtn').disabled = false;
    document.getElementById('stopBtn').disabled = true;
    document.getElementById('lapBtn').disabled = true;
  }
}

function resetStopwatch() {
  stopStopwatch();
  document.getElementById('stopwatch').textContent = '00:00:00:00';
  document.getElementById('lapList').innerHTML = '';
  lapCounter = 1;
}

function updateStopwatch() {
  const elapsedTime = Date.now() - startTime;
  const hours = Math.floor(elapsedTime / (1000 * 60 * 60));
  const minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
  const milliseconds = Math.floor((elapsedTime % 1000));

  const formattedTime = `${padTime(hours)}:${padTime(minutes)}:${padTime(seconds)}:${padTime(milliseconds, 3)}`;
  document.getElementById('stopwatch').textContent = formattedTime;
}

function padTime(time, digits = 2) {
  let str = time.toString();
  while (str.length < digits) {
    str = '0' + str;
  }
  return str;
}

function lapTime() {
  const lapTime = document.getElementById('stopwatch').textContent;
  const lapItem = document.createElement('li');
  lapItem.textContent = `Lap ${lapCounter}: ${lapTime}`;
  document.getElementById('lapList').appendChild(lapItem);
  lapCounter++;
}
