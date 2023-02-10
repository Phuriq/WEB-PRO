// ข้อ 2.1

function display(msg) {
    let div = document.getElementById('ex01-div')
    div.innerHTML = msg
}

function showConfirm(callback) {
    if (confirm()){
        callback("ยืนยันจ้า", display)
    }
    else{
        callback("ไม่ดีกว่า", display)
    }
}

// ข้อ 2.2
function start() {
    let start = document.getElementById('start');
    let process = document.getElementById('process');
    let end = document.getElementById('end');


    start.innerHTML = 'Program started'
    setTimeout(() =>{
        process.innerHTML = 'Hello World'
    }, 2000);

    setTimeout(() =>{
        end.innerHTML = 'Program ended'
    }, 3000);
}

// ข้อ 2.3
function stopTime() {
    var time = document.getElementById('Time').value

    let myTime = () => {
        let min = Math.floor(time / 60);
        let sec = time % 60;

        if (sec < 10){
            sec = '0' + sec
        }
        if (min < 10){
            min = '0' + min
        }

        var minutes = document.getElementById('setMinute');
        var seconds = document.getElementById('setSecond');

        minutes.innerHTML = min;
        seconds.innerHTML = sec;

        if (time > 0) {
            time--;
        } else {
            clearInterval(myTime);
        }
    }
    setInterval(myTime, 1000);
}

