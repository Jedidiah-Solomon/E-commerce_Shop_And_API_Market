const MainImg = document.getElementById('MainImg');
const smallimg = document.getElementsByClassName('small-img');

// Just to see the images on the console
console.log(`The HTML Collection is:`, smallimg);


smallimg[0].addEventListener('click', function() {
    MainImg.src = smallimg[0].src;
});

smallimg[1].addEventListener('click', function() {
    MainImg.src = smallimg[1].src;
});

smallimg[2].addEventListener('click', function() {
    MainImg.src = smallimg[2].src;
});

smallimg[3].addEventListener('click', function() {
    MainImg.src = smallimg[3].src;
});


//-----------------------------------------------------------------//
document.addEventListener('DOMContentLoaded', async function() {
    const selectSize = document.querySelector('#prodetails select');
    const proPrice = document.querySelector('#pro-price');
    const proName = document.querySelector('#pro-name');
    const proQty = document.querySelector('#pro-qty');
    const proBtn = document.querySelector('#pro-btn');

    // Function to fetch product details from JSON
    async function fetchProductDetails() {
        try {
            const response = await fetch('../../database/productDetails.json');
            if (!response.ok) {
                throw new Error('Failed to fetch product details');
            }
            const productDetails = await response.json();
            return productDetails;
        } catch (error) {
            console.error('Error fetching product details:', error);
            return [];
        }
    }

    // Function to update price based on selected size and quantity
    async function updatePriceAndTotal() {
        const productDetails = await fetchProductDetails();
        const productName = proName.textContent.trim();
        const selectedSize = selectSize.value;
        const quantity = parseInt(proQty.value) || 1;

        const product = productDetails.find(item => item.productName === productName);
        if (product && product.pricelist[selectedSize]) {
            const unitPrice = product.pricelist[selectedSize];
            const totalPrice = unitPrice * quantity;
            proPrice.textContent = `₦${totalPrice.toFixed(2)}`;

            // Update the "Add To Cart" button to handle adding items to cart
            updateAddToCartButton(productName, selectedSize, unitPrice);
        } else {
            proPrice.textContent = '₦--'; // Handle if size not found or invalid
        }
    }

   // Function to update the "Add To Cart" button with the correct behavior
function updateAddToCartButton(productName, selectedSize, unitPrice) {
    proBtn.addEventListener('click', async function() {
        const mainImageSrc = document.getElementById('MainImg').src; // Get the main image source
        const cartItem = { productName, selectedSize, unitPrice, mainImageSrc }; // Include image source in cart item
        addToCart(cartItem);
        window.location.href = 'cart.html';
    });
}

    // Function to add a new item to the cart
    function addToCart(newItem) {
        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

        // Check if the product already exists in the cart
        const existingItem = cartItems.find(item => (
            item.productName === newItem.productName &&
            item.selectedSize === newItem.selectedSize
        ));

        if (existingItem) {
            // If product already exists, update the quantity
            existingItem.quantity += 1; // Increase quantity by 1
        } else {
            // If product is new, add it to cart with quantity 1
            newItem.quantity = 1;
            cartItems.push(newItem);
        }

        // Store updated cart items back in local storage
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }

    // Event listeners for size selection change and quantity input
    selectSize.addEventListener('change', updatePriceAndTotal);
    proQty.addEventListener('input', updatePriceAndTotal);

    // Initialize product details and price on page load
    await updatePriceAndTotal();
});
