import React from "react";
import BookItem from "./BookItem";
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class BookSearch extends React.Component {
state = {
  input: '',
  search: []
}

handleInput = (query) => {
  const trimmedQuery = query.trim()
  this.setState(() => ({
    input: query
  }))
  this.handleSearch(trimmedQuery)
}

handleSearch = (query) => {
  if (query !== '') {
    BooksAPI.search(query)
      .then((books) => {
        this.setSearch(books)
      })
  } else {
    setTimeout(() => {
      this.setState(() => ({
        search: []
      }))
    }, 1000)
  }
}

setSearch = (searchBooks) => {
  searchBooks.map(searchBook => {

    const result = this.props.shelfBooks.find(shelfBook => shelfBook.id === searchBook.id)

    searchBook.shelf = result ? result.shelf : 'none'
  })
  return (
    this.setState(() => ({
      search: searchBooks
    }))
  )
}

  render () {
    const {shelfChange} = this.props

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/' className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search Terms"
              value={this.state.input}
              onChange={(event) => this.handleInput(event.target.value)}
            />
          </div>
        </div>
          <div className="search-books-results">
            <ol className="books-grid">
              {this.state.search.map(book => {
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
  }
}

BookSearch.propTypes = {
  shelfBooks: PropTypes.array.isRequired,
  shelfChange: PropTypes.func.isRequired,
}

export default BookSearch;