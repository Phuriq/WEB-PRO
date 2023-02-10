// ข้อ 3.1
function getDogDemo(url) {
  // hint: เรียกใช้ getAPI() โดยดึงข้อมูลจาก url = https://dog.ceo/api/breeds/image/random
  // ลอง console.log() ดูว่าข้อมูลที่ได้มาเป็นอย่างไร

}


// ข้อ 3.2
function Rainbow() {
  //TODO
  // 1. ในกรณีที่ status = 'success' ให้แสดงตัวเลขเป็นสีตามที่กำหนดในแต่ละ STATE
  // 2. ให้แสดงชื่อ STATE (STATE 1 หรือ STATE 2 หรือ STATE 3) ในกล่องข้อความเมื่อเกิด Error
  // 3. เปลี่ยนสีข้อความเป็นสีแดงเมื่อเกิด Error (class = 'has-text-error')

  const rainbow = document.getElementById("rainbow")
  setTimeout(() => {
    // STATE 1 color = 'has-text-primary'
      setTimeout(() => {
        // STATE 2 color = 'has-text-success'
        setTimeout(() => {
            // STATE 3 color = 'has-text-success'
        }, 2000)

      }, 2000)

  }, 2000)
}

function getResult(){
  const num = Math.floor(Math.random() * 10)
  console.log(num)
  if(num > 5) {
    return {
      'status': 'success',
      'text': num
    }
  }else{
    return {
      'status': 'error',
      'text': num
    }
  }
}

// ข้อ 3.3
function evenNumber(num) {
  // hint : ทำการสร้าง promise และเรียกใช้
}

// ข้อ 3.4
function task(id) {
  const delay = parseInt(Math.random() * 1000)
  // return promise
}

function tester() {
  // hint : task(1).then().catch() ..... task(4)...
  // ต้องเรียก function task 4 ครั้ง เปลี่ยน id ไปเรื่อยๆ
}

// ข้อ 3.5
// hint : เรียก getAPI() ที่ url = https://api.thecatapi.com/v1/images/search 
// อย่าลืม console.log() ดูข้อมูลที่ได้ด้วยว่ามีโครงสร้างแบบใด
function checkAuth(password) {
  
}

function fetchData(password) {
  
}

// GET API
function getAPI(url, success, error) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const res = JSON.parse(this.response);
      success(res);
    } else if (this.readyState == 4) {
      const res = JSON.parse(this.response);
      error(res);
    }
  };
  xhttp.open("GET", url, true);
  xhttp.setRequestHeader("Accept", "application/json");
  xhttp.send();
}
