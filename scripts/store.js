'use strict';
const store = (function() {
  const addItem = function(bookmark) {
    this.items.push(bookmark);
  };
  
  const removeItem = function(id) {
    store.items = store.items.filter(item => item.id !== id);
  };
  
  const updateFiltering = function(rating) {
    this.filtering = rating;
  };
  
  const updateExpanded = function(id) {
    this.expandedBookmark = id;
  };
  
  return {
    items: [],
    newItem: false,
    addItem,
    removeItem,
    filtering: null,
    expandedBookmark: null,
    errorMessage: null,
    updateFiltering,
    updateExpanded,
  };
}());