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
    // Show loading state
    apiContainer.innerHTML = '<p class="loading">Fetching data from API...</p>';

    // Fetch dynamic data from JSONPlaceholder API
    fetch('https://jsonplaceholder.typicode.com/posts?_limit=3')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Parse JSON data
        })
        .then(data => {
            // Clear loading text
            apiContainer.innerHTML = '';

            // Dynamically create and render HTML elements for each post
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