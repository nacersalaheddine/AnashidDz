document.addEventListener('DOMContentLoaded', () => {
    fetchTracks();
});

async function fetchTracks() {
    try {
        const response = await fetch('data/content.json');
        const data = await response.json();
        renderTracks(data.tracks);
    } catch (error) {
        console.error("خطأ في جلب البيانات:", error);
    }
}

function renderTracks(tracks) {
    const container = document.getElementById('tracks-container');
    container.innerHTML = tracks.map((track, index) => `
        <div class="track-card slide-up" style="animation-delay: ${index * 0.1}s">
            <div class="track-icon">
                <i data-lucide="music-4" style="width: 32px; height: 32px;"></i>
            </div>
            <h4>${track.title}</h4>
            <div class="artist">${track.artist}</div>
            <p>${track.description}</p>
            <div class="card-actions">
                <button class="btn btn-primary" onclick="loadAndPlayTrack('${track.audioUrl}', '${track.title}', '${track.artist}')">
                    <i data-lucide="play"></i> استماع
                </button>
                <a href="${track.audioUrl}" download class="btn btn-secondary" target="_blank">
                    <i data-lucide="download"></i> تحميل
                </a>
            </div>
        </div>
    `).join('');
    lucide.createIcons();
}
