// — GLOBAL CALLBACK dla reCAPTCHA —
window.onloadRecaptcha = () => {
  // pusty – widget renderujemy manualnie w RenderContactPage
};

// — SPA ROUTER —
const pageUrls = {
  about:   '/index.html?about',
  gallery: '/index.html?gallery',
  contact: '/index.html?contact'
};

function OnStartUp() {
  popStateHandler();
}
OnStartUp();

document.querySelector('#about-link').addEventListener('click', () => {
  history.pushState({page:'about'}, '', '?about');
  document.title = 'About';
  RenderAboutPage();
});
document.querySelector('#gallery-link').addEventListener('click', () => {
  history.pushState({page:'gallery'}, '', '?gallery');
  document.title = 'Gallery';
  RenderGalleryPage();
});
document.querySelector('#contact-link').addEventListener('click', () => {
  history.pushState({page:'contact'}, '', '?contact');
  document.title = 'Contact';
  RenderContactPage();
});

document.getElementById('theme-toggle').addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

window.onpopstate = popStateHandler;
function popStateHandler() {
  const q = window.location.search;
  if (q === '?gallery')    return RenderGalleryPage();
  if (q === '?contact')    return RenderContactPage();
  /* domyślnie */          RenderAboutPage();
}

// — RENDER FUNCTIONS —

function RenderAboutPage() {
  document.querySelector('main').innerHTML = `
    <h1 class="title">About Me</h1>
    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry...</p>
  `;
}

function RenderGalleryPage() {
  document.querySelector('main').innerHTML = `
    <div class="gallery-grid" id="gallery"></div>
  `;
  const gallery   = document.getElementById('gallery');
  const imageUrls = Array.from({length:9}, (_,i) =>
    `https://picsum.photos/seed/${i+1}/600`
  );

  // OBSERVER: threshold 1.0 → load only, gdy 100% obrazka jest w widoku
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        loadImage(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: '0px',
    threshold: 1.0
  });

  imageUrls.forEach((url,idx) => {
    const img = document.createElement('img');
    img.dataset.src = url;
    img.alt         = `Gallery ${idx+1}`;
    img.classList.add('lazy');
    img.addEventListener('click', () => openModal(img.src));
    gallery.appendChild(img);
    observer.observe(img);
  });
}

async function loadImage(imgEl) {
  try {
    console.log('➡️ fetch', imgEl.dataset.src);
    const res  = await fetch(imgEl.dataset.src);
    const blob = await res.blob();
    imgEl.onload = () => imgEl.classList.add('loaded');
    imgEl.src    = URL.createObjectURL(blob);
  } catch (e) {
    console.error('Image load error', e);
  }
}

// MODAL
const modal      = document.getElementById('modal'),
      modalImg   = document.getElementById('modal-img'),
      modalClose = document.getElementById('modal-close');

function openModal(src) {
  modalImg.src = src;
  modal.classList.remove('hidden');
}
modalClose.addEventListener('click',   () => modal.classList.add('hidden'));
modal.addEventListener('click', e => {
  if (e.target === modal) modal.classList.add('hidden');
});

// CONTACT PAGE + reCAPTCHA
function RenderContactPage() {
  document.querySelector('main').innerHTML = `
    <h1 class="title">Contact with me</h1>
    <form id="contact-form" novalidate>
      <label for="name">Name:</label>
      <input type="text" id="name" name="name" required>
      <div id="error-name" class="error"></div>

      <label for="email">Email:</label>
      <input type="email" id="email" name="email" required>
      <div id="error-email" class="error"></div>

      <label for="message">Message:</label>
      <textarea id="message" name="message" required></textarea>
      <div id="error-message" class="error"></div>

      <div id="recaptcha-container"></div>

      <button type="submit" id="submit-btn">Send</button>
    </form>
  `;

  // ręczne wyrenderowanie widgetu
  if (typeof grecaptcha !== 'undefined') {
    grecaptcha.render('recaptcha-container', {
      sitekey: '6LfrryUrAAAAACXpIrbhwlHy45KJ-vx8nY03C451'
    });
  }

  // WALIDACJA
  const form = document.getElementById('contact-form');
  form.addEventListener('submit', e => {
    e.preventDefault();
    clearErrors();
    let valid = true;

    const name  = form.name.value.trim();
    const email = form.email.value.trim();
    const msg   = form.message.value.trim();

    if (name.length < 2) {
      showError('error-name','Podaj co najmniej 2 znaki.'); valid = false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showError('error-email','Nieprawidłowy adres e-mail.'); valid = false;
    }
    if (msg.length < 10) {
      showError('error-message','Wiadomość powinna mieć co najmniej 10 znaków.'); valid = false;
    }
    if (typeof grecaptcha !== 'undefined' && grecaptcha.getResponse().length===0) {
      showError('error-recaptcha','Potwierdź CAPTCHA.'); valid = false;
    }

    if (!valid) return;
    alert('Formularz wysłany!');
    form.reset();
    grecaptcha && grecaptcha.reset();
  });

  function showError(id, text) {
    document.getElementById(id).textContent = text;
  }
  function clearErrors() {
    form.querySelectorAll('.error').forEach(el => el.textContent = '');
  }
}
