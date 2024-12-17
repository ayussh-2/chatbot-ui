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
