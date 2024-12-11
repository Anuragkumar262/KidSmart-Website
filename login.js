document.getElementById('login-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  if (!email || !password) {
    alert('Please fill in all fields.');
    return;
  }

  // Example: Perform login logic (replace with actual backend integration)
  if (email === "utsav@gmail.com" && password === "password") {
    alert('Login successful! Utsav');
    window.location.href = "homePage.html";
    document.querySelector("#login").remove;
     
  }
});
