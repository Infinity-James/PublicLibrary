function Book (slots) {
  this.isbn = slots.isbn;
  this.title = slots.title;
  this.year = slots.year;
};

Book.instances = {};

Book.convertRowToObject = function(bookRow) {
  var book = new Book(bookRow);
  return book;
};

Book.loadAll = function() {
  var index = 0, key = "", keys = [], bookTableString = "", bookTable = {};
  try {
      if (localStorage["bookTable"]) {
        bookTableString = localStorage["bookTable"];
      }
  } catch (exception) {
    alert("Error when reading from local storage.\n" + exception);
  }

  if (bookTableString) {
    bookTable = JSON.parse(bookTableString);
    keys = Object.keys(bookTable);
    console.log(keys.length + " books loaded.");
    for (index = 0; index < keys.length; index++) {
      key = keys[index];
      Book.instances[key] = Book.convertRowToObject(bookTable[key]);
    }
  }
};

Book.saveAll = function() {
  var bookTableString = "", error = false, bookCount = Object.keys(Book.instances).length;
  try {
    bookTableString = JSON.stringify(Book.instances);
    localStorage["bookTable"] = bookTableString;
  } catch (exception) {
    alert("Error when writing to local storage.\n" + exception);
    error = true
  }

  if (!error) {
    console.log(bookCount + " books saved.");
  }
};

Book.add = function(slots) {
  var book = new Book(slots);
  Book.instances[slots.isbn] = book;
  console.log("Book " + slots.isbn + " created.");
};

Book.update = function(slots) {
  var book = Book.instances[slots.isbn];
  var year = parseInt(slots.year);
  if (book.title !== slots.title) {
    book.title = slots.title;
  }
  if (book.year !== year) {
    book.year = slots.year;
  }
  console.log("Book " + slots.isbn + " modified.");
};

Book.destroy = function(isbn) {
  if (Book.instances[isbn]) {
    delete Book.instances[isbn];
    console.log("Book " + isbn + " deleted.");
  } else {
    console.log("There is no book with the ISBN " + isbn + " to delete.");
  }
};

Book.createTestData = function() {
  Book.instances["006251587X"] = new Book({isbn:"006251587X", title:"Weaving the Web", year:2000});
  Book.instances["0465026567"] = new Book({isbn:"0465026567", title:"G&ouml;del, Escher, Bach", year:1999});
  Book.instances["0465030793"] = new Book({isbn:"0465030793", title:"I Am A Strange Loop", year:2008});
  Book.saveAll();
};

Book.clearData = function() {
  if (confirm("Do you really want to delete all of the book data?")) {
    localStorage["bookTable"] = "{}";
  }
};
