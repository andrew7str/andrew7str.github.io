// Script untuk efek rain matrix
const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const matrixChars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ#$%&*+=-';
const fontSize = 16;
const columns = canvas.width / fontSize;
const drops = new Array(Math.floor(columns)).fill(1);

function drawMatrix() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#00ff41';
  ctx.font = `${fontSize}px Courier New`;

  drops.forEach((y, x) => {
    const text = matrixChars[Math.floor(Math.random() * matrixChars.length)];
    ctx.fillText(text, x * fontSize, y * fontSize);

    if (y * fontSize > canvas.height && Math.random() > 0.975) {
      drops[x] = 0;
    }
    drops[x]++;
  });
}

setInterval(drawMatrix, 50);

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Script untuk jam digital dan tanggal
function updateTime() {
  const jam = document.getElementById('jam');
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');
  const date = now.toLocaleDateString();

  jam.innerHTML = `${hours}:${minutes}:${seconds} | ${date}`;
}

setInterval(updateTime, 1000);
updateTime(); // Set initial time

// Script untuk notifikasi
const notifButton = document.getElementById('notifikasi');
const notifMessage = document.getElementById('notif-message');
const postList = document.getElementById('post-list');

// Daftar Postingan
const posts = [
  { title: "Postingan 1: Matrix Launch" },
  { title: "Postingan 2: DarkTron News" },
  { title: "Postingan 3: New Code Released" }
];

// Menampilkan postingan pada notifikasi
function showPosts() {
  postList.innerHTML = '';
  posts.forEach(post => {
    const li = document.createElement('li');
    li.textContent = post.title;
    postList.appendChild(li);
  });
}

notifButton.addEventListener('click', () => {
  notifMessage.style.display = notifMessage.style.display === 'none' ? 'block' : 'none';
  showPosts(); // Menampilkan judul postingan saat klik notifikasi
});

// Script untuk menampilkan jam analog dan kalender saat klik jam
const clockContainer = document.getElementById('clock-container');
const jamElement = document.getElementById('jam');

jamElement.addEventListener('click', () => {
  clockContainer.style.display = clockContainer.style.display === 'none' ? 'block' : 'none';
  displayClock(); // Menampilkan jam analog
  displayCalendar(); // Menampilkan kalender
});

// Menampilkan Jam Analog
function displayClock() {
  const clock = document.getElementById('clock');
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  clock.innerHTML = `Analog Time: ${hours}:${minutes}:${seconds}`;
}

// Menampilkan Kalender
function displayCalendar() {
  const calendar = document.getElementById('calendar');
  const now = new Date();
  const month = now.getMonth() + 1; // Bulan (1 - 12)
  const day = now.getDate();
  const year = now.getFullYear();

  calendar.innerHTML = `Calendar: ${month}/${day}/${year}`;
}
