// ============================================================
//  PINNACLE REALTY GROUP — realty.js
// ============================================================


// ---- EMAILJS INIT ----
emailjs.init('h0ekK-33aRgPNd1SX');


// ---- NAV SCROLL ----
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});


// ---- HAMBURGER MENU ----
const hamburger   = document.getElementById('hamburger');
const mobileMenu  = document.getElementById('mobileMenu');
const menuOverlay = document.getElementById('menuOverlay');

hamburger.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  document.body.classList.toggle('menu-open', isOpen);
  menuOverlay.classList.toggle('open', isOpen);
});

document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    document.body.classList.remove('menu-open');
    menuOverlay.classList.remove('open');
  });
});


// ---- PROPERTY FILTER ----
// Same pattern as Maison Folake's service filter —
// toggles .hidden on cards that don't match the selected category
const filterBtns     = document.querySelectorAll('.filter-btn');
const propertyCards  = document.querySelectorAll('.property-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.dataset.filter;

    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    propertyCards.forEach(card => {
      const category = card.dataset.category;
      card.classList.toggle('hidden', filter !== 'all' && category !== filter);
    });
  });
});


// ---- CONTACT FORM (EmailJS) ----
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const btn = contactForm.querySelector('.btn-bronze');
  btn.textContent = 'Sending…';
  btn.disabled = true;

  const formData = {
    site_name:     'Pinnacle Realty Group',
    client_name:   document.getElementById('cname').value,
    client_contact:`${document.getElementById('cemail').value} / ${document.getElementById('cphone').value}`,
    service:       document.getElementById('cinterest').value,
    date:          'N/A',
    time:          'N/A',
    guests:        'N/A',
    notes:         document.getElementById('cmessage').value || 'None',
  };

  emailjs.send('service_wd8x0u4', 'template_akoauns', formData)
    .then(() => {
      formSuccess.classList.add('show');
      btn.textContent = '✓ Enquiry Sent';
      btn.style.background = '#2a6a2a';
      contactForm.querySelectorAll('input, select, textarea').forEach(el => el.value = '');
    })
    .catch((error) => {
      formSuccess.textContent = '✗ Something went wrong. Please call or WhatsApp us directly.';
      formSuccess.style.borderColor = '#c0392b';
      formSuccess.style.color = '#c0392b';
      formSuccess.classList.add('show');
      btn.textContent = 'Try Again';
      btn.disabled = false;
      console.error('EmailJS error:', error);
    });
});


// ---- WHATSAPP BUTTON ----

const whatsappBtn = document.getElementById('whatsappBtn');

whatsappBtn.addEventListener('click', () => {
  const message =
`Hello Pinnacle Realty Group! I'd like to enquire about a property.

Name: ${document.getElementById('cname').value || 'Not provided'}
Email: ${document.getElementById('cemail').value || 'Not provided'}
Phone: ${document.getElementById('cphone').value || 'Not provided'}
Interest: ${document.getElementById('cinterest').value || 'General Enquiry'}
Message: ${document.getElementById('cmessage').value || 'None'}

Please get back to me. Thank you!`;

  const url = `https://wa.me/2349168671007?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
});


// ---- SCROLL FADE-IN ---- //

const fadeTargets = document.querySelectorAll(
  '.stat, .property-card, .service-row, .why-card, ' +
  '.testimonial-card, .contact-text, .contact-form, .footer-col'
);

fadeTargets.forEach(el => el.classList.add('fade-in'));

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

fadeTargets.forEach(el => fadeObserver.observe(el));


// ---- ACTIVE NAV HIGHLIGHT ----
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${entry.target.id}`) {
          link.style.color = 'var(--bronze)';
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));


// ---- LIGHTBOX ---- //

const lightbox     = document.getElementById('lightbox');
const lightboxImg  = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');

// Collect all images you want to be clickable
// Add class="lightbox-img" to any <img> tag you want to trigger the lightbox
const lightboxImages = document.querySelectorAll('.lightbox-img');
let currentIndex = 0;

function openLightbox(index) {
  currentIndex = index;
  const img = lightboxImages[currentIndex];
  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt;
  lightbox.classList.add('open');
  document.body.classList.add('menu-open'); // reuse scroll lock

  // Show/hide arrows
  lightboxPrev.classList.toggle('hidden', currentIndex === 0);
  lightboxNext.classList.toggle('hidden', currentIndex === lightboxImages.length - 1);
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.classList.remove('menu-open');
}

// Attach click to each image
lightboxImages.forEach((img, index) => {
  img.style.cursor = 'pointer';
  img.addEventListener('click', () => openLightbox(index));
});

// Close on X button or clicking the dark overlay
lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

// Arrow navigation
lightboxPrev.addEventListener('click', (e) => {
  e.stopPropagation(); // prevent overlay click from closing
  if (currentIndex > 0) openLightbox(currentIndex - 1);
});
lightboxNext.addEventListener('click', (e) => {
  e.stopPropagation();
  if (currentIndex < lightboxImages.length - 1) openLightbox(currentIndex + 1);
});

// Close on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft'  && currentIndex > 0) openLightbox(currentIndex - 1);
  if (e.key === 'ArrowRight' && currentIndex < lightboxImages.length - 1) openLightbox(currentIndex + 1);
});