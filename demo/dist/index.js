"use strict";
// ================= 基本類型 ========================
// 真正開發的時候其實可以不用特別定義基本類型，因為 tsc 會其實會自動推導出 type 是什麼
// (以下是教學需求)
// 只是當你宣告變數但是沒有內容的話，你就需要去定義它的基本類型
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let str = "hello";
let num = 1000;
let boo = true;
let n = null;
let un = undefined;
let test = true; // 會使用到 any 的狀況： debug (如果不想要 type 檢查的話，那一開始就不應該用 ts 來開發)
//未指定變數類型時，視為 any
// ================= 陣列 array  ========================
let arr = ["a", "b"];
let arr2 = [["a", "b"]]; // 2 維陣列的每個 array 內容都要是 string
let arr3 = [1, 2, 3];
// ================= 元組 tupple  ========================
// 嚴格定義 type 跟數量
let tuple = [1, "a", true]; // 第一個位子要是 number, 第二個位子是 string, 第三個位子是 boolean
let tuple2 = [
    ["a", "b"],
    ["a", "a"],
];
// 2 維元組, 需要兩個元素, 且第一個&第二個元素內容都必須是 string
// ================= readonly - 無法更改 ========================
// 只能用於 array 或 tuple
const names = ["Peko"];
// ================= Enum 枚舉 ========================
// 增加易讀性
// response status
// ok -> 200
// not found -> 404
// internal server error -> 500
var ResponseStatus;
(function (ResponseStatus) {
    ResponseStatus[ResponseStatus["OK"] = 200] = "OK";
    ResponseStatus[ResponseStatus["NOT_FOUND"] = 404] = "NOT_FOUND";
    ResponseStatus[ResponseStatus["INTERNAL_SERVER_ERROR"] = 500] = "INTERNAL_SERVER_ERROR";
})(ResponseStatus || (ResponseStatus = {}));
const resStatus = ResponseStatus.OK;
console.log(resStatus); // 200
// ================= Union ========================
// 同一個變數可以放不同的變數類型
let price;
price = 1000;
price = "1000";
let a1;
a1 = 100;
a1 = "string";
let b1;
b1 = true;
b1 = "hi";
// ================= Object  ========================
let product1 = {
    name: "dress",
    price: 123,
    desc: "a beautiful dress",
};
let user1 = {
    name: "Peko",
    age: 18,
    height: 180, // 如果缺這項 => error
    // 沒有 email 不會報錯
};
// ================= function =================
function greeting(name) {
    return `hello ${name}`;
}
greeting("Peko"); // 自動推論 return 值會是 string
// greeting(123);
// 指定 return value type 是 number
function greeting1(name) {
    // return name
    return 123;
}
// void => 不 return 東西
function greeting2() {
    console.log("Hello world!");
}
// rest parameters
function addNum(a, b, ...rest) {
    return a + b + rest.reduce((p, c) => p + c, 0);
}
// ================= undefined in function =================
// 1. 可傳入可不傳入
// 2. 必須放最後面
function greeting4(name, age) {
    return name + age;
}
greeting4("Peko", 18);
greeting4("Peko");
// function greeting5 (age?:number, name: string){
//     return name + age
// }
function test1(a) {
    console.log(a);
    return;
}
function greeting5(name, age) {
    let b;
    // b = age; // 因為 age 可能是 undefined 所以報錯
    // test1(age) // undefined 不能用於 number, solution -> if statement
    if (age === undefined)
        return;
    test1(age);
    return;
}
// arrow function
const func1 = (a) => {
    return a;
};
const func2 = () => {
    return 100; // 推導 return value 是 number
};
// ================= unknown、斷言 as =================
// as - overwrite a type. Change direct the type of the given variable
// Syntax : <TYPE>value or value as TYPE
// ** as 並沒有真正改變變數的 type
let x = 4;
console.log(x.length); // undefined, 因為 number 並沒有 length
function getData() {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch("https://jsonplaceholder.typicode.com/todos/1");
        const data = (yield res.json());
    });
}
const data1 = {
    userId: 1,
    id: 1,
    title: "hello",
    completed: false,
};
// 假設 data1 是動態的
// 告訴 typescript 說你不用推倒他的類型是什麼了，你照我寫給你的 type 去推倒
const beta = data1;
// ================= 泛型 Generics =================
// 希望函數有不同類型，使用時才決定他的類型
// 好處：不用宣告不同類型的 function, 宣告一次 function 後可以用於不同類型。提高程式碼的彈性
// function, class 都可以用
function print(data) {
    console.log("data", data);
}
print(123);
// print<number>("123");
print("123");
// ================= utility =================
// built-in 工具
// 可以在 typescript docs => utility 查
//# sourceMappingURL=index.js.map