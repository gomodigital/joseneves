gsap.registerPlugin(ScrollTrigger);

// Main scroll trigger
function createScrollTrigger(triggerElement, timeline, start = 'top 40%') {
  ScrollTrigger.create({
    trigger: triggerElement,
    start: start,
    markers: false,
    onEnter: () => timeline.play(),
    onLeaveBack: () => timeline.reverse(),
  });
}

let headingsToSplit = $('.hero-slider_content .heading_xlarge, .hero_heading .heading_xlarge, .product-hero_header .heading_large, .highlight_content .heading_large, .section_intro .heading_xlarge, .section_intro .heading_large, .home-footer_block .heading_large, .partners_intro .heading_large');
let typeSplit = new SplitType(headingsToSplit, { // eslint-disable-line
  types: 'words, chars',
  tagName: 'span',
});

function animateLines() {
  $('.grid-line--vertical').each(function () {
    let tl = gsap.timeline({ paused: true });
    tl.from($(this), { height: 0, duration: 1, ease: 'back.out(2)' });
    ScrollTrigger.create({
      trigger: $(this),
      start: 'top 20%',
      markers: false,
      onEnter: () => tl.play(),
    });
  });
  $('.grid-line--horizontal').each(function () {
    let tl = gsap.timeline({ paused: true });
    tl.from($(this), { width: 0, duration: 1, ease: 'back.out(2)' });
    ScrollTrigger.create({
      trigger: $(this),
      start: 'top bottom',
      markers: false,
      onEnter: () => tl.play(),
    });
  });
}

function animateMap() {
  const mapInfo = $('#map-info');
  const links = $('.partners-map_nav-link');

  // set the initial selected link
  let selectedLink = $('#trigger-candidates');

  // set the initial circle scale and opacity to 0
  mapInfo.find('circle').each(function () {
    $(this).attr('opacity', '0');
    gsap.set(this, { scale: 0, opacity: 0, transformOrigin: 'center center' });
  });

  // add click event listeners to the link elements
  links.on('click', function () {
    // get the target group ID from the link block ID
    const targetId = $(this).attr('id').replace('trigger-', '');
    // get the target group element in the SVG
    const targetGroup = mapInfo.find(`#${targetId}`);
    // get all the circles in the SVG
    const circles = targetGroup.find('circle');
    // loop through the circles and set their opacity and scale based on the target group
    const timeline = gsap.timeline({ paused: true });
    circles.each(function (index) {
      // set the opacity and scale to 1 for the circle with a delay
      timeline.fromTo(this, { opacity: 0, scale: 0 }, { duration: 0.25, opacity: 1, scale: 1, ease: 'power4.out', delay: index * 0.01 }, 0);
    });

    // play the timeline
    timeline.play();

    // reset the opacity and scale for all circles in other groups
    mapInfo
      .find('circle')
      .not(circles)
      .each(function () {
        gsap.to(this, { duration: 0.5, opacity: 0, scale: 0, ease: 'power4.out' });
      });

    // remove the 'selected' class from the previously selected link
    selectedLink.removeClass('selected');

    // add the 'selected' class to the current link
    $(this).addClass('selected');

    // set the current link as the selected link
    selectedLink = $(this);
  });

  // trigger the click event on the initial selected link
  selectedLink.click();
}

function animateMenu() {
  const mainMenuItems = $('.nav-primary_item');
  const secondaryMenuItems = $('.nav-secondary_item');
  const closeButton = $('#main-menu-close');
  const navLogoBackground = $('.nav_logo-bg');
  const languageButton = $('.button-language');
  let tl = gsap.timeline();
  tl.from(navLogoBackground, { duration: 1, opacity: 0, scale: 0, ease: 'power4.out' }, 0);
  tl.from(languageButton, { duration: 0.5, y: -20, ease: 'power4.out' }, 0);
  tl.from(secondaryMenuItems, { duration: 0.5, opacity: 0, y: -20, stagger: 0.1, ease: 'power4.out' }, 0);
  tl.from(mainMenuItems, { duration: 0.5, opacity: 0, y: -20, stagger: 0.1, ease: 'power4.out' }, 0.4);
  tl.from(closeButton, { duration: 0.5, opacity: 0, ease: 'power4.out' }, 1);
}

function offsetMenuButton() {
  const menuButton = $('#main-menu-button');
  let tl = gsap.timeline();
  tl.to(menuButton, { duration: 0.5, opacity: 0, yPercent: -100, ease: 'power4.out' }, 0);
}

function resetMenuButton() {
  const menuButton = $('#main-menu-button');
  let tl = gsap.timeline();
  tl.to(menuButton, { duration: 0.5, opacity: 1, yPercent: 0, ease: 'power4.out' }, 0);
}

let tlHero = gsap.timeline({ defaults: { opacity: 0, duration: 0.5, ease: 'back.out(2)' } });

function animateHeroSection() {
  let heroContainer = $('.section_hero'); // eslint-disable-line
  let heading = $('.section_hero .heading_xlarge');
  let intro = $('.section_hero .text_large');
  let cta = $('.section_hero .cta-group');
  let playButton = $('.section_hero .hero_play-button');
  let headingSplit = new SplitType(heading, { // eslint-disable-line
    types: 'words, chars',
    tagName: 'span',
  });
  let char = heading.find('.char');
  gsap.set(heroContainer, { autoAlpha: 0 });
  tlHero.to(heroContainer, { autoAlpha: 1 });
  tlHero.from(char, { yPercent: 100, stagger: { amount: 0.25 } }, '+=2');
  tlHero.from(intro, { y: 20 }, '-=1');
  tlHero.from(cta, { y: 20 }, '-=0.5');
  if (playButton.length > 0) {
    tlHero.from(playButton, { y: 20 }, '-=0.5');
  }
}

let tlProductHero = gsap.timeline({ defaults: { opacity: 0, duration: 0.5, ease: 'back.out(2)' } });

function animateProductHero() {
  let heroContainer = $('.section_product-hero');
  let heading = $('.section_product-hero .heading_large');
  let intro = $('.section_product-hero .text_large');
  let cta = $('.section_product-hero .cta-group');
  let image = $('.section_product-hero .product-hero_image');
  let caption = $('.section_product-hero .text_small-caps');
  let headingSplit = new SplitType(heading, { // eslint-disable-line
    types: 'words, chars',
    tagName: 'span',
  });
  let char = heading.find('.char');
  // let tl = gsap.timeline({ defaults: { opacity: 0, duration: 0.5, ease: 'back.out(2)' } });
  gsap.set(heroContainer, { autoAlpha: 0 });
  tlProductHero.to(heroContainer, { autoAlpha: 1 });
  tlProductHero.from(char, { yPercent: 100, stagger: { amount: 0.25 } });
  tlProductHero.from(intro, { y: 20 });
  tlProductHero.from(cta, { y: 20 });
  tlProductHero.from(image, { clipPath: 'circle(0%)', scale: 1.1, duration: 1 });
  tlProductHero.from(caption, { y: 20 });
}

function animateIntroSection() {
  $('.section_intro').each(function () {
    let headingXLarge = $(this).find('.heading_xlarge');
    let headingLarge = $(this).find('.heading_large');
    let mainText = $(this).find('.intro_main-text');
    let cta = $(this).find('.intro_cta');
    let tl = gsap.timeline({ paused: true });
    // if .heading_xlarge, animate it
    if (headingXLarge.length > 0) {
      tl.from(headingXLarge.find('.char'), { opacity: 0, yPercent: 100, duration: 0.5, ease: 'back.out(2)', stagger: { amount: 0.25 } });
      gsap.set(headingXLarge, { opacity: 1 });
    }
    // if .heading_large, animate it
    if (headingLarge.length > 0) {
      tl.from(headingLarge.find('.char'), { opacity: 0, yPercent: 100, duration: 0.5, ease: 'back.out(2)', stagger: { amount: 0.25 } });
      gsap.set(headingLarge, { opacity: 1 });
    }
    // if .intro_main-text, animate it
    if (mainText.length > 0) {
      tl.from(mainText, { opacity: 0, y: 20, duration: 0.5, ease: 'back.out(2)', stagger: 0.5 });
    }
    // if .intro_cta, animate it
    if (cta.length > 0) {
      tl.from(cta, { opacity: 0, y: 20, duration: 0.5, ease: 'back.out(2)' });
    }
    createScrollTrigger($(this), tl);
  });
}

function animate3HighlightsSection() {
  $('.section_3-highlights').each(function () {
    let image = $(this).find('.highlight-item_image');
    let heading = $(this).find('.heading_medium');
    let button = $(this).find('.button');
    let text = $(this).find('.rich-text');
    let tl = gsap.timeline({ paused: true });
    // if .highlight-item_image, animate it
    if (image.length > 0) {
      tl.from(image, { clipPath: 'circle(0%)', scale: 1.5, duration: 1, ease: 'back.out(2)' });
    }
    // if .heading_medium, animate it
    if (heading.length > 0) {
      tl.from(heading, { opacity: 0, y: 20, duration: 0.5, ease: 'back.out(2)' });
    }
    // if .rich-text, animate it
    if (text.length > 0) {
      tl.from(text, { opacity: 0, y: 20, duration: 0.5, ease: 'back.out(2)' });
    }
    // if .button, animate it
    if (button.length > 0) {
      tl.from(button, { opacity: 0, y: 20, duration: 0.5, ease: 'back.out(2)' });
    }
    createScrollTrigger($(this), tl);
  });
}

function animateHighlightSection() {
  $('.section_highlight').each(function () {
    let image = $(this).find('.highlight_image');
    let playButton = $(this).find('.play-button');
    let heading = $(this).find('.heading_large');
    let text = $(this).find('.highlight_content-text');
    let cta = $(this).find('.cta-group');
    let keyNumbers = $(this).find('.highlight_key-numbers-item');
    let ctaCard = $(this).find('.cta-card');
    let tl = gsap.timeline({ paused: true });
    // if content, animate it
    tl.from($(this), { opacity: 0, y: 200, duration: 1, ease: 'back.out(2)' });
    // if .highlight_image, animate it
    if (image.length > 0) {
      tl.from(image, { clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)', duration: 1, ease: 'back.out(2)' });
    }
    // if heading_large, animate it
    if (heading.length > 0) {
      tl.from(heading.find('.char'), { opacity: 0, yPercent: 100, duration: 0.5, ease: 'back.out(2)', stagger: { amount: 0.25 } }, '-=1');
      gsap.set(heading, { opacity: 1 });
    }
    // if play-button, animate it
    if (playButton.length > 0) {
      tl.from(playButton, { opacity: 0, scale: 1.2, duration: 0.25 }, '-=0.5');
    }
    // if .highlight_content-text, animate it
    if (text.length > 0) {
      tl.from(text, { opacity: 0, y: 20, duration: 0.25, ease: 'back.out(2)' });
    }
    // if .cta-group, animate it
    if (cta.length > 0) {
      tl.from(cta, { opacity: 0, y: 20, duration: 0.25, ease: 'back.out(2)' });
    }
    // if .highlight_key-numbers-item, animate it
    if (keyNumbers.length > 0) {
      tl.from(keyNumbers, { opacity: 0, y: 20, duration: 0.25, ease: 'back.out(2)', stagger: 0.2 });
    }
    // if .cta-card, animate it
    if (ctaCard.length > 0) {
      tl.from(ctaCard, { opacity: 0, y: 20, duration: 0.25, ease: 'back.out(2)', stagger: 0.2 });
    }
    createScrollTrigger($(this), tl);
  });
}

function animateAccordionItems() {
  $('.section_accordion').each(function () {
    let accordionItems = $(this).find('.accordion-item');
    let tl = gsap.timeline({ paused: true });
    // if accordion-items, animate them
    if (accordionItems.length > 0) {
      tl.from(accordionItems, { opacity: 0, y: 20, duration: 0.5, ease: 'back.out(2)', stagger: 0.5 });
    }
    createScrollTrigger(accordionItems, tl);
  });
}

function animateProductGrid() {
  $('.product-grid_container').each(function () {
    let productGridItems = $(this).find('.product-grid_item');
    let tl = gsap.timeline({ paused: true });
    // if product-grid_items, animate them
    if (productGridItems.length > 0) {
      tl.from(productGridItems, { opacity: 0, y: 20, duration: 0.5, ease: 'back.out(2)', stagger: 0.5 });
    }
    createScrollTrigger(productGridItems, tl);
  });
}

function animateFeaturedArticles() {
  $('.section_home-featured, .section_home-career-tips').each(function () {
    let card = $(this).find('.article-card');
    let tl = gsap.timeline({ paused: true });
    tl.from(card, { opacity: 0, y: 20, duration: 1, ease: 'back.out(2)', stagger: 0.5 });
    createScrollTrigger($(this), tl);
  });
}

function animatePartners() {
  $('.section_home-partners').each(function () {
    let heading = $(this).find('.heading_large');
    let intro = $(this).find('.partners_intro-content');
    let cta = $(this).find('.cta-group');
    let mapNavLink = $(this).find('.partners-map_nav-link');
    let mapBackground = $(this).find('.partners-map_background');
    let map = $(this).find('.partners-map_images-circles');
    let partners = $(this).find('.partners-slider');
    let tl = gsap.timeline({ paused: true });
    tl.from(mapBackground, { opacity: 0, duration: 0.5 }, '+=0.25');
    tl.from(heading.find('.char'), { opacity: 0, yPercent: 100, duration: 0.5, ease: 'back.out(2)', stagger: { amount: 0.25 } });
    gsap.set(heading, { opacity: 1 });
    tl.from(intro, { opacity: 0, y: 20, duration: 0.5, ease: 'back.out(2)' });
    tl.from(cta, { opacity: 0, y: 20, duration: 0.5, ease: 'back.out(2)' });
    tl.from(map, { opacity: 0, duration: 0.5, ease: 'back.out(2)' });
    tl.from(mapNavLink, { opacity: 0, y: 20, duration: 0.5, ease: 'back.out(2)', stagger: 0.5 }, '-=0.5');
    tl.from(partners, { opacity: 0, y: 20, duration: 0.5, ease: 'back.out(2)' });
    createScrollTrigger($(this), tl);
  });
}

function animateHomeFooter() {
  $('.home-footer').each(function () {
    let heading = $(this).find('.heading_large');
    let subHeading = $(this).find('.heading_medium');
    let menuItems = $(this).find('.home-footer_link');
    let copyright = $(this).find('.home-footer_copyright');
    let social = $(this).find('.footer_social');
    let tl = gsap.timeline({ paused: true });
    tl.from(heading.find('.char'), { opacity: 0, yPercent: 100, duration: 0.5, ease: 'back.out(2)', stagger: { amount: 0.25 } });
    gsap.set(heading, { opacity: 1 });
    tl.from(subHeading, { opacity: 0, y: 20, duration: 0.5, ease: 'back.out(2)' }, 0.5);
    tl.from(social, { opacity: 0, y: 20, duration: 0.5, ease: 'back.out(2)' }, '-=0.5');
    tl.from(menuItems, { opacity: 0, y: 20, duration: 0.5, ease: 'back.out(2)', stagger: 0.1 }, '-=0.5');
    tl.from(copyright, { opacity: 0, y: 20, duration: 0.5, ease: 'back.out(2)' }, '-=0.5');
    createScrollTrigger($(this), tl);
  });
}
