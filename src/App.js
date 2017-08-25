import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import BookList from './BookList'
import SearchPage from './SearchPage'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({
        books: books
      })
    })
  }

  updateBook(selectedBook, newShelf) {
    BooksAPI.update(selectedBook, newShelf).then(() => {
      selectedBook.shelf = newShelf
      this.setState((prevState) => ({
        books: prevState.books.filter(b => b.id !== selectedBook.id).concat([selectedBook])
      }))
    })
  }

  render() {

    const onUpdateFunc = (selectedBook, newShelf) => this.updateBook(selectedBook, newShelf)

    return (
      <div className='app'>
        <Route exact path='/' render={() => (
          <div>
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <BookList
                  title='Currently Reading'
                  books={this.state.books.filter((b) => b.shelf === 'currentlyReading')}
                  onUpdate={onUpdateFunc}
                />
                <BookList
                  title='Want To Read'
                  books={this.state.books.filter((b) => b.shelf === 'wantToRead')}
                  onUpdate={onUpdateFunc}
                />
                <BookList
                  title='Read'
                  books={this.state.books.filter((b) => b.shelf === 'read')}
                  onUpdate={onUpdateFunc}
                />
              </div>
            </div>
            <div className="open-search">
              <Link to='/search'>Add a Book</Link>
            </div>
          </div>
        )}/>
        <Route path='/search' render={() => (
          <SearchPage onUpdate={onUpdateFunc} booksOnShelf={this.state.books}/>
        )}/>
      </div>
    )
  }
}

export default BooksApp;
