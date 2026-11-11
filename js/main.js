/* ========================================================
   Lanka Travellers - Travel Agency Website
   JavaScript File developed for ICT Diploma Project
   ======================================================== */

document.addEventListener('DOMContentLoaded', function () {

  // 1. Mobile Navigation Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', function () {
      navLinks.classList.toggle('active');
    });

    // Close menu when clicking on any link
    const links = navLinks.querySelectorAll('a');
    links.forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('active');
      });
    });
  }

  // 2. Active Page Link Highlight
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navItems = document.querySelectorAll('.nav-links a:not(.btn)');
  navItems.forEach(function (item) {
    const href = item.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      item.classList.add('active');
    }
  });

  // 3. Package Category Filter (Packages Page)
  const filterButtons = document.querySelectorAll('.tab-btn');
  const packageCards = document.querySelectorAll('.package-card');

  if (filterButtons.length > 0 && packageCards.length > 0) {
    filterButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        // Remove active class from all buttons
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const selectedFilter = btn.getAttribute('data-filter');

        packageCards.forEach(function (card) {
          const category = card.getAttribute('data-category');
          if (selectedFilter === 'all' || category === selectedFilter) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });

    // Check if URL has a category parameter (e.g. from Home page)
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');
    if (categoryParam) {
      const targetBtn = document.querySelector(`.tab-btn[data-filter="${categoryParam}"]`);
      if (targetBtn) {
        targetBtn.click();
      }
    }
  }

  // 4. Booking Modal Functions
  const modal = document.getElementById('bookingModal');
  const modalClose = document.getElementById('modalClose');
  const bookButtons = document.querySelectorAll('.btn-book-now');
  const packageSelect = document.getElementById('modalPackage');

  if (modal) {
    // Open modal on "Book Now" button click
    bookButtons.forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        const packageName = btn.getAttribute('data-package');
        if (packageSelect && packageName) {
          packageSelect.value = packageName;
        }
        modal.classList.add('active');
      });
    });

    // Close modal on X button click
    if (modalClose) {
      modalClose.addEventListener('click', function () {
        modal.classList.remove('active');
      });
    }

    // Close modal when clicking outside of modal content
    window.addEventListener('click', function (e) {
      if (e.target === modal) {
        modal.classList.remove('active');
      }
    });

    // Handle Modal Booking Form Submit
    const modalForm = document.getElementById('modalBookingForm');
    if (modalForm) {
      modalForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const name = document.getElementById('modalName').value.trim();
        const email = document.getElementById('modalEmail').value.trim();

        if (name === '' || email === '') {
          alert('Please enter your Name and Email address.');
          return;
        }

        alert('Thank you, ' + name + '! Your booking request has been received. Our travel consultant will contact you within 24 hours.');
        modal.classList.remove('active');
        modalForm.reset();
      });
    }
  }

  // 5. Contact Page Form Validation & Feedback
  const contactForm = document.getElementById('contactForm');
  const successMsg = document.getElementById('contactSuccessMsg');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const name = document.getElementById('contactName').value.trim();
      const email = document.getElementById('contactEmail').value.trim();
      const message = document.getElementById('contactMessage').value.trim();

      // Simple validation
      if (name === '' || email === '' || message === '') {
        alert('Please fill in all required fields (Name, Email, and Message).');
        return;
      }

      // Email format check
      if (email.indexOf('@') === -1 || email.indexOf('.') === -1) {
        alert('Please enter a valid email address.');
        return;
      }

      // Show success feedback
      if (successMsg) {
        successMsg.style.display = 'block';
        successMsg.innerText = 'Thank you, ' + name + '! Your inquiry has been sent successfully. We will reply to your email soon.';
      } else {
        alert('Thank you, ' + name + '! Your inquiry has been sent successfully.');
      }

      contactForm.reset();
    });
  }

  // 6. Image Fallback (Loads local SVG placeholder if offline)
  const allImages = document.querySelectorAll('img');
  allImages.forEach(function (img) {
    img.addEventListener('error', function () {
      img.src = 'images/placeholder.svg';
    });
  });

});
