'use strict';
/* global API, store, library  */

const handleAddBtn = function() {
  $('.addItem').click( () => {
    store.newBookmark = !store.newBookmark;
    $('.addBookmark').attr('style', 'display: block');
    library.renderPage();
  });
};
  
// const handleCloseBtn = function () {
//   $('.editForm').on('click', '.closebtn', (e) => {
//     e.preventDefault();
//     $('.addBookmark').attr('style', 'display: none');
//     store.newBookmark = !store.newBookmark;
//   });
// };
  
// const handleClickOutsideaddBookmark = function () {
//   $('.addBookmark').click( () =>{
//     $('.addBookmark').attr('style', 'display: none');
//     store.newBookmark = !store.newBookmark;
//   });
//   $('.addBookmark').on('click', '.formcontainer',  (e) => {
//     e.stopPropagation();
//   });
// };
  
$(document).ready(function() {
  handleAddBtn();
//   handleCloseBtn();
//   handleClickOutsideForm();
//   library.bindEventHandlers();
//   API.getBookmarks((bookmarks) => {
//     store.items = bookmarks;
//     library.renderPage();
  });
});