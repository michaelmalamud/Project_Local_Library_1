// Note: Please do not change the name of the functions. The tests use those names to validate your code.

/* 
1. Using reduce, for each book in the books array, add 1 to the accumulator that has a starting value of 0.
*/
function getTotalBooksCount(books) {
  const totalBooks = books.reduce((total) => {
    total += 1;
    return total;
  }, 0);
  return totalBooks;
}

/* 
1. Using reduce, for each account in the accounts, add 1 to the accumulator that has a starting value of 0.
*/
function getTotalAccountsCount(accounts) {
  const totalAccounts = accounts.reduce((total) => {
    total += 1;
    return total;
  }, 0);
  return totalAccounts;
}

/* 
1. Use the function partitionBooksByBorrowedStatus on the books parameter to get an array that contains two arrays within it, the first being the books that are checked out and the second being the books that are not.
2. Set a variable to the first element in the above array (this variable is now the array that I want to work with).
3. Return that variable's length. 
*/

let partition = require("./helper-function.js");

function getBooksBorrowedCount(books) {
  const partitionedBooks = partition(books)
  const borrowedBooks = partitionedBooks[0]
  return borrowedBooks.length;
}

function objSortValues(obj){
  const keysValue = Object.keys(obj);
  return keysValue.sort((keyOne, keyTwo) => {
    if(obj[keyOne] > obj[keyTwo]){
      return -1
    } else if(obj[keyTwo] > obj[keyOne]){
      return 1;
    } else {
      return 0
    }
  });
}


// reduce() method executes a reducer function (that you provide) 
// on each element of the array, resulting in single output value.

// Your reducer function's returned value is assigned to the accumulator, 
// whose value is remembered across each iteration throughout the array, 
// and ultimately becomes the final, single resulting value.
function getMostCommonGenres(books) {
  const count = books.reduce((acc, { genre }) => {
    if(acc[genre]){
      acc[genre] += 1
    } else {
      acc[genre] = 1
    }
    return acc
  }, {});
  console.log('count', count)
  const sorted = objSortValues(count)

  console.log('sorted', sorted)
  return sorted.map((name) => ({
    name,
    count: count[name]
  })).slice(0, 5)
}

function getMostPopularBooks(books) {
// getMostPopularBooks(books);
/*
  [
    { name: "incididunt nostrud minim", count: 30 },
    { name: "culpa do sint", count: 30 },
    { name: "ullamco est minim", count: 29 },
    ...
  ]
*/
  // It returns an array containing five objects or fewer that represents 
  // the most popular books in the library. Popularity is represented by the 
  // number of times a book has been borrowed.

  // const bookID = books.reduce((acc, { id, borrows }) => {
  //   acc[id] = borrows.length
  //   return acc
  // }, {});
  // console.log('bookID', bookID)

  // const sorted = objSortValues(bookID)
  // console.log('sorted', sorted)

  // return sorted.map((id) => {
  //   const { title: name } = books.find(({ id: bookId}) => bookId === id);
  //   console.log('{ title: name }', { title: name })
  //   return { name, count: bookID[id] };
  // }).slice(0, 5)

  const result = books.map((book) => {
    const popularity = {
      name: book.title,
      count: book.borrows.length
    };
    return popularity
  })
  return result.sort((titleA, titleB) => titleB.count - titleA.count).slice(0, 5)
}

function getMostPopularAuthors(books, authors) {
  const count = books.reduce((acc, { authorId, borrows }) => {
    if (acc[authorId]) {
      acc[authorId].push(borrows.length);
    } else {
      acc[authorId] = [borrows.length];
    }
    return acc
  }, {});
  console.log('count', count)

  for(let id in count){
    const sum = count[id].reduce((a, b) => a + b);
    count[id] = sum;
  }

  const sorted = objSortValues(count)
  console.log('sorted', sorted)

  return sorted.map((authorId) => {
    const {
      name: { first, last },
    } = authors.find(({ id }) => id === Number(authorId))

    const name = `${first} ${last}`;
    return { name, count: count[authorId]}
    
  }).slice(0, 5) 
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
