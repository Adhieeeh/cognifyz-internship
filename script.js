// Function to generate a random hex color code
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Target the button and add an event listener
const colorBtn = document.getElementById('colorBtn');

colorBtn.addEventListener('click', function() {
    // Generate a random background color
    const newColor = getRandomColor();
    
    // Apply the color to the body
    document.body.style.backgroundColor = newColor;
});