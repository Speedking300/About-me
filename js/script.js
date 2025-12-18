const DISCORD_ID = "1181986720221253666";

// CUSTOM CURSOR
const dot = document.getElementById('cursor-dot');
const outline = document.getElementById('cursor-outline');

window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    dot.style.left = `${posX}px`;
    dot.style.top = `${posY}px`;

    outline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 500, fill: "forwards" });
});

// LOADER LOGIC
window.addEventListener('load', () => {
    let progress = 0;
    const bar = document.querySelector('.loader-progress-bar');
    const percentTxt = document.querySelector('.percent');

    const loaderInterval = setInterval(() => {
        progress += Math.floor(Math.random() * 12) + 1;
        
        if (progress >= 100) {
            progress = 100;
            clearInterval(loaderInterval);
            setTimeout(() => {
                document.body.classList.add('loaded');
                document.body.classList.remove('loading');
            }, 500);
        }
        
        bar.style.width = progress + "%";
        percentTxt.innerText = progress + "%";
    }, 60);
});

// LANYARD API (Discord Presence)
async function updatePresence() {
    try {
        const response = await fetch(`https://api.lanyard.rest/v1/users/${DISCORD_ID}`);
        const { data } = await response.json();

        if (!data) return;

        // User Details
        document.getElementById('discord-name').innerText = data.discord_user.username;
        document.getElementById('discord-avatar').src = `https://cdn.discordapp.com/avatars/${DISCORD_ID}/${data.discord_user.avatar}.webp?size=160`;
        
        // Status
        const statusEl = document.getElementById('status-indicator');
        statusEl.className = `status-${data.discord_status}`;
        document.getElementById('discord-status-text').innerText = data.discord_status.toUpperCase();

        // Spotify
        const spotWidget = document.getElementById('spotify-widget');
        if (data.listening_to_spotify) {
            spotWidget.style.opacity = "1";
            document.getElementById('spotify-song').innerText = data.spotify.song;
            
            const total = data.spotify.timestamps.end - data.spotify.timestamps.start;
            const current = Date.now() - data.spotify.timestamps.start;
            const progress = Math.min(100, (current / total) * 100);
            document.getElementById('spotify-bar').style.width = progress + "%";
        } else {
            spotWidget.style.opacity = "0.5";
            document.getElementById('spotify-song').innerText = "Not listening to anything";
            document.getElementById('spotify-bar').style.width = "0%";
        }
    } catch (err) {
        console.error("Presence Error:", err);
    }
}

setInterval(updatePresence, 2000);
updatePresence();