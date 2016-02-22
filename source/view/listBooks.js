publiclibrary.view.listBooks = {
  setupUserInterface: function() {
    var tableBodyElement = document.querySelector("table#books>tbody");
    var index = 0, keys = [], key = "", row = {};
    //  load all of the book objects
    Book.loadAll();
    keys = Object.keys(Book.instances);
    //  each book is represented by a table row and each of it's attributes is
    //  represented by a cell
    for (index = 0; index < keys.length; index++) {
      key = keys[index];
      row = tableBodyElement.insertRow();
      row.insertCell(-1).textContent = Book.instances[key].isbn;
      row.insertCell(-1).textContent = Book.instances[key].title;
      row.insertCell(-1).textContent = Book.instances[key].year;
    }
  }
};
