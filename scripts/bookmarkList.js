'use strict';
/* global store, API  */

const library = (function(){
  const createElement = function(marker) {
    return `
      <li class="marker" data-id="${marker.id}">
        <span class="title">${marker.title}</span>
        <p>Rating: ${marker.rating}</p>
        <div class="expansion-container"></div>
        <button class="delete" arai-lablel="delete ${marker.title} button"><i class="fa fa-trash"></i>Trash</button>
      </li>
      `;
  };
  
  const createHTML = function(markers) {
    const html = markers.map(marker => createElement(marker));
    return html.join('');
  };
  
  const renderPage = function (){
    let items = store.items;
  
    if (store.editBookmark) {
      $('.Editform').html(`<div class="editFormContainer">
          <form>
          <fieldset>
          <label for = "title" class = "formLabel">Website Title</label>
          <input type = "text" class = 'title itemInput' name="name" id="js-bookmark-list-title" placeholder= "Add Website Name" title="Name of website bookmark"/>
          <label for = 'url' class = "formLabel url">Website URL</label>
          <input type = "url"  class = "url itemInput" 
          placeholder = "Add Website URL" name="URL" id="js-bookmark-list-url" title="Website's URL" />
          <label for = "description" class = " description "> Website Description </label>
          <input type = "text"  class = "description markInfo" placeholder = "Add Website Description" name = "description" id = "js-bookmark-list-description" title = "description" />
          <input type = "number"  class = "rating bmRating" placeholder = "Rate 1-5" name = "bookmarkRating" id = "js-bookmark-list-rating" title = "Website's Rating" />
          <button type="submit" class="infoBtn">Visit</button> <button type="reset" class="infoBtn">Delete</button>
           </fieldset>
        </form>
        </div>`);
    }
  
    if (store.filtering) items = store.items.filter(item => item.rating >= store.filtering);
  
    if (store.errorMessage) {
      let message = store.errorMessage;
      if (message.includes('title')) {
        $('.title').toggleClass('invalid');
        $('.title').after('<p class="errorMessage">Title Required</p>');
      }
      if (message.includes('url')) {
        $('.url').toggleClass('invalid');
        $('.url').after('<p class="errorMessage">URL required with HTTP(s)://</p>');
      }
    }
  
    if (store.expandedBookmark) {
      $(`[data-id=${store.expandedBookmark}]`).children('.expansion-container').html(`
        <span>Description:</span>
        <p>${store.items.find(item => item.id === store.expandedBookmark).desc}</p>
        <a href = "${store.items.find(item => item.id === store.expandedBookmark).url}">Visit Site</a>
        <button class="editButton">Edit</button>
        `);
    }
  };
  
  const getElementId = function (element) {
    const id = $(element).closest('.bookmark').data('id');
    return id;
  };
  
  const handleError = function (response) {
    store.errorMessage = response.responseJSON.message,
    renderPage();
  };
  
  const handleSubmit = function () {
    $('.addForm').on('submit', 'form', e => {
      e.preventDefault();
      const bookmark = {
        title: $('.title').val(),
        rating: $('.rating').val(),
        url: $('.url').val(),
        desc: $('.Description').val(),
      };
      API.saveNewBookmarks(bookmark, (response) =>{
        $('form')[0].reset();
        $('.addForm').attr('style', 'display: none');
        store.editBookmark = !store.editBookmark;
        store.errorMessage = null;
        store.addItem(response);
        renderPage();
      }, handleError);
    });
  };
  
  const handleDelete = function() {
    $('.bookmark-container').on('click', '.delete', (e) => {
      e.stopPropagation();
      const id = getElementId(e.currentTarget);
      API.deleteBookmarks(id, () => {
        store.removeItem(id);
        renderPage();
      });
    });
  };
    
  const handleBookmarkFilter = function() {
    $('.bookMarkFilter').change( e => {
      store.updateFiltering($(e.currentTarget).val());
      renderPage();
    });
  };
  
  const handleBookmarktExpansion = function() {
    $('.bookmark-container').on('click', '.bookmark', (e) => {
      const id = getElementId(e.currentTarget);
      if (id === store.expandedBookmark) {
        store.expandedBookmark = null;
        renderPage();
      }else {
        store.updateExpanded(id);
        renderPage();
      }
    });
  };
  
  const bindHandlers = function() {
    handleSubmit();
    handleDelete();
    handleBookmarkFilter();
    handleBookmarktExpansion();
  };
  
  return {
    renderPage,
    bindHandlers,
  };
}());