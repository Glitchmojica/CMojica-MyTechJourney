document.addEventListener("DOMContentLoaded", function() {
    const checkoutPage = document.getElementById("checkout-page");
    const referrer = document.referrer;

    // Set dynamic background based on referring page
    if (referrer.includes("music.html")) {
        checkoutPage.style.backgroundImage = "url('../images/background/music.jpg')";
    } else if (referrer.includes("art.html")) {
        checkoutPage.style.backgroundImage = "url('../images/background/art.jpg')";
    } else if (referrer.includes("clothing.html")) {
        checkoutPage.style.backgroundImage = "url('../images/background/clothing.jpg')";
    }

    // Initialize cart as an empty array
    const cart = [];

    // Add items to cart (simulate adding from product pages)
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (event) => {
            const product = event.target.closest('.product');
            const name = product.getAttribute('data-name');
            const price = parseFloat(product.getAttribute('data-price'));
            
            cart.push({ name, price });
            alert(`${name} added to cart.`);
        });
    });

    // Display cart summary on checkout page
    const cartSummary = document.getElementById("cart-summary");

    if (cart.length === 0) {
        cartSummary.innerHTML = "<p>Your cart is empty.</p>";
    } else {
        let total = 0;
        cartSummary.innerHTML = cart.map(item => {
            total += item.price;
            return `<p>${item.name}: $${item.price.toFixed(2)}</p>`;
        }).join('');
        cartSummary.innerHTML += `<hr><p>Total: $${total.toFixed(2)}</p>`;
    }

    // Form validation for checkout
    const form = document.querySelector('.payment-form');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const name = document.getElementById('card-name').value;
        const number = document.getElementById('card-number').value;
        const expiry = document.getElementById('expiry-date').value;
        const cvv = document.getElementById('cvv').value;

        if (!name || !number || !expiry || !cvv) {
            alert('Please fill in all fields.');
        } else {
            alert('Thank you for your purchase!');
            form.reset();
        }
    });
});
