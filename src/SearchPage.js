import React from 'react'
import { Link } from 'react-router-dom'
import BookList from './BookList'
import * as BooksAPI from './BooksAPI'

class SearchPage extends React.Component {

  state = {
    query: '',
    searchResults: []
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim() })
    this.updateResults()
  }

  updateResults = debounce(() => {
    if (this.state.query) {
      BooksAPI.search(this.state.query.trim(), 10).then((books) => {
        this.setState({searchResults: books})
      })
    } else {
      this.setState({searchResults: []})
    }
  }, 300)

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input
              onChange={(event) => this.updateQuery(event.target.value)}
              type="text"
              placeholder="Search by title or author"
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            <BookList books={this.state.searchResults}/>
          </ol>
        </div>
      </div>
    )
  }
}


const debounce = (callback, wait, context = this) => {

  let timeout = null
  let callbackArgs = null

  const later = () => callback.apply(context, callbackArgs)

  return function() {
    callbackArgs = arguments
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

export default SearchPage
