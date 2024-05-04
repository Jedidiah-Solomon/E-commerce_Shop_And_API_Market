document.addEventListener('DOMContentLoaded', function() {
    // Function to load cart items from local storage and populate the cart table
    function loadCartItems() {
        const cartTableBody = document.querySelector('#cart tbody');
        if (cartTableBody) {
            cartTableBody.innerHTML = ''; // Clear existing rows before loading
            const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
            cartItems.forEach(item => {
                const { productName, mainImageSrc, unitPrice, quantity } = item;
                const subtotal = unitPrice * quantity;
                const cartRow = `
                    <tr>
                        <td><a href="#"><i class="far fa-times-circle"></i></a></td>
                        <td><img src="${mainImageSrc}" alt="" /></td>
                        <td>${productName}</td>
                        <td>₦${unitPrice.toFixed(2)}</td>
                        <td><input type="number" value="${quantity}" min="1" class="quantity-input" /></td>
                        <td class="row-subtotal">₦${subtotal.toFixed(2)}</td>
                    </tr>
                `;
                cartTableBody.innerHTML += cartRow;
            });
            updateCartTotals(); // Update cart subtotal, shipping fee, and total
        } else {
            console.error('Cart table body not found.');
        }
    }

    // Function to update cart totals (subtotal, shipping fee, and total)
    function updateCartTotals() {
        const cartTableBody = document.querySelector('#cart tbody');
        if (cartTableBody) {
            const rows = cartTableBody.querySelectorAll('tr');
            let subtotal = 0;
            rows.forEach(row => {
                const priceCell = row.querySelector('td:nth-child(4)');
                const quantityInput = row.querySelector('.quantity-input');
                const rowSubtotalCell = row.querySelector('.row-subtotal');
                if (priceCell && quantityInput && rowSubtotalCell) {
                    const unitPrice = parseFloat(priceCell.textContent.replace('₦', ''));
                    const quantity = parseInt(quantityInput.value);
                    const rowSubtotal = unitPrice * quantity;
                    rowSubtotalCell.textContent = `₦${rowSubtotal.toFixed(2)}`;
                    subtotal += rowSubtotal;
                }
            });

            // Update subtotal in DOM
            const subtotalCell = document.querySelector('#subtotal td:last-child');
            if (subtotalCell) {
                subtotalCell.textContent = `₦${subtotal.toFixed(2)}`;
            }

            // Update shipping fee based on selected location
            const shippingFeeSelect = document.querySelector('#shipping-location select');
            if (shippingFeeSelect) {
                const selectedShippingFee = parseFloat(shippingFeeSelect.value);
                const shippingFeeElement = document.querySelector('#ship-fee');
                if (shippingFeeElement) {
                    shippingFeeElement.textContent = `₦${selectedShippingFee.toFixed(2)}`;
                }
            }

            // Update total (subtotal + shipping fee)
            const total = subtotal + parseFloat(document.querySelector('#ship-fee').textContent.replace('₦', ''));
            const totalCell = document.querySelector('#total-fee');
            if (totalCell) {
                totalCell.textContent = `₦${total.toFixed(2)}`;
            }
        } else {
            console.error('Cart table body not found.');
        }
    }

    // Load cart items and populate the cart table on page load
    loadCartItems();

    // Event listener for quantity change
    document.addEventListener('change', function(event) {
        if (event.target.classList.contains('quantity-input') || event.target.tagName === 'SELECT') {
            updateCartTotals(); // Update totals when quantity or shipping location changes
        }
    });
});


//-----------------------------Remove Icon-------------//

document.addEventListener('DOMContentLoaded', function() {
    // Event listener for clicking the remove icon in the cart
    document.addEventListener('click', function(event) {
        // Check if the clicked element is the remove icon
        if (event.target.classList.contains('fa-times-circle')) {
            // Find the parent <tr> element
            const cartRow = event.target.closest('tr');
            if (cartRow) {
                // Retrieve the product name to be removed
                const productName = cartRow.querySelector('td:nth-child(3)').textContent;

                // Retrieve cart items from localStorage
                let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

                // Find the index of the item to be removed
                const indexToRemove = cartItems.findIndex(item => item.productName === productName);

                if (indexToRemove !== -1) {
                    // Remove the item from the cartItems array
                    cartItems.splice(indexToRemove, 1);

                    // Update localStorage with the modified cartItems
                    localStorage.setItem('cartItems', JSON.stringify(cartItems));

                    // Reload the cart items and update the display
                    loadCartItems();

                    // Update cart totals after removal
                    updateCartTotals();
                }
            }
        }
    });
});

function loadCartItems() {
    const cartTableBody = document.querySelector('#cart tbody');
    if (cartTableBody) {
        cartTableBody.innerHTML = ''; // Clear existing rows before loading
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        cartItems.forEach(item => {
            const { productName, mainImageSrc, unitPrice, quantity } = item;
            const subtotal = unitPrice * quantity;
            const cartRow = `
                <tr>
                    <td><a href="#"><i class="far fa-times-circle"></i></a></td>
                    <td><img src="${mainImageSrc}" alt="" /></td>
                    <td>${productName}</td>
                    <td>₦${unitPrice.toFixed(2)}</td>
                    <td><input type="number" value="${quantity}" min="1" class="quantity-input" /></td>
                    <td class="row-subtotal">₦${subtotal.toFixed(2)}</td>
                </tr>
            `;
            cartTableBody.innerHTML += cartRow;
        });
    } else {
        console.error('Cart table body not found.');
    }
}

function updateCartTotals() {
    const cartTableBody = document.querySelector('#cart tbody');
    if (cartTableBody) {
        const rows = cartTableBody.querySelectorAll('tr');
        let subtotal = 0;
        rows.forEach(row => {
            const priceCell = row.querySelector('td:nth-child(4)');
            const quantityInput = row.querySelector('.quantity-input');
            const rowSubtotalCell = row.querySelector('.row-subtotal');
            if (priceCell && quantityInput && rowSubtotalCell) {
                const unitPrice = parseFloat(priceCell.textContent.replace('₦', ''));
                const quantity = parseInt(quantityInput.value);
                const rowSubtotal = unitPrice * quantity;
                rowSubtotalCell.textContent = `₦${rowSubtotal.toFixed(2)}`;
                subtotal += rowSubtotal;
            }
        });

        // Update subtotal in DOM
        const subtotalCell = document.querySelector('#subtotal td:last-child');
        if (subtotalCell) {
            subtotalCell.textContent = `₦${subtotal.toFixed(2)}`;
        }

        // Update shipping fee based on selected location
        const shippingFeeSelect = document.querySelector('#shipping-location select');
        if (shippingFeeSelect) {
            const selectedShippingFee = parseFloat(shippingFeeSelect.value);
            const shippingFeeElement = document.querySelector('#ship-fee');
            if (shippingFeeElement) {
                shippingFeeElement.textContent = `₦${selectedShippingFee.toFixed(2)}`;
            }
        }

        // Update total (subtotal + shipping fee)
        const total = subtotal + parseFloat(document.querySelector('#ship-fee').textContent.replace('₦', ''));
        const totalCell = document.querySelector('#total-fee');
        if (totalCell) {
            totalCell.textContent = `₦${total.toFixed(2)}`;
        }
    } else {
        console.error('Cart table body not found.');
    }
}


//---------------------Coupon Data-----------------//


document.addEventListener('DOMContentLoaded', async function() {
    const couponDataUrl = '../../database/myCoupon.json'; // Replace with the correct path to your JSON file

    // Function to load coupon data from JSON file
    async function loadCouponData() {
        try {
            const response = await fetch(couponDataUrl);
            const couponData = await response.json();
            console.log('Loaded Coupon Data:', couponData);
            return couponData.coupons;
        } catch (error) {
            console.error('Error loading coupon data:', error);
            return null;
        }
    }

    // Function to update the total pay based on the current cart items
    function updateTotalPay() {
        const cartTableBody = document.querySelector('#cart tbody');
        if (cartTableBody) {
            const rows = cartTableBody.querySelectorAll('tr');
            let subtotal = 0;
            rows.forEach(row => {
                const rowSubtotalCell = row.querySelector('.row-subtotal');
                if (rowSubtotalCell) {
                    const rowSubtotal = parseFloat(rowSubtotalCell.textContent.replace('₦', ''));
                    subtotal += rowSubtotal;
                }
            });

            // Get shipping fee from selected location
            const shippingFeeSelect = document.querySelector('#shipping-location select');
            const selectedShippingFee = shippingFeeSelect ? parseFloat(shippingFeeSelect.value) : 0;

            // Calculate total (subtotal + shipping fee)
            const total = subtotal + selectedShippingFee;
            const totalPaySpan = document.querySelector('#total-pay');
            if (totalPaySpan) {
                totalPaySpan.textContent = `₦${total.toFixed(2)}`;
            }
        }
    }

    // Function to handle applying the coupon
    async function applyCoupon() {
        const couponInput = document.querySelector('#coupon input');
        const couponCode = couponInput.value.trim(); // No need to convert to uppercase
        const coupons = await loadCouponData();

        console.log('User Input Coupon Code:', couponCode);
        console.log('Available Coupons:', coupons);

        const couponSuccess = document.getElementById('coupon-success');
        const couponError = document.getElementById('coupon-error');

        if (coupons && coupons[couponCode]) {
            // Valid coupon code found
            const discountAmount = coupons[couponCode];
            const currentTotal = parseFloat(document.querySelector('#total-fee').textContent.replace('₦', ''));
            const newTotal = currentTotal - discountAmount;

            // Update total-pay with the discounted amount
            const totalPaySpan = document.querySelector('#total-pay');
            if (totalPaySpan) {
                totalPaySpan.textContent = `₦${newTotal.toFixed(2)}`;
                console.log(`Coupon applied successfully. Discount amount: ₦${discountAmount}`);

                // Display success message after 200 milliseconds
                setTimeout(() => {
                    couponError.textContent = '';
                    couponSuccess.textContent = 'Coupon applied successfully';
                }, 200);
            }
        } else {
            // Invalid coupon code
            console.error('Invalid coupon code.');

            // Display error message after 200 milliseconds
            setTimeout(() => {
                couponSuccess.textContent = '';
                couponError.textContent = 'Invalid coupon code';
            }, 200);
        }
    }

    // Event listener for the Apply button click
    const applyButton = document.querySelector('#coupon button');
    if (applyButton) {
        applyButton.addEventListener('click', applyCoupon);
    }

    // Update total pay initially and whenever quantity or shipping location changes
    updateTotalPay();
    document.addEventListener('change', updateTotalPay);
});




document.addEventListener('DOMContentLoaded', function() {
    const proceedToCheckoutButton = document.querySelector('#cart-add button[type="button"]');
    const totalPaySpan = document.querySelector('#total-pay');
    const firstProductImage = document.querySelector('#cart tbody tr:first-child img');

    if (proceedToCheckoutButton && totalPaySpan && firstProductImage) {
        proceedToCheckoutButton.addEventListener('click', function() {
            // Calculate total to pay
            const cartSubtotal = parseFloat(document.querySelector('#subtotal td:last-child').textContent.replace('₦', ''));
            const shippingFee = parseFloat(document.querySelector('#ship-fee').textContent.replace('₦', ''));
            const totalToPay = cartSubtotal + shippingFee;

            // Update total-pay span with the calculated total to pay
            totalPaySpan.textContent = `₦${totalToPay.toFixed(2)}`;

            // Extract the image source of the first product row
            const mainImageSrc = firstProductImage.getAttribute('src');

            // Redirect to checkout.html and pass data as URL parameters
            const encodedImageSrc = encodeURIComponent(mainImageSrc);
            const checkoutUrl = `checkout.html?totalToPay=${totalToPay.toFixed(2)}&imageSrc=${encodedImageSrc}`;

            // Redirect to the checkout URL
            window.location.href = checkoutUrl;
        });
    } else {
        console.error('Required elements not found.');
    }
});
