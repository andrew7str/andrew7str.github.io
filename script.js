// Event untuk Start Menu
document.getElementById('logo').addEventListener('click', () => {
  const startMenu = document.getElementById('startMenuDropdown');
  startMenu.classList.toggle('start-menu-show');  // Menggunakan class untuk tampilkan menu
});

// Jam Analog dan Kalender Pop-up
document.getElementById('jam').addEventListener('click', () => {
  const clockContainer = document.getElementById('clock-container');
  clockContainer.style.display = clockContainer.style.display === 'none' ? 'block' : 'none';
  displayAnalogClock();
  displayCalendar();
});

function displayAnalogClock() {
  const analogClockCanvas = document.getElementById('analogCanvas');
  const analogCtx = analogClockCanvas.getContext('2d');
  analogClockCanvas.width = 180; // Ukuran lebih besar untuk jam analog
  analogClockCanvas.height = 180;

  // Logic untuk menggambar jam analog
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  const centerX = analogClockCanvas.width / 2;
  const centerY = analogClockCanvas.height / 2;
  const radius = 60;  // Ukuran jam

  analogCtx.clearRect(0, 0, analogClockCanvas.width, analogClockCanvas.height);
  analogCtx.beginPath();
  analogCtx.arc(centerX, centerY, radius, 0, Math.PI * 2);
  analogCtx.strokeStyle = '#00ff41';
  analogCtx.lineWidth = 8;
  analogCtx.stroke();

  // Jam
  const hourAngle = (Math.PI / 6) * (hours % 12 + minutes / 60);
  analogCtx.beginPath();
  analogCtx.moveTo(centerX, centerY);
  analogCtx.lineTo(centerX + radius * 0.5 * Math.cos(hourAngle - Math.PI / 2), centerY + radius * 0.5 * Math.sin(hourAngle - Math.PI / 2));
  analogCtx.strokeStyle = '#00ff41';
  analogCtx.lineWidth = 6;
  analogCtx.stroke();

  // Menit
  const minuteAngle = (Math.PI / 30) * minutes;
  analogCtx.beginPath();
  analogCtx.moveTo(centerX, centerY);
  analogCtx.lineTo(centerX + radius * 0.7 * Math.cos(minuteAngle - Math.PI / 2), centerY + radius * 0.7 * Math.sin(minuteAngle - Math.PI / 2));
  analogCtx.strokeStyle = '#00ff41';
  analogCtx.lineWidth = 4;
  analogCtx.stroke();

  // Detik
  const secondAngle = (Math.PI / 30) * seconds;
  analogCtx.beginPath();
  analogCtx.moveTo(centerX, centerY);
  analogCtx.lineTo(centerX + radius * 0.8 * Math.cos(secondAngle - Math.PI / 2), centerY + radius * 0.8 * Math.sin(secondAngle - Math.PI / 2));
  analogCtx.strokeStyle = '#ff0000';
  analogCtx.lineWidth = 2;
  analogCtx.stroke();
}

function displayCalendar() {
  const calendar = document.getElementById('calendar');
  const now = new Date();
  const month = now.getMonth() + 1; // Bulan (1 - 12)
  const day = now.getDate();
  const year = now.getFullYear();
  calendar.innerHTML = `${month}/${day}/${year}`;
}
