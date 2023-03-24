function library() {
  const searchInput = $('#library-search_input');
  const searchReset = $('#library-search_reset');
  const searchSubmit = $('#library-search_submit');
  const filterTrigger = $('.jetboost-filter-trigger');
  const typesClear = $('.library-types_clear');

  // Set input type to "search" on page load
  searchInput.attr('type', 'search');
  searchReset.hide();

  // Check if there are any query parameters on page load
  updateFeaturedArticlesVisibility();

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
}

// Show featured articles
function showFeaturedArticles() {
  const featuredArticles = $('.library-articles.is-featured');
  if (featuredArticles.length > 0) {
    featuredArticles.show();
  }
}

// Hide featured articles
function hideFeaturedArticles() {
  const featuredArticles = $('.library-articles.is-featured');
  if (featuredArticles.length > 0) {
    featuredArticles.hide();
  }
}

// Update featured articles visibility based on the query string
function updateFeaturedArticlesVisibility() {
  const searchParams = new URLSearchParams(window.location.search);
  if (searchParams.toString().length > 0) {
    hideFeaturedArticles();
  } else {
    showFeaturedArticles();
  }
}

window.JetboostListUpdated = function (collectionList) {
  updateFeaturedArticlesVisibility();
};
