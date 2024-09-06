const bowls = [
    { name: 'Papaya', description: 'Rise and shine with a tropical hug in a bowl. Sweet papaya chunks and crunchy almonds meet rich chocolate oats. It’s like vacation for breakfast, but without the sand in your shoes.', bgcolor: ' #E57D3A' },
    { name: 'Apple', description: 'Channel those cozy fall vibes with crisp apple slices and a solid almond crunch on a base of chocolate oats. It’s basically sweater weather in a bowl.', bgcolor: '#E8B13B' },
    { name: 'Strawberry-Banana', description: 'Strawberries, bananas, and chocolate oats—classic trio, timeless vibes. It’s like the brunch spot on your block, but in your kitchen.', bgcolor: '#E7645B' },
    { name: 'Kiwi', description: 'Wake up your taste buds with tangy kiwi and almond crunch over chocolate oats. Fresh, zesty, and ready to take on the day, just like you.', bgcolor: '#A7C85A' },
    { name: 'Pomegranate', description: 'Get that burst of flavor with juicy pomegranate and almonds on chocolate oats. It’s a little tart, a little sweet, and a lot of awesome—just like your favorite neighborhood cafe.', bgcolor: '#C94E4E' },
];

let currentBowlIndex = 0;

function initializeBowlSelector() {
    const flavorSelector = document.querySelector('.flavor-selector');
    const flavorSelectorMobile = document.querySelector('.flavor-selector-mobile');
    const bowlImageSourceWebP = document.querySelector('.bowl-image-webp');
    const bowlImageSourcePNG = document.querySelector('.bowl-image-png');
    const bowlImageFallback = document.querySelector('.bowl-image');
    const title = document.querySelector('.title');
    const description = document.querySelector('.description');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');

    const totalButtons = bowls.length;
    const radius = 50; // Percentage radius for responsive design
    const startAngle = 180; // Starting angle in degrees
    const angleStep = 180 / (totalButtons - 1); // Angle step based on the number of buttons

    // Get the modal
    var modal = document.querySelector('.modal');

    // Get the button that opens the modal
    var btn = document.querySelector('.modal-button');

    // Get the <span> element that closes the modal
    var span = document.querySelector('.close');

    // Open the modal when the button is clicked
    btn.addEventListener('click', () => {
        modal.style.display = "block";
    });

    // Close the modal when the "x" (span) is clicked
    span.addEventListener('click', () => {
        modal.style.display = "none";
    });

    // Close the modal when clicking outside the modal
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    // Create flavor selector mobile buttons
    bowls.forEach((bowl, index) => {
        const button = document.createElement('button');
        button.textContent = bowl.name;

        button.addEventListener('click', () => selectBowl(index));
        flavorSelectorMobile.appendChild(button);
    });

    // Create flavor selector buttons
    bowls.forEach((bowl, index) => {
        const button = document.createElement('button');
        button.classList.add("flavor-button")
        button.textContent = bowl.name;

        // Calculate the angle for each button
        const angle = startAngle + index * angleStep;
        const angleInRadians = angle * (Math.PI / 180);

        // Calculate top and left using cos and sin for polar coordinates
        const left = 50 + radius * Math.cos(angleInRadians); // Horizontal position
        const top = 50 + radius * Math.sin(angleInRadians);  // Vertical position

        // Set the calculated position and rotation
        button.style.left = `${left}%`;
        button.style.top = `${top}%`;
        const rotation = angle + 90; // Rotate to face center
        button.style.transform += `translate(-50%, -50%) rotate(${rotation}deg)`;

        button.addEventListener('click', () => selectBowl(index));
        flavorSelector.appendChild(button);
    });

    // Initialize with the first bowl
    updateBowlDisplay();

    // Add event listeners for navigation buttons, bowl image and text animations
    prevButton.addEventListener('click', () => {
        navigateBowl(-1);
        animateAntiClockwise();
        animateText();
    });
    nextButton.addEventListener('click', () => {
        navigateBowl(1);
        animateClockwise();
        animateText();
    });

    const selectors = [flavorSelector, flavorSelectorMobile];
    selectors.forEach((x) => {
        const buttons = x.querySelectorAll('button');
        buttons.forEach((button, ) => {
            button.addEventListener('click', () => {
                animateText();
                animateClockwise();
            });
        });
    });

    function selectBowl(index) {
        currentBowlIndex = index;
        updateBowlDisplay();
    }

    function navigateBowl(direction) {
        currentBowlIndex = (currentBowlIndex + direction + bowls.length) % bowls.length;
        updateBowlDisplay();
    }

    function updateBowlDisplay() {
        const currentBowl = bowls[currentBowlIndex];
        title.textContent = `${currentBowl.name}`;
        description.textContent = currentBowl.description;
        bowlImageSourceWebP.srcset = `${currentBowl.name.toLowerCase()}_1000.webp`;
        bowlImageSourcePNG.srcset = `${currentBowl.name.toLowerCase()}_1000.png`;
        bowlImageFallback.src = `${currentBowl.name.toLowerCase()}_1000.png`;
        bowlImageFallback.alt = `${currentBowl.name}`;
        document.body.style.backgroundColor = currentBowl.bgcolor;
        document.querySelector('.modal-content').style.backgroundColor = currentBowl.bgcolor;

        // Update active state of flavor buttons
        const buttons = flavorSelector.querySelectorAll('button');
        buttons.forEach((button, index) => {
            button.classList.toggle('active', index === currentBowlIndex);
        });

        // Draw a dot on the image-container border next to the active flavor-button
        const dot = document.querySelector('.dot');
        const radius = 50; // Percentage radius for responsive design
        const startAngle = 180; // Starting angle in degrees
        const angleStep = 180 / (totalButtons - 1); // Angle step based on the number of buttons
        // Calculate the angle for each button
        const angle = startAngle + currentBowlIndex * angleStep;
        const angleInRadians = angle * (Math.PI / 180);

        // Calculate top and left using cos and sin for polar coordinates
        const left = 50 + radius * Math.cos(angleInRadians); // Horizontal position
        const top = 50 + radius * Math.sin(angleInRadians);  // Vertical position

        // Set the calculated position and rotation
        dot.style.left = `${left}%`;
        dot.style.top = `${top}%`;
    }

    function animateClockwise() {
        bowlImageFallback.classList.add("spinner-class-clockwise");
        setTimeout(() => {
            bowlImageFallback.classList.remove("spinner-class-clockwise");
        }, 1000);
    }

    function animateAntiClockwise() {
        bowlImageFallback.classList.add("spinner-class-anticlockwise");
        setTimeout(() => {
            bowlImageFallback.classList.remove("spinner-class-anticlockwise");
        }, 1000);
    }

    function animateText() {
        for (const item of [description, title]) {
            item.classList.add("fading-text");
            setTimeout(() => {
                item.classList.remove("fading-text");
            }, 1000);
        }
    }
}

function preloadImages(array) {
    if (!preloadImages.list) {
        preloadImages.list = [];
    }
    var list = preloadImages.list;
    for (var i = 0; i < array.length; i++) {
        var img = new Image();
        img.onload = function() {
            var index = list.indexOf(this);
            if (index !== -1) {
                // remove image from the array once it's loaded
                // for memory consumption reasons
                list.splice(index, 1);
            }
        }
        list.push(img);
        img.src = array[i];
    }
}

function openTab() {
    const tabs = document.querySelectorAll('.tab-button');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabId = tab.getAttribute('data-tab');

            // Hide all tab contents
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });

            // Show the selected tab content
            document.getElementById(tabId).classList.add('active');

            // Update active tab button
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
        });
    });
}

// Initialize the bowl selector when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initializeBowlSelector);
document.addEventListener('DOMContentLoaded', preloadImages(["apple_1000.webp", "strawberry-banana_1000.webp", "kiwi_1000.webp", "pomegranate_1000.webp"]));
document.addEventListener('DOMContentLoaded', openTab);