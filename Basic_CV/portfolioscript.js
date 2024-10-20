window.addEventListener('DOMContentLoaded', (event) => {
    // Select all progress bars
    const progressBars = document.querySelectorAll('.progress');

    // Set a base animation duration for each bar (in milliseconds)
    const animationDuration = 1000; // 2 seconds for each bar to complete

    progressBars.forEach((bar, index) => {
        // Set the delay based on the index (so each bar starts after the previous one)
        const delay = index * animationDuration;

        // Use setTimeout to delay the animation start
        setTimeout(() => {
            let skillLevel = bar.getAttribute('data-skill');
            bar.style.width = skillLevel + '%'; // Animate the width to the skill level
        }, delay);
    });
});

window.addEventListener('DOMContentLoaded', (event) => {
    // Add the animation class to the h2 element in the Projects section
    const projectHeader = document.querySelector('#projects h2');
    projectHeader.classList.add('animate-underline');
});

document.addEventListener('DOMContentLoaded', () => {
    const filterTags = document.querySelectorAll('.filter-tag');
    const projectCards = document.querySelectorAll('.project-card');
    const allTag = document.querySelector('.filter-tag[data-skill="All"]');

    // Add click event to each filter tag
    filterTags.forEach(tag => {
        tag.addEventListener('click', function () {
            console.log('Clicked:', this.dataset.skill);

            // If "All" is clicked, reset all other filters and show all projects
            if (this.dataset.skill === "All") {
                resetFilter();
            } else {
                // Unselect the "All" tag when other filters are selected
                allTag.classList.remove('selected');
                const allCheckIcon = allTag.querySelector('.fas');
                if (allCheckIcon) {
                    allCheckIcon.classList.add('hidden');
                }

                // Toggle the selected state for this tag
                this.classList.toggle('selected');

                // Toggle the checkmark visibility
                const checkIcon = this.querySelector('.fas');
                if (checkIcon) {
                    if (this.classList.contains('selected')) {
                        checkIcon.classList.remove('hidden'); // Show checkmark
                    } else {
                        checkIcon.classList.add('hidden'); // Hide checkmark
                    }
                }

                // Apply filtering
                filterProjects();
            }
        });
    });

    // Function to filter the projects based on selected skill tags
    function filterProjects() {
        const selectedSkills = Array.from(document.querySelectorAll('.filter-tag.selected'))
            .map(tag => tag.dataset.skill);

        // If no skill tags are selected, automatically select "All"
        if (selectedSkills.length === 0) {
            resetFilter(); // If no filters selected, show all projects
        } else {
            // Otherwise, filter based on the selected skills
            projectCards.forEach(card => {
                const cardSkills = card.dataset.skills.split(', ');
                const matches = selectedSkills.every(skill => cardSkills.includes(skill));

                if (matches) {
                    card.style.display = 'flex'; // Show matching projects
                } else {
                    card.style.display = 'none'; // Hide non-matching projects
                }
            });
        }
    }

    // Function to reset filters and show all projects
    function resetFilter() {
        filterTags.forEach(tag => {
            if (tag.dataset.skill !== "All") {
                tag.classList.remove('selected');
                const checkIcon = tag.querySelector('.fas');
                if (checkIcon) {
                    checkIcon.classList.add('hidden'); // Hide checkmarks for other tags
                }
            }
        });

        allTag.classList.add('selected');
        const allCheckIcon = allTag.querySelector('.fas');
        if (allCheckIcon) {
            allCheckIcon.classList.remove('hidden'); // Show checkmark for "All"
        }

        projectCards.forEach(card => {
            card.style.display = 'flex'; // Show all projects
        });
    }
});
