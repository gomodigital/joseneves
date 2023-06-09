// @codekit-prepend './modules/accordion.js'
// @codekit-prepend './modules/animations.js'
// @codekit-prepend './modules/faqs.js'
// @codekit-prepend './modules/library.js'
// @codekit-prepend './modules/modals.js'
// @codekit-prepend './modules/sliders.js'

const currentYear = new Date().getFullYear();
const accordionElements = $('.accordion-wrapper');
const faqsSection = $('.section_faqs');
const videoModalsElements = $('.modal-video');
const modalsElements = $('.modal');
const mapPartners = $('.section_home-partners');
const heroSlider = $('.hero-slider');
const programsSlider = $('.programs-slider');
const partnersSlider = $('.partners-slider');
const menuButton = $('#main-menu-button');
const closeMenu = $('#main-menu-close');
const nav = $('.nav_wrapper');
const languageButton = $('.button-language');
const libraryLink = $('.arrow-button.is-library-link');
const libraryLinkContainer = $('.featured-articles_container');
const newsletterCTA = $('.newsletter-cta.is-home');
const searchOpenButton = $('.button-search');
const searchCloseButton = $('.button-close-search');
const globalSearchInput = $('.global-search_input');

document.addEventListener('DOMContentLoaded', function () {
  // TOREMOVE
  // $('a').each(function () {
  //   var old_url = $(this).attr('href');
  //   var current_domain = document.location.hostname;
  //   // Check if old_url is not undefined
  //   if (old_url) {
  //     // Replace all occurrences of "https://joseneves.org/" and "https://www.joseneves.org/" with the current hostname
  //     if (old_url.includes('https://joseneves.org/') || old_url.includes('https://www.joseneves.org/')) {
  //       var new_url = old_url.replace(/https:\/\/(www\.)?joseneves.org\//, 'https://' + current_domain + '/');
  //       $(this).attr('href', new_url);
  //     }
  //   }
  // });

  // Set the current year in the footer
  $('.copyright-year').text(currentYear);

  // If hostname does not contain https://joseneves.org/ or https://www.joseneves.org/ open links in a new tab
  $('a').each(function() {
    var href = $(this).attr('href');
    if (href && !href.startsWith('https://joseneves.org/') && !href.startsWith('https://www.joseneves.org/') && !href.startsWith('/') && !$(this).is('[target]')) {
      $(this).attr('target', '_blank');
      $(this).attr('rel', 'noopener noreferrer');
    }
  });

  if ($(window).width() < 478) {
    libraryLink.detach().insertAfter(libraryLinkContainer);
    libraryLink.css('padding-left', '1.5rem');
    newsletterCTA.detach().insertAfter(libraryLink);
    newsletterCTA.css('margin', '2rem 0 0 0');
  }

  menuButton.on('click', function (e) {
    e.preventDefault();
    nav.fadeIn(100);
    $('body').addClass('no-scroll');
    animateMenu();
  });

  closeMenu.on('click', function (e) {
    e.preventDefault();
    nav.fadeOut(100);
    $('body').removeClass('no-scroll');
  });

  languageButton.on('click', function (e) {
    e.preventDefault();
    let url = $(this).attr('href');
    let innerCircle = $(this).find('.button-language_switch-circle');
    // if url contains /en/ apply the css
    if (url.includes('/en/')) {
      innerCircle.css('transform', 'translateX(100%)');
    } else {
      innerCircle.css('transform', 'translateX(0%)');
    }
    setTimeout(function () {
      window.location.href = url;
    }, 500);
  });

  globalSearchInput.on('input', function () {
    if ($(this).val() === '') {
      $('body').removeClass('no-scroll');
    } else {
      $('body').addClass('no-scroll');
    }
  });

  searchOpenButton.on('click', function (e) {
    e.preventDefault();
    $('.global-search_form-wrapper').css('pointer-events', 'auto');
  });

  searchCloseButton.on('click', function (e) {
    e.preventDefault();
    $('body').removeClass('no-scroll');
    $('.global-search_form-wrapper').css('pointer-events', 'none');
  });

  if (accordionElements.length > 0) {
    accordion();
  }
  
  if (faqsSection.length > 0) {
    faqs();
  }
  
  // if body has class 'library', run library function
  if ($('body').hasClass('library')) {
    library();
  }
  
  if (videoModalsElements.length > 0) {
    videoModals();
  }
  
  if (modalsElements.length > 0) {
    modals();
  }
  
  if (mapPartners.length > 0) {
    animateMap();
  }
  
  if (partnersSlider.length > 0) {
    sliderHomePartners();
  }

  if (programsSlider.length > 0) {
    sliderHomePrograms();
  }

  if (heroSlider.length > 0) {
    sliderHomeHero();
    document.addEventListener('mousemove', move);
    function move(e) {
      this.querySelectorAll('[move="true"]').forEach(layer => {
        const speed = layer.getAttribute('move-speed');
        const x = (window.innerWidth - e.pageX * speed) / 120;
        const y = (window.innerHeight - e.pageY * speed) / 120;
        layer.style.transform = `translateX(${x}px) translateY(${y}px)`;
      });
    }
  }

  if ($('.section_hero').length > 0) {
    animateHeroSection();
  }

  if ($('.section_product-hero').length > 0) {
    animateProductHero();
  }

  if ($('.section_intro').length > 0) {
    animateIntroSection();
  }

  if ($('.section_3-highlights').length > 0) {
    animate3HighlightsSection();
  }

  if ($('.section_highlight').length > 0) {
    animateHighlightSection();
  }

  if ($('.section_accordion').length > 0) {
    animateAccordionItems();
  }

  if ($('.section_product-grid').length > 0) {
    animateProductGrid();
  }

  if ($('.section_home-featured').length > 0 || $('.section_home-career-tips').length > 0) {
    animateFeaturedArticles();
  }

  if ($('.section_home-partners').length > 0) {
    animatePartners();
  }

  if ($('.home-footer').length > 0) {
    animateHomeFooter();
  }

});  