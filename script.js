function toggleStartMenu() {
    const menu = document.getElementById('menu-content');
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
}

function toggleCalendar() {
    const calendarPopup = document.getElementById('calendar-popup');
    calendarPopup.style.display = calendarPopup.style.display === 'block' ? 'none' : 'block';
    if (calendarPopup.style.display === 'block') {
        updateCalendar();
    }
}

function updateCalendar() {
    const date = new Date();
    const calendarTitle = document.getElementById('calendar-title');
    calendarTitle.innerText = date.toLocaleDateString();
    // Here you can add more functionality to display a calendar
}

function updateClock() {
    const now = new Date();
    const dateElement = document.getElementById('date');
    const timeElement = document.getElementById('time');
    dateElement.innerText = now.toLocaleDateString();
    timeElement.innerText = now.toLocaleTimeString();

    const hourHand = document.getElementById('hour-hand');
    const minuteHand = document.getElementById('minute-hand');
    const secondHand = document.getElementById('second-hand');

    const seconds = now.getSeconds();
    const minutes = now.getMinutes();
    const hours = now.getHours();

    hourHand.style.transform = `rotate(${(hours % 12) * 30 + minutes * 0.5}deg)`;
    minuteHand.style.transform = `rotate(${minutes * 6}deg)`;
    secondHand.style.transform = `rotate(${seconds * 6}deg)`;
}

setInterval(updateClock, 1000);
updateClock();
