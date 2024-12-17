const chatbot = document.getElementById("chatbot");
const header = document.getElementById("chatHeader");
const minimizeBtn = document.getElementById("minimizeBtn");
const closeBtn = document.getElementById("closeBtn");

let isDragging = false;
let currentX;
let currentY;
let initialX;
let initialY;
let xOffset = 0;
let yOffset = 0;

// Set initial position
chatbot.style.left = "20px";
chatbot.style.top = "20px";

// Dragging functionality
header.addEventListener("mousedown", dragStart);
document.addEventListener("mousemove", drag);
document.addEventListener("mouseup", dragEnd);

function dragStart(e) {
    initialX = e.clientX - xOffset;
    initialY = e.clientY - yOffset;

    if (e.target === header || header.contains(e.target)) {
        isDragging = true;
        header.classList.add("grabbing");
    }
}

function drag(e) {
    if (isDragging) {
        e.preventDefault();

        // Calculate new position
        let newX = e.clientX - initialX;
        let newY = e.clientY - initialY;

        // Prevent chatbot from going out of bounds
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;

        const chatbotRect = chatbot.getBoundingClientRect();
        const chatbotWidth = chatbotRect.width;
        const chatbotHeight = chatbotRect.height;

        // Boundaries
        if (newX < 0) newX = 0; // Left boundary
        if (newY < 0) newY = 0; // Top boundary
        if (newX + chatbotWidth > screenWidth)
            newX = screenWidth - chatbotWidth; // Right boundary
        if (newY + chatbotHeight > screenHeight)
            newY = screenHeight - chatbotHeight; // Bottom boundary

        // Update position
        currentX = newX;
        currentY = newY;
        xOffset = currentX;
        yOffset = currentY;

        setTranslate(currentX, currentY, chatbot);
    }
}

function dragEnd() {
    initialX = currentX;
    initialY = currentY;
    isDragging = false;
    header.classList.remove("grabbing");
}

function setTranslate(xPos, yPos, el) {
    el.style.left = xPos + "px";
    el.style.top = yPos + "px";
}

// Minimize functionality
minimizeBtn.addEventListener("click", () => {
    chatbot.classList.toggle("minimized");
    minimizeBtn.innerHTML = chatbot.classList.contains("minimized")
        ? '<i class="fa-solid fa-window-maximize"></i>'
        : '<i class="fa-solid fa-window-minimize"></i>';
});

// Close functionality
closeBtn.addEventListener("click", () => {
    chatbot.style.display = "none";
});
