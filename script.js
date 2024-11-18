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

// Pastikan elemen canvas tersedia
let canvas = document.getElementById('rainMatrix');
let ctx = canvas.getContext('2d');

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

// Membuat efek hujan dengan karakter-karakter
let rainDrops = [];
const rainChar = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
const fontSize = 16;

function init() {
  for (let i = 0; i < canvas.width / fontSize; i++) {
    rainDrops.push({ x: i * fontSize, y: Math.random() * canvas.height });
  }
  animate();
}

function animate() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height); // Membersihkan layar dengan transparansi
  ctx.fillStyle = '#00ff41'; // Warna teks hijau matrix
  
  for (let i = 0; i < rainDrops.length; i++) {
    let rainDrop = rainDrops[i];
    ctx.fillText(rainChar[Math.floor(Math.random() * rainChar.length)], rainDrop.x, rainDrop.y);

    rainDrop.y += fontSize;

    // Reset jatuhnya hujan setelah melewati bawah layar
    if (rainDrop.y > canvas.height) {
      rainDrop.y = 0;
    }
  }
  requestAnimationFrame(animate);
}

// Menjalankan inisialisasi dan animasi RainMatrix
init();

// Fungsi untuk update jam dan tanggal secara real-time
function updateTime() {
  let jamElement = document.getElementById('jam');
  let tanggalElement = document.getElementById('tanggal');

  let date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  let day = date.getDate();
  let month = date.getMonth() + 1; // JavaScript menghitung bulan dari 0
  let year = date.getFullYear();

  // Format jam dan tanggal
  hours = (hours < 10) ? '0' + hours : hours;
  minutes = (minutes < 10) ? '0' + minutes : minutes;
  seconds = (seconds < 10) ? '0' + seconds : seconds;
  
  let formattedTime = `${hours}:${minutes}:${seconds}`;
  let formattedDate = `${month}/${day}/${year}`;

  // Tampilkan jam dan tanggal di taskbar
  jamElement.innerHTML = formattedTime;
  tanggalElement.innerHTML = formattedDate;
}

// Update jam setiap detik
setInterval(updateTime, 1000);
updateTime(); // Panggil fungsi sekali untuk memastikan waktu awal muncul

// Fungsi untuk menampilkan dan menyembunyikan pop-up notifikasi
function showNotification() {
  let notifMessage = document.getElementById('notifMessage');
  notifMessage.style.display = notifMessage.style.display === 'block' ? 'none' : 'block';
}

// Fungsi untuk membuka dan menutup Start Menu
function toggleStartMenu() {
  let startMenu = document.querySelector('.start-menu');
  startMenu.style.display = startMenu.style.display === 'block' ? 'none' : 'block';
}
