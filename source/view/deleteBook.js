publiclibrary.view.deleteBook = {
  setupUserInterface: function() {
    var deleteButton = document.forms['Book'].commit;
    var selectElement = document.forms['Book'].selectBook;
    var index = 0, key = "", keys = [], book = null, optionElement = null;

    //  load all book objects
    Book.loadAll();
    keys = Object.keys(Book.instances);

    //  populate the select list with books
    for (index = 0; index < keys.length; index++) {
      key = keys[index];
      book = Book.instances[key];
      optionElement = document.createElement("option");
      optionElement.text = book.title;
      optionElement.value = book.isbn;
      selectElement.add(optionElement, null);
    }

    deleteButton.addEventListener("click", 
                publiclibrary.view.deleteBook.handleDeleteButtonClickEvent);
    window.addEventListener("beforeunload", function() {
      Book.saveAll();
    });
  },
  handleDeleteButtonClickEvent: function() {
    var selectElement = document.forms['Book'].selectBook;
    var isbn = selectElement.value;
    if (isbn) {
      Book.destroy(isbn);
      selectElement.remove(selectElement.selectedIndex);
    }
  }
};
