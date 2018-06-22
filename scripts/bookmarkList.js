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
          <span class="closebtn" id="closebtn">X</span>
          <form>
          <fieldset>
            <button type="submit" class="infoBtn"><i class="far fa-edit"></i></button>
          <label for = "title" class = "formLabel">Website Title</label>
          <input type = "text" class = 'itemInput' name="name" id="js-bookmark-list-title" placeholder= "Add Website Name" title="Name of website bookmark" readonly/>
          <label for = 'url' class = "formLabel">Website URL</label>
          <input type = "url"  class = "itemInput" 
          placeholder = "Add Website URL" name="URL" id="js-bookmark-list-url" title="Website's URL" readonly />
          <label for = 'description' class = "formLabel">Website Description</label>
          <input type = "text"  class = "markInfo" 
          placeholder = "Add Website Description" name = "Description" id = "js-bookmark-list-description" title = "website's Description" readonly/>
          <label for = 'description' class = "bmformLabel" ></label>
          <input type = "number"  class = "bmRating" placeholder = "Rate 1-5" name = "bookmarkRating" id = "js-bookmark-list-rating" title = "Website's Rating" />
          <button type="submit" class="infoBtn">Visit</button> <button type="reset" class="infoBtn">Delete</button><button class="infoBtn"">Cancel</button>
           </fieldset>
        </form>
        </div>`);
    }
  
    // if (store.filterBy) items = store.items.filter(item => item.rating >= store.filterBy);
  
    // const htmlString = createHTML(items);
    // $('.bookmark-container').html(htmlString);
    // $('h2').html(`My Book Marks: ${store.items.length}`);
  
    // if (store.errorMsg) {
    //   let message = store.errorMsg;
    //   if (message.includes('title')) {
    //     $('.jsTitle').toggleClass('invalid');
    //     $('.jsTitle').after('<p class="errorMessage">A title is Required</p>');
    //   }
    //   if (message.includes('url')) {
    //     $('.jsUrl').toggleClass('invalid');
    //     $('.jsUrl').after('<p class="errorMessage">A URL is required and must begin with HTTP(s)://</p>');
    //   }
    // }
  
    if (store.expandedElement) {
      $(`[data-id=${store.expandedElement}]`).children('.expansion-container').html(`
        <span>Description:</span>
        <p>${store.items.find(item => item.id === store.expandedElement).desc}</p>
        <a href = "${store.items.find(item => item.id === store.expandedElement).url}">Visit Site</a>
        <button class="editButton">Edit</button>
        `);
    }
  };
  
  const getElementId = function (element) {
    const id = $(element).closest('.bookmark').data('id');
    return id;
  };
  
  const handleError = function (response) {
    store.errorMsg = response.responseJSON.message,
    renderPage();
  };
  
  const handleSubmitAddForm = function () {
    $('.addForm').on('submit', 'form', e => {
      e.preventDefault();
      const bookmark = {
        title: $('.jsTitle').val(),
        rating: $('.jsRating').val(),
        url: $('.jsUrl').val(),
        desc: $('.jsDescription').val(),
      };
      API.saveNewBookmarks(bookmark, (response) =>{
        $('form')[0].reset();
        $('.addForm').attr('style', 'display: none');
        store.editBookmark = !store.editBookmark;
        store.errorMsg = null;
        store.addItem(response);
        renderPage();
      }, handleError);
    });
  };
  
  //   const handleDeletePress = function() {
  //     $('.bookmark-container').on('click', '.delete', (e) => {
  //       e.stopPropagation();
  //       const id = getElementId(e.currentTarget);
  //       API.deleteBookmarks(id, () => {
  //         store.removeItem(id);
  //         renderPage();
  //       });
  //     });
  //   };
    
  //   const handleFilterOptionSelect = function() {
  //     $('.bookMarkFilter').change( e => {
  //       store.updateFilterBy($(e.currentTarget).val());
  //       renderPage();
  //     });
  //   };
  
  //   const handleElementSelectExpansion = function() {
  //     $('.bookmark-container').on('click', '.bookmark', (e) => {
  //       const id = getElementId(e.currentTarget);
  //       if (id === store.expandedElement) {
  //         store.expandedElement = null;
  //         renderPage();
  //       }else {
  //         store.updateExpandedElement(id);
  //         renderPage();
  //       }
  //     });
  //   };
  
  const bindEventHandlers = function() {
    handleSubmitAddForm();
    // handleDeletePress();
    // handleFilterOptionSelect();
    // handleElementSelectExpansion();
  };
  
  return {
    renderPage,
    bindEventHandlers,
  };
}());