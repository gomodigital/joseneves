function faqs() {
  const $faqNav = $('.faq-nav');
  const $faqSections = $('.faq-section');

  $faqSections.each(function () {
    const $section = $(this);
    const $id = $section.find('.faq-group_slug').val();
    const $handle = $section.find('.faq-group_menu-handle').val();

    $section.attr('id', $id);
    $faqNav.append('<a href="#' + $id + '" class="faq-nav_link">' + $handle + '</a>');
    const $firstAccordionItem = $section.find('.faq-accordion_item').first();
    $firstAccordionItem.addClass('is-open');
  });

  const $navLinks = $faqNav.find('.faq-nav_link');
  $navLinks.removeClass('w--current');

  const currentHash = window.location.hash;
  if (currentHash) {
    $navLinks.each(function () {
      const $link = $(this);
      if ($link.attr('href') === currentHash) {
        $link.addClass('w--current');
      }
    });
  }

  // Add click event listeners to each link in the navigation bar
  $navLinks.click(function () {
    $navLinks.removeClass('w--current'); // Remove the w--current class from all links
    $(this).addClass('w--current'); // Add the w--current class to the clicked link
  });

  const $faqWrapper = $('.faq-group_collection-wrapper');
  const faqNavHeight = $faqNav.outerHeight();
  $faqWrapper.css('margin-top', -faqNavHeight);

  $('.faq-accordion_trigger').on('click', function () {
    $(this).parent('.faq-accordion_item').toggleClass('is-open');
  });
}
