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

// --- Task 5: API Integration ---
const fetchBtn = document.getElementById('fetchBtn');
const apiContainer = document.getElementById('apiContainer');

fetchBtn.addEventListener('click', fetchPosts);

function fetchPosts() {
    apiContainer.innerHTML = '<p class="text-center text-muted">Fetching data from API...</p>';

    fetch('https://jsonplaceholder.typicode.com/posts?_limit=3')
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(data => {
            apiContainer.innerHTML = '';
            data.forEach(post => {
                // Wrap cards inside Bootstrap grid column wrappers
                const col = document.createElement('div');
                col.className = 'col-md-4';
                col.innerHTML = `
                    <div class="card h-100 p-3 shadow-sm api-card">
                        <h5 class="card-title text-capitalize text-primary">${post.title}</h5>
                        <p class="card-text text-secondary small">${post.body}</p>
                    </div>
                `;
                apiContainer.appendChild(col);
            });
        })
        .catch(error => {
            apiContainer.innerHTML = `<p class="text-center text-danger fw-bold">Failed to load data: ${error.message}</p>`;
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

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

form.addEventListener('submit', function(e) {
    e.preventDefault();

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

    // Success feedback display
    if (isValid) {
        formSuccess.textContent = 'Form submitted successfully!';
        formSuccess.classList.remove('d-none');
        form.reset();

        setTimeout(() => {
            formSuccess.classList.add('d-none');
        }, 4000);
    } else {
        formSuccess.classList.add('d-none');
    }
});

function showError(inputElement, errorElement, message) {
    inputElement.classList.add('is-invalid');
    errorElement.textContent = message;
}

function clearError(inputElement, errorElement) {
    inputElement.classList.remove('is-invalid');
    errorElement.textContent = '';
}