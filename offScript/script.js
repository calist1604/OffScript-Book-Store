// 1. BOOK DATA (Konstanta terpisah per buku)
const book1 = { id: 1, title: "Laskar Pelangi", author: "Andrea Hirata", price: 80000, stock: 5, icon: "⛵" };
const book2 = { id: 2, title: "Bumi Manusia", author: "Pramoedya A. Toer", price: 95000, stock: 4, icon: "🌍" };
const book3 = { id: 3, title: "Filosofi Teras", author: "Henry Manampiring", price: 88000, stock: 6, icon: "🏛️" };
const book4 = { id: 4, title: "Atomic Habits", author: "James Clear", price: 110000, stock: 3, icon: "⚡" };
const book5 = { id: 5, title: "Negeri 5 Menara", author: "A. Fuadi", price: 85000, stock: 5, icon: "🕌" };

let cart = [];

const memberDiscountRate = 0.10;    // Diskon member 10%
const discountFor3Books = 0.05;     // Diskon grosir 3+ buku (5%)
const discountFor5Books = 0.15;     // Diskon grosir 5+ buku (15%)

// Helper Format Rupiah
function formatRupiah(amount) {
    return "Rp " + amount.toLocaleString("id-ID");
}

// 2. RENDER BOOK CATALOG (Menggunakan getElementById secara langsung tanpa loop)
function renderBookCatalog() {
    
    // Fungsi kecil untuk mengisi card buku berdasarkan ID elemen HTML
    function setBookCard(elementId, book) {
        const container = document.getElementById(elementId);
        const isOutOfStock = book.stock === 0;

        container.innerHTML = `
            <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col justify-between max-w-sm w-full mx-auto h-full">
                <div>
                    <div class="mb-4 flex h-36 items-center justify-center rounded-xl bg-gradient-to-br from-blue-900 to-slate-700 text-6xl shadow-inner">
                        ${book.icon}
                    </div>
                    <span class="text-xs font-bold uppercase tracking-widest text-blue-600">ID: ${book.id}</span>
                    <h4 class="mt-1 text-xl font-bold text-slate-900">${book.title}</h4>
                    <p class="text-sm text-slate-500">by ${book.author}</p>
                    <p class="mt-3 text-lg font-bold text-blue-700">${formatRupiah(book.price)}</p>
                    <p class="mt-1 text-xs font-medium text-slate-600">Stock: ${book.stock} books</p>
                    
                    ${isOutOfStock ? `
                        <div class="mt-3 rounded-lg bg-red-50 border border-red-200 p-2 text-center">
                            <p class="text-xs font-bold text-red-600">Pilih buku lain, opsi ini habis</p>
                        </div>
                    ` : ''}
                </div>
                
                <button onclick="addToCart(${book.id})" ${isOutOfStock ? 'disabled' : ''} class="mt-5 w-full rounded-xl ${isOutOfStock ? 'bg-slate-300 text-slate-500 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700 active:scale-[0.98]'} px-4 py-2.5 font-semibold text-sm shadow-md transition">
                    ${isOutOfStock ? 'Habis' : '+ Add to Cart'}
                </button>
            </div>
        `;
    }

    // Panggil satu per satu secara manual tanpa perulangan
    setBookCard("card-book-1", book1);
    setBookCard("card-book-2", book2);
    setBookCard("card-book-3", book3);
    setBookCard("card-book-4", book4);
    setBookCard("card-book-5", book5);
}

// 3. FUNGSI MENCARI BUKU BERDASARKAN ID (Pengganti pencarian array)
function getBookById(id) {
    if (id === 1) return book1;
    if (id === 2) return book2;
    if (id === 3) return book3;
    if (id === 4) return book4;
    if (id === 5) return book5;
    return null;
}

// Tambah ke Keranjang
function addToCart(bookId) {
    const book = getBookById(bookId);
    
    if (!book || book.stock <= 0) {
        return;
    }

    // Cek apakah buku sudah ada di keranjang menggunakan ID langsung
    let existingItem = null;
    if (cart.length > 0 && cart[0].id === book.id) existingItem = cart[0];
    else if (cart.length > 1 && cart[1].id === book.id) existingItem = cart[1];
    else if (cart.length > 2 && cart[2].id === book.id) existingItem = cart[2];
    else if (cart.length > 3 && cart[3].id === book.id) existingItem = cart[3];
    else if (cart.length > 4 && cart[4].id === book.id) existingItem = cart[4];

    const currentQtyInCart = existingItem ? existingItem.quantity : 0;

    if ((currentQtyInCart + 1) > book.stock) {
        return;
    }

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: book.id,
            title: book.title,
            price: book.price,
            quantity: 1
        });
    }

    updateCartDisplay();
    showResult(`Added "${book.title}" to cart!`, true);
}

// Update Tampilan Keranjang
function updateCartDisplay() {
    const cartContainer = document.getElementById("cart-items");
    const checkoutButton = document.getElementById("checkout-button");
    const cartSummary = document.getElementById("cart-summary");
    const isMember = document.getElementById("is-member").checked;

    if (cart.length === 0) {
        cartContainer.innerHTML = `<p class="text-sm text-slate-400 italic py-2 text-center">Cart is currently empty. Click "Add to Cart" on any book above.</p>`;
        cartSummary.classList.add("hidden");
        checkoutButton.disabled = true;
        checkoutButton.className = "w-full cursor-not-allowed rounded-xl bg-slate-300 px-5 py-3 font-semibold text-slate-500 shadow-md transition";
        return;
    }

    cartContainer.innerHTML = "";
    let subtotal = 0;
    let totalQuantity = 0;

    // Render item keranjang secara manual maksimal 5 item tanpa loop
    function renderCartRow(item, index) {
        if (!item) return;
        totalQuantity += item.quantity;
        subtotal += item.price * item.quantity;

        const itemRow = document.createElement("div");
        itemRow.className = "py-3 flex justify-between items-center text-sm";
        itemRow.innerHTML = `
            <div class="flex items-center gap-4">
                <span class="font-bold text-slate-500">#${index + 1}</span>
                <div>
                    <span class="font-semibold text-slate-800">${item.title}</span>
                    <p class="text-xs text-slate-500">Quantity: ${item.quantity} × ${formatRupiah(item.price)}</p>
                </div>
            </div>
            <div class="flex items-center gap-4">
                <span class="font-bold text-slate-700">${formatRupiah(item.price * item.quantity)}</span>
                <div class="flex items-center gap-1">
                    <button onclick="changeQuantity(${index}, 1)" class="bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold px-2 py-1 rounded text-xs">+</button>
                    <button onclick="changeQuantity(${index}, -1)" class="bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold px-2 py-1 rounded text-xs">-</button>
                    <button onclick="removeFromCart(${index})" class="text-red-500 hover:text-red-700 font-bold px-2 py-1 text-xs ml-2">✕ Remove</button>
                </div>
            </div>
        `;
        cartContainer.appendChild(itemRow);
    }

    renderCartRow(cart[0], 0);
    renderCartRow(cart[1], 1);
    renderCartRow(cart[2], 2);
    renderCartRow(cart[3], 3);
    renderCartRow(cart[4], 4);

    // Hitung Diskon
    let discountRate = 0;
    let discountLabels = [];

    if (totalQuantity >= 5) {
        discountRate += discountFor5Books;
        discountLabels.push("Diskon Grosir 5+ (15%)");
    } else if (totalQuantity >= 3) {
        discountRate += discountFor3Books;
        discountLabels.push("Diskon Grosir 3+ (5%)");
    }

    if (isMember) {
        discountRate += memberDiscountRate;
        discountLabels.push("Diskon Member (10%)");
    }

    const discountAmount = subtotal * discountRate;
    const finalPrice = subtotal - discountAmount;

    // Update Ringkasan Harga
    cartSummary.classList.remove("hidden");
    document.getElementById("summary-subtotal").textContent = formatRupiah(subtotal);

    const discountRow = document.getElementById("summary-discount-row");
    if (discountRate > 0) {
        discountRow.classList.remove("hidden");
        document.getElementById("summary-discount-label").textContent = `Potongan (${discountLabels.join(" + ")}):`;
        document.getElementById("summary-discount-amount").textContent = `-` + formatRupiah(discountAmount);
    } else {
        discountRow.classList.add("hidden");
    }

    document.getElementById("summary-final").textContent = formatRupiah(finalPrice);

    checkoutButton.disabled = false;
    checkoutButton.className = "w-full rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white shadow-md transition hover:bg-blue-700 active:scale-[0.98]";
}

// Event listener checkbox member
document.getElementById("is-member").addEventListener("change", updateCartDisplay);

// Ubah Jumlah Qty di Cart
function changeQuantity(index, amount) {
    const cartItem = cart[index];
    if (!cartItem) return;
    const book = getBookById(cartItem.id);
    const newQty = cartItem.quantity + amount;

    if (newQty <= 0) {
        removeFromCart(index);
        return;
    }

    if (newQty > book.stock) {
        showResult(`Stok "${book.title}" tidak mencukupi.`, false);
        return;
    }

    cartItem.quantity = newQty;
    updateCartDisplay();
}

// Hapus Item dari Cart
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartDisplay();
}

// Tampilkan Pesan Hasil
function showResult(message, isSuccess) {
    const result = document.getElementById("result");
    result.textContent = message;
    result.classList.remove("hidden", "bg-green-50", "text-green-700", "border-green-200", "bg-red-50", "text-red-700", "border-red-200");

    if (isSuccess) {
        result.classList.add("bg-green-50", "text-green-700", "border-green-200");
    } else {
        result.classList.add("bg-red-50", "text-red-700", "border-red-200");
    }
}

// 4. PROSES CHECKOUT
document.getElementById("checkout-form").onsubmit = function(event) {
    event.preventDefault();

    const name = document.getElementById("customer-name").value.trim();
    const isMember = document.getElementById("is-member").checked;

    if (name === "") {
        showResult("Please enter your customer name before checking out.", false);
        return;
    }

    if (cart.length === 0) {
        showResult("Your cart is empty.", false);
        return;
    }

    // Validasi stok per item keranjang tanpa loop
    let stockValid = true;
    let invalidBookTitle = '';

    if (cart[0]) {
        let b = getBookById(cart[0].id);
        if (cart[0].quantity > b.stock) { stockValid = false; invalidBookTitle = b.title; }
    }
    if (cart[1]) {
        let b = getBookById(cart[1].id);
        if (cart[1].quantity > b.stock) { stockValid = false; invalidBookTitle = b.title; }
    }
    if (cart[2]) {
        let b = getBookById(cart[2].id);
        if (cart[2].quantity > b.stock) { stockValid = false; invalidBookTitle = b.title; }
    }

    if (!stockValid) {
        showResult(`Maaf, stok untuk "${invalidBookTitle}" sudah habis atau tidak mencukupi.`, false);
        return;
    }

    // Hitung total manual
    let subtotal = 0;
    let totalQuantity = 0;

    if (cart[0]) { totalQuantity += cart[0].quantity; subtotal += cart[0].price * cart[0].quantity; }
    if (cart[1]) { totalQuantity += cart[1].quantity; subtotal += cart[1].price * cart[1].quantity; }
    if (cart[2]) { totalQuantity += cart[2].quantity; subtotal += cart[2].price * cart[2].quantity; }
    if (cart[3]) { totalQuantity += cart[3].quantity; subtotal += cart[3].price * cart[3].quantity; }
    if (cart[4]) { totalQuantity += cart[4].quantity; subtotal += cart[4].price * cart[4].quantity; }

    let discountRate = 0;
    if (totalQuantity >= 5) {
        discountRate += discountFor5Books;
    } else if (totalQuantity >= 3) {
        discountRate += discountFor3Books;
    }

    if (isMember) {
        discountRate += memberDiscountRate;
    }

    const discountAmount = subtotal * discountRate;
    const finalPrice = subtotal - discountAmount;

    // Kurangi stok buku asli
    if (cart[0]) getBookById(cart[0].id).stock -= cart[0].quantity;
    if (cart[1]) getBookById(cart[1].id).stock -= cart[1].quantity;
    if (cart[2]) getBookById(cart[2].id).stock -= cart[2].quantity;
    if (cart[3]) getBookById(cart[3].id).stock -= cart[3].quantity;
    if (cart[4]) getBookById(cart[4].id).stock -= cart[4].quantity;

    let message = `Thank you, ${name}! Your order of ${totalQuantity} book(s) was successful. Subtotal: ${formatRupiah(subtotal)}. `;
    if (discountRate > 0) {
        message += `Total discount applied: ${Math.round(discountRate * 100)}%. `;
    } else {
        message += `No discount applied. `;
    }
    message += `Final Total: ${formatRupiah(finalPrice)}.`;

    showResult(message, true);

    // Reset keranjang
    cart = [];
    document.getElementById("is-member").checked = false;
    updateCartDisplay();
    renderBookCatalog();
    document.getElementById("customer-name").value = "";
};

// Panggilan awal saat halaman dimuat
renderBookCatalog();
updateCartDisplay();