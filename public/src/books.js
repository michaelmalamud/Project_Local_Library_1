// Note: Please do not change the name of the functions. The tests use those names to validate your code.

/*
The `findAuthorById()` function in `public/src/books.js` has two parameters, in the following order:

- An array of authors.
- An ID of a single author.

It returns the author object that has the matching ID.

--a simple find method should do the trick. match find for authors, match author.id to id parameter
*/

// function findAuthorById(authors, id) {
//   const correctAuthor = authors.find((author) => {
//     if (author.id === id) {
//       return author
//     }
//   });
//   return correctAuthor;
// }

function findAuthorById(authors, id) {
  return authors.find((author) => author.id === id)
}
// The `findBookById()` function in `public/src/books.js` has two parameters, in the following order:
// - An array of books.
// - An ID of a single book.

// It returns the book object that has the matching ID.

// **Example:**

// ```javascript
// findBookById(books, "5f447132320b4bc16f950076");
// /*
//   {
//     id: "5f447132320b4bc16f950076",
//     title: "est voluptate nisi",
//     ...
//   }
// */

//--find function again! loop through books, find the id that matches, return book.

// function findBookById(books, id) {
//   const foundBookById = books.find((book) => {
//     if (book.id === id) 
//     return book;
//   });
//   return foundBookById;
// }

function findBookById(books, id) {
  return books.find((book) => book.id === id)
}

/* 
1. set const booksLoanedOut to...
   a. filter books => some book.borrows (borrow.returned === false)

2. set const booksReturned to...
   a. filter books => some book.borrows (borrow.returned === true)

3. return [booksLoanedOut, booksReturned]
*/

// function partitionBooksByBorrowedStatus(books) {
//   const booksLoanedOut = books.filter((book) => {
//     return book.borrows.some((bookBorrow) => bookBorrow.returned === false);
//   });
//   const booksReturned = books.filter((book) => {
//     return book.borrows.every((bookBorrow) => bookBorrow.returned === true);
//   });
//   return [booksLoanedOut, booksReturned]
// }

// function partitionBooksByBorrowedStatus(books) {
//   return books.map((book) => {
//     let first = [];
//     let second = [];
//     if (!book.borrows[0].returned) first = first.push(book);
//     else {
//       second = second.push(book);
//     }
//     console.log(first)
//     return first, second
//   })
// }

function partitionBooksByBorrowedStatus(books) {
  return books.reduce((acc, book) => {
    if (!book.borrows[0].returned) acc[0].push(book);
    else {
      acc[1].push(book)
    }
    return acc;
  },[[],[]])
}


/* 
1. Set book.borrows (an array) to a variable, borrows. 
2. Set variable borrowIDs to map book.borrows, and for each one, return the borrow id. This gives you an array of borrow ids. 
3. Set variable borrowReturns to map book.borrows, and for each one, return the borrow: returned value. 
4. Set variable accountIds to map accounts, and for each one, return account.id. 
5. Filter through borrows array. 
    a. If any accountID corresponds to a borrow.id, find the account that matches the accountID, and then add all the info to that specific borrow object. 
    b. Return the new borrow object.
6. Return the results of the filter, sliced to the first 10.
*/ 
// function getBorrowersForBook(book, accounts) {
//   const accountID = accounts.reduce((acc, account) => {
//     acc[account.id] = account
//     return acc
//   }, {})
//   console.log('accountID', accountID)

//   return book.borrows.map(({ id, returned }) => ({
//     ...accountID[id],
//     returned,
//   })).slice(0, 10)
// }

function getBorrowersForBook(book, accounts) {
  const borrows = book.borrows;
  const newArray = borrows.map((borrow) => {
    const accountMatch = accounts.find((account) => borrow.id === account.id);
    return { ...borrow, ...accountMatch }
  })
  return newArray.slice(0, 10)
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
