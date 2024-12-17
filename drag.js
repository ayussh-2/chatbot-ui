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

chatbot.style.left = "20px";
chatbot.style.top = "20px";

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

minimizeBtn.addEventListener("click", () => {
    if (chatbot.classList.contains("minimized")) {
        // Restore from minimized state
        chatbot.classList.remove("minimized");
        chatbot.style.transform = "scale(1)";
        chatbot.style.opacity = "1";
        minimizeBtn.innerHTML = '<i class="fa-solid fa-window-minimize"></i>';
    } else {
        // Minimize
        chatbot.classList.add("minimized");
        chatbot.style.transform = "scale(0.7)";
        chatbot.style.opacity = "0.7";
        minimizeBtn.innerHTML = '<i class="fa-solid fa-window-maximize"></i>';
    }
});

closeBtn.addEventListener("click", () => {
    chatbot.style.transition = "opacity 0.3s ease, transform 0.3s ease";
    chatbot.style.opacity = "0";
    chatbot.style.transform = "scale(0.9)";

    setTimeout(() => {
        chatbot.style.display = "none";
        chatbot.style.transition = "none";
        chatbot.style.opacity = "1";
        chatbot.style.transform = "scale(1)";
    }, 300);
});

function reopenChatbot() {
    chatbot.style.display = "block";
    chatbot.style.transition = "opacity 0.3s ease, transform 0.3s ease";
    chatbot.style.opacity = "1";
    chatbot.style.transform = "scale(1)";
}
