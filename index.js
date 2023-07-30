const setAlarmBtn = document.querySelector('#setBtn');
const hour = document.querySelector('#hour');
const minute = document.querySelector('#minute');
const AmPm = document.querySelector('#ampm');
const alarmTimeIndicator = document.querySelector('#alarmText');
const ringTone = new Audio('./ringtone.mp3');



setInterval(() => {
    let date = new Date();
    // var h = ((date.getHours() - 12));
    let h = date.getHours(); 
    let m = date.getMinutes();
    let s = date.getSeconds();
    let ampm = "AM";

    // 12 Hour Format
    if (h > 11) {
    h = h - 12;
    // ampm = (date.getHours()) < 12 ? 'AM' : 'PM';
    ampm = 'PM'
    }

    // if hour value is 0 then set it to 12
    h = h == 0 ? h = 12 : h;
    // Adding 0 before h , m ,s 
    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;

    // Update time every second
    currentTime.textContent = `${h}:${m}:${s} ${ampm}`;

    
}, 1000);

// Set hour values
for (let i = 12; i > 0; i--) {
    i = i < 10 ? "0" + i : i;
    let option = ` <option value="${i}">${i}</option>`;
    hour.firstElementChild.insertAdjacentHTML("afterend", option);
}
// Set Minute values
for (let i = 59; i >= 0; i--) {
    i = i < 10 ? "0" + i : i;
    let option = ` <option value="${i}">${i}</option>`;
    minute.firstElementChild.insertAdjacentHTML("afterend", option);
}
// Set AM/PM values
for (let i = 2; i > 0; i--) {
    let am_pm = i == 1 ? "AM" : "PM";
    let option = `<option value="${am_pm}">${am_pm}</option>`;
    AmPm.firstElementChild.insertAdjacentHTML("afterend", option);
}


// Set button text
if (!localStorage.getItem('btnText')) {
    localStorage.setItem('btnText', 'Set Alarm');
    setAlarmBtn.textContent = localStorage.getItem('btnText');
} else {
    setAlarmBtn.textContent = localStorage.getItem('btnText');
}

// Set alarm 
const setAlarm = () => {

    // Clear alarm
    if (localStorage.getItem('isAlarmSet') == 'true') {
        // Reset Alarm time
        localStorage.setItem('alarmTime', "00:00:AM");
        ringTone.pause();
        // Enable selection of time
        localStorage.setItem('contentClass', 'content flex')
        content.className = localStorage.getItem('contentClass');
        // change button text to "Set alarm"
        localStorage.setItem('btnText', 'Set Alarm')
        setAlarmBtn.textContent = localStorage.getItem('btnText');
        // Hide resume button
        resumeBtn.hidden = true
        // Reset alarm indicator
        alarmTimeIndicator.textContent = "Alarm Time set to: ";
        alarmTimeIndicator.className = "d-none";
        // Set want to play to no to stop alarm
        localStorage.setItem('wantToPlay', 'no')
        // Return
        return localStorage.setItem('isAlarmSet', 'false');
    }

    // Getting alarm time from user
    let time = `${hour.value}:${minute.value}:${AmPm.value}`;
    if (time.includes("Hour") || time.includes("Minute") || time.includes("AM/PM")) {
        alert("Please select a valid time");
        return;
    }

    // Set alarm to true
    localStorage.setItem('isAlarmSet', 'true');
    // Set alarm time
    localStorage.setItem('alarmTime', time);
    // Disable selection of time when alarm is set
    localStorage.setItem('contentClass', 'content flex disable');
    content.className = localStorage.getItem('contentClass');
    // Set button text to "Clear Alarm";
    localStorage.setItem('btnText', 'Clear Alarm')
    setAlarmBtn.textContent = localStorage.getItem('btnText');
    // Set Alarm Time indicator
    alarmTimeIndicator.textContent = "Alarm Time set to: " + localStorage.getItem('alarmTime');
    alarmTimeIndicator.className = "";
    // Set user exited to false to avoid DOM exception
    localStorage.setItem('userExited', 'xxx');
}
// Set Button
setAlarmBtn.addEventListener('click', setAlarm);