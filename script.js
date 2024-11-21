// Matrix Rain Effect
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const matrixChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%';
const fontSize = 16;
const columns = Math.floor(canvas.width / fontSize);

const drops = Array(columns).fill(1);

// Function to resize the canvas
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

// Draw the matrix effect
function drawMatrix() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#0f0';
    ctx.font = `${fontSize}px monospace`;

    for (let i = 0; i < drops.length; i++) {
        const text = matrixChars.charAt(Math.floor(Math.random() * matrixChars.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Reset drop position
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }

        drops[i]++;
    }

    requestAnimationFrame(drawMatrix);
}

// Start the animation
drawMatrix();

// Event listener for window resize
window.addEventListener('resize', resizeCanvas);

// Taskbar interactions
function toggleClockPopup() {
    const popup = document.getElementById('clock-popup');
    popup.style.display = popup.style.display === 'none' || popup.style.display === '' ? 'block' : 'none';
}

// Menyembunyikan popup saat mengklik di luar popup
window.onclick = function(event) {
    const popup = document.getElementById('clock-popup');
    if (event.target !== popup && event.target !== document.querySelector('.time-date')) {
        popup.style.display = 'none';
    }
}

function showNotification() {
    alert('This is a sample notification.');
}

