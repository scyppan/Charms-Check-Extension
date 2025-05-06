let charmscheckpanel = null;

function createcharmscheckpanel() {
    // Create a parent container
    const parentContainer = document.createElement('div');
    parentContainer.id = 'parent-container';

    // Get the charmscheckpanel element
    charmscheckpanel = document.getElementById('charmscheckpanel');
    if (!charmscheckpanel) {
        charmscheckpanel = document.createElement('div');
        charmscheckpanel.id = "charmscheckpanel";
        charmscheckpanel.classList.add('collapsed');

        // Add some content to the panel to make it visible
        const content = document.createElement('div');
        content.innerHTML = '<p>Charms Check Extension 25</p>';
        charmscheckpanel.appendChild(content);
    }

    // Append the charmscheckpanel to the parent container
    parentContainer.appendChild(charmscheckpanel);

    // Create a button to toggle the panel
    const toggleButton = document.createElement('button');
    toggleButton.innerHTML = '<img src="https://charmscheck.com/wp-content/uploads/2021/09/cropped-Icon1.png" alt="Toggle" style="width: 24px; height: 24px;">'; // Replace with your WordPress icon URL
    toggleButton.classList.add('toggle-button', 'initial-animation');

    // Function to update button position based on panel state
    function updateButtonPosition() {
        if (charmscheckpanel.classList.contains('expanded')) {
            toggleButton.style.left = 'calc(45% + 10px)'; // Adjust based on expanded panel width
        } else {
            toggleButton.style.left = '10px'; // Adjust based on collapsed panel width
        }
    }

    toggleButton.addEventListener('click', function () {
        if (charmscheckpanel.classList.contains('expanded')) {
            charmscheckpanel.classList.remove('expanded');
            charmscheckpanel.classList.add('collapsed');
        } else {
            charmscheckpanel.classList.remove('collapsed');
            charmscheckpanel.classList.add('expanded');
        }
        updateButtonPosition(); // Update position on toggle
    });

    // Append the parent container to the body
    document.body.prepend(parentContainer);

    // Append the toggle button to the body (not within the parent container)
    document.body.appendChild(toggleButton);

    // Ensure button is correctly positioned after initial animation
    toggleButton.addEventListener('animationend', () => {
        toggleButton.classList.remove('initial-animation');
        toggleButton.style.top = '10px'; // Set final top position
        updateButtonPosition(); // Set initial position after animation
    });

    createiframe();
}

// Function to create and append an iframe to charmscheckpanel
function createiframe() {
    // Get the charmscheckpanel element
    var charmscheckpanel = document.getElementById('charmscheckpanel');
    if (!charmscheckpanel) {
        console.error('Element with id "charmscheckpanel" not found.');
        return;
    }

    // Create an iframe element
    var iframe = document.createElement('iframe');
    iframe.src = "https://charmscheck.com/character-sheet-25/";
    iframe.classList.add('iframe-content'); // Add class to iframe

    // Append the iframe to the charmscheckpanel
    charmscheckpanel.appendChild(iframe);
}
