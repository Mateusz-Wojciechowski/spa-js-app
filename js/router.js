// Mapowanie stanów na URL-e
const pageUrls = {
    about: '/index.html?about',
    contact: '/index.html?contact'
  };
  
  function OnStartUp() {
    popStateHandler();
  }
  OnStartUp();
  
  // Obsługa kliknięć w linki
  document.querySelector('#about-link').addEventListener('click', () => {
    const stateObj = { page: 'about' };
    document.title = 'About';
    history.pushState(stateObj, "about", "?about");
    RenderAboutPage();
  });
  
  document.querySelector('#contact-link').addEventListener('click', () => {
    const stateObj = { page: 'contact' };
    document.title = 'Contact';
    history.pushState(stateObj, "contact", "?contact");
    RenderContactPage();
  });
  
  // Przełącznik motywu
  document.getElementById('theme-toggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
  });
  
  // Renderowanie podstrony "About"
  function RenderAboutPage() {
    document.querySelector('main').innerHTML = `
      <h1 class="title">About Me</h1>
      <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry...</p>
    `;
  }
  
  // Renderowanie podstrony "Contact" z formularzem
  function RenderContactPage() {
    document.querySelector('main').innerHTML = `
      <h1 class="title">Contact with me</h1>
      <form id="contact-form">
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" required>
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required>
        <label for="message">Message:</label>
        <textarea id="message" name="message" required></textarea>
        <button type="submit">Send</button>
      </form>
    `;
  
    document.getElementById('contact-form').addEventListener('submit', (event) => {
      event.preventDefault();
      alert('Form submitted!');
    });
  }
  
  // Obsługa nawigacji wstecz/dalej
  function popStateHandler() {
    const loc = window.location.href.toString().split(window.location.host)[1];
    if (loc === pageUrls.contact) {
      RenderContactPage();
    } else if (loc === pageUrls.about) {
      RenderAboutPage();
    }
  }
  window.onpopstate = popStateHandler;
  