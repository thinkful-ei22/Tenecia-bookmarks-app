'use strict';

const api = (function(){
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/Tenecia/bookmarks';
  
  const getItems = function(callback) {
    $.getJSON(BASE_URL, callback);
  };
  

  //   cconst saveNewItems = function (bookmark, callback, error) {
  //     $.ajax({
  //       url: BASE_URL,
  //       method: 'post',
  //       contentType: 'application/JSON',
  //       data: JSON.stringify(bookmark),
  //       success: callback,
  //       error: error,
  //     });
  //   };

  //   const deleteItems = function(id, callback) {
  //     $.ajax({
  //       url: `${BASE_URL}/${id}`,
  //       method: 'delete',
  //       contentType: 'application/JSON',
  //       success: callback,
  //     });
  //   };

  //   const updateItems = function(id, callback, error) {
  //     $.ajax({
  //       url: `${BASE_URL}/${id}`,
  //       method: 'patch',
  //       contentType: 'application/JSON',
  //       success: callback,
  //       error: error,
  //     });
  //   };

  return {
    getItems,
    saveNewItems,
    // deleteItems,
    // updateItems,
  };
}());