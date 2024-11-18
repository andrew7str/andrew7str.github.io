const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

// Fullscreen canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Characters and columns
const matrixChars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ#$%&*+=-';
const fontSize = 16;
const columns = canvas.width / fontSize;

// Store drops for animation
const drops = new Array(Math.floor(columns)).fill(1);

function drawMatrix() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'; // Slight fade effect
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#00ff41'; // Matrix green
  ctx.font = `${fontSize}px Courier New`;

  drops.forEach((y, x) => {
    const text = matrixChars[Math.floor(Math.random() * matrixChars.length)];
    ctx.fillText(text, x * fontSize, y * fontSize);

    // Reset drop to top or move down
    if (y * fontSize > canvas.height && Math.random() > 0.975) {
      drops[x] = 0;
    }
    drops[x]++;
  });
}

// Loop animation
setInterval(drawMatrix, 50);

// Adjust canvas size on window resize
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

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

// Script untuk jam digital
function updateTime() {
  const jam = document.getElementById('jam');
  const now = new Date();
  jam.textContent = now.toLocaleTimeString();
}

setInterval(updateTime, 1000);
updateTime(); // Set initial time

// Script untuk notifikasi
const notifButton = document.getElementById('notifikasi');
const notifMessage = document.getElementById('notif-message');

notifButton.addEventListener('click', () => {
  notifMessage.style.display = notifMessage.style.display === 'none' ? 'block' : 'none';
});
