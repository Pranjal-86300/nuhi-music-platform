document.addEventListener("DOMContentLoaded", () => {
    console.log("Project initialized!");
});
document.addEventListener("DOMContentLoaded", () => {
    const exploreButton = document.querySelector(".explore-btn");
    const musicSection = document.getElementById("music-section");

    exploreButton.addEventListener("click", () => {
        musicSection.scrollIntoView({ behavior: "smooth" });
    });
});
