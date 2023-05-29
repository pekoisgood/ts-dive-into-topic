// ================= 基本類型 ========================
// 真正開發的時候其實可以不用特別定義基本類型，因為 tsc 會其實會自動推導出 type 是什麼
// (以下是教學需求)
// 只是當你宣告變數但是沒有內容的話，你就需要去定義它的基本類型

let str: string = "hello";
let num: number = 1000;
let boo: boolean = true;
let n: null = null;
let un: undefined = undefined;

let test: any = true; // 會使用到 any 的狀況： debug (如果不想要 type 檢查的話，那一開始就不應該用 ts 來開發)
//未指定變數類型時，視為 any

// ================= 陣列 array  ========================
let arr: string[] = ["a", "b"];
let arr2: string[][] = [["a", "b"]]; // 2 維陣列的每個 array 內容都要是 string
let arr3: number[] = [1, 2, 3];

// ================= 元組 tupple  ========================
// 嚴格定義 type 跟數量
let tuple: [number, string, boolean] = [1, "a", true]; // 第一個位子要是 number, 第二個位子是 string, 第三個位子是 boolean
let tuple2: [string, string][] = [
  ["a", "b"],
  ["a", "a"],
];
// 2 維元組, 需要兩個元素, 且第一個&第二個元素內容都必須是 string

// ================= readonly - 無法更改 ========================
// 只能用於 array 或 tuple
const names: readonly string[] = ["Peko"];

// ================= 小試身手 =================
// 1.
// let number:  = 123

// 2.
// complete an array of string
// let nameList: = ["Alice", "Fiona"]

// ================= Enum 枚舉 ========================
// 增加易讀性
// response status
// ok -> 200
// not found -> 404
// internal server error -> 500

enum ResponseStatus {
  OK = 200,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

const resStatus = ResponseStatus.OK;
console.log(resStatus); // 200

// ================= Union ========================
// 同一個變數可以放不同的變數類型
let price: number | string;
price = 1000;
price = "1000";
// price = true //error

// ================= type ========================
// 自定義類型
// 好處：可以重複使用 type
type NumAndStr = number | string;
type BooAndStr = boolean | string;

let a1: NumAndStr;
a1 = 100;
a1 = "string";

let b1: BooAndStr;
b1 = true;
b1 = "hi";
// b1 = 123 //error

// ================= interface 介面 ========================
// 只能用於 object type
// 跟 type 很像
interface Product {
  name: string;
  price: number;
  desc: string;
}

// ================= Object  ========================

let product1: Product = {
  name: "dress",
  price: 123,
  desc: "a beautiful dress",
};

// ================= type v.s. interface =================
// 1. 區別是 interface 是可以擴充的
// 2. interface 是可以被 class 被繼承

type User1 = {
  name: string;
  age: number;
};

// type User1 = {
//     ...
// }

interface User2 {
  name: string;
  age: number;
}

interface User2 {
  height: number;
  email?: string; // 加上 ? === string | undefined
}

let user1: User2 = {
  name: "Peko",
  age: 18,
  height: 180, // 如果缺這項 => error
  // 沒有 email 不會報錯
};

// ================= function =================
function greeting(name: string) {
  return `hello ${name}`;
}
greeting("Peko"); // 自動推論 return 值會是 string
// greeting(123);

// 指定 return value type 是 number
function greeting1(name: string): number {
  // return name
  return 123;
}

// void => 不 return 東西
function greeting2(): void {
  console.log("Hello world!");
}

// rest parameters
function addNum(a: number, b: number, ...rest: number[]) {
  return a + b + rest.reduce((p, c) => p + c, 0);
}

// ================= undefined in function =================
// 1. 可傳入可不傳入
// 2. 必須放最後面

function greeting4(name: string, age?: number) {
  return name + age;
}

greeting4("Peko", 18);
greeting4("Peko");

// function greeting5 (age?:number, name: string){
//     return name + age
// }

function test1(a: number) {
  console.log(a);
  return;
}

function greeting5(name: string, age?: number) {
  let b: number;
  // b = age; // 因為 age 可能是 undefined 所以報錯

  // test1(age) // undefined 不能用於 number, solution -> if statement
  if (age === undefined) return;
  test1(age);
  return;
}

// arrow function
const func1 = (a: number): number => {
  return a;
};

const func2 = () => {
  return 100; // 推導 return value 是 number
};

// ================= 泛型 Generics =================
// 希望函數有不同類型，使用時才決定他的類型
// 好處：不用宣告不同類型的 function, 宣告一次 function 後可以用於不同類型。提高程式碼的彈性
// function, class 都可以用
function print<T>(data: T) {
  console.log("data", data);
}

print<number>(123);
// print<number>("123");

print<string>("123");

// ================= unknown、斷言 as =================
// as - overwrite a type. Change direct the type of the given variable
// Syntax : <TYPE>value or value as TYPE

// ** as 並沒有真正改變變數的 type
let x: unknown = 4;
console.log((x as string).length); // undefined, 因為 number 並沒有 length

type Data = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

async function getData() {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos/1");
  const data = (await res.json()) as Data;
}

const data1: Data = {
  userId: 1,
  id: 1,
  title: "hello",
  completed: false,
};

type Beta = {
  name: string;
};

// 假設 data1 是動態的
// 告訴 typescript 說你不用推倒他的類型是什麼了，你照我寫給你的 type 去推倒
const beta = data1 as unknown as Beta;

// ================= utility =================
// built-in 工具
// 可以在 typescript docs => utility 查
