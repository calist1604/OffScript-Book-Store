//a way to write variable
const nama = "Calist"; //data type : string - words, sentence, etc
let umur = 17; //numbers - data type: integer

console.log(nama); //print / calling out data inside variable 'nama'
console.log(umur); //print / calling out data inside variable 'umur'

//data in variable written by 'led'
let age = 18;
age = 21;//in the console, only the very recent data that is gonna show

console.log(age);

//let with string
let namaa = "OLIP";
namaa = "asep";

//you can't write the same var twice when its already defined with 'const'
console.log(namaa);

//===DATA TYPE / TIPE DATA===

//1. String: text data
let kelas = "X-2";
let sekolah = "SMA ABBS BOYOLALI";
//written within double quotation mark ""

//2. Number: anything with number
let usia = 15;
let nilai = 99.5;
//data type number is written WITHOUT any quotation marks

//3. Boolean: data type that only have 2 output: TRUE or FALSE
let sudahLulus = false;
let sudahBayar = true;

//4. Array: to keep more than one data
//insted of typing:
let hobi1 = ["makan"];
let hobi2 = ["main"];

//you can just simplify it into one array
let hobi = ["tidur", "belajar", "olahraga", "masak"];
let siswa = ["calist", "olip", "hyayuk", "jeniw"];


console.log(hobi[0]);
console.log(siswa[2]);

//5. Structure Control - Percabangan\
//is used when your program needs to decide some action by condiition

//IF...ELSE
let score = 80;

if (score < 100 && score >= 75) {
    console.log("Lulus");
} else if (score == 70) {
    console.log("Congrats! You did well!");
} else {
    console.log("Tidak lulus");
}


alert("hellooooqq acalamuayaikum bestiy bestiy")