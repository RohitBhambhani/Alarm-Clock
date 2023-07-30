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