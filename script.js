const input = document.getElementById("search");
const button = document.getElementById("btn");

input.addEventListener("input", () => {
    if (input.value.trim() !== "") {
        button.disabled = false;
        button.classList.add("active");
    } else {
        button.disabled = true;
        button.classList.remove("active");
    }
});

input.addEventListener("focus", () => {
    button.classList.add("active");
});

input.addEventListener("blur", () => {
    button.classList.remove("active");
});