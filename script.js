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

  let formattedTime = `${hours}:${minutes}`;
  let formattedDate = `${day}/${month}/${year}`;

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

// Canvas untuk RainMatrix
let canvas = document.getElementById('rainMatrix');
let ctx = canvas.getContext('2d');

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

// Membuat efek hujan dengan karakter-karakter
let rainDrops = [];
const rainChar = ['0', '1', 'A', 'B', 'C', 'D', 'E', 'F'];
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
