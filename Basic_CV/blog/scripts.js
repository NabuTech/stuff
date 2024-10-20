// Toggle burger menu for mobile navigation
function toggleMenu() {
    const navLinks = document.getElementById('nav-links');
    navLinks.classList.toggle('active');
}

// Toggle post details in the blog post list
document.querySelectorAll('.toggle-details').forEach(function(button) {
    button.addEventListener('click', function() {
        const post = button.closest('.blog-post');
        post.classList.toggle('active');
        const details = post.querySelector('.post-details');
        details.style.display = details.style.display === 'flex' ? 'none' : 'flex'; // Toggle visibility
        const icon = button.querySelector('i');
        icon.classList.toggle('fa-chevron-down');
        icon.classList.toggle('fa-chevron-up'); // Change icon on toggle
    });
});

// Toggle year dropdown in the filter
document.querySelectorAll('.year-toggle').forEach(function(button) {
    button.addEventListener('click', function() {
        const yearItem = button.closest('li');
        yearItem.classList.toggle('active');
        const monthList = yearItem.querySelector('.month-list');
        monthList.style.display = monthList.style.display === 'block' ? 'none' : 'block'; // Toggle visibility
        const icon = button.querySelector('i');
        icon.classList.toggle('fa-chevron-down');
        icon.classList.toggle('fa-chevron-up'); // Change icon on toggle
    });
});
