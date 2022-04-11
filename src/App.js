import React from 'react';
import './App.css';
import BookMain from "./Components/BookMain";
import BookSearch from "./Components/BookSearch";
import * as BooksAPI from './Components/BooksAPI';
import { Routes, Route } from 'react-router-dom'

class App extends React.Component {
  state = {
    booksOnShelf: [],
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState(() => ({
          booksOnShelf: books
        }))
      })
  }

  handleShelfChange = (book, shelf) => {
    BooksAPI.update(book, shelf)
      .then(() => {
        BooksAPI.getAll()
          .then((books) => {
            this.setState(() => ({
              booksOnShelf: books
            }))
          })
      })
  }

  render() {
    return (
      <div className="app">
        <Routes>
          <Route
            exact path='/'
            element={
              <BookMain
                shelfBooks={this.state.booksOnShelf}
                shelfChange={this.handleShelfChange}
              />
            }
            />
          <Route
            path='/search'
            element={
              <BookSearch
                shelfBooks={this.state.booksOnShelf}
                shelfChange={this.handleShelfChange}
              />
            }
          />
        </Routes>
      </div>
    )
  }
}

export default App;