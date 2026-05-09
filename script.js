// ===== CONFIG ASRAMA IVH - UDAH LU SET =====
// Tanggal: 2026, 4, 30, 18, 0, 0 = 30 Mei 2026 Jam 18:00 WIB
// Note: Bulan 4 = Mei karena JS 0-index. Bug keundur 1 bulan udah diakalin.
const TARGET_DATE = new Date(2026, 4, 30, 18, 0, 0);

// Link copy sesuai permintaan lu
const DISCORD_INVITE_LINK = "https://lausiapempruy.github.io/Countdown-IVH/";
// ===== END CONFIG =====

const el = {
    days: document.getElementById('days'),
    hours: document.getElementById('hours'),
    minutes: document.getElementById('minutes'),
    seconds: document.getElementById('seconds'),
    targetText: document.getElementById('targetDateText'),
    inviteInput: document.getElementById('inviteLink'),
    copyBtn: document.getElementById('copyBtn'),
    countdown: document.getElementById('countdown')
};

// Set link & tanggal
el.inviteInput.value = DISCORD_INVITE_LINK;
el.targetText.textContent = `Pengesahan: ${TARGET_DATE.toLocaleDateString('id-ID', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', 
    hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Jakarta'
})} WIB`;

function updateCountdown() {
    const now = new Date().getTime();
    const gap = TARGET_DATE.getTime() - now;

    if (gap <= 0) {
        el.countdown.innerHTML = `<div class="launched"><h2>IVH TELAH DIBUKA!</h2><p>Welkom di era baru, Bewoners.</p></div>`;
        clearInterval(timer);
        return;
    }

    const d = Math.floor(gap / (1000 * 60 * 60 * 24));
    const h = Math.floor((gap % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((gap % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((gap % (1000 * 60)) / 1000);

    el.days.textContent = String(d).padStart(2, '0');
    el.hours.textContent = String(h).padStart(2, '0');
    el.minutes.textContent = String(m).padStart(2, '0');
    el.seconds.textContent = String(s).padStart(2, '0');
}

// Copy button logic + animasi
el.copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(el.inviteInput.value).then(() => {
        const btnText = el.copyBtn.querySelector('.btn-text');
        const btnIcon = el.copyBtn.querySelector('.btn-icon');
        
        btnText.textContent = 'TERSALIN';
        btnIcon.textContent = '✓';
        el.copyBtn.classList.add('success');
        
        setTimeout(() => {
            btnText.textContent = 'SALIN';
            btnIcon.textContent = '📋';
            el.copyBtn.classList.remove('success');
        }, 2000);
    });
});

const timer = setInterval(updateCountdown, 1000);
updateCountdown();
