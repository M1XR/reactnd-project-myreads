import React from "react";
import BookItem from "./BookItem";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

const BookMain = ({shelfBooks, shelfChange}) => {

  const shelfs = [
    {
      title: 'Currently Reading',
      handle: 'currentlyReading',
    },
    {
      title: 'Want to Read',
      handle: 'wantToRead',
    },
    {
      title: 'Read',
      handle: 'read',
    },
  ]

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        {shelfs.map(shelf => {
          return (
            <div
              className="bookshelf"
              key={shelf.handle}
            >
              <h2 className="bookshelf-title">{shelf.title}</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {shelfBooks.filter(book => book.shelf === shelf.handle).map(book => {
                    return (
                      <BookItem
                        key={book.id}
                        book={book}
                        shelfChange={shelfChange}
                      />)
                  })}
                </ol>
              </div>
            </div>
          )
        })}
      </div>
      <div className="open-search">
        <Link to='/Search'>Add a book</Link>
      </div>
    </div>
  )
}

BookMain.propTypes = {
  shelfBooks: PropTypes.array.isRequired,
  shelfChange: PropTypes.func.isRequired,
}

export default BookMain;