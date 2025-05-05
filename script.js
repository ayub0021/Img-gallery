const filterButtons = document.querySelectorAll(".filter_buttons button");
const filterableCards = document.querySelectorAll(".filterable_cards .card");
const popup = document.querySelector(".popup");
const popupImg = popup.querySelector("img");
const closeBtn = document.querySelector(".popup .close-btn");
const prevBtn = document.querySelector(".popup .prev-btn");
const nextBtn = document.querySelector(".popup .next-btn");

let currentIndex = 0;
let images = [];

// Update image list
function updateImageList() {
    images = Array.from(filterableCards).filter(card => card.style.display !== "none");
}

// Function to open popup with a specific index
function openPopup(index) {
    if (images.length === 0) return;
    currentIndex = index;
    popupImg.src = images[currentIndex].querySelector("img").src;
    popup.classList.add("active");
}

// Function to close popup
function closePopup() {
    popup.classList.remove("active");
}

// Function to show previous image
function showPrevImage() {
    if (currentIndex > 0) {
        openPopup(currentIndex - 1);
    }
}

// Function to show next image
function showNextImage() {
    if (currentIndex < images.length - 1) {
        openPopup(currentIndex + 1);
    }
}

// Event listeners
filterButtons.forEach(button => {
    button.addEventListener("click", e => {
        document.querySelector(".active").classList.remove("active");
        e.target.classList.add("active");
        const filter = e.target.dataset.name;

        filterableCards.forEach(card => {
            if (filter === "all" || card.dataset.name === filter) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });

        updateImageList(); // Update image list after filtering
    });
});

// Open image popup on click
filterableCards.forEach((card, index) => {
    card.addEventListener("click", () => {
        updateImageList(); // Update images before opening
        openPopup(images.indexOf(card));
    });
});

// Close popup
closeBtn.addEventListener("click", closePopup);
prevBtn.addEventListener("click", showPrevImage);
nextBtn.addEventListener("click", showNextImage);

// Keyboard navigation
document.addEventListener("keydown", (event) => {
    if (popup.classList.contains("active")) {
        if (event.key === "Escape") closePopup();
        if (event.key === "ArrowLeft") showPrevImage();
        if (event.key === "ArrowRight") showNextImage();
    }
});

// Create Download & Share buttons inside popup
const popupControls = document.createElement("div");
popupControls.classList.add("popup-controls");

const popupDownload = document.createElement("button");
const popupShare = document.createElement("button");

popupDownload.innerText = "Download";
popupShare.innerText = "Share";

popupDownload.classList.add("popup-btn");
popupShare.classList.add("popup-btn");

popupControls.appendChild(popupDownload);
popupControls.appendChild(popupShare);
popup.appendChild(popupControls);

// Update popup image and set download/share functionality
function updatePopupImage() {
    const imgSrc = filterableCards[currentImageIndex].querySelector("img").src;
    popupImg.src = imgSrc;
    popupDownload.onclick = () => downloadImage(imgSrc);
    popupShare.onclick = () => shareImage(imgSrc);
}

// Download function
function downloadImage(imgSrc) {
    const a = document.createElement("a");
    a.href = imgSrc;
    a.download = "image.jpg";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

// Share function
function shareImage(imgSrc) {
    if (navigator.share) {
        navigator.share({
            title: "Check out this image!",
            url: imgSrc
        }).catch(error => console.log("Error sharing", error));
    } else {
        alert("Sharing is not supported on this browser.");
    }
}

// Add Download & Share buttons below each image
filterableCards.forEach(card => {
    const imgSrc = card.querySelector("img").src;
    const cardControls = document.createElement("div");
    cardControls.classList.add("card-controls");

    const downloadBtn = document.createElement("button");
    const shareBtn = document.createElement("button");

    downloadBtn.innerText = "Download";
    shareBtn.innerText = "Share";

    downloadBtn.classList.add("card-btn");
    shareBtn.classList.add("card-btn");

    downloadBtn.onclick = () => downloadImage(imgSrc);
    shareBtn.onclick = () => shareImage(imgSrc);

    cardControls.appendChild(downloadBtn);
    cardControls.appendChild(shareBtn);
    card.appendChild(cardControls);
});
