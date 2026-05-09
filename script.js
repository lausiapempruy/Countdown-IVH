// ===== KONFIGURASI IVH 1924 =====
// Tanggal: 30 Mei 2026, 18:00 WIB
// Catatan: Bulan 4 = Mei (JS month 0-index)
const TARGET_DATE = new Date(2026, 4, 30, 18, 0, 0);

// Link arsip yang disalin
const ARSIP_LINK = "https://lausiapempruy.github.io/Countdown-IVH/";
// ===== SELESAI KONFIG =====

const el = {
    days: document.getElementById('days'),
    hours: document.getElementById('hours'),
    minutes: document.getElementById('minutes'),
    seconds: document.getElementById('seconds'),
    targetText: document.getElementById('targetDateText'),
    arsipInput: document.getElementById('arsipLink'),
    stempelBtn: document.getElementById('stempelBtn'),
    countdown: document.getElementById('countdown')
};

el.arsipInput.value = ARSIP_LINK;
el.targetText.textContent = `Hari Pengesahan: ${TARGET_DATE.toLocaleString('id-ID', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', 
    hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Jakarta'
})} WIB`;

function updateWaktu() {
    const sekarang = new Date().getTime();
    const selisih = TARGET_DATE.getTime() - sekarang;

    if (selisih <= 0) {
        el.countdown.innerHTML = `
            <div style="text-align:center; width:100%; padding: 20px 0;">
                <h2 style="font-family:'Special Elite',cursive; color:var(--lilin); font-size:1.8rem;">MAKLUMAT TELAH DIBACAKAN</h2>
                <p style="font-size:1.1rem; margin-top:10px;">Selamat datang di era Instituut voor Huisdeken.</p>
            </div>
        `;
        clearInterval(intervalWaktu);
        return;
    }

    const hari = Math.floor(selisih / 86400000);
    const jam = Math.floor((selisih % 86400000) / 3600000);
    const menit = Math.floor((selisih % 3600000) / 60000);
    const detik = Math.floor((selisih % 60000) / 1000);

    el.days.textContent = String(hari).padStart(2, '0');
    el.hours.textContent = String(jam).padStart(2, '0');
    el.minutes.textContent = String(menit).padStart(2, '0');
    el.seconds.textContent = String(detik).padStart(2, '0');
}

el.stempelBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(ARSIP_LINK).then(() => {
        el.stempelBtn.textContent = 'TERSTEMPEL!';
        el.stempelBtn.classList.add('stamped');
        setTimeout(() => {
            el.stempelBtn.textContent = 'STEMPEL';
            el.stempelBtn.classList.remove('stamped');
        }, 2500);
    }).catch(err => {
        el.stempelBtn.textContent = 'GAGAL';
    });
});

// Efek ketik saat load
window.addEventListener('load', () => {
    document.querySelector('.isi h2').style.width = '100%';
});

const intervalWaktu = setInterval(updateWaktu, 1000);
updateWaktu();
