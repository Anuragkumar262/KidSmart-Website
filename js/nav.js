// Function to add item to the cart
const addToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];  // Get the cart from localStorage, or initialize it if it doesn't exist

    // Check if the product already exists in the cart
    const existingProduct = cart.find(item => item.id === product.id && item.age === product.age);

    if (existingProduct) {
        // If the product exists, increase the quantity
        existingProduct.quantity += 1;
    } else {
        // If the product doesn't exist, add it to the cart with quantity 1
        cart.push({ ...product, quantity: 1 });
    }

    // Save the updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    alert('Product added to cart');
};

// Add event listeners to each "Add to Cart" button
const addCartButtons = document.querySelectorAll('.add-to-cart');

addCartButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
        const productCard = event.target.closest('.product-card');
        const selectedAgeButton = productCard.querySelector('.size-buttons .selected'); // Check if size is selected

        // If no size is selected, show an alert
        if (!selectedAgeButton) {
            alert('Please select an age before adding to the cart.');
            return; // Stop further execution
        }

        const productId = productCard.querySelector('h3').innerText; // Get the product name or ID
        const productPrice = productCard.querySelector('.discount-price').innerText; // Get the product price
        const productImage = productCard.querySelector('.default-image') ? productCard.querySelector('.default-image').src : ''; // Get the product image URL
        const selectedAge = selectedAgeButton.dataset.size; // Get the selected age
        const productDescription = productCard.querySelector('.product-description').innerText; // Get the product description

        // Debugging step: Check the extracted data
        console.log('Product Data:', {
            productId,
            productPrice,
            productImage,
            selectedAge,
            productDescription
        });

        // Check if the necessary data is valid
        if (!productId || !productPrice || !productImage || !selectedAge) {
            console.error('Missing essential product data!');
            return;
        }

        const product = {
            id: productId,
            name: productId,
            price: productPrice.replace('Rs.', ''), // Remove currency symbol
            image: productImage,
            age: selectedAge,
            description: productDescription // Add description
        };

        // Add product to the cart
        addToCart(product);
    });
});

// Handle size selection
const sizeButtons = document.querySelectorAll('.size-btn');

sizeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const allSizeButtons = button.closest('.size-buttons').querySelectorAll('.size-btn');
        
        // If the clicked button is already selected, deselect it
        if (button.classList.contains('selected')) {
            button.classList.remove('selected');
        } else {
            // Deselect all buttons first
            allSizeButtons.forEach(btn => btn.classList.remove('selected'));

            // Select the clicked button
            button.classList.add('selected');
        }
    });
});

// Function to render cart items
const renderCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cart-items-container');

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty!</p>';
        return;
    }

    cartItemsContainer.innerHTML = '';  // Clear container before appending new items

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');

        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-details">
                <h3>${item.name}</h3>
                <p>Age: ${item.age}</p>  <!-- Display selected age -->
                <p>Price: Rs.${item.price}</p>
                <p>Description: ${item.description}</p>  <!-- Display product description -->
                <p>
                    Quantity: 
                    <button class="decrease-btn" data-id="${item.id}" data-age="${item.age}">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="increase-btn" data-id="${item.id}" data-age="${item.age}">+</button>
                </p>
            </div>
            <div class="cart-item-actions">
                <button class="remove-item-btn" data-id="${item.id}" data-age="${item.age}">Remove</button>
            </div>
        `;

        cartItemsContainer.appendChild(cartItem);
    });

    // Add event listeners for remove, increase, and decrease buttons
    const removeButtons = document.querySelectorAll('.remove-item-btn');
    removeButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const productId = event.target.getAttribute('data-id');
            const productAge = event.target.getAttribute('data-age');
            removeFromCart(productId, productAge);
        });
    });

    const increaseButtons = document.querySelectorAll('.increase-btn');
    increaseButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const productId = event.target.getAttribute('data-id');
            const productAge = event.target.getAttribute('data-age');
            updateQuantity(productId, productAge, 'increase');
        });
    });

    const decreaseButtons = document.querySelectorAll('.decrease-btn');
    decreaseButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const productId = event.target.getAttribute('data-id');
            const productAge = event.target.getAttribute('data-age');
            updateQuantity(productId, productAge, 'decrease');
        });
    });
};

// Function to update the quantity of a product in the cart
const updateQuantity = (productId, productAge, action) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const product = cart.find(item => item.id === productId && item.age === productAge);

    if (!product) return;

    if (action === 'increase') {
        product.quantity += 1;
    } else if (action === 'decrease') {
        if (product.quantity > 1) {
            product.quantity -= 1;
        } else {
            // If quantity is 1, remove the product from the cart
            removeFromCart(productId, productAge);
            return; // Exit function early
        }
    }

    // Save the updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    renderCart(); // Re-render the cart after quantity update
};

// Function to remove item from cart
const removeFromCart = (productId, productAge) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => !(item.id === productId && item.age === productAge));
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart(); // Re-render cart after removal
};


// Navigation toggle for mobile view
const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    
    burger.addEventListener('click',()=> {
        // Toggle nav
        nav.classList.toggle('nav-active');

        // Animate links
        navLinks.forEach((link, index) => {
            if (link.style.animation){
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.6}s`;
            }  
        });

        // Burger animation
        burger.classList.toggle('toggle');
    });
};

navSlide();
