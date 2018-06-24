'use strict';

const bookmarkList = (function(){
  const createBookmark = function(marker) {
    return `
      <li class="marker" data-id="${marker.id}">
        <span class="title">${marker.title}</span>
        <p>Rating: ${marker.rating}</p>
        <div class="expandedItem"></div>
        <button class="delete"><i class="fa fa-trash"></i>Trash</button>
      </li>
      `;
  };

  const createList = function(bookmarks) {
    const html = bookmarks.map(marker => createBookmark(marker));
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
          <button type="submit" class=" addForm subBtn"  "js-shopping-list-entry" id= "js-itemInput-submit">Submit</button>
          <button class="submitForm" type="submit">Submit</button>
        <button class="close subBtn">Exit</button>
          <button type="reset" class="delete infoBtn">Delete</button>
           </fieldset>
        </form>
        </div>`);
    }
  
    if (store.filtering) items = store.items.filter(item => item.rating >= store.filtering);

    const htmlString = createList(items);
    $('.bookmarkListing').html(htmlString);
$('h2').html(`Saved Bookmarks: ${store.items.length}`);
  
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
      $(`[data-id=${store.expandedBookmark}]`).children('.expandedItem').html(`
        <span>Description:</span>
        <p>${store.items.find(item => item.id === store.expandedBookmark).desc}</p>
        <a href = "${store.items.find(item => item.id === store.expandedBookmark).url}">Visit Site</a>
        <button class="editButton infoBtn">Edit</button>
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
      const marker = {
        title: $('.title').val(),
        id: cuid(),
        rating: $('.rating').val(),
        url: $('.url').val(),
        desc: $('.description').val(),
      };
      API.saveNewBookmarks(marker, (response) =>{
        $('form')[0].reset();
        $('.addForm').attr('style');
        store.editBookmark = !store.editBookmark;
        store.errorMessage = null;
        store.addItem(response);
        renderPage();
      }, handleError);
    });
  };
  
  const handleDelete = function() {
    $('.bookmarkListing').on('click', '.delete', (e) => {
      e.stopRender();
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
    $('.bookmarkListing').on('click', '.bookmark', (e) => {
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