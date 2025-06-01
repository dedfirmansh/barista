/**
 * Barista Portfolio - Main JavaScript
 *
 * This file contains all interactive functionality for the portfolio website.
 * It's organized into modules for easier editing and maintenance.
 */

// Wait for DOM to be fully loaded before executing code
document.addEventListener("DOMContentLoaded", () => {
    // Initialize all modules
    initMobileNavigation()
    initSmoothScrolling()
    initEquipmentCards()
    initDownloadButton()
    initScrollAnimations()
    initGalleryFilter()
    initGalleryModal()
    initBackToTop()
    initContactForm()
    initCarouselBackground()
  })
  
  /**
   * MOBILE NAVIGATION MODULE
   * Handles mobile menu toggle and navigation
   */
  function initMobileNavigation() {
    const menuToggle = document.getElementById("menu-toggle")
    const mobileMenu = document.getElementById("mobile-menu")
    const mobileLinks = document.querySelectorAll(".mobile-link")
  
    if (menuToggle && mobileMenu) {
      menuToggle.addEventListener("click", () => {
        menuToggle.classList.toggle("active")
        mobileMenu.classList.toggle("active")
      })
  
      // Close menu when clicking on a link
      mobileLinks.forEach((link) => {
        link.addEventListener("click", () => {
          menuToggle.classList.remove("active")
          mobileMenu.classList.remove("active")
        })
      })
    }
  }
  
  /**
   * SMOOTH SCROLLING MODULE
   * Handles smooth scrolling for anchor links
   */
  function initSmoothScrolling() {
    // Select all anchor links that point to page sections
    const anchorLinks = document.querySelectorAll('a[href^="#"]')
  
    anchorLinks.forEach((link) => {
      link.addEventListener("click", (event) => {
        // Skip if it's just a "#" link
        const targetId = link.getAttribute("href")
        if (targetId === "#") return
  
        const targetElement = document.querySelector(targetId)
        if (targetElement) {
          // Prevent default jump behavior
          event.preventDefault()
  
          // Smooth scroll to target with offset for header
          const offset = window.innerWidth <= 768 ? 70 : 0
          smoothScrollTo(targetElement, offset)
        }
      })
    })
  }
  
  /**
   * EQUIPMENT CARDS MODULE
   * Handles interactions with equipment cards
   */
  function initEquipmentCards() {
    const equipmentCards = document.querySelectorAll(".equipment-card")
  
    equipmentCards.forEach((card) => {
      card.addEventListener("click", () => {
        const equipment = card.getAttribute("data-equipment")
        displayEquipmentDetails(equipment)
      })
    })
  }
  
  /**
   * DOWNLOAD CV MODULE
   * Handles the CV download button functionality
   */
  function initDownloadButton() {
    const downloadBtn = document.getElementById("download-cv")
  
    if (downloadBtn) {
      downloadBtn.addEventListener("click", (event) => {
        // Biarkan browser menangani download secara default
        // Event listener ini bisa digunakan untuk analytics atau tracking jika diperlukan
        console.log("CV download initiated");
      })
    }
  }
  
  /**
   * SCROLL ANIMATIONS MODULE
   * Handles reveal animations when scrolling
   */
  function initScrollAnimations() {
    // Get all sections to animate
    const sections = document.querySelectorAll(".section")
    const skills = document.querySelectorAll(".skill-item")
    const timeline = document.querySelectorAll(".timeline-item")
    const experience = document.querySelectorAll(".experience-item")
    const gallery = document.querySelectorAll(".gallery-item")
    const interests = document.querySelectorAll(".interest-item")
  
    // Add initial classes
    addInitialClasses(sections, "section-hidden")
    addInitialClasses(skills, "item-hidden")
    addInitialClasses(timeline, "item-hidden")
    addInitialClasses(experience, "item-hidden")
    addInitialClasses(gallery, "item-hidden")
    addInitialClasses(interests, "item-hidden")
  
    // Check initial positions
    checkElementsVisibility()
  
    // Add scroll listener
    window.addEventListener("scroll", checkElementsVisibility)
  
    // Add animation styles
    addAnimationStyles()
  }
  
  /**
   * GALLERY FILTER MODULE
   * Handles filtering of gallery items
   */
  function initGalleryFilter() {
    const filterButtons = document.querySelectorAll(".filter-btn")
    const galleryItems = document.querySelectorAll(".gallery-item")
  
    if (filterButtons.length && galleryItems.length) {
      filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
          // Remove active class from all buttons
          filterButtons.forEach((btn) => btn.classList.remove("active"))
  
          // Add active class to clicked button
          button.classList.add("active")
  
          // Get filter value
          const filterValue = button.getAttribute("data-filter")
  
          // Filter gallery items
          galleryItems.forEach((item) => {
            if (filterValue === "all" || item.getAttribute("data-category") === filterValue) {
              item.style.display = "block"
            } else {
              item.style.display = "none"
            }
          })
        })
      })
    }
  }
  
  /**
   * GALLERY MODAL MODULE
   * Handles the gallery lightbox functionality
   */
  function initGalleryModal() {
    const modal = document.getElementById("gallery-modal")
    const modalImage = document.getElementById("modal-image")
    const modalVideo = document.getElementById("modal-video")
    const modalClose = document.querySelector(".modal-close")
    const galleryButtons = document.querySelectorAll(".gallery-btn")
  
    if (modal && modalImage && modalVideo && modalClose) {
      // Open modal when clicking on gallery buttons
      galleryButtons.forEach((button) => {
        button.addEventListener("click", () => {
          const src = button.getAttribute("data-src")
          const type = button.getAttribute("data-type")
  
          if (type === "image") {
            modalImage.src = src
            modalImage.parentElement.style.display = "block"
            modalVideo.parentElement.style.display = "none"
          } else if (type === "video") {
            modalVideo.src = src
            modalVideo.parentElement.style.display = "block"
            modalImage.parentElement.style.display = "none"
          }
  
          modal.style.display = "block"
          document.body.style.overflow = "hidden"
        })
      })
  
      // Close modal when clicking on close button
      modalClose.addEventListener("click", () => {
        closeModal(modal, modalVideo)
      })
  
      // Close modal when clicking outside of content
      modal.addEventListener("click", (event) => {
        if (event.target === modal) {
          closeModal(modal, modalVideo)
        }
      })
  
      // Close modal with escape key
      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && modal.style.display === "block") {
          closeModal(modal, modalVideo)
        }
      })
    }
  }
  
  /**
   * BACK TO TOP MODULE
   * Handles the back to top button functionality
   */
  function initBackToTop() {
    const backToTopButton = document.getElementById("back-to-top")
  
    if (backToTopButton) {
      // Show/hide button based on scroll position
      window.addEventListener("scroll", () => {
        if (window.scrollY > 500) {
          backToTopButton.classList.add("active")
        } else {
          backToTopButton.classList.remove("active")
        }
      })
  
      // Scroll to top when clicking the button
      backToTopButton.addEventListener("click", () => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        })
      })
    }
  }
  
  /**
   * CONTACT FORM MODULE
   * Handles the contact form submission
   */
  function initContactForm() {
    const contactForm = document.getElementById("contact-form")
  
    if (contactForm) {
      contactForm.addEventListener("submit", (event) => {
        event.preventDefault()
  
        // Get form data
        const formData = new FormData(contactForm)
        const name = formData.get("name")
        const email = formData.get("email")
        const subject = formData.get("subject")
        const message = formData.get("message")
  
        // Validate form data (simple validation)
        if (!name || !email || !subject || !message) {
          alert("Mohon isi semua field yang diperlukan.")
          return
        }
  
        // Simulate form submission
        alert(`Terima kasih ${name}! Pesan Anda telah dikirim.`)
        contactForm.reset()
      })
    }
  }
  
  /**
   * UTILITY FUNCTIONS
   * Helper functions used by the modules
   */
  
  /**
   * Smoothly scrolls to an element with an offset
   * @param {HTMLElement} element - The element to scroll to
   * @param {number} offset - Offset in pixels from the top
   */
  function smoothScrollTo(element, offset = 0) {
    const elementPosition = element.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - offset
  
    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    })
  }
  
  /**
   * Displays details about the selected equipment
   * @param {string} equipment - The equipment identifier
   */
  function displayEquipmentDetails(equipment) {
    // Equipment details data
    const equipmentDetails = {
      v60: {
        title: "Hario V60",
        description:
          "V60 adalah metode pour-over yang populer dengan bentuk kerucut dan alur spiral. Menghasilkan kopi yang bersih dengan karakter yang jelas. Ideal untuk single-origin dengan profil rasa yang kompleks.",
      },
      kalita: {
        title: "Kalita Wave",
        description:
          "Kalita Wave memiliki dasar yang rata dengan tiga lubang, memberikan ekstraksi yang lebih konsisten dan seimbang. Lebih mudah digunakan untuk pemula dibandingkan V60.",
      },
      victoria: {
        title: "Victoria Arduino",
        description:
          "Mesin espresso premium dengan teknologi T3 untuk stabilitas suhu yang presisi. Menghasilkan espresso dengan kualitas tinggi dan konsisten.",
      },
      aeropress: {
        title: "Aeropress",
        description:
          "Metode brewing yang serbaguna dengan tekanan manual. Dapat menghasilkan kopi yang bersih seperti pour-over atau kental seperti espresso tergantung teknik yang digunakan.",
      },
      chemex: {
        title: "Chemex",
        description:
          "Metode pour-over dengan filter tebal yang menghasilkan kopi yang sangat bersih dan jernih. Ideal untuk kopi dengan karakter buah dan floral.",
      },
      "french-press": {
        title: "French Press",
        description:
          "Metode immersion yang menghasilkan kopi dengan body yang penuh dan kaya. Sederhana namun efektif untuk mengekstrak minyak dan sedimen kopi.",
      },
    }
  
    // Get details for the selected equipment
    const details = equipmentDetails[equipment] || {
      title: equipment,
      description: "Informasi detail akan segera tersedia.",
    }
  
    // Create and show alert with equipment details
    alert(`${details.title}\n\n${details.description}`)
  }
  
  /**
   * Adds initial classes to elements for animations
   * @param {NodeList} elements - The elements to add classes to
   * @param {string} className - The class name to add
   */
  function addInitialClasses(elements, className) {
    elements.forEach((element) => {
      element.classList.add(className)
    })
  }
  
  /**
   * Checks if elements are in viewport and animates them
   */
  function checkElementsVisibility() {
    const triggerPosition = window.innerHeight * 0.8
  
    // Animate sections
    document.querySelectorAll(".section-hidden").forEach((section) => {
      if (section.getBoundingClientRect().top < triggerPosition) {
        section.classList.remove("section-hidden")
        section.classList.add("section-visible")
      }
    })
  
    // Animate items with delay
    document.querySelectorAll(".item-hidden").forEach((item, index) => {
      if (item.getBoundingClientRect().top < triggerPosition) {
        setTimeout(
          () => {
            item.classList.remove("item-hidden")
            item.classList.add("item-visible")
          },
          150 * (index % 4),
        )
      }
    })
  }
  
  /**
   * Closes the gallery modal
   * @param {HTMLElement} modal - The modal element
   * @param {HTMLElement} video - The video element
   */
  function closeModal(modal, video) {
    modal.style.display = "none"
    document.body.style.overflow = "auto"
  
    // Stop video if playing
    if (video.src) {
      video.src = ""
    }
  }
  
  /**
   * Adds CSS styles for animations to the document
   */
  function addAnimationStyles() {
    const styleElement = document.createElement("style")
  
    styleElement.textContent = `
      /* Section animations */
      .section-hidden {
        opacity: 0;
        transform: translateY(30px);
      }
      
      .section-visible {
        opacity: 1;
        transform: translateY(0);
        transition: opacity 1s ease, transform 1s ease;
      }
      
      /* Item animations */
      .item-hidden {
        opacity: 0;
        transform: translateY(20px);
      }
      
      .item-visible {
        opacity: 1;
        transform: translateY(0);
        transition: opacity 0.6s ease, transform 0.6s ease;
      }
    `
  
    document.head.appendChild(styleElement)
  }
  
  // Carousel Background
  function initCarouselBackground() {
    const slides = document.querySelectorAll('.carousel-slide');
    let currentSlide = 0;

    // Set first slide as active
    slides[0].classList.add('active');

    function nextSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    // Change slide every 5 seconds
    setInterval(nextSlide, 5000);
  }
  
  // CV Dropdown functionality
  const cvDropdown = document.getElementById('cvDropdown');
  const cvDropdownMenu = document.getElementById('cvDropdownMenu');

  cvDropdown.addEventListener('click', (e) => {
      e.stopPropagation();
      cvDropdown.parentElement.classList.toggle('active');
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', (e) => {
      if (!cvDropdown.contains(e.target)) {
          cvDropdown.parentElement.classList.remove('active');
      }
  });
  