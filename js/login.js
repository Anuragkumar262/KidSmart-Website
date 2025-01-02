document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.querySelector('.login-form');
    const emailInput = document.querySelector('#email');
    const passwordInput = document.querySelector('#password');
    const togglePassword = document.querySelector('#toggle-password');

    // Toggle password visibility
    togglePassword.addEventListener('click', function () {
        // Toggle the type of the password field
        const type = passwordInput.type === 'password' ? 'text' : 'password';
        passwordInput.type = type;

        // Change the eye icon to reflect the current state
        togglePassword.textContent = type === 'password' ? '👁️' : '🙈';
    });

    // Listen for form submission
    loginForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the form from submitting to the server

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        // Basic validation
        if (email === '' || password === '') {
            alert('Please enter both email and password.');
            return;
        }

        // Fetch user data from user.json
        fetch('user.json') // Make sure 'user.json' is in the root directory of your project
            .then(response => response.json())  // Parse the JSON data
            .then(users => {
                // Search for a user matching the input email and password
                const user = users.find(u => u.email === email && u.password === password);

                if (user) {
                    // If user is found, login is successful
                    alert('Login successful!');
                    window.location.href = 'index.html'; // Redirect to index.html (your homepage)
                } else {
                    // If no matching user, show an alert
                    alert('Invalid email or password.');
                }
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
                alert('There was an error while logging in. Please try again later.');
            });
    });
});
