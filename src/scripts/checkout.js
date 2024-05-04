document.addEventListener('DOMContentLoaded', function() {
    // Extract parameters from the URL query string
    const urlParams = new URLSearchParams(window.location.search);
    const totalToPay = parseFloat(urlParams.get('totalToPay'));
    const imageSrc = decodeURIComponent(urlParams.get('imageSrc'));

    // Update product information in the checkout form
    const proPriceSpan = document.getElementById('pro-price');
    const proImageElement = document.getElementById('pro-image');

    if (proPriceSpan && proImageElement) {
        // Display product price (totalToPay) in the checkout form
        proPriceSpan.textContent = `₦${totalToPay.toFixed(2)}`;

        // Display product image (imageSrc) in the checkout form
        proImageElement.src = imageSrc;
        proImageElement.alt = 'Product Image';
    }

    // Paystack Live public key
    const paystackPublicKey = 'pk_live_5aeb93844dc1beb38c613d53cb43efd8a1f43ffa';

    // Handle form submission
    document.getElementById('checkout-form').addEventListener('submit', function(event) {
        event.preventDefault();

        const fname = document.getElementById('fname').value;
        const lname = document.getElementById('lname').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const street = document.getElementById('street').value;
        const state = document.getElementById('state').value;

        // Calculate total amount in Kobo (100kb = ₦1)
        const amountInKobo = totalToPay * 100;

        // Create a Paystack Inline transaction
        const handler = PaystackPop.setup({
            key: paystackPublicKey,
            email: email,
            amount: amountInKobo,
            currency: 'NGN', // Nigerian Naira
            ref: `${Math.floor((Math.random() * 1000000000) + 1)}`, // Generate a random reference, you can use it or use Paystack own
            metadata: {
                cancel_action: '../../index.html',// redirects user to this site if they close the payment modal
                custom_fields: [
                    {
                        display_name: 'Main Image Src',
                        variable_name: 'mainImageSrc',
                        value: imageSrc
                    },
                    {
                        display_name: 'Full Name',
                        variable_name: 'fullName',
                        value: `${fname} ${lname}`
                    },
                    {
                        display_name: 'Street Address',
                        variable_name: 'streetAddress',
                        value: street
                    },
                    {
                        display_name: 'Phone Number',
                        variable_name: 'phoneNumber',
                        value: phone
                    },
                    {
                        display_name: 'State',
                        variable_name: 'state',
                        value: state
                    }
                ]
            },
            
            
            callback: function(response) {
                // Handle successful payment
                const reference = response.reference;
                alert('Payment successful! Reference code: ' + reference);
                // You can perform further actions after successful payment (e.g., update order status)
            
                // Wait for 5 seconds before redirecting to shop.html
                setTimeout(function() {
                    window.location.href = 'shop.html';
                }, 500); // 5000 milliseconds = 5 seconds
            },
            
            onClose: function() {
                // Handle payment cancellation or failure
                alert('Transaction was not completed, window closed.');
            
                // Wait for 5 seconds before redirecting to index.html
                setTimeout(function() {
                    window.location.href = '../../index.html';
                }, 500); 
            }
            
        });

        // Open the Paystack payment modal
        handler.openIframe();
    });
});
