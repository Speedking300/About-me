const DISCORD_ID = "1181986720221253666";

// 1. Scroll Reveal Animation
const observerOptions = { threshold: 0.1 };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));

// 2. Lanyard API & Spotify Progress
async function updatePresence() {
    try {
        const response = await fetch(`https://api.lanyard.rest/v1/users/${DISCORD_ID}`);
        const { data } = await response.json();

        // Profile Details
        document.getElementById('discord-name').innerText = data.discord_user.username;
        document.getElementById('discord-avatar').src = `https://cdn.discordapp.com/avatars/${DISCORD_ID}/${data.discord_user.avatar}.webp?size=256`;
        document.getElementById('discord-status').innerText = data.discord_status.toUpperCase();
        document.getElementById('status-dot').className = `status-${data.discord_status}`;

        // Spotify Logic
        const spotify = data.spotify;
        const spotBox = document.getElementById('spotify-container');
        
        if (data.listening_to_spotify) {
            spotBox.style.display = 'block';
            document.getElementById('spotify-details').innerText = `${spotify.song} - ${spotify.artist}`;
            
            const current = Date.now() - spotify.timestamps.start;
            const total = spotify.timestamps.end - spotify.timestamps.start;
            const progress = Math.min(100, (current / total) * 100);
            
            document.getElementById('spotify-progress-bar').style.width = `${progress}%`;
            document.getElementById('spotify-current-time').innerText = formatTime(current);
            document.getElementById('spotify-total-time').innerText = formatTime(total);
        } else {
            spotBox.style.display = 'none';
        }

        // Activity Logic
        const activity = data.activities.find(a => a.type === 0);
        const actBox = document.getElementById('activity-container');
        if (activity) {
            actBox.style.display = 'flex';
            document.getElementById('activity-name').innerText = activity.name;
            document.getElementById('activity-details').innerText = activity.details || "In Session";
            if (activity.assets) {
                document.getElementById('activity-icon').src = `https://cdn.discordapp.com/app-assets/${activity.application_id}/${activity.assets.large_image}.png`;
            }
        } else {
            actBox.style.display = 'none';
        }

    } catch (err) { console.error("Presence Error", err); }
}

function formatTime(ms) {
    const mins = Math.floor(ms / 60000);
    const secs = ((ms % 60000) / 1000).toFixed(0);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

// Update every second for smooth bar
setInterval(updatePresence, 1000);
updatePresence();

// Project Filter Logic
function filterProjects(category) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    document.querySelectorAll('.project-card').forEach(card => {
        if (category === 'all' || card.classList.contains(category)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Optimierte Cursor Logik
const cursor = document.getElementById('custom-cursor');

document.addEventListener('mousemove', (e) => {
    // requestAnimationFrame sorgt für eine flüssigere Bewegung
    requestAnimationFrame(() => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
});

// Cursor Effekte für alle klickbaren Elemente
const clickables = document.querySelectorAll('a, button, .project-card, .nav-github');
clickables.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(2.5)';
        cursor.style.background = 'white';
    });
    el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        cursor.style.background = 'var(--accent)';
    });
});