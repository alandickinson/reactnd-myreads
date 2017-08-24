import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

class BookList extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    shelf: PropTypes.string
  }
  render() {
    return (
      <div className="bookshelf">
        {this.props.title && (
          <h2 className="bookshelf-title">{this.props.title}</h2>
        )}
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.books.map((book) => (
              <Book key={book.id} book={book}/>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default BookList
