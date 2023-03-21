function library() {
  const searchInput = $('#library-search_input');
  const searchReset = $('#library-search_reset');
  const searchSubmit = $('#library-search_submit');
  const featuredArticles = $('.library-articles.is-featured');
  const filterTrigger = $('.jetboost-filter-trigger');
  const typesClear = $('.library-types_clear');

  // Set input type to "search" on page load
  searchInput.attr('type', 'search');
  searchReset.hide();

  // Check if there are any query parameters on page load
  const searchParams = new URLSearchParams(window.location.search);
  if (searchInput.val().length > 0 || searchParams.toString().length > 0) {
    hideFeaturedArticles();
    searchReset.show();
    searchSubmit.hide();
  } else {
    showFeaturedArticles();
    searchSubmit.show();
  }

  // if (filterTrigger.hasClass('jetboost-filter-active')) {
  //   hideFeaturedArticles();
  // } else {
  //   showFeaturedArticles();
  // }

  // Initialize the MutationObserver
  const observer = new MutationObserver(handleMutations);

  // Set options for the observer
  const observerOptions = {
    attributes: true,
    attributeFilter: ['class'],
    subtree: true
  };

  // Observe filterTrigger and its subtree
  filterTrigger.each(function () {
    observer.observe(this, observerOptions);
  });

  // Handle mutations
  function handleMutations(mutationsList) {
    let activeFilters = 0;

    filterTrigger.each(function () {
      if ($(this).hasClass('jetboost-filter-active')) {
        activeFilters++;
      }
    });

    if (activeFilters > 0) {
      hideFeaturedArticles();
    } else {
      showFeaturedArticles();
    }
  }

  // Show featured articles when filter is clicked
  filterTrigger.on('click', function () {
    if ($(this).hasClass('jetboost-filter-active')) {
      hideFeaturedArticles();
    } else {
      showFeaturedArticles();
    }
  });

  // Show featured articles when clear button is clicked
  typesClear.on('click', function () {
    if (searchInput.val().length === 0) {
      showFeaturedArticles();
    }
  });

  // Fade in search reset button when typing
  searchInput.on('input', () => {
    if (searchInput.val().length > 0) {
      hideFeaturedArticles();
      searchReset.show();
      searchSubmit.hide();
    } else {
      showFeaturedArticles();
      searchReset.hide();
      searchSubmit.show();
    }
  });

  // Clear search input and fade out reset button when reset button is clicked
  searchReset.on('click', () => {
    showFeaturedArticles();
    searchReset.hide();
    searchSubmit.show();
  });

  // Show featured articles
  function showFeaturedArticles() {
    if (featuredArticles.length > 0) {
      featuredArticles.show();
    }
  }

  // Hide featured articles
  function hideFeaturedArticles() {
    if (featuredArticles.length > 0) {
      featuredArticles.hide();
    }
  }
}
