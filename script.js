


/*  CART  */

let cart = [];


function addToCart(name, price, image) {

    const existingItem = cart.find(
        item => item.name === name
    );

    if (existingItem) {

        existingItem.quantity++;

    } else {

        cart.push({
            name: name,
            price: price,
            image: image,
            quantity: 1
        });

    }

    updateCart();

    alert(name + " added to cart!");
}


/*  UPDATE CART  */

function updateCart() {

    let count = 0;
    let total = 0;

    cart.forEach(item => {

        count += item.quantity;

        total += item.price * item.quantity;

    });


    document.getElementById("cartCount").innerText = count;

    document.getElementById("cartTotal").innerText =
        total.toLocaleString("en-IN");

    showCart();
}


/*  OPEN CART  */

function openCart() {

    document
        .getElementById("cartPanel")
        .classList.add("open");

    showCart();
}


/*  CLOSE CART  */

function closeCart() {

    document
        .getElementById("cartPanel")
        .classList.remove("open");
}


/*  SHOW CART  */

function showCart() {

    const cartItems =
        document.getElementById("cartItems");

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="empty-cart">
                <h3>Your cart is empty</h3>
                <p>Add some products to your cart.</p>
            </div>
        `;

        return;
    }


    cartItems.innerHTML = "";


    cart.forEach((item, index) => {

        cartItems.innerHTML += `

            <div class="cart-item">

                <img
                    src="${item.image}"
                    alt="${item.name}"
                >

                <div class="cart-item-info">

                    <h4>
                        ${item.name}
                    </h4>

                    <div class="cart-price">
                        ₹${item.price.toLocaleString("en-IN")}
                    </div>

                    <div class="quantity">

                        <button
                            onclick="changeQuantity(${index}, -1)"
                        >
                            −
                        </button>

                        <span>
                            ${item.quantity}
                        </span>

                        <button
                            onclick="changeQuantity(${index}, 1)"
                        >
                            +
                        </button>

                        <button
                            class="remove-btn"
                            onclick="removeItem(${index})"
                        >
                            Remove
                        </button>

                    </div>

                </div>

            </div>
        `;

    });
}


/*  CHANGE QUANTITY  */

function changeQuantity(index, amount) {

    cart[index].quantity += amount;


    if (cart[index].quantity <= 0) {

        cart.splice(index, 1);

    }


    updateCart();
}


/*  REMOVE ITEM  */

function removeItem(index) {

    cart.splice(index, 1);

    updateCart();
}


/*  SEARCH  */

function searchProducts() {

    const searchText =
        document
            .getElementById("searchInput")
            .value
            .trim()
            .toLowerCase();


    const selectedCategory =
        document
            .getElementById("categorySelect")
            .value;


    const cards =
        document.querySelectorAll(".product-card");


    let visibleCount = 0;


    cards.forEach(card => {

        const name =
            card.dataset.name.toLowerCase();

        const category =
            card.dataset.category;


        const matchesSearch =
            searchText === "" ||
            name.includes(searchText);


        const matchesCategory =
            selectedCategory === "all" ||
            category === selectedCategory;


        if (matchesSearch && matchesCategory) {

            card.style.display = "flex";

            visibleCount++;

        } else {

            card.style.display = "none";

        }

    });


    showResultMessage(
        visibleCount,
        searchText
    );
}


/*  SEARCH ENTER  */

function handleSearchKey(event) {

    if (event.key === "Enter") {

        searchProducts();

    }
}


/*  CATEGORY  */

function filterProducts(category) {

    const cards =
        document.querySelectorAll(".product-card");


    let visibleCount = 0;


    cards.forEach(card => {

        if (
            category === "all" ||
            card.dataset.category === category
        ) {

            card.style.display = "flex";

            visibleCount++;

        } else {

            card.style.display = "none";

        }

    });


    document.getElementById("categorySelect").value =
        category;


    document.getElementById("searchInput").value = "";

    showResultMessage(visibleCount, "");
}


/*  SHOW ALL  */

function showAllProducts() {

    const cards =
        document.querySelectorAll(".product-card");


    cards.forEach(card => {

        card.style.display = "flex";

    });


    document.getElementById("categorySelect").value =
        "all";

    document.getElementById("searchInput").value = "";

    document.getElementById("resultMessage").innerText =
        "";

    scrollToProducts();
}


/*  SEARCH MESSAGE  */

function showResultMessage(count, searchText) {

    const message =
        document.getElementById("resultMessage");


    if (searchText !== "") {

        if (count === 0) {

            message.innerText =
                "No products found.";

        } else {

            message.innerText =
                count +
                " product(s) found for \"" +
                searchText +
                "\".";

        }

    } else {

        message.innerText = "";

    }
}


/*  LOCATION */

function openLocation() {

    document
        .getElementById("locationPopup")
        .classList.add("show");
}


function closeLocation() {

    document
        .getElementById("locationPopup")
        .classList.remove("show");
}


function saveLocation() {

    const city =
        document
            .getElementById("cityInput")
            .value
            .trim();


    if (city === "") {

        alert("Please enter your city.");

        return;
    }


    document.getElementById("location").innerText =
        city;


    document.getElementById("checkoutLocation").innerText =
        city;


    closeLocation();

    alert(
        "Delivery location updated to " + city
    );
}


/*  LOGIN  */

function openLogin() {

    document
        .getElementById("loginPopup")
        .classList.add("show");
}


function closeLogin() {

    document
        .getElementById("loginPopup")
        .classList.remove("show");
}


function loginUser() {

    const email =
        document
            .getElementById("loginEmail")
            .value
            .trim();


    const password =
        document
            .getElementById("loginPassword")
            .value
            .trim();


    if (email === "" || password === "") {

        alert(
            "Please enter your email/mobile and password."
        );

        return;
    }


    alert("Login successful!");


    closeLogin();
}


/*  CHECKOUT  */

function checkout() {

    if (cart.length === 0) {

        alert("Your cart is empty.");

        return;
    }


    const total =
        cart.reduce(
            (sum, item) =>
                sum + item.price * item.quantity,
            0
        );


    document.getElementById("checkoutTotal").innerText =
        total.toLocaleString("en-IN");


    document
        .getElementById("checkoutPopup")
        .classList.add("show");
}


function closeCheckout() {

    document
        .getElementById("checkoutPopup")
        .classList.remove("show");
}


/*  PLACE ORDER  */

function placeOrder() {

    alert(
        "Order placed successfully!\n\n" +
        "Expected delivery: 2–5 days."
    );


    cart = [];

    updateCart();

    closeCheckout();

    closeCart();
}


/*  HERO SLIDER  */

const heroImages = [
    "hero_image.jpg",
    "box1_image.jpg",
    "box2_image.jpg",
    "box3_image.jpg"
];


let currentSlide = 0;


function showSlide() {

    document.getElementById("heroImage").src =
        heroImages[currentSlide];
}


function nextSlide() {

    currentSlide++;

    if (
        currentSlide >= heroImages.length
    ) {

        currentSlide = 0;

    }

    showSlide();
}


function previousSlide() {

    currentSlide--;

    if (currentSlide < 0) {

        currentSlide =
            heroImages.length - 1;

    }

    showSlide();
}


/* Automatically change banner */

setInterval(
    nextSlide,
    5000
);


/*  SCROLL  */

function scrollToProducts() {

    document
        .getElementById("products")
        .scrollIntoView({
            behavior: "smooth"
        });
}


function goTop() {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/*  CLOSE POPUPS */

window.addEventListener(
    "click",
    function(event) {

        const locationPopup =
            document.getElementById(
                "locationPopup"
            );

        const loginPopup =
            document.getElementById(
                "loginPopup"
            );

        const checkoutPopup =
            document.getElementById(
                "checkoutPopup"
            );


        if (event.target === locationPopup) {

            closeLocation();

        }


        if (event.target === loginPopup) {

            closeLogin();

        }


        if (event.target === checkoutPopup) {

            closeCheckout();

        }

    }
);


/*  INITIAL LOAD  */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        updateCart();

    }
);