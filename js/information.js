document.getElementById("info-text").addEventListener("click", function () {
    // Info-Box anzeigen
    document.getElementById("info-box").style.display = "block";
    document.getElementById("info-overlay").classList.add("active");

    // Verstecke den Rest der Seite
    document.body.classList.add("no-scroll");
});

document.getElementById("close-info").addEventListener("click", function () {
    // Info-Box ausblenden
    document.getElementById("info-box").style.display = "none";
    document.getElementById("info-overlay").classList.remove("active");

    // Seite wieder normal anzeigen
    document.body.classList.remove("no-scroll");
});
