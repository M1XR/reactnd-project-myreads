import React from "react";
import PropTypes from 'prop-types';

const BookItem = ({book, shelfChange}) => {

  const onShelfChange = (event) => {
    event.preventDefault();
    shelfChange(book, event.target.value)
  }

  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            key={book.id+'-book-cover'}
            style={
              { 
                width: 128,
                height: 193,
                backgroundImage: (book.imageLinks) ? `url(${book.imageLinks.thumbnail})` : '',
              }
            }
          ></div>
          <div
            className="book-shelf-changer"
            key={book.id+'-book-shelf-changer'}
          >
            <select
              value={book.shelf}
              onChange={onShelfChange}
            >
              <option
                key={book.id+'-move'}
                value="move"
                disabled
              >Move to...</option>
              <option
                key={book.id+'-currentlyReading'}
                value="currentlyReading"
              >Currently Reading</option>
              <option
                key={book.id+'-wantToRead'}
                value="wantToRead"
              >Want to Read</option>
              <option
                key={book.id+'-read'}
                value="read"
              >Read</option>
              <option
                key={book.id+'-none'}
                value="none"
              >None</option>
            </select>
          </div>
        </div>
        <div
          className="book-title"
          key={book.id+'-title'}
        >{(book.title) ? book.title : ''}</div>
        <div
          className="book-authors"
          key={book.id+'-authors'}
        >{(book.authors) ? book.authors.join(', ') : ''}</div>
      </div>
    </li>
  )
}

BookItem.propTypes = {
  book: PropTypes.object.isRequired,
  shelfChange: PropTypes.func.isRequired,
}

export default BookItem;