'use strict';

const handleAddButton = function() {
  $('.addItem').click( () => {
    store.newBookmark = !store.newBookmark;
    $('.addBookmark').attr('style', 'display: block');
    library.renderPage();
  });
};
  
const handleCloseButton = function () {
  $('.editForm').on('click', '.close', (e) => {
    e.preventDefault();
    $('.addBookmark').attr('style', 'display: none');
    store.newBookmark = !store.newBookmark;
  });
};

$(document).ready(function() {
  handleAddButton();
  handleCloseButton();
  bookmarkList.bindHandlers();
  API.getBookmarks((bookmarks) => {
    store.items = bookmarks;
    bookmarkList.renderPage();
  });
});