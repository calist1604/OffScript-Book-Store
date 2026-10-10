let nama = "Alya"; //variabel
let nilai = [85, 72, 90, 92]; //array index (BI, Math, Ing, Infor)

// mengambil nilai Informatika
let nilaiInformatika = nilai[3]; //ambil data index nya no 3 nnti keluarnya 65

let kategori; //var akan diisi dengan hasil percabangan

// menentukan kategori nilai
if (nilaiInformatika >= 90) { //jika nilai infor lebih dari 90
    kategori = "Sangat Baik"; //akan muncul text ini
} else if (nilaiInformatika >= 80) { //jika kondisi pertama salah dan nilai lebih dari 80
    kategori = "Baik"; //muncul
} else if (nilaiInformatika >= 70) { //jika pernyataan 1 & 2 salah dan nilai lebih dari 70
    kategori = "Cukup"; //muncul
} else { //jika pernyataan di atas salah / nilai kurang dari 70
    kategori = "Perlu Belajar Lagi"; //muncul
}

// menampilkan hasil
console.log("Nama:", nama); //akan menghasilkan 'Nama: Alya' memanggil var 'nama'
console.log("Nilai Informatika:", nilaiInformatika); //memanggil var nilaiInformatika yg akan muncul 'Nilai Informatika: 65'
console.log("Kategori:", kategori); //kategorinya akan muncul 'Perlu Belajar Lagi' karena di var nilai tidak mencakup perbandingannya