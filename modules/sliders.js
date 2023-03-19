function sliderHomeHero() {
  const homeHeroSlider = new Splide('.hero-slider', {
    type: 'loop',
    // rewind: true,
    // pagination: false,
    autoplay: true,
    interval: 6000,
  }).mount();

  // Animate the initial visible slide
  setTimeout(() => {
    animateSlide(homeHeroSlider.Components.Elements.slides[homeHeroSlider.index]);
  }, 50);

  homeHeroSlider.on('active', (slide) => {
    animateSlide(slide.slide);
  });

  homeHeroSlider.on('inactive', (slide) => {
    resetAnimation(slide.slide);
  });

  function animateSlide(slide) {
    const slideId = slide.dataset.slideId;
    let slideContainer = slide.querySelector('.hero-slider_container');
    let heading = slide.querySelector('.heading_xlarge');
    let headingSplit = new SplitType(heading, { // eslint-disable-line
      types: 'words, chars',
      tagName: 'span',
    });
    let char = slide.querySelectorAll('.char');
    let intro = slide.querySelector('.hero-slider_intro');
    let cta = slide.querySelector('.button');
    let imageContainer = slide.querySelector('.hero-slider_image-container');
    let image = slide.querySelector('.hero-slider_image');
    let tl = gsap.timeline();
  
    if (!slide.animation) {
      tl.from(slideContainer, { autoAlpha: 0 });
      tl.from(char, { opacity: 0, yPercent: 100, duration: 0.5, ease: 'back.out(2)', stagger: { amount: 0.25 } });
      tl.from(intro, { opacity: 0, y: 20, duration: 0.5, ease: 'back.out(2)' }, '-=0.5');
      tl.from(cta, { opacity: 0, y: 20, duration: 0.5, ease: 'back.out(2)' }, '-=0.5');
      tl.from(imageContainer, { clipPath: 'circle(0%)', duration: 1.5, ease: 'back.out(2)' }, '-=1.5');
      tl.from(image, { scale: 2, duration: 1.5, ease: 'power4.out' }, '-=1.5');
      slide.animation = slide.animation || {};
      slide.animation[slideId] = tl;
    } else {
      // Restart the stored animation for the slide with the same slideId
      slide.animation[slideId].progress(0).play();
    }
  }  

  function resetAnimation(slide) {
    const slideId = slide.dataset.slideId;
    if (slide.animation && slide.animation[slideId]) {
      slide.animation[slideId].progress(0).pause(); // Restart the stored animation
    }
  }
}

function sliderHomePrograms() {
  const programSlider = new Splide('.programs-slider', {
    type: 'loop',
    perPage: 5,
    perMove: 1,
    gap: '.5rem',
    pagination: false,
    autoplay: true,
    interval: 5000,
    breakpoints: {
      568: {
        perPage: 2,
      },
    },
  });

  programSlider.mount();
}

function sliderHomePartners() {
  const partnersSlider = new Splide('.partners-slider', {
    type: 'loop',
    rewind: true,
    perPage: 6,
    perMove: 1,
    gap: '1.5rem',
    pagination: false,
    breakpoints: {
      568: {
        perPage: 3,
      },
    },
  });

  partnersSlider.mount();
}
