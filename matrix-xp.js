// --- SYSTEM INITIALIZATION ---
function initSystem() {
    // Hide desktop initially logic is handled by overlays
    const bootProgress = document.getElementById('bootProgress');
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 5;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            setTimeout(() => {
                document.getElementById('bootScreen').style.display = 'none';
                document.getElementById('loginScreen').style.display = 'flex';
            }, 500);
        }
        bootProgress.style.width = progress + '%';
    }, 100);
}

function login() {
    const sound = document.getElementById('startupSound');
    sound.play().catch(e => console.log("Sound play failed:", e));
    
    const loginScreen = document.getElementById('loginScreen');
    loginScreen.style.opacity = '1';
    
    // Fade out effect
    let opacity = 1;
    const fade = setInterval(() => {
        opacity -= 0.05;
        loginScreen.style.opacity = opacity;
        if (opacity <= 0) {
            clearInterval(fade);
            loginScreen.style.display = 'none';
            // Open terminal on start if desired
            openWindow('systemTerminalWindow');
        }
    }, 50);
}

// --- MATRIX ANIMATION SCRIPT ---
const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth; canvas.height = window.innerHeight;
const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*';
const fontSize = 16; const columns = canvas.width / fontSize;
const drops = []; for(let x = 0; x < columns; x++) drops[x] = 1;

let matrixColor = '#0F0';
let matrixInterval = 33;
let matrixTimer = null;

function drawMatrix() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = matrixColor;
    ctx.font = fontSize + 'px monospace';
    
    for(let i = 0; i < drops.length; i++) {
        const text = letters.charAt(Math.floor(Math.random() * letters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if(drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

function startMatrix() {
    if (matrixTimer) clearInterval(matrixTimer);
    matrixTimer = setInterval(drawMatrix, matrixInterval);
}
startMatrix();

function updateMatrixColor(color) {
    matrixColor = color;
}

function updateMatrixSpeed(speed) {
    matrixInterval = 110 - speed; // inverse relationship: higher speed = lower interval
    startMatrix();
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// --- APPS LOGIC ---

// System Terminal (CMD)
function focusCmd() {
    document.getElementById('cmdInput').focus();
}

function handleCmd(e) {
    if (e.key === 'Enter') {
        const input = document.getElementById('cmdInput');
        const cmd = input.value.trim();
        const output = document.getElementById('cmdOutput');
        
        if (cmd === '') return;
        
        const line = document.createElement('div');
        line.innerText = 'C:\\Users\\Andrew>' + cmd;
        output.appendChild(line);
        input.value = '';
        
        const response = document.createElement('div');
        const lowCmd = cmd.toLowerCase();
        
        if (lowCmd === 'robloxai') {
            response.innerText = 'Opening Roblox AI Assistant...';
            openWindow('aiTerminalWindow');
        } else if (lowCmd === 'help') {
            response.innerHTML = 'Available commands:<br> - ROBLOXAI: Open AI Assistant<br> - HELP: Show this list<br> - CLEAR: Clear terminal<br> - EXIT: Close terminal';
        } else if (lowCmd === 'clear') {
            output.innerHTML = '';
        } else if (lowCmd === 'exit') {
            closeWindow('systemTerminalWindow');
        } else {
            response.innerText = "'" + cmd + "' is not recognized as an internal or external command.";
        }
        
        output.appendChild(response);
        output.appendChild(document.createElement('br'));
        document.getElementById('cmdBody').scrollTop = document.getElementById('cmdBody').scrollHeight;
    }
}

// GitHub Explorer
async function fetchGitHubRepos() {
    const list = document.getElementById('repoList');
    list.innerHTML = '<li style="padding:20px; text-align:center;">Fetching...</li>';
    try {
        const response = await fetch('https://api.github.com/users/andrew7str/repos?sort=updated');
        const repos = await response.json();
        list.innerHTML = '';
        repos.slice(0, 10).forEach(repo => {
            const li = document.createElement('li');
            li.className = 'repo-item';
            li.onclick = () => window.open(repo.html_url, '_blank');
            li.innerHTML = `
                <span class="repo-name">${repo.name}</span>
                <span class="repo-stars">★ ${repo.stargazers_count}</span>
            `;
            list.appendChild(li);
        });
    } catch (e) {
        list.innerHTML = '<li style="padding:20px; color:red;">Failed to load.</li>';
    }
}

// Notepad
const notepad = document.getElementById('notepadArea');
notepad.value = localStorage.getItem('matrix_notepad') || '';
notepad.oninput = () => {
    localStorage.setItem('matrix_notepad', notepad.value);
};

// Music Player
const tracks = [
    { name: "Synthwave Matrix", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
    { name: "Digital Rain Lofi", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
    { name: "Neo Tokyo Drift", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" }
];
let currentTrackIdx = 0;
const audio = document.getElementById('bgAudio');
const trackLabel = document.getElementById('trackName');
const playBtn = document.getElementById('playBtn');

function loadTrack(idx) {
    const track = tracks[idx];
    audio.src = track.url;
    trackLabel.innerText = track.name;
}

function togglePlay() {
    if (audio.paused) {
        audio.play();
        playBtn.innerText = '⏸';
    } else {
        audio.pause();
        playBtn.innerText = '▶';
    }
}

function nextTrack() {
    currentTrackIdx = (currentTrackIdx + 1) % tracks.length;
    loadTrack(currentTrackIdx);
    audio.play();
    playBtn.innerText = '⏸';
}

function prevTrack() {
    currentTrackIdx = (currentTrackIdx - 1 + tracks.length) % tracks.length;
    loadTrack(currentTrackIdx);
    audio.play();
    playBtn.innerText = '⏸';
}
loadTrack(0);

// --- CLOCK & CALENDAR ---
function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; 
    const minStr = minutes < 10 ? '0' + minutes : minutes;
    const secStr = seconds < 10 ? '0' + seconds : seconds;
    
    document.getElementById('taskbarClock').innerText = hours + ':' + minStr + ' ' + ampm;
    if (document.getElementById('calClock')) {
        document.getElementById('calClock').innerText = hours + ':' + minStr + ':' + secStr + ' ' + ampm;
    }
}

function toggleCalendar() {
    const cal = document.getElementById('calendarFlyout');
    if (cal.style.display === 'block') {
        cal.style.display = 'none';
    } else {
        cal.style.display = 'block';
        renderCalendar();
    }
}

function renderCalendar() {
    const now = new Date();
    const month = now.getMonth();
    const year = now.getFullYear();
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
    document.getElementById('calMonthYear').innerText = monthNames[month] + " " + year;
    
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const grid = document.getElementById('calGrid');
    
    // Clear previous days
    const labels = grid.querySelectorAll('.cal-day-label');
    grid.innerHTML = '';
    labels.forEach(l => grid.appendChild(l));
    
    // Fill empty spaces
    for (let i = 0; i < firstDay; i++) {
        const empty = document.createElement('div');
        grid.appendChild(empty);
    }
    
    // Fill days
    for (let d = 1; d <= daysInMonth; d++) {
        const day = document.createElement('div');
        day.className = 'cal-day';
        if (d === now.getDate()) day.className += ' today';
        day.innerText = d;
        grid.appendChild(day);
    }
}

// Close calendar when clicking outside
document.addEventListener('mousedown', (e) => {
    const cal = document.getElementById('calendarFlyout');
    const tray = document.querySelector('.taskbar-tray');
    if (cal.style.display === 'block' && !cal.contains(e.target) && !tray.contains(e.target)) {
        cal.style.display = 'none';
    }
});

setInterval(updateClock, 1000);
updateClock();

// --- WINDOW MANAGEMENT ---
let zIndexCounter = 10;
const openWindows = new Set();

function openWindow(id) {
    const win = document.getElementById(id);
    if (!win) return;
    win.style.display = 'flex';
    focusWindow(id);
    if (!openWindows.has(id)) {
        openWindows.add(id);
        updateTaskbar();
    }
}

function closeWindow(id) {
    const win = document.getElementById(id);
    if (win) win.style.display = 'none';
    openWindows.delete(id);
    updateTaskbar();
}

function minimizeWindow(id) {
    const win = document.getElementById(id);
    if (win) {
        win.style.display = 'none';
        updateTaskbar();
    }
}

function maximizeWindow(id) {
    const win = document.getElementById(id);
    if (!win) return;
    if (win.dataset.maximized === 'true') {
        win.style.top = win.dataset.prevTop || '10%';
        win.style.left = win.dataset.prevLeft || '10%';
        win.style.width = win.dataset.prevWidth || '700px';
        win.style.height = win.dataset.prevHeight || '500px';
        win.dataset.maximized = 'false';
    } else {
        win.dataset.prevTop = win.style.top;
        win.dataset.prevLeft = win.style.left;
        win.dataset.prevWidth = win.style.width;
        win.dataset.prevHeight = win.style.height;
        win.style.top = '0';
        win.style.left = '0';
        win.style.width = '100vw';
        win.style.height = 'calc(100vh - 40px)';
        win.dataset.maximized = 'true';
    }
}

function focusWindow(id) {
    const win = document.getElementById(id);
    if (win) {
        zIndexCounter++;
        win.style.zIndex = zIndexCounter;
        if (win.style.display === 'none') {
            win.style.display = 'flex';
        }
    }
    document.querySelectorAll('.task-item').forEach(item => {
        item.classList.remove('active');
        if (item.dataset.winid === id) item.classList.add('active');
    });
}

function updateTaskbar() {
    const tasksContainer = document.getElementById('taskbarTasks');
    tasksContainer.innerHTML = '';
    
    openWindows.forEach(id => {
        const win = document.getElementById(id);
        const titleSpan = win.querySelector('.window-title span');
        const title = titleSpan ? titleSpan.innerText : id;
        
        const taskItem = document.createElement('div');
        taskItem.className = 'task-item';
        taskItem.dataset.winid = id;
        taskItem.innerHTML = '<span>' + title + '</span>';
        
        if (win.style.display !== 'none' && parseInt(win.style.zIndex || 0) == zIndexCounter) {
            taskItem.classList.add('active');
        }
        
        taskItem.onclick = () => {
            if (win.style.display === 'none') {
                focusWindow(id);
            } else if (parseInt(win.style.zIndex || 0) == zIndexCounter) {
                minimizeWindow(id);
            } else {
                focusWindow(id);
            }
        };
        tasksContainer.appendChild(taskItem);
    });
}

// --- DRAGGING ---
function startDrag(e, id) {
    const win = document.getElementById(id);
    if (win.dataset.maximized === 'true') return;
    focusWindow(id);
    
    const rect = win.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    function moveDrag(e) {
        win.style.left = (e.clientX - offsetX) + 'px';
        win.style.top = (e.clientY - offsetY) + 'px';
    }

    function stopDrag() {
        document.removeEventListener('mousemove', moveDrag);
        document.removeEventListener('mouseup', stopDrag);
    }

    document.addEventListener('mousemove', moveDrag);
    document.addEventListener('mouseup', stopDrag);
}

function toggleStartMenu() {
    const menu = document.getElementById('startMenu');
    menu.style.display = menu.style.display === 'none' ? 'flex' : 'none';
}

document.addEventListener('mousedown', (e) => {
    const menu = document.getElementById('startMenu');
    const startBtn = document.querySelector('.start-button');
    if (menu && menu.style.display === 'flex' && !menu.contains(e.target) && !startBtn.contains(e.target)) {
        menu.style.display = 'none';
    }
});

// --- AI & SETTINGS LOGIC ---
const modelOptions = {
    gemini: [
        { id: "gemini-3.0-pro", name: "Gemini 3 Pro" },
        { id: "gemini-3.0-flash", name: "Gemini 3 Flash" },
        { id: "gemini-2.5-pro", name: "Gemini 2.5 Pro" },
        { id: "gemini-1.5-pro", name: "Gemini 1.5 Pro" },
        { id: "gemini-1.5-flash", name: "Gemini 1.5 Flash (Sering Gratis)" },
        { id: "gemini-1.0-pro", name: "Gemini 1.0 Pro" },
        { id: "text-bison-001", name: "PaLM 2 (Text Bison - Lama)" }
    ],
    openai: [
        { id: "gpt-5.2", name: "GPT-5.2" },
        { id: "gpt-5", name: "GPT-5" },
        { id: "gpt-5-mini", name: "GPT-5 Mini" },
        { id: "gpt-4.5-turbo", name: "GPT-4.5 Turbo" },
        { id: "gpt-4.1", name: "GPT-4.1" },
        { id: "gpt-4o", name: "GPT-4 Omni (Terbaru)" },
        { id: "gpt-4-turbo", name: "GPT-4 Turbo" },
        { id: "gpt-4", name: "GPT-4 Klasik" },
        { id: "gpt-3.5-turbo", name: "GPT-3.5 Turbo" },
        { id: "text-davinci-003", name: "GPT-3 Davinci (Lama)" }
    ],
    claude: [
        { id: "claude-4-6-sonnet", name: "Claude 4.6 Sonnet" },
        { id: "claude-4-6-opus", name: "Claude 4.6 Opus" },
        { id: "claude-4-5-haiku", name: "Claude 4.5 Haiku" },
        { id: "claude-3-5-sonnet-20240620", name: "Claude 3.5 Sonnet" },
        { id: "claude-3-opus-20240229", name: "Claude 3 Opus" },
        { id: "claude-3-sonnet-20240229", name: "Claude 3 Sonnet" },
        { id: "claude-3-haiku-20240307", name: "Claude 3 Haiku" },
        { id: "claude-2.1", name: "Claude 2.1" },
        { id: "claude-2.0", name: "Claude 2.0" },
        { id: "claude-instant-1.2", name: "Claude Instant 1.2" }
    ]
};

let currentProvider = localStorage.getItem('ai_provider') || 'gemini';
let currentModel = localStorage.getItem('ai_model') || 'gemini-1.5-pro';
let apiKeys = JSON.parse(localStorage.getItem('api_keys')) || { gemini: '', openai: '', claude: '' };

function init() {
    document.getElementById('aiProvider').value = currentProvider;
    updateModelDropdown(currentModel);
    updateInterface();
}

function updateModelDropdown(preselectedModel = null) {
    const provider = document.getElementById('aiProvider').value;
    const modelSelect = document.getElementById('aiModel');
    modelSelect.innerHTML = '';
    
    modelOptions[provider].forEach(model => {
        const option = document.createElement('option');
        option.value = model.id;
        option.textContent = model.name;
        modelSelect.appendChild(option);
    });

    if (preselectedModel && modelOptions[provider].some(m => m.id === preselectedModel)) {
        modelSelect.value = preselectedModel;
    } else {
        modelSelect.value = modelOptions[provider][0].id;
    }
    document.getElementById('apiKeyInput').value = apiKeys[provider] || '';
}

function updateInterface() {
    document.getElementById('promptPrefix').innerText = 'root@' + currentProvider + ':~#';
    document.getElementById('terminalTitle').innerText = 'ROBLOX AI TERMINAL (' + currentModel.toUpperCase() + ')';
}

function saveSettings() {
    currentProvider = document.getElementById('aiProvider').value;
    currentModel = document.getElementById('aiModel').value;
    apiKeys[currentProvider] = document.getElementById('apiKeyInput').value.trim();
    
    localStorage.setItem('ai_provider', currentProvider);
    localStorage.setItem('ai_model', currentModel);
    localStorage.setItem('api_keys', JSON.stringify(apiKeys));
    
    updateInterface();
    closeWindow('apiSettingsWindow');
    addMessage("system", '> Engine diatur ke: ' + currentModel.toUpperCase());
}

function addMessage(sender, text) {
    const chat = document.getElementById('chatHistory');
    const msgDiv = document.createElement('div');
    msgDiv.className = 'msg ' + sender;
    msgDiv.innerText = text;
    chat.appendChild(msgDiv);
    chat.scrollTop = chat.scrollHeight;
}

function handleEnter(e) { 
    if(e.key === 'Enter') executePrompt(); 
}

async function executePrompt() {
    const input = document.getElementById('promptInput');
    const promptText = input.value.trim();
    if(!promptText) return;

    addMessage('user', promptText);
    input.value = '';

    const key = apiKeys[currentProvider];
    if(!key) {
        addMessage('system', '> ERROR: API Key untuk ' + currentProvider.toUpperCase() + ' belum diatur. Buka [API SETTINGS].');
        return;
    }

    addMessage('ai', '> Memproses dengan ' + currentModel + '...');
    
    const systemInstruction = "Kamu adalah asisten ahli Roblox Studio dan Lua scripting. Berikan jawaban yang terstruktur, fokus pada kode, dan jelaskan dengan singkat.";

    try {
        let aiResponse = "";
        
        if (currentProvider === 'gemini') {
            aiResponse = await fetchGemini(promptText, key, systemInstruction, currentModel);
        } else if (currentProvider === 'openai') {
            aiResponse = await fetchOpenAI(promptText, key, systemInstruction, currentModel);
        } else if (currentProvider === 'claude') {
            aiResponse = await fetchClaude(promptText, key, systemInstruction, currentModel);
        }

        addMessage('ai', aiResponse);
        
    } catch (error) {
        addMessage('system', '> SYSTEM ERROR (' + currentModel + '):\n' + error.message);
    }
}

async function fetchGemini(prompt, key, systemPrompt, model) {
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/' + model + ':generateContent?key=' + key, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            contents: [{ parts: [{ text: systemPrompt + "\n\nPermintaan User:\n" + prompt }] }]
        })
    });
    const data = await response.json();
    if (data.error) throw new Error(data.error.message);
    return data.candidates[0].content.parts[0].text;
}

async function fetchOpenAI(prompt, key, systemPrompt, model) {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": "Bearer " + key },
        body: JSON.stringify({
            model: model,
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: prompt }
            ]
        })
    });
    const data = await response.json();
    if (data.error) throw new Error(data.error.message);
    return data.choices[0].message.content;
}

async function fetchClaude(prompt, key, systemPrompt, model) {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { 
            "Content-Type": "application/json", 
            "x-api-key": key,
            "anthropic-version": "2023-06-01",
            "anthropic-dangerously-allow-browser": "true" 
        },
        body: JSON.stringify({
            model: model,
            max_tokens: 1024,
            system: systemPrompt,
            messages: [{ role: "user", content: prompt }]
        })
    });
    const data = await response.json();
    if (data.error) throw new Error(data.error.message);
    return data.content[0].text;
}

init();
// Initially open the AI terminal
openWindow('aiTerminalWindow');
