publiclibrary.view.createBook = {
  setupUserInterface: function() {
    var saveButton = document.forms['Book'].commit;
    //  load all book objects
    Book.loadAll();
    //  set an event handler for the save button
    saveButton.addEventListener("click", publiclibrary.view.createBook.handleSaveButtonClickEvent);
    window.addEventListener("beforeunload", function() {
      Book.saveAll();
    });
  },
  handleSaveButtonClickEvent: function() {
    var formElement = document.forms['Book'];
    var slots = {isbn: formElement.isbn.value,
                  title: formElement.title.value,
                  year: formElement.year.value};
    Book.add(slots);
    formElement.reset();
  }
};
