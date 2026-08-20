
/* =====================================================
   RAKESH PAAN BHANDAR
   CART SYSTEM
   ===================================================== */


/* ================= CART DATA ================= */

// Load cart from browser storage
let cart = JSON.parse(localStorage.getItem("rakeshPaanCart")) || [];


/* ================= ADD TO CART ================= */

function addToCart(name, price) {

    // Check whether product already exists
    const existingProduct = cart.find(
        product => product.name === name
    );

    if (existingProduct) {

        existingProduct.quantity += 1;

    } else {

        cart.push({
            name: name,
            price: price,
            quantity: 1
        });

    }

    // Save cart
    saveCart();

    // Update page
    updateCart();

    alert(name + " Added! 🛒");
}


/* ================= SAVE CART ================= */

function saveCart() {

    localStorage.setItem(
        "rakeshPaanCart",
        JSON.stringify(cart)
    );

}


/* ================= UPDATE CART ================= */

function updateCart() {

    const cartItems = document.getElementById("cartItems");
    const cartTotal = document.getElementById("cartTotal");

    let total = 0;
    let totalItems = 0;


    /* ---------- Empty Cart ---------- */

    if (cart.length === 0) {

        if (cartItems) {

            cartItems.innerHTML = `
                <p>Your cart is currently empty.</p>
            `;

        }

        if (cartTotal) {
            cartTotal.textContent = "0";
        }

        updateCartCount();

        return;
    }


    /* ---------- Display Products ---------- */

    let html = "";


    cart.forEach(function(product, index) {

        const itemTotal =
            product.price * product.quantity;

        total += itemTotal;

        totalItems += product.quantity;


        html += `
            <div class="cart-item">

                <div>
                    <h3>${product.name}</h3>

                    <p>
                        ₹${product.price} ×
                        ${product.quantity}
                    </p>
                </div>


                <div class="cart-controls">

                    <button
                        type="button"
                        onclick="decreaseQuantity(${index})">
                        −
                    </button>

                    <span>
                        ${product.quantity}
                    </span>

                    <button
                        type="button"
                        onclick="increaseQuantity(${index})">
                        +
                    </button>

                    <button
                        type="button"
                        onclick="removeFromCart(${index})">
                        Remove
                    </button>

                </div>


                <strong>
                    ₹${itemTotal}
                </strong>

            </div>
        `;

    });


    if (cartItems) {
        cartItems.innerHTML = html;
    }


    if (cartTotal) {
        cartTotal.textContent = total;
    }


    updateCartCount();

}


/* ================= INCREASE QUANTITY ================= */

function increaseQuantity(index) {

    cart[index].quantity += 1;

    saveCart();

    updateCart();

}


/* ================= DECREASE QUANTITY ================= */

function decreaseQuantity(index) {

    if (cart[index].quantity > 1) {

        cart[index].quantity -= 1;

    } else {

        cart.splice(index, 1);

    }

    saveCart();

    updateCart();

}


/* ================= REMOVE PRODUCT ================= */

function removeFromCart(index) {

    const productName = cart[index].name;

    cart.splice(index, 1);

    saveCart();

    updateCart();

    alert(productName + " remove from cart.");
}


/* ================= CART COUNT ================= */

function updateCartCount() {

    const cartCount =
        document.getElementById("cartCount");

    if (!cartCount) {
        return;
    }


    let count = 0;


    cart.forEach(function(product) {

        count += product.quantity;

    });


    cartCount.textContent = count;

}


/* ================= SHOW CART ================= */

function showCart() {

    if (cart.length === 0) {

        alert("Cart empty hai! 🛒");

        return;
    }


    let message = "🛒 Your Cart\n\n";

    let total = 0;


    cart.forEach(function(product, index) {

        const itemTotal =
            product.price * product.quantity;


        message +=
            (index + 1) +
            ". " +
            product.name +
            " × " +
            product.quantity +
            " = ₹" +
            itemTotal +
            "\n";


        total += itemTotal;

    });


    message +=
        "\n--------------------\n" +
        "Total: ₹" +
        total;


    alert(message);

};


/* ================= CHECKOUT ================= */

function goToCheckout() {

    if (cart.length === 0) {

        alert(
            "Your cart is empty. " +
            "Please add a product before checkout."
        );

        return;
    }


    // Save latest cart
    saveCart();


    // Open checkout page
    window.location.href = "checkout.html";

}


/* ================= PAGE LOAD ================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        updateCart();

    }
)
/* =====================================================
   CHECKOUT PAGE
   ===================================================== */

function loadCheckout() {

    const orderSummary =
        document.getElementById("orderSummary");

    const checkoutTotal =
        document.getElementById("checkoutTotal");


    // If we are not on checkout page, stop
    if (!orderSummary || !checkoutTotal) {
        return;
    }


    // Empty cart
    if (cart.length === 0) {

        orderSummary.innerHTML = `
            <p>Your cart is empty.</p>

            <p>
                <a href="index.html#products">
                    Go back and add products
                </a>
            </p>
        `;

        checkoutTotal.textContent = "0";

        return;
    }


    let total = 0;

    let html = "";


    cart.forEach(function(product) {

        const itemTotal =
            product.price * product.quantity;

        total += itemTotal;


        html += `
            <div class="checkout-item">

                <strong>
                    ${product.name}
                </strong>

                <span>
                    ${product.quantity}
                    × ₹${product.price}
                    = ₹${itemTotal}
                </span>

            </div>
        `;

    });


    orderSummary.innerHTML = html;

    checkoutTotal.textContent = total;

}


/* =====================================================
   PLACE ORDER
   ===================================================== */

function placeOrder(event) {

    event.preventDefault();


    // Check cart
    if (cart.length === 0) {

        alert(
            "Your cart is empty. " +
            "Please add a product first."
        );

        return;
    }

    // Customer details
    const name =
        document.getElementById("name").value.trim();

    const phone =
        document.getElementById("phone").value.trim();
        const phonePattern = /^[6-9]\d{9}$/;

if (!phonePattern.test(phone)) {
    alert("Please enter a valid 10-digit Indian mobile number.");
    return;
}

    const address =
        document.getElementById("address").value.trim();

    const city =
        document.getElementById("city").value.trim();


    const payment =
        document.querySelector(
            'input[name="payment"]:checked'
        ).value;


    // Calculate total
    let total = 0;

    let orderMessage =
        "🛍️ *NEW ORDER - RAKESH PAAN BHANDAR*\n\n";


    orderMessage +=
        "*Customer Details*\n";

    orderMessage +=
        "Name: " + name + "\n";

    orderMessage +=
        "Mobile: " + phone + "\n";

    orderMessage +=
        "Address: " + address + "\n";

    orderMessage +=
        "City: " + city + "\n";

    orderMessage +=
        "Payment: " +
        (payment === "cod"
            ? "Cash on Delivery"
            : "Online Payment") +
        "\n\n";


    orderMessage +=
        "*Order Details*\n";


    cart.forEach(function(product) {

        const itemTotal =
            product.price * product.quantity;

        total += itemTotal;


        orderMessage +=
            product.name +
            " × " +
            product.quantity +
            " = ₹" +
            itemTotal +
            "\n";

    });


    orderMessage +=
        "\n*Total: ₹" +
        total +
        "*";


    /*
       WhatsApp number of Rakesh Paan Bhandar
    */

    const whatsappNumber =
        "917238884058";


    const whatsappURL =
        "https://wa.me/" +
        whatsappNumber +
        "?text=" +
        encodeURIComponent(orderMessage);


    /*
       Open WhatsApp
    */

    window.open(
    whatsappURL,
    "_blank"
);

// Clear cart after opening WhatsApp
cart = [];

saveCart();

alert(
    "Your order is ready! Please press Send in WhatsApp to complete your order."
);

// Update cart display
updateCart();

// Go back to homepage after 1 second
setTimeout(function() {
    window.location.href = "index.html";
}, 1000);

}


/* =====================================================
   CHECKOUT PAGE LOAD
   ===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        updateCart();

        loadCheckout();


        const checkoutForm =
            document.getElementById("checkoutForm");


        if (checkoutForm) {

            checkoutForm.addEventListener(
                "submit",
                placeOrder
            );

        }

    }
);
/* =====================================================
   EVENT BOOKING → WHATSAPP
   ===================================================== */

function sendEventBooking(event) {

    event.preventDefault();


    // Get form values
    const name =
        document.getElementById("customer-name").value.trim();

    const mobile =
        document.getElementById("mobile").value.trim();

    const eventType =
        document.getElementById("event-type").value;

    const eventDate =
        document.getElementById("event-date").value;

    const guests =
        document.getElementById("guests").value;

    const venue =
        document.getElementById("venue").value.trim();

    const message =
        document.getElementById("message").value.trim();


    // Create WhatsApp message
    let bookingMessage =
        "🎉 *EVENT BOOKING REQUEST*\n" +
        "*Rakesh Paan Bhandar*\n\n";


    bookingMessage +=
        "*Customer Details*\n";

    bookingMessage +=
        "Name: " + name + "\n";

    bookingMessage +=
        "Mobile: " + mobile + "\n\n";


    bookingMessage +=
        "*Event Details*\n";

    bookingMessage +=
        "Event: " + eventType + "\n";

    bookingMessage +=
        "Date: " + eventDate + "\n";

    bookingMessage +=
        "Guests: " + guests + "\n";

    bookingMessage +=
        "Venue: " + venue + "\n";


    // Add requirements only if provided
    if (message !== "") {

        bookingMessage +=
            "\n*Additional Requirements*\n";

        bookingMessage +=
            message;

    }


    // Rakesh Paan Bhandar WhatsApp number
    const whatsappNumber =
        "917238884058";


    // Create WhatsApp URL
    const whatsappURL =
        "https://wa.me/" +
        whatsappNumber +
        "?text=" +
        encodeURIComponent(bookingMessage);


    // Open WhatsApp
    window.open(
        whatsappURL,
        "_blank"
    );

}


/* =====================================================
   EVENT BOOKING FORM
   ===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        const eventForm =
            document.getElementById(
                "eventBookingForm"
            );


        if (eventForm) {

            eventForm.addEventListener(
                "submit",
                sendEventBooking
            );

        }

    }
);
/* =====================================================
   UPI PAYMENT DISPLAY
   ===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        const paymentOptions =
            document.querySelectorAll(
                'input[name="payment"]'
            );

        const upiPaymentBox =
            document.getElementById("upiPaymentBox");


        if (!upiPaymentBox) {
            return;
        }


        function updatePaymentBox() {

            const selectedPayment =
                document.querySelector(
                    'input[name="payment"]:checked'
                );


            if (
                selectedPayment &&
                selectedPayment.value === "online"
            ) {

                upiPaymentBox.style.display = "block";

            } else {

                upiPaymentBox.style.display = "none";

            }

        }


        paymentOptions.forEach(function(payment) {

            payment.addEventListener(
                "change",
                updatePaymentBox
            );

        });


        // Initial state
        updatePaymentBox();

    }
);
