//Book Constructor - creates Book object
function Book(title, author, isbn){
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

//UI Constructor - set of prototype methods
function UI(){

  UI.prototype.addBookToList = function(book){
    const list = document.getElementById('book-list');
    //create tr element
    const row = document.createElement('tr');
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X<a></td>
    `;
    list.appendChild(row);
  };
}

//Show Alert
UI.prototype.showAlert = function (message, className){
  //Create div
  const div = document.createElement('div')
  div.className = `alert ${className}`;
  div.appendChild(document.createTextNode(message));
  const container = document.querySelector('.container');
  const form = document.querySelector('#book-form');
  container.insertBefore(div, form);
  setTimeout(function(){
    document.querySelector('.alert').remove()
  }, 3000);
}

//Delete Book
UI.prototype.deleteBook = function(target){
  if (target.className === 'delete'){
    target.parentElement.parentElement.remove();
  }
}

//Clear Fields
UI.prototype.clearFields = function(){
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
}

//Event Listeners
//Add
document.getElementById('book-form').addEventListener('submit', 
function(e){
  //form values
  const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value;
  
  //instatiate book
  const book = new Book(title, author, isbn)
  //instantiate UI 
  const ui = new UI();
  // validate
  if(title === '' || author === '' || isbn ===''){
    //Error Alert
    ui.showAlert('Please fill in all fields', 'error');
  } else {
  //Add book to list
  ui.addBookToList(book);
  ui.showAlert('Book Added!', 'success')
  //clear fields
  ui.clearFields();
  }
  e.preventDefault();
});

//Delete
document.getElementById('book-list').addEventListener('click', 
function(e){
   //instantiate UI 
   const ui = new UI();

   ui.deleteBook(e.target);
   ui.showAlert('Book Deleted', 'success')


  e.preventDefault();
})