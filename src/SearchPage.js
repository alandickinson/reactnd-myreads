import React from 'react'
import { Link } from 'react-router-dom'
import BookList from './BookList'
import * as BooksAPI from './BooksAPI'
import PropTypes from 'prop-types'

class SearchPage extends React.Component {

  static propTypes = {
    onUpdate: PropTypes.func.isRequired,
    booksOnShelf: PropTypes.array.isRequired
  }

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
      BooksAPI.search(this.state.query.trim(), 20).then((books) => {
        if (books.error) {
          this.setState({searchResults: []})
        } else {
          for(let i=0; i<books.length;i++) {
            for(let j=0; j<this.props.booksOnShelf.length;j++) {
              if (books[i].id === this.props.booksOnShelf[j].id) {
                books[i].shelf = this.props.booksOnShelf[j].shelf
              }
            }
          }
          this.setState({searchResults: books})
        }
      }).catch((err) => console.log(err));
    } else {
      this.setState({searchResults: []})
    }
  }, 300)

  componentDidMount() {
    document.getElementById("searchInput").focus();
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input
              onChange={(event) => this.updateQuery(event.target.value)}
              type="text"
              placeholder="Search by title or author"
              id="searchInput"
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            <BookList
              onUpdate={this.props.onUpdate}
              books={this.state.searchResults}
            />
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
