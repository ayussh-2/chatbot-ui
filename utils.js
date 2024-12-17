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

selectedOption.addEventListener("click", () => {
    optionsContainer.classList.toggle("hidden");
});

options.forEach((option) => {
    option.addEventListener("click", () => {
        document.querySelector(".selected-option .option-text").textContent =
            option.textContent;
        optionsContainer.classList.add("hidden");
    });
});
