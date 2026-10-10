let nama = "Budi"; // variable

let belanja = ["Buku", "Pulpen", "Tas"]; // array
let harga = [15000, 5000, 120000]; // array index nya dari array yg di atas

// mengambil data Tas
let barang = belanja[2]; // variable barang memanggil variabel belanja yg nnti akan muncul tulisan 'Tas'
let hargaBarang = harga[2]; // variable hargaBarang memanggil variabel harga yg akan memunculkan number '120000'

let kategori;

// menentukan kategori harga
if (hargaBarang >= 100000) { //jika hargaBarang lebih dari 100rb
    kategori = "Mahal"; //akan muncul
} else if (hargaBarang >= 50000) { // jika hargaBarang lebih dari 50rb
    kategori = "Sedang"; // akan muncul
} else { // jika hargaBarang kurang dari 50rb
    kategori = "Murah"; // muncull
}


let uang = 100000;

//menentukan kategori uang
if (uang >= hargaBarang) {
    console.log("Budi dapat membeli Tas.");
} else {
    console.log("Budi tidak memiliki cukup uang.");
}
// menampilkan hasil
console.log("Nama:", nama); //akan ketambahan text "Nama:" dan var nama yg sudah tersedia
console.log("Barang:", barang); // ada text "Barang:" dan var barang akan muncul
console.log("Harga:", hargaBarang); //"Harga:" dan var hargaBarang yg dipilih
console.log("Kategori:", kategori); //"Kategori: " dan var kategori (Mahal, Sedang, atau Murah)