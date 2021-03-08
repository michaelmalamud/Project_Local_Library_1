function partitionBooksByBorrowedStatus(books) {
  const booksLoanedOut = books.filter((book) => {
    return book.borrows.some((bookBorrow) => bookBorrow.returned === false);
  });
  const booksReturned = books.filter((book) => {
    return book.borrows.every((bookBorrow) => bookBorrow.returned === true);
  });
  return [booksLoanedOut, booksReturned];
}

module.exports = partitionBooksByBorrowedStatus;
