document.getElementById("info-text").addEventListener("click", function () {
    // Info-Box anzeigen
    document.getElementById("info-box").style.display = "block";
    document.getElementById("overlay").classList.add("active");

    // Alle anderen Inhalte ausblenden
    document.querySelector(".container").style.display = "none";
});

document.getElementById("close-info").addEventListener("click", function () {
    // Info-Box ausblenden
    document.getElementById("info-box").style.display = "none";
    document.getElementById("overlay").classList.remove("active");

    // Alle anderen Inhalte wieder anzeigen
    document.querySelector(".container").style.display = "block";
});
