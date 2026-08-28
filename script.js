// --- Task 4: Interactive Background Color Switcher ---
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

const colorBtn = document.getElementById('colorBtn');
colorBtn.addEventListener('click', function() {
    document.body.style.backgroundColor = getRandomColor();
});

// --- Task 5: API Integration using fetch() ---
const fetchBtn = document.getElementById('fetchBtn');
const apiContainer = document.getElementById('apiContainer');

fetchBtn.addEventListener('click', fetchPosts);

function fetchPosts() {
    apiContainer.innerHTML = '<p class="loading">Fetching data from API...</p>';

    fetch('https://jsonplaceholder.typicode.com/posts?_limit=3')
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(data => {
            apiContainer.innerHTML = '';
            data.forEach(post => {
                const card = document.createElement('div');
                card.className = 'api-card';
                card.innerHTML = `
                    <h3>${post.title}</h3>
                    <p>${post.body}</p>
                `;
                apiContainer.appendChild(card);
            });
        })
        .catch(error => {
            apiContainer.innerHTML = `<p class="error">Failed to load data: ${error.message}</p>`;
        });
}

// --- Task 6: Form Validation ---
const form = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');

const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const messageError = document.getElementById('messageError');
const formSuccess = document.getElementById('formSuccess');

// Regular Expression for Basic Email Validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

form.addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent page reload on submit

    let isValid = true;

    // Validate Name
    if (nameInput.value.trim() === '') {
        showError(nameInput, nameError, 'Name is required.');
        isValid = false;
    } else {
        clearError(nameInput, nameError);
    }

    // Validate Email
    if (emailInput.value.trim() === '') {
        showError(emailInput, emailError, 'Email is required.');
        isValid = false;
    } else if (!emailRegex.test(emailInput.value.trim())) {
        showError(emailInput, emailError, 'Please enter a valid email address.');
        isValid = false;
    } else {
        clearError(emailInput, emailError);
    }

    // Validate Message
    if (messageInput.value.trim() === '') {
        showError(messageInput, messageError, 'Message cannot be empty.');
        isValid = false;
    } else {
        clearError(messageInput, messageError);
    }

    // If valid, display success message
    if (isValid) {
        formSuccess.textContent = 'Form submitted successfully!';
        formSuccess.style.display = 'block';
        form.reset(); // Clear input fields

        // Hide success message after 4 seconds
        setTimeout(() => {
            formSuccess.style.display = 'none';
        }, 4000);
    } else {
        formSuccess.style.display = 'none';
    }
});

function showError(inputElement, errorElement, message) {
    const parent = inputElement.parentElement;
    parent.classList.add('invalid');
    errorElement.textContent = message;
}

function clearError(inputElement, errorElement) {
    const parent = inputElement.parentElement;
    parent.classList.remove('invalid');
    errorElement.textContent = '';
}