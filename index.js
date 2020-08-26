var LibSys = function() {
  'use strict'

  let privateStore = [];
  let lentBooks = [];

  function privateAddBook() {
      var newBook = prompt('\n Please add book in format: "Name, Author, ISBN" separating with comma\'s as shown.').trim();
      if (newBook && newBook.includes(',')) {
        newBook = newBook.split(',');
        if (!isNaN(newBook[2]) || newBook[2].length == 10 || newBook[2].length == 13){
        newBook = ['Index: ' + function() { return privateStore.length + 1 }(), ' Name: ' + newBook[0], ' Author: ' + newBook[1], ' ISBN: ' + newBook[2] + '\n']
        privateStore.push(newBook);
        console.log('Succesfully added a book to store.')
        return true;
      } else {
        console.log('ISBN is incorrect.');
        privateAddBook();
      }
      } else {
        privateAddBook();
      }
    }

  function displayAvailableBooks () {
    if (privateStore.length == 0) {
      console.log('No books in store at the moment');
      return false;
    } else {
      console.log('Here\'s the list of avalaible books: \n' + privateStore);
      return true;
      }
}

  function privateLendBook() {

    if (displayAvailableBooks()) {
      let lendIndex = prompt('Please input the INDEX of a book to be lent from this list: ');
      lentBooks.push(privateStore.splice(lendIndex - 1, 1));
      console.log('Succesfully lent book.')
    }
}

  function displayLentBooks() {
    if (lentBooks.length == 0) {
      console.log('No lent/borrowed books to show');
      return false
    } else {
      console.log('Here\'s the list of lent/borrowed books: \n ' + lentBooks);
      return true;
    }
}

  function privateReturnBook() {
    if (displayLentBooks()) {
      let returnIndex = prompt('Please input the INDEX of the book to be returned from this list: ');
      privateStore.push(lentBooks.splice(returnIndex - 1, 1));
      console.log('Succesfully returned book');
    }  
}

  return {
    addBook: privateAddBook,
    lendBook: privateLendBook,
    returnBook: privateReturnBook,
    viewAvailableBooks: displayAvailableBooks,
    viewLentBooks: displayLentBooks
  };
}();



console.log('Hello and welcome to the book store.');

function interface () {
  var account = confirm('Are you an Admin?');
  var userName;
  function interfaceInner() {
  let action;

    if (account) {
    action = prompt('\n Hey, Admin, what would you like to do? Pls state either \n a. Add book \n b. Lend book \n c. Return book \n d. View available books or \n e. View lent books \n');
  } else {
    if (!userName) {
      userName = prompt('\n Hey, User, what\'s your name?');
    }
    action = prompt('\n What would you like to do, ' + userName + '? Pls state either \n a. Donate book \n b. Borrow book \n c. Return book \n d. View available books or \n e. View borrowed books \n ');
    }

  if (action) {
    switch (action.trim()) {
      case 'a': case 'Add book': case 'Donate book':
      LibSys.addBook();
      break; 

      case 'b': case 'Lend book': case 'Borrow book':
      LibSys.lendBook();
      break; 

      case 'c': case 'Return book':
      LibSys.returnBook();
      break; 

      case 'd': case 'View available books':
      LibSys.viewAvailableBooks();
      break; 

      case 'e': case 'View lent books': case 'View borrowed books':
      LibSys.viewLentBooks();
      break;  

      default: 
      console.log('That was not a valid option. Pls re-enter.');
      interfaceInner();
      break; 
    }
  }
  var end = confirm('\n Do you want to exit the store?');
  if (end) {
    if (action == 'a' || action == 'b' || action == 'c'||action == 'd' || action == 'e') {
      console.log('Thank you for stopping by today.');} else {console.log('\n Thank you for stopping by to ' + action.toLowerCase() + '.')}
  } else {
    interfaceInner();
    }
  }
  interfaceInner(); 
  var login = confirm('\n Login again?');
  if (login) {
    interface();
  } else {
    if (userName) { console.log('\n Alright, goodbye then, ' + userName);} else {console.log('\n Alright, goodbye then, Admin.')}
    }
}

interface();
