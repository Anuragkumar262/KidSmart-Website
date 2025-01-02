// Wait until the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
    const paymentMethodSelect = document.getElementById("payment-method");
    const upiAppSelection = document.getElementById("upi-app-selection");
    const cardInfo = document.getElementById("card-info");
    const form = document.getElementById("checkout-form");

    // Stripe setup (if you're using Stripe for card payments)
    const stripe = Stripe("your-publishable-key-here"); // Replace with your actual publishable key
    const elements = stripe.elements();
    const cardElement = elements.create("card");
    cardElement.mount("#card-element");

    // Payment Method Change Event
    paymentMethodSelect.addEventListener("change", function () {
        if (paymentMethodSelect.value === "upi") {
            // Hide card payment section and show UPI selection
            cardInfo.style.display = "none"; // Hide card info section
            upiAppSelection.style.display = "block"; // Show UPI app selection
        } else {
            // Show card payment section and hide UPI selection
            cardInfo.style.display = "block"; // Show card info section
            upiAppSelection.style.display = "none"; // Hide UPI app selection
        }
    });

    // Form submission handler
    form.addEventListener("submit", function (e) {
        e.preventDefault(); // Prevent default form submission

        if (validateForm()) {
            if (paymentMethodSelect.value === "card") {
                handleCardPayment(); // Handle card payment with Stripe
            } else {
                handleUPIPayment(); // Handle UPI payment
            }
        }
    });

    // Form validation function
    function validateForm() {
        const fullName = document.getElementById("fullName").value;
        const email = document.getElementById("email").value;
        const phone = document.getElementById("phone").value;
        const address = document.getElementById("address").value;
        const city = document.getElementById("city").value;
        const country = document.getElementById("country").value;

        if (!fullName || !email || !phone || !address || !city || !country) {
            alert("Please fill in all required fields.");
            return false;
        }

        // If UPI is selected, check if UPI app is chosen
        if (paymentMethodSelect.value === "upi") {
            const upiApp = document.getElementById("upi-app").value;
            if (!upiApp) {
                alert("Please select a UPI app.");
                return false;
            }
        }

        return true;
    }

    // Handle Card Payment with Stripe
    function handleCardPayment() {
        stripe.createPaymentMethod("card", cardElement).then(function (result) {
            if (result.error) {
                document.getElementById("card-errors").textContent = result.error.message;
            } else {
                processPayment(result.paymentMethod.id);
            }
        });
    }

    // Handle UPI Payment
    function handleUPIPayment() {
        const upiApp = document.getElementById("upi-app").value;
        alert(`You chose ${upiApp} for UPI payment. Proceed with your selected UPI app.`);
    }

    // Placeholder function for processing payment (Stripe or other methods)
    function processPayment(paymentMethodId) {
        // Implement your payment processing logic here (e.g., send the paymentMethodId to the backend)
        console.log("Processing payment with method ID: " + paymentMethodId);
        alert("Payment processed successfully!");
    }
});
