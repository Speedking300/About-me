particlesJS('particles-js', {
    particles: {
        number: { value: 100 },
        color: { value: "#000000" },
        shape: { type: "circle" },
        opacity: { value: 0.5, random: true },
        size: { value: 5, random: true },
        move: {
            enable: true,
            speed: 2,
            direction: "none",
            random: false,
            straight: false,
            out_mode: "out"
        }
    },
    interactivity: {
        events: {
            onhover: { enable: false, mode: "repulse" },
            onclick: { enable: false, mode: "push" }
        }
    }
});

// Typing-Animation mit optimierten Werten (ohne den Strich + besser lesbar)
let typed = new Typed(".subtitle", {
    strings: [
        "WEB DEV",
        "ROBLOX LUAU GAME DEV ",
        "LOVE TO CODE",
        "DISCORD BOT DEV",
        "3D Modeler"
    ],
    typeSpeed: 40,         // Langsameres Tippen für bessere Lesbarkeit
    backSpeed: 20,         // Langsames Löschen für einen sanfteren Effekt
    backDelay: 2000,       // Längere Pause zwischen den Sätzen
    startDelay: 1000,      // Erster Text bleibt länger sichtbar
    loop: true,            // Wiederholt sich endlos
    showCursor: false     // Entfernt den blinkenden Strich
});

