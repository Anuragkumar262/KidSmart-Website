const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt"); // For password hashing

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Serve static files (like HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Path to user data file
const userFilePath = path.join(__dirname, "user.json");

// Helper function to read users from file
const readUsersFromFile = () => {
    try {
        const data = fs.readFileSync(userFilePath, "utf8");
        return JSON.parse(data);
    } catch (err) {
        if (err.code === 'ENOENT') {
            return []; // If file doesn't exist, return an empty array
        }
        throw err; // Other errors
    }
};

// Helper function to save users to file
const saveUsersToFile = (users) => {
    try {
        fs.writeFileSync(userFilePath, JSON.stringify(users, null, 2), "utf8");
    } catch (err) {
        throw new Error("Failed to save user data.");
    }
};

// Endpoint to handle the form submission
app.post("/signup", async (req, res) => {
    const { fullName, email, password } = req.body;

    // Check if data is valid
    if (!fullName || !email || !password) {
        return res.status(400).json({ success: false, message: "All fields are required." });
    }

    // Read existing user data
    let users = [];
    try {
        users = readUsersFromFile();
    } catch (err) {
        return res.status(500).json({ success: false, message: "Failed to read user data." });
    }

    // Check if the user already exists (based on email)
    const userExists = users.some(user => user.email === email);
    if (userExists) {
        return res.status(400).json({ success: false, message: "Email already exists." });
    }

    // Hash the password before saving it
    try {
        const hashedPassword = await bcrypt.hash(password, 10); // Salt rounds = 10
        // Add the new user data (with hashed password)
        users.push({ fullName, email, password: hashedPassword });

        // Save the new user data
        saveUsersToFile(users);

        return res.status(200).json({ success: true, message: "User signed up successfully!" });
    } catch (err) {
        return res.status(500).json({ success: false, message: "Error processing the password." });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
