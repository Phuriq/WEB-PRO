function mapToSquare (input) {
    // TODO ใช้ .map สร้าง array ที่เป็นเลขยกกำลังสองของ input
    const bob = input.map(i => {
        if(i % 2 != 0)
        return i ** 2
        else 
        return i
    })
    return bob
}

function convertTemperature (input) {
    // TODO: ให้แปลงอุณหภูมิจาก °F เป็น °C โดยใช้ฟังก์ชัน .map()
    
        
    
    function fah_to_celsius (fah) {
        let cel = (fah - 32) * 5 / 9
        return Number(cel.toFixed(1))
    }

    return input.map(temp => 
      { return {
          date: temp.date,
          temperature: fah_to_celsius(temp.temperature)
      } })
}

function filterEvenNumber (input) {
    // TODO: filter input เอาเลขคู่เท่านั้น
    return input.filter(input => input % 2 == 0)
}

function filterAgeRange (input) {
    // TODO: กรอง input.people ตามช่วงอายุ
    return input.people.filter(item => item.age >= input.min && item.age <= input.max)
}

function removeByFilter (input) {
    // TODO: ลบ Object ใน Array ด้วยการ filter
    return input.people.filter(item => item.id !== input.removeId)
}

function replaceBySplice (input) {
    // TODO: ให้ใช้ฟังก์ชัน .splice() ในการ **เปลี่ยน (replace)** สมาชิกใน Array  
    // เรียงลำดับตัวเลขให้ถูกต้อง
    input.splice(0, 0, -1)
    return input;

}
