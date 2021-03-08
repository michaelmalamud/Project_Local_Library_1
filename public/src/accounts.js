// Note: Please do not change the name of the functions. The tests use those names to validate your code.

/*
The `findAccountById()` function in `public/src/accounts.js` has two parameters, 
in the following order:
- An array of accounts.
- An ID of a single account.
It returns the account object that has the matching ID.
*/

const findAccountById = (accounts, id) =>
  accounts.find((account) => account.id === id);

/*
The `sortAccountsByLastName()` function in `public/src/accounts.js` has a single parameter:

- An array of accounts.

It returns a sorted array of objects. The objects are sorted alphabetically by last name.

~~~~~~~~~~~~~~~~~

--Use sort to order the accounts by .name.last. 
*/

const sortAccountsByLastName = (accounts) =>
  accounts.sort((accountA, accountB) =>
    accountA.name.last > accountB.name.last ? 1 : -1
  );

/*
The `getTotalNumberOfBorrows()` function in `public/src/accounts.js` has two parameters, in the following order:

- An account object.
- An array of all books objects.

It returns a _number_ that represents the number of times the account's ID appears in any book's `borrow` array.

--access ids within books' borrows array, which is a value that is within an object,
that is in an array, which is the value of the "borrows" key in a larger object,
which itself is in an array of objects. borrows.id = array -> object -> borrows key ->
array -> object -> id.  
--use reduce to add to an accumulator whenever account.id is found in any of the borrows
in the books array. 
*/

function getTotalNumberOfBorrows(account, books) {
  let result = 0;
  books.forEach((book) => {
    const bookBorrows = book.borrows.filter(
      (borrow) => borrow.id === account.id
    );
    result += bookBorrows.length;
  });
  return result;
}

/*borrowArray.filter((borrow) => {
      return borrow.id === account.id;
    });
  });
  return totalBorrows.length;
}
/*
//const total =  
 /* bookBorrows.forEach((borrow) => {
    console.log(borrow);
 });
 */
/*   if (borrow.id === account.id) {
      let numberOfBorrows = 0;
      borrows.reduce((acc, numberOfBorrows) => { 
      acc + numberOfBorrows; 
      return acc;
      });
      return numberOfBorrows;
    }
  });
  return total;
  */

/*
The `getBooksPossessedByAccount` function in `public/src/accounts.js` has three parameters, in the following order:

- An account object.
- An array of all books objects.
- An array of all author objects.

It returns an array of books and authors that represents all books _currently checked out_ by the given account. _Look carefully at the object below,_ as it's not just the book object; the author object is embedded inside of it.

**Example:**

```javascript
getBooksPossessedByAccount(account, books, authors);
  [
    {
      id: "5f447132320b4bc16f950076",
      title: "est voluptate nisi",
      genre: "Classics",
      authorId: 12,
      author: {
        id: 12,
        name: {
          first: "Chrystal",
          last: "Lester",
        },
      },
      borrows: [
        {
          id: "5f446f2e6059326d9feb9a68",
          returned: false,
        },
        ...
      ],
    },
  ]

--find out whether account.id is equal to the id value in any of the borrows arrays
that are values for objects within the larger book object (which is in an array, and 
that's the books peram)
--if the account.id === any value in the borrow array AND it is checked out, add it to a new array (probably using filter)
--based on a matching id, add the author object as a value to the key author in your new 
array of objects. looping through the author array, if there is a match, take that 
object out. 
*/

function getBooksPossessedByAccount(account, books, authors) {
  return books.filter((book) =>
    book.borrows.some((borrow) => borrow.id === account.id && !borrow.returned)
  ).map((book) => ({
      ...book, //spread operator
      author: authors.find((author) => author.id === book.authorId)
    })
  );
}

/*
function getTotalNumberOfBorrows(account, books) {
  const query = books.filter((book) => {
    return book.borrows.some((borrowsID) => borrowsID.id === account.id);
  });
  return query.length;
}
*/

// authors.find((correctAuthor) => (correctAuthor.id === book.authorId)

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
