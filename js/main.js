const formElement = document.querySelector('form');
const linksContainer = document.querySelector('.links-container');
const urlInput = document.getElementById('url-input');
const shortItBtn = document.getElementById('shorten-it-btn');

shortItBtn.addEventListener('click', function (e) {
  e.preventDefault();
  if (!urlInput.value) {
    urlInput.classList.add('warning');
    formElement.classList.add('warning');
  } else {
    urlInput.classList.remove('warning');
    formElement.classList.remove('warning');

    fetch(`https://api.shrtco.de/v2/shorten?url=${urlInput.value}`)
      .then((result) => result.json())
      .then((data) => {
        let html = `
        <div class="link d-flex align-items-md-center flex-column flex-md-row bg-white py-3 px-4 rounded mb-3 gap-3">
          <span class="original-link pb-3 pb-md-0">${urlInput.value}</span>
          <a class="new-link ms-md-auto fw-bold" href="https://${data.result['short_link']}" target="_blank">${data.result['short_link']}</a>
          <button id="copy-btn" class="btn bg-cyan text-white rounded px-4 py-2">copy</button>
        </div>`;
        linksContainer.insertAdjacentHTML('afterbegin', html);
      });
  }
});

window.addEventListener('click', function (e) {
  if (e.target.id === 'copy-btn') {
    navigator.clipboard.writeText(e.target.previousElementSibling.innerHTML);
  }
});
