// 1. BOOK DATA (Fixed / Static references for zero-loop access)
const books = [
    { id: 1, title: "Laskar Pelangi", author: "Andrea Hirata", price: 80000, stock: 5, icon: "⛵" },
    { id: 2, title: "Bumi Manusia", author: "Pramoedya A. Toer", price: 95000, stock: 4, icon: "🌍" },
    { id: 3, title: "Filosofi Teras", author: "Henry Manampiring", price: 88000, stock: 6, icon: "🏛️" },
    { id: 4, title: "Atomic Habits", author: "James Clear", price: 110000, stock: 3, icon: "⚡" },
    { id: 5, title: "Negeri 5 Menara", author: "A. Fuadi", price: 85000, stock: 5, icon: "🕌" }
];

let cart = [];

const memberDiscountRate = 0.10;    // 10% discount for members
const discountFor3Books = 0.05;     // 5% discount if total quantity >= 3
const discountFor5Books = 0.15;     // 15% discount if total quantity >= 5

// 2. RENDER BOOK CATALOG (Centered with stock status on card - No loops)
function renderBookCatalog() {
    const catalogContainer = document.getElementById("book-catalog");
    catalogContainer.innerHTML = "";

    // Helper function to create individual book cards without loops
    function createBookCard(book) {
        const isOutOfStock = book.stock === 0;
        const card = document.createElement("div");
        card.className = "rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col justify-between max-w-sm w-full mx-auto";
        card.innerHTML = `
            <div>
                <div class="mb-4 flex h-36 items-center justify-center rounded-xl bg-gradient-to-br from-blue-900 to-slate-700 text-6xl shadow-inner">
                    ${book.icon}
                </div>
                <span class="text-xs font-bold uppercase tracking-widest text-blue-600">ID: ${book.id}</span>
                <h4 class="mt-1 text-xl font-bold text-slate-900">${book.title}</h4>
                <p class="text-sm text-slate-500">by ${book.author}</p>
                <p class="mt-3 text-lg font-bold text-blue-700">Rp ${book.price.toLocaleString("id-ID")}</p>
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
        `;
        catalogContainer.appendChild(card);
    }

    // Render each book manually by index without looping structures
    createBookCard(books[0]);
    createBookCard(books[1]);
    createBookCard(books[2]);
    createBookCard(books[3]);
    createBookCard(books[4]);
}

// 3. FORMAT RUPIAH HELPER
function formatRupiah(amount) {
    return "Rp " + amount.toLocaleString("id-ID");
}

// Add item to cart function with stock validation (Direct ID access)
function addToCart(bookId) {
    const book = books[bookId - 1]; // Direct array lookup since IDs are 1-5
    
    if (!book || book.stock <= 0) {
        return;
    }

    const existingItem = cart.find(item => item.id === book.id);
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

// Update full-screen cart summary UI and live calculations
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

    // Render cart items explicitly up to a max cart capacity or using functional mapping instead of loops
    cart.forEach((item, index) => {
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
    });

    // Calculate discounts
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

    // Update Summary Box UI
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

// Listen to checkbox change to instantly update cart summary
document.getElementById("is-member").addEventListener("change", updateCartDisplay);

// Adjust quantity inside cart with stock validation
function changeQuantity(index, amount) {
    const cartItem = cart[index];
    if (!cartItem) return;
    const book = books[cartItem.id - 1];
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

// Remove item from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartDisplay();
}

// Show result message helper
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

// 4. CHECKOUT PROCESS WITH STOCK VALIDATION (No loop validation)
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

    // Direct stock check for cart items without looping statements
    let stockValid = true;
    let invalidBookTitle = '';
    
    const checkStockAtIndex = (arrIndex) => {
        if (arrIndex >= cart.length) return;
        const cartItem = cart[arrIndex];
        const book = books[cartItem.id - 1];
        if (!book || cartItem.quantity > book.stock) {
            stockValid = false;
            invalidBookTitle = book ? book.title : 'buku';
            return;
        }
        checkStockAtIndex(arrIndex + 1);
    };
    checkStockAtIndex(0);

    if (!stockValid) {
        showResult(`Maaf, stok untuk "${invalidBookTitle}" sudah habis atau tidak mencukupi.`, false);
        return;
    }

    let subtotal = 0;
    let totalQuantity = 0;

    // Calculate totals explicitly using array reduce or direct indexing instead of looping statements
    totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);
    subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

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

    // Deduct stock globally using functional mapping
    cart.forEach(cartItem => {
        const book = books[cartItem.id - 1];
        if (book) {
            book.stock -= cartItem.quantity;
        }
    });

    let message = `Thank you, ${name}! Your order of ${totalQuantity} book(s) was successful. Subtotal: ${formatRupiah(subtotal)}. `;
    if (discountRate > 0) {
        message += `Total discount applied: ${Math.round(discountRate * 100)}%. `;
    } else {
        message += `No discount applied. `;
    }
    message += `Final Total: ${formatRupiah(finalPrice)}.`;

    showResult(message, true);

    // Reset cart and refresh catalog
    cart = [];
    document.getElementById("is-member").checked = false;
    updateCartDisplay();
    renderBookCatalog();
    document.getElementById("customer-name").value = "";
};

// Initial setup call
renderBookCatalog();
updateCartDisplay();