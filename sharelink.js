// Helper to read param from the URL
function param(name){ 
  const u = new URL(location.href);
  return u.searchParams.get(name) || '';
}

// Pull values out of the URL
const url   = param('url');
const title = param('title');
const desc  = param('desc');
const img   = param('img');

// TOAST HELPER: shows a floating message inside the modal
function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2000);
}

// Grab the DOM elements we need
const imgEl = document.getElementById('shareImg');
const urlEl = document.getElementById('shareUrl');
const titleOverlay = document.getElementById('shareTitleOverlay');
const descEl = document.getElementById('shareDesc');

// Populate them (guarding against missing elements)
if (urlEl) {
  urlEl.textContent = url;
}
if (titleOverlay) {
  titleOverlay.textContent = title;
}
if (descEl) {
  descEl.textContent = desc;
}

// Debug: print out exactly what URL we set on the <img>
console.log('shareImg.src =', imgEl.src);

//----Build platform URLs---//
// Telegram share dialog
document.getElementById('lnTG').href =
  `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;

// X (formerly Twitter) share intent
document.getElementById('lnX').href =
  `https://twitter.com/intent/tweet` + `?url=${encodeURIComponent(url)}` + `&text=${encodeURIComponent(title)}`;

// TikTok profile (no arbitrary-URL share endpoint)
document.getElementById('lnTT').href =
  'https://www.tiktok.com/@taylorswift';

// Instagram profile (no arbitrary-URL share endpoint)
document.getElementById('lnIG').href =
  'https://www.instagram.com/taylorswift/';

// YouTube channel link (no arbitrary-URL share endpoint)
document.getElementById('lnYT').href =
  'https://www.youtube.com/@taylorswift';

// Facebook share dialog
document.getElementById('lnFB').href =
  `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;


// Copy link button uses toast instead of alert
document.getElementById('lnCopy').addEventListener('click', e => {
  e.preventDefault();
  navigator.clipboard.writeText(url)
    .then(() => showToast('Link copied!'))
    .catch(() => showToast('Copy failed—please copy manually.'));
});

// Embed link button uses toast instead of alert
document.getElementById('lnEmbed').addEventListener('click', e => {
  e.preventDefault();
  const iframe = `<iframe src="${url}" width="600" height="400" frameborder="0"></iframe>`;
  navigator.clipboard.writeText(iframe)
    .then(() => showToast('Embed code copied!'))
    .catch(() => showToast('Copy failed—please copy manually.'));
});