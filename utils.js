document.querySelectorAll(".copy-button").forEach((button) => {
    button.addEventListener("click", function () {
        const textToCopy = this.previousElementSibling.innerText;
        navigator.clipboard
            .writeText(textToCopy)
            .then(() => {
                this.innerHTML = '<i class="fa-solid fa-check"></i>';
                setTimeout(() => {
                    this.innerHTML = '<i class="fa-solid fa-copy"></i>';
                }, 2000);
            })
            .catch((err) => console.error("Failed to copy text: ", err));
    });
});
const selectContainer = document.querySelector(".select-container");
const selectedOption = document.querySelector(".selected-option");
const optionsContainer = document.querySelector(".options-container");
const options = document.querySelectorAll(".option");
const optionText = document.querySelector(".option-text");

selectedOption.addEventListener("click", () => {
    optionsContainer.classList.toggle("hidden");
});

document.addEventListener("click", (event) => {
    if (!selectContainer.contains(event.target)) {
        optionsContainer.classList.add("hidden");
    }
});

options.forEach((option) => {
    option.addEventListener("click", (event) => {
        event.stopPropagation();
        optionText.textContent = option.textContent;
        optionsContainer.classList.add("hidden");
    });
});
