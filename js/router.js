window.onloadRecaptcha = () => {
  // Widget renderujemy manualnie w RenderContactPage
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
      <p>A glimpse into the adventures that await you with Horizon Travels</p>
    </section>
    
    <h2 class="gallery-category">Popular Destinations</h2>
    <div class="gallery-grid" id="destinations-gallery"></div>
    
    <h2 class="gallery-category">Our Team and Recent Trips</h2>
    <div class="gallery-grid" id="team-gallery"></div>
  `;
  
  // Populate destination gallery
  const destinationsGallery = document.getElementById('destinations-gallery');
  const destinationImages = [
    { src: './images/image-1.jpg', alt: 'Tropical beach paradise in Bali' },
    { src: './images/image-2.jpg', alt: 'Ancient ruins in Machu Picchu' },
    { src: './images/image-3.jpg', alt: 'Colorful markets in Marrakech' },
    { src: './images/image-4.jpg', alt: 'Cherry blossoms in Kyoto' }
  ];
  
  // Populate team gallery
  const teamGallery = document.getElementById('team-gallery');
  const teamImages = [
    { src: './images/image-5.jpg', alt: 'Our team exploring Santorini' },
    { src: './images/image-6.jpg', alt: 'Team building retreat in the Alps' },
    { src: './images/image-7.jpg', alt: 'Local guide with tourists in Bangkok' },
    { src: './images/image-8.jpg', alt: 'Safari adventure in Kenya' },
    { src: './images/image-9.jpg', alt: 'Hiking expedition in Patagonia' }
  ];

  // Add images to both galleries
  addImagesToGallery(destinationImages, destinationsGallery);
  addImagesToGallery(teamImages, teamGallery);
  
  // Initialize lazy loading after all placeholders are created
  initLazyLoading();
}

function addImagesToGallery(imageArray, galleryElement) {
  imageArray.forEach((image, idx) => {
    const imgContainer = document.createElement('div');
    imgContainer.classList.add('img-container');
    
    const img = document.createElement('img');
    img.dataset.src = image.src;
    img.alt = image.alt;
    img.classList.add('lazy');
    
    // Add click event to open modal when image is clicked
    img.addEventListener('click', () => openModal(img.src, image.alt));
    
    imgContainer.appendChild(img);
    galleryElement.appendChild(imgContainer);
  });
}

function initLazyLoading() {
  const lazyImages = document.querySelectorAll('img.lazy');
  
  // Create IntersectionObserver with appropriate threshold
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      // Load image when it's visible in the viewport (or getting close)
      if (entry.isIntersecting) {
        const img = entry.target;
        
        // Start loading the image
        loadImage(img).then(() => {
          // Add loaded class to trigger fade-in effect
          img.classList.add('loaded');
        });
        
        // Stop observing this image once it's loaded
        observer.unobserve(img);
      }
    });
  }, {
    root: null, // Use viewport as root
    rootMargin: '50px 0px', // Slightly extend the detection area
    threshold: 0.1 // Trigger when at least 10% of the image is visible
  });
  
  // Start observing all lazy images
  lazyImages.forEach(img => {
    observer.observe(img);
  });
}

async function loadImage(imgEl) {
  return new Promise((resolve, reject) => {
    try {
      const src = imgEl.dataset.src;
      console.log('➡️ Loading image:', src);
      
      // Create a new image object to preload the image
      const tempImg = new Image();
      
      // Set up load and error handlers
      tempImg.onload = () => {
        imgEl.src = src;
        imgEl.removeAttribute('data-src'); // Clean up data attribute
        resolve();
      };
      
      tempImg.onerror = (e) => {
        console.error('Image load error:', e);
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
      sitekey: '6LfrryUrAAAAACXpIrbhwlHy45KJ-vx8nY03C451'
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