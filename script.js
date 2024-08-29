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
    const bowlImageSourceWebP = document.querySelector('.bowl-image-webp');
    const bowlImageSourcePNG = document.querySelector('.bowl-image-png');
    const bowlImageFallback = document.querySelector('.bowl-image');
    const title = document.querySelector('.title');
    const description = document.querySelector('.description');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');

    // Create flavor selector buttons
    bowls.forEach((bowl, index) => {
        const button = document.createElement('button');
        button.textContent = bowl.name;
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
    const buttons = flavorSelector.querySelectorAll('button');
    buttons.forEach((button, ) => {
        button.addEventListener('click', () => {
            animateText();
            animateClockwise();
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

        // Update active state of flavor buttons
        const buttons = flavorSelector.querySelectorAll('button');
        buttons.forEach((button, index) => {
            button.classList.toggle('active', index === currentBowlIndex);
        });
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

// Initialize the bowl selector when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initializeBowlSelector);
document.addEventListener('DOMContentLoaded', preloadImages(["apple_1000.webp", "strawberry-banana_1000.webp", "kiwi_1000.webp", "pomegranate_1000.webp"]));