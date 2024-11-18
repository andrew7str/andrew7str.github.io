// RainMatrix
const canvas = document.getElementById("rainMatrix");
const ctx = canvas.getContext("2d");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const fontSize = 16;
const columns = canvas.width / fontSize;
let drops = Array(columns).fill(1);
const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

function drawRainMatrix() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#00ff41";
  ctx.font = `${fontSize}px monospace`;

  drops.forEach((y, x) => {
    const text = characters[Math.floor(Math.random() * characters.length)];
    ctx.fillText(text, x * fontSize, y * fontSize);

    if (y * fontSize > canvas.height && Math.random() > 0.975) {
      drops[x] = 0;
    }
    drops[x]++;
  });
  requestAnimationFrame(drawRainMatrix);
}
drawRainMatrix();

// Jam dan Tanggal
function updateTime() {
  const now = new Date();
  document.getElementById("jam").textContent = now.toLocaleTimeString("id-ID");
  document.getElementById("tanggal").textContent = now.toLocaleDateString("id-ID");
}
setInterval(updateTime, 1000);
updateTime();

// Start Menu
function toggleStartMenu() {
  const startMenu = document.querySelector(".start-menu");
  startMenu.style.display = startMenu.style.display === "block" ? "none" : "block";
}

// Notifikasi
function toggleNotification() {
  const notifPopup = document.getElementById("notifPopup");
  notifPopup.style.display = notifPopup.style.display === "block" ? "none" : "block";
}
