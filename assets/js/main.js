// Personalizado: control de audio
const audio = document.getElementById("audio");
const playPauseBtn = document.getElementById("playPause");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");

playPauseBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    playPauseBtn.textContent = "Ⅱ";
  } else {
    audio.pause();
    playPauseBtn.textContent = "⊳";
  }
});

audio.addEventListener("loadedmetadata", () => {
  durationEl.textContent = formatTime(audio.duration);
  progress.max = audio.duration;
});

audio.addEventListener("timeupdate", () => {
  progress.value = audio.currentTime;
  currentTimeEl.textContent = formatTime(audio.currentTime);
});

progress.addEventListener("input", () => {
  audio.currentTime = progress.value;
});

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60)
    .toString()
    .padStart(2, "0");
  return `${minutes}:${seconds}`;
}

// Lógica de descarga con modal
document.querySelectorAll(".download-link").forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const dropboxUrl = this.getAttribute("data-dropbox");
    if (dropboxUrl) {
      showDownloadModal();
      window.location.href = dropboxUrl;
    }
  });
});

function showDownloadModal() {
  const modal = document.createElement("div");
  modal.id = "confirmModal";
  modal.innerHTML = `
                <div class="confirm-modal-content">
                    <div id="modal-icon" class="spinner"></div>
                    <p id="modal-text">Iniciando descarga...</p>
                </div>
            `;
  document.body.appendChild(modal);

  setTimeout(() => {
    document.getElementById("modal-icon").className = "checkmark";
    document.getElementById("modal-text").textContent = "¡Descarga correcta!";
  }, 2000);

  setTimeout(() => {
    modal.remove();
  }, 3000);
}

function openMenu() {
  const modal = document.getElementById('modal');
  modal.classList.remove('hidden');
  modal.querySelector('.modal-content').classList.add('slide-in');
  modal.querySelector('.modal-content').classList.remove('slide-out');
}

function closeMenu() {
  const modal = document.getElementById('modal');
  const content = modal.querySelector('.modal-content');
  content.classList.remove('slide-in');
  content.classList.add('slide-out');
  setTimeout(() => modal.classList.add('hidden'), 300); // Espera a que termine la animación
}
