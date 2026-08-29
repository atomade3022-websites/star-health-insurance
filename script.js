/* ==========================================================================
   Star Health Insurance - Tom K Varghese Portfolio Script
   Interactive Logic, Plan Matcher, Lightbox & Contact Handlers
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ------------------------------------------------------------------------
     1. Mobile Menu Toggle
     ------------------------------------------------------------------------ */
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navMenu = document.getElementById('navMenu');

  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const icon = mobileMenuBtn.querySelector('i');
      if (navMenu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-xmark');
      } else {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
      }
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = mobileMenuBtn.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      });
    });
  }

  /* ------------------------------------------------------------------------
     2. Smooth Scroll & Active Nav Highlights
     ------------------------------------------------------------------------ */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  /* ------------------------------------------------------------------------
     3. Animated Stat Counters
     ------------------------------------------------------------------------ */
  const counters = document.querySelectorAll('.counter');
  let animated = false;

  const startCounters = () => {
    const statsBanner = document.querySelector('.stats-banner');
    if (!statsBanner) return;

    const bannerPos = statsBanner.getBoundingClientRect().top;
    const screenPos = window.innerHeight / 1.2;

    if (bannerPos < screenPos && !animated) {
      animated = true;
      counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const count = 0;
        const speed = 2000 / target;

        const updateCount = () => {
          const currentNum = +counter.innerText;
          const inc = Math.ceil(target / 40);

          if (currentNum < target) {
            counter.innerText = Math.min(currentNum + inc, target);
            setTimeout(updateCount, 40);
          } else {
            counter.innerText = target;
          }
        };

        updateCount();
      });
    }
  };

  window.addEventListener('scroll', startCounters);
  startCounters(); // check on load

  /* ------------------------------------------------------------------------
     4. Health Plan Category Filter Tabs
     ------------------------------------------------------------------------ */
  const filterTabs = document.querySelectorAll('.filter-tab');
  const planCards = document.querySelectorAll('.plan-card');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');

      planCards.forEach(card => {
        if (filter === 'all') {
          card.style.display = 'flex';
        } else {
          const cat = card.getAttribute('data-category');
          if (cat === filter) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        }
      });
    });
  });

  /* ------------------------------------------------------------------------
     5. Interactive Policy Matcher & Calculator Tool
     ------------------------------------------------------------------------ */
  const ageInput = document.getElementById('ageInput');
  const ageVal = document.getElementById('ageVal');
  const sumInput = document.getElementById('sumInput');
  const sumVal = document.getElementById('sumVal');
  const membersSelect = document.getElementById('membersSelect');
  
  const recommendedPlan = document.getElementById('recommendedPlan');
  const estPremium = document.getElementById('estPremium');
  const calcConsultBtn = document.getElementById('calcConsultBtn');

  function updateCalculator() {
    if (!ageInput || !sumInput || !membersSelect) return;

    const age = parseInt(ageInput.value, 10);
    const sum = parseInt(sumInput.value, 10);
    const memberType = membersSelect.value;

    ageVal.textContent = `${age} Years`;
    sumVal.textContent = `₹ ${sum} Lakhs`;

    let matchedPlanName = 'Star Comprehensive Insurance';
    let baseDailyCost = 28;

    // Logic for Plan Recommendation
    if (age >= 60 || memberType === 'senior') {
      matchedPlanName = 'Senior Citizens Red Carpet Policy';
      baseDailyCost = 48 + Math.round((age - 60) * 1.5);
    } else if (age < 35 && (memberType === '1' || memberType === '2')) {
      matchedPlanName = 'Young Star Insurance Policy';
      baseDailyCost = 19 + Math.round(sum * 0.8);
    } else if (memberType === '4' || memberType === '3') {
      matchedPlanName = 'Family Health Optima Policy';
      baseDailyCost = 32 + Math.round(sum * 1.2);
    } else {
      matchedPlanName = 'Star Comprehensive Insurance Policy';
      baseDailyCost = 35 + Math.round(sum * 1.1);
    }

    const calculatedDaily = Math.round(baseDailyCost * (sum / 10));

    recommendedPlan.textContent = matchedPlanName;
    estPremium.textContent = `Estimated Investment: ~ ₹ ${calculatedDaily} / day (₹ ${calculatedDaily * 30} / month)`;

    // Update WhatsApp CTA link with parameters
    const whatsappMsg = `Hi Tom Sir, I used your website calculator. Recommend plan for Age ${age}, Sum Insured ₹${sum} Lakhs, ${membersSelect.options[membersSelect.selectedIndex].text}: *${matchedPlanName}*. Please provide official quote.`;
    calcConsultBtn.href = `https://wa.me/919846674788?text=${encodeURIComponent(whatsappMsg)}`;
  }

  if (ageInput && sumInput && membersSelect) {
    ageInput.addEventListener('input', updateCalculator);
    sumInput.addEventListener('input', updateCalculator);
    membersSelect.addEventListener('change', updateCalculator);
    updateCalculator(); // Initial calculation
  }

  /* ------------------------------------------------------------------------
     6. Photo Gallery Lightbox Modal (For viewing all images)
     ------------------------------------------------------------------------ */
  const galleryCards = document.querySelectorAll('.gallery-card');
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');

  if (lightboxModal) {
    galleryCards.forEach(card => {
      card.addEventListener('click', () => {
        const imgSrc = card.getAttribute('data-img');
        const caption = card.getAttribute('data-caption');

        lightboxImg.src = imgSrc;
        lightboxCaption.textContent = caption;
        lightboxModal.classList.add('active');
      });
    });

    const closeLightbox = () => {
      lightboxModal.classList.remove('active');
    };

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightboxModal.classList.contains('active')) {
        closeLightbox();
      }
    });
  }

  /* ------------------------------------------------------------------------
     7. Contact / Consultation Form Submission Handler
     ------------------------------------------------------------------------ */
  const consultationForm = document.getElementById('consultationForm');

  if (consultationForm) {
    consultationForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('clientName').value.trim();
      const phone = document.getElementById('clientPhone').value.trim();
      const location = document.getElementById('clientLocation').value.trim();
      const plan = document.getElementById('planType').value;
      const message = document.getElementById('clientMessage').value.trim();

      if (!name || !phone) {
        alert('Please provide your name and phone number.');
        return;
      }

      const formattedMsg = `*Star Health Insurance Inquiry*\n` +
        `👤 *Name:* ${name}\n` +
        `📞 *Phone:* ${phone}\n` +
        `📍 *Location:* ${location || 'Not specified'}\n` +
        `🛡️ *Interested Plan:* ${plan}\n` +
        `📝 *Requirements:* ${message || 'Need complete insurance consultation'}`;

      const waUrl = `https://wa.me/919846674788?text=${encodeURIComponent(formattedMsg)}`;
      
      // Open WhatsApp directly
      window.open(waUrl, '_blank');
    });
  }

  /* ------------------------------------------------------------------------
     8. Mobile Specific Collapse/Expand for FAQs & Testimonials
     ------------------------------------------------------------------------ */
  const faqContainer = document.querySelector('.faq-container');
  const faqToggleBtn = document.getElementById('faqMobileToggleBtn');

  if (faqContainer && faqToggleBtn) {
    if (window.innerWidth <= 768) {
      faqContainer.classList.add('collapsed');
    }

    faqToggleBtn.addEventListener('click', () => {
      faqContainer.classList.toggle('collapsed');
      const isCollapsed = faqContainer.classList.contains('collapsed');
      const btnSpan = faqToggleBtn.querySelector('span');
      const btnIcon = faqToggleBtn.querySelector('i');

      if (isCollapsed) {
        btnSpan.textContent = 'View All FAQs (6)';
        btnIcon.className = 'fa-solid fa-chevron-down';
      } else {
        btnSpan.textContent = 'Show Less FAQs';
        btnIcon.className = 'fa-solid fa-chevron-up';
      }
    });
  }

  const testimonialsGrid = document.querySelector('.testimonials-grid');
  const testimonialToggleBtn = document.getElementById('testimonialMobileToggleBtn');

  if (testimonialsGrid && testimonialToggleBtn) {
    if (window.innerWidth <= 768) {
      testimonialsGrid.classList.add('collapsed');
    }

    testimonialToggleBtn.addEventListener('click', () => {
      testimonialsGrid.classList.toggle('collapsed');
      const isCollapsed = testimonialsGrid.classList.contains('collapsed');
      const btnSpan = testimonialToggleBtn.querySelector('span');
      const btnIcon = testimonialToggleBtn.querySelector('i');

      if (isCollapsed) {
        btnSpan.textContent = 'View All Feedback';
        btnIcon.className = 'fa-solid fa-chevron-down';
      } else {
        btnSpan.textContent = 'Show Less Feedback';
        btnIcon.className = 'fa-solid fa-chevron-up';
      }
    });
  }

});

