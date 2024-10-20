function handleScreenChange() {
    const isMobile = window.matchMedia("(max-width: 1024px)").matches;

    if (!isMobile) {
        // Desktop-specific logic (image swap)
        document.querySelectorAll('.sdlc-item').forEach(item => {
            item.addEventListener('click', function () {
                // Remove 'active' class from all items
                document.querySelectorAll('.sdlc-item').forEach(i => i.classList.remove('active'));

                // Add 'active' class to the selected item
                this.classList.add('active');

                // Get the image file and shape from data attributes
                const imageSrc = this.getAttribute('data-image');
                const imageShape = this.getAttribute('data-shape');

                // Update the image in the display
                const displayImage = document.getElementById('sdlc-image');
                displayImage.style.opacity = 0; // Start fading out
                setTimeout(() => {
                    displayImage.src = imageSrc; // Change the image source
                    displayImage.alt = this.querySelector('h3').innerText; // Update alt text
                    displayImage.className = imageShape; // Apply the new shape
                    displayImage.style.opacity = 1; // Fade back in
                }, 300);
            });
        });
    }
}

// Run the function on load and on window resize
handleScreenChange();
window.addEventListener('resize', handleScreenChange);

