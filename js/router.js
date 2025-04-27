window.onloadRecaptcha = () => {

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
  document.title = 'Horizon Travels - About Us';
  RenderAboutPage();
});
document.querySelector('#gallery-link').addEventListener('click', () => {
  history.pushState({page:'gallery'}, '', '?gallery');
  document.title = 'Horizon Travels - Gallery';
  RenderGalleryPage();
});
document.querySelector('#contact-link').addEventListener('click', () => {
  history.pushState({page:'contact'}, '', '?contact');
  document.title = 'Horizon Travels - Contact';
  RenderContactPage();
});

document.getElementById('theme-toggle').addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  
  // Change theme toggle icon
  const icon = document.querySelector('#theme-toggle i');
  if (document.body.classList.contains('dark-mode')) {
    icon.className = 'fas fa-sun';
  } else {
    icon.className = 'fas fa-moon';
  }
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
    <section class="about-section">
      <h1 class="title">Welcome to Horizon Travels</h1>
      <p class="subtitle">Your Gateway to Memorable Adventures</p>
      
      <div class="about-text">
        <p>Founded in 2010, Horizon Travels has been helping adventurers discover the world's most breathtaking destinations. Our mission is to create unforgettable travel experiences that combine adventure, culture, and relaxation tailored to your preferences.</p>
        <p>With a team of experienced travel experts who have explored the corners of the globe, we curate journeys that go beyond the typical tourist routes. Whether you're looking for a serene beach getaway, an adventurous trek through mountains, or a cultural immersion in historic cities, we've got the perfect itinerary for you.</p>
      </div>
      
      <div class="about-grid">
        <div class="feature-card">
          <h3><i class="fas fa-route"></i> Expertly Crafted Itineraries</h3>
          <p>Our travel specialists create personalized journeys based on your interests, time frame, and budget. Every detail is meticulously planned to ensure a smooth and enjoyable experience.</p>
          <h4>Popular Destinations:</h4>
          <div class="destinations">
            <span class="destination-tag">Bali</span>
            <span class="destination-tag">Santorini</span>
            <span class="destination-tag">Kyoto</span>
            <span class="destination-tag">Machu Picchu</span>
            <span class="destination-tag">Serengeti</span>
          </div>
        </div>
        
        <div class="feature-card">
          <h3><i class="fas fa-hands-helping"></i> 24/7 Support</h3>
          <p>Travel with peace of mind knowing our dedicated support team is available round-the-clock. From last-minute changes to unexpected situations, we're always here to help you.</p>
          <h4>Our Services Include:</h4>
          <ul>
            <li>Flight assistance and rebooking</li>
            <li>Local emergency contacts</li>
            <li>Multilingual support staff</li>
            <li>Digital travel documents</li>
          </ul>
        </div>
        
        <div class="feature-card">
          <h3><i class="fas fa-user-friends"></i> Small Group Adventures</h3>
          <p>Join like-minded travelers on our signature small group tours. With a maximum of 12 participants, you'll enjoy personalized attention from our guides while making lasting friendships.</p>
          <h4>Upcoming Group Tours:</h4>
          <ul>
            <li>Japanese Cherry Blossom Tour - Spring 2025</li>
            <li>Tuscan Culinary Experience - Summer 2025</li>
            <li>Northern Lights Expedition - Winter 2025</li>
          </ul>
        </div>
        
        <div class="feature-card">
          <h3><i class="fas fa-leaf"></i> Sustainable Travel</h3>
          <p>We're committed to responsible tourism that respects local communities and environments. Our partnerships with eco-friendly accommodations and conservation projects ensure your travels have a positive impact.</p>
          <h4>Our Sustainability Initiatives:</h4>
          <ul>
            <li>Carbon offset programs for all tours</li>
            <li>Support for local conservation efforts</li>
            <li>Plastic-free travel kits</li>
            <li>Community-based tourism projects</li>
          </ul>
        </div>
      </div>
    </section>
  `;
}

function RenderGalleryPage() {
  document.querySelector('main').innerHTML = `
    <section class="gallery-header">
      <h1 class="title">Our Gallery</h1>
      <p>Scroll down to discover our destinations, experiences, and travel moments</p>
      <p class="lazy-load-notice"><i class="fas fa-info-circle"></i> Images load progressively as you scroll - keep scrolling to see more!</p>
    </section>
    
    <h2 class="gallery-category">Spectacular Destinations and Our Team</h2>
    <div class="gallery-grid" id="destinations-gallery"></div>
    
  `;
  
  // Create arrays for all our images
  const destinationImages = [
    { src: './images/image-1.jpg', alt: 'Tropical beach paradise in Bali' },
    { src: './images/image-2.jpg', alt: 'Ancient ruins of Machu Picchu at sunrise' },
    { src: './images/image-3.jpg', alt: 'Cherry blossoms in Kyoto, Japan' },
    { src: './images/image-4.jpg', alt: 'Santorini white houses with blue domes' },
    { src: './images/image-5.jpg', alt: 'Northern Lights over Iceland' },
    { src: './images/image-6.jpg', alt: 'Serengeti National Park wildlife' },
    { src: './images/image-7.jpg', alt: 'Amalfi Coast cliffside villages' },
    { src: './images/image-8.jpg', alt: 'Great Barrier Reef coral formations' },
    { src: './images/image-9.jpg', alt: 'Snow-capped peaks of the Swiss Alps' }
  ];
  

  // Add images to all galleries
  addImagesToGallery(destinationImages, document.getElementById('destinations-gallery'));

  // Initialize lazy loading after all placeholders are created
  initLazyLoading();
  
  // Add some extra content at the bottom
  const main = document.querySelector('main');
  const extraContent = document.createElement('div');
  extraContent.className = 'gallery-footer';
  extraContent.innerHTML = `
    <h3>Share Your Adventures</h3>
    <p>Tag us on social media with #HorizonTravels for a chance to be featured in our gallery!</p>
    <div class="back-to-top">
      <button id="back-to-top-btn" onclick="window.scrollTo({top: 0, behavior: 'smooth'})">
        <i class="fas fa-arrow-up"></i> Back to Top
      </button>
    </div>
  `;
  main.appendChild(extraContent);
}

function addImagesToGallery(imageArray, galleryElement) {
  imageArray.forEach((image, idx) => {
    const imgContainer = document.createElement('div');
    imgContainer.classList.add('img-container');
    
    // Create a placeholder div
    const placeholder = document.createElement('div');
    placeholder.classList.add('image-placeholder');
    
    // Create the image element but set only the data-src attribute
    const img = document.createElement('img');
    img.dataset.src = image.src; // Store the real image URL here
    img.alt = image.alt;
    img.classList.add('lazy');
    
    // Add click event to open modal when image is loaded and clicked
    img.addEventListener('click', () => {
      if (img.src) { // Only open modal if image has been loaded
        openModal(img.src, image.alt);
      }
    });
    
    // Append elements to the container
    imgContainer.appendChild(placeholder);
    imgContainer.appendChild(img);
    galleryElement.appendChild(imgContainer);
  });
}

function initLazyLoading() {
  const lazyImages = document.querySelectorAll('img.lazy');
  
  // Create IntersectionObserver with larger rootMargin for better lazy load demonstration
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        
        // Add a random delay to each image to better demonstrate lazy loading
        const delay = Math.random() * 1500 + 500; // Between 500ms and 2000ms
        
        setTimeout(() => {
          loadImage(img).then(() => {
            // Add loaded class for fade-in effect
            img.classList.add('loaded');
            
            // Hide the placeholder
            const placeholder = img.previousElementSibling;
            if (placeholder && placeholder.classList.contains('image-placeholder')) {
              placeholder.classList.add('hidden');
            }
          });
        }, delay);
        
        // Stop observing this image
        observer.unobserve(img);
      }
    });
  }, {
    root: null, // Use viewport
    rootMargin: '50px 0px', // Start loading when image is 50px from entering viewport
    threshold: 0.1 // Trigger when at least 10% of the image is visible
  });
  
  // Start observing all lazy images
  lazyImages.forEach(img => {
    observer.observe(img);
  });
  
  console.log(`🔍 Observing ${lazyImages.length} images for lazy loading`);
}

async function loadImage(imgEl) {
  return new Promise((resolve, reject) => {
    try {
      const src = imgEl.dataset.src;
      console.log('➡️ Loading image:', src);
      
      // Create a new image object to preload
      const tempImg = new Image();
      
      // Set handlers
      tempImg.onload = () => {
        imgEl.src = src;
        imgEl.removeAttribute('data-src');
        resolve();
      };
      
      tempImg.onerror = (e) => {
        console.error('Image load error:', e);
        imgEl.classList.add('image-error');
        reject(e);
      };
      
      // Start loading the image
      tempImg.src = src;
    } catch (e) {
      console.error('Image load error:', e);
      reject(e);
    }
  });
}

// MODAL
const modal = document.getElementById('modal'),
      modalImg = document.getElementById('modal-img'),
      modalClose = document.getElementById('modal-close');

function openModal(src, alt) {
  modalImg.src = src;
  modalImg.alt = alt || 'Gallery image';
  modal.classList.remove('hidden');
}

modalClose.addEventListener('click', () => modal.classList.add('hidden'));
modal.addEventListener('click', e => {
  if (e.target === modal) modal.classList.add('hidden');
});

// Keyboard navigation for modal
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    modal.classList.add('hidden');
  }
});

// CONTACT PAGE + reCAPTCHA
function RenderContactPage() {
  document.querySelector('main').innerHTML = `
    <div class="contact-container">
      <h1 class="title">Contact Us</h1>
      <div class="contact-info">
        <p>Ready to plan your next adventure? Get in touch with our travel experts who will help create your perfect itinerary.</p>
      </div>
      
      <form id="contact-form" novalidate>
        <label for="name">Your Name:</label>
        <input type="text" id="name" name="name" placeholder="John Doe" required>
        <div id="error-name" class="error"></div>

        <label for="email">Your Email:</label>
        <input type="email" id="email" name="email" placeholder="john@example.com" required>
        <div id="error-email" class="error"></div>

        <label for="message">How Can We Help You?</label>
        <textarea id="message" name="message" rows="5" placeholder="Tell us about your travel plans, questions, or special requests..." required></textarea>
        <div id="error-message" class="error"></div>

        <div id="recaptcha-container"></div>
        <div id="error-recaptcha" class="error"></div>

        <button type="submit" id="submit-btn">Send Message</button>
      </form>
    </div>
  `;

  // Render reCAPTCHA widget
  if (typeof grecaptcha !== 'undefined') {
    grecaptcha.render('recaptcha-container', {
      sitekey: '6LdrgiYrAAAAAI5lIMzzhgeiJUbDuxTSFGYYyKhD'
    });
  }

  // Form validation
  const form = document.getElementById('contact-form');
  form.addEventListener('submit', e => {
    e.preventDefault();
    clearErrors();
    let valid = true;

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const msg = form.message.value.trim();

    if (name.length < 2) {
      showError('error-name', 'Please enter at least 2 characters.'); 
      valid = false;
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showError('error-email', 'Please enter a valid email address.'); 
      valid = false;
    }
    
    if (msg.length < 10) {
      showError('error-message', 'Please enter at least 10 characters.'); 
      valid = false;
    }
    
    if (typeof grecaptcha !== 'undefined' && grecaptcha.getResponse().length === 0) {
      showError('error-recaptcha', 'Please verify that you are not a robot.'); 
      valid = false;
    }

    if (!valid) return;
    
    // Show success message
    form.innerHTML = `
      <div class="success-message">
        <i class="fas fa-check-circle" style="font-size: 3rem; color: var(--secondary-color); margin-bottom: 1rem;"></i>
        <h3>Thank You!</h3>
        <p>Your message has been sent successfully. One of our travel specialists will contact you shortly.</p>
      </div>
    `;
  });

  function showError(id, text) {
    document.getElementById(id).textContent = text;
  }
  
  function clearErrors() {
    form.querySelectorAll('.error').forEach(el => el.textContent = '');
  }
}