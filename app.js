//----Sharelink window----//
function openSharePopup(url) {
// Grab parent window’s screen position...
  const winLeft = window.screenLeft ?? window.screenX;
  const winTop  = window.screenTop  ?? window.screenY;

  // Grab parent window’s viewport size...
  const winW = window.innerWidth 
             || document.documentElement.clientWidth 
             || screen.width;
  const winH = window.innerHeight 
             || document.documentElement.clientHeight 
             || screen.height;

  // Compute popup dimensions:
  //    - use up to 90% of the viewport,
  //    - but never exceed 400px wide / 600px tall
  const maxW   = 400;
  const maxH   = 600;
  const popupW = Math.min(maxW, Math.floor(winW * 0.9));
  const popupH = Math.min(maxH, Math.floor(winH * 0.9));

  // Center the popup over the parent window
  const left = Math.round(winLeft + (winW  - popupW) / 2);
  const top  = Math.round(winTop  + (winH  - popupH) / 2);

  // Build the feature string & open it
  const features = [
    `width=${popupW}`,
    `height=${popupH}`,
    `left=${left}`,
    `top=${top}`,
    'menubar=no',
    'toolbar=no',
    'resizable=yes',
    'scrollbars=yes'
  ].join(',');

  const win = window.open(url, 'shareWindow', features);
  if (win && win.focus) win.focus();
}


//----wiring up the click----//
document.addEventListener('DOMContentLoaded', () => {
    // Select ALL share buttons by class
  document.querySelectorAll('.share-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();

      //gathering meta data
      const url   = window.location.origin + '/index.html';
      const title = document.title;
      const desc = 
        document.querySelector('meta[name="description"]')?.content
        || document.querySelector('meta[property="og:description"]')?.content
        || '';
      const img   = document.querySelector('meta[property="og:image"]')?.content
                  || '';

      // If you passed a custom data-label, you can read it:
      const label = btn.dataset.label || '';

      // Build the sharelink.html URL with query params
      let shareUrl = 'sharelink.html'
        + '?url='   + encodeURIComponent(url)
        + '&title=' + encodeURIComponent(title)
        + '&desc='  + encodeURIComponent(desc)
    
      if (img) {
        shareUrl += '&img=' + encodeURIComponent(img);
      }

      // Call your existing popup helper
      openSharePopup(shareUrl);
    });
  });
});