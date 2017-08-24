import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import BookList from './BookList'
import SearchPage from './SearchPage'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends Component {
  state = {
    currentBooks: [],
    wantedBooks: [],
    finishedBooks: []
  }
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({
        currentBooks: books.filter((b) => b.shelf === 'currentlyReading'),
        wantedBooks: books.filter((b) => b.shelf === 'wantToRead'),
        finishedBooks: books.filter((b) => b.shelf === 'read')
      })
    })
  }
  render() {
    return (
      <div className='app'>
        <Route exact path='/' render={() => (
          <div>
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <BookList books={this.state.currentBooks} title='Currently Reading'/>
                <BookList books={this.state.wantedBooks} title='Want To Read'/>
                <BookList books={this.state.finishedBooks} title='Read'/>
              </div>
            </div>
            <div className="open-search">
              <Link to='/search'>Add a Book</Link>
            </div>
          </div>
        )}/>
        <Route path='/search' component={SearchPage}/>
      </div>
    )
  }
}

export default BooksApp;
