function sayHello () {
    return "Hello world!"
    // TODO: return คำว่า "Hello world!"
}

function isString (input) {
    return typeof input === "string";
    // input อาจจะเป็น String, Array, Number, Object หรือ Function ก็ได้
    // TODO: ถ้า input เป็น String ให้ return true, ถ้าไม่ใช่ return false
}

function isNumber (input) {
    return typeof input === "number";
    // input อาจจะเป็น String, Array, Number, Object หรือ Function ก็ได้
    // TODO: ถ้า input เป็น Number ให้ return true, ถ้าไม่ใช่ return false
}

function isArray (input) {
    return Array.isArray(input);
    // input อาจจะเป็น String, Array, Number, Object หรือ Function ก็ได้
    // TODO: ถ้า input เป็น Array ให้ return true, ถ้าไม่ใช่ return false
}

function isObject (input) {
    // return typeof input === "object" && input != null && !Array.isArray(input);
    return Object.prototype.toString.call(input) === "[object Object]"
    // input อาจจะเป็น String, Array, Number, Object หรือ Function ก็ได้
    // TODO: ถ้า input เป็น Object ให้ return true, ถ้าไม่ใช่ return false
}

function isFunction (input) {
    return typeof input === "function";
    // input อาจจะเป็น String, Array, Number, Object หรือ Function ก็ได้
    // TODO: ถ้า input เป็น Function ให้ return true, ถ้าไม่ใช่ return false
}