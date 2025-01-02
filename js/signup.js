document.addEventListener("DOMContentLoaded", function () {
    // Get the form element and input fields
    const form = document.querySelector("form");

    const fullNameInput = form.querySelector('input[placeholder="Full Name"]');
    const emailInput = form.querySelector('input[placeholder="Email Address"]');
    const passwordInput = form.querySelector('input[placeholder="Password"]');
    const confirmPasswordInput = form.querySelector('input[placeholder="Confirm Password"]');

    // Get the eye icons for toggling visibility
    const passwordEyeIcon = document.getElementById("togglePassword");
    const confirmPasswordEyeIcon = document.getElementById("toggleConfirmPassword");

    // Password visibility toggle functionality for Password field
    passwordEyeIcon.addEventListener("click", function () {
        if (passwordInput.type === "password") {
            passwordInput.type = "text"; // Show password
            passwordEyeIcon.textContent = "🙈"; // Change to crossed-eye icon
        } else {
            passwordInput.type = "password"; // Hide password
            passwordEyeIcon.textContent = "👁️"; // Change back to eye icon
        }
    });

    // Password visibility toggle functionality for Confirm Password field
    confirmPasswordEyeIcon.addEventListener("click", function () {
        if (confirmPasswordInput.type === "password") {
            confirmPasswordInput.type = "text"; // Show password
            confirmPasswordEyeIcon.textContent = "🙈"; // Change to crossed-eye icon
        } else {
            confirmPasswordInput.type = "password"; // Hide password
            confirmPasswordEyeIcon.textContent = "👁️"; // Change back to eye icon
        }
    });

    // Add an event listener for form submission
    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent default form submission behavior

        // Get input values
        const fullName = fullNameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        const confirmPassword = confirmPasswordInput.value.trim();

        // Name validation
        if (fullName === "") {
            alert("Full Name is required.");
            fullNameInput.focus();
            return;
        }

        // Email validation using a regular expression
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert("Please enter a valid email address.");
            emailInput.focus();
            return;
        }

        // Password validation
        if (password === "") {
            alert("Password is required.");
            passwordInput.focus();
            return;
        }

        // Confirm Password validation
        if (confirmPassword === "") {
            alert("Please confirm your password.");
            confirmPasswordInput.focus();
            return;
        }

        // Password and confirm password validation
        if (password !== confirmPassword) {
            alert("Confirm Password should match Password.");
            confirmPasswordInput.focus();
            return;
        }

        // If all validations pass
        alert("Signup successful!");

        // Prepare the data to be sent (for example, using fetch or AJAX in a real application)
        const userData = {
            fullName,
            email,
            password
        };

        // Log the user data (in real cases, send this to a backend server)
        console.log("User Data:", userData);

        // Reset the form after successful submission
        form.reset();
    });
});
