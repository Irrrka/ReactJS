import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Input from './../common/Input';
import './Edit.css';

class Edit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      book: {},
      message: '',
    };
  }

  componentDidMount() {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
    axios.get('/api/book/'+this.props.match.params.id)
      .then(res => {
        this.setState({ book: res.data });
      });
  }

  onChange = (e) => {
    const state = this.state.book
    state[e.target.name] = e.target.value;
    this.setState({book:state});
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { isbn, title, author, shortDescription, description, publishedYear, publisher, imageURL, price, category } = this.state.book;

    axios.put('/api/book/'+this.props.match.params.id, { isbn, title, author, shortDescription, description, publishedYear, publisher, imageURL, price, category })
      .then((result) => {
        this.props.history.push("/book/"+this.props.match.params.id)
      })
      .catch((error) => {
        if(error.response.status === 401) {
          this.setState({ message: 'Edit failed. Check the form for errors' });
        }
      });
  }

  render() {
    return (
      <div class="container">
        <div class="panel">
            <h2 class="edit-title">
              Edit Book
            </h2>
            <form onSubmit={this.onSubmit}>
            {this.state.message !== '' &&
            <div class="alert alert-warning alert-dismissible fade show" role="alert">
              <strong>Error</strong> {this.state.message}
              <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          }
              <div class="form-group">
                <Input
                  name="isbn"
                  type="text"
                  value={this.state.book.isbn}
                  placeholder=" ISBN"
                  onChange={this.onChange}
                  label="ISBN" />
              </div>
              <div class="form-group">
                <Input
                  name="title"
                  type="text"
                  value={this.state.book.title}
                  placeholder=" Title"
                  onChange={this.onChange}
                  label="Title" />
              </div>
              <div class="form-group">
                <Input
                  name="author"
                  type="text"
                  value={this.state.book.author}
                  placeholder=" Author"
                  onChange={this.onChange}
                  label="Author" />
              </div>
              <div class="form-group">
                <label for="short_description" className="sr-only">Short Description:</label>
                <textArea class="form-control" name="shortDescription" onChange={this.onChange} placeholder="Short Description" cols="80" rows="2">{this.state.book.shortDescription}</textArea>
              </div>
              <div class="form-group">
                <label for="description" className="sr-only">Description:</label>
                <textArea class="form-control" name="description" onChange={this.onChange} placeholder="Description" cols="80" rows="3">{this.state.book.description}</textArea>
              </div>
              <div class="form-group">
                <Input
                  name="publishedYear"
                  type="number"
                  value={this.state.book.publishedYear}
                  placeholder=" Published Year"
                  onChange={this.onChange}
                  label="Published Date" />
              </div>
              <div class="form-group">
                <Input
                  name="publisher"
                  type="text"
                  value={this.state.book.publisher}
                  placeholder=" Publisher"
                  onChange={this.onChange}
                  label="Publisher" />
              </div>
              <div class="form-group">
                <Input
                  name="category"
                  type="text"
                  value={this.state.book.category}
                  placeholder=" Category"
                  onChange={this.onChange}
                  label="Category" />
              </div>
              <div class="form-group">
                <Input
                  name="price"
                  type="number"
                  value={this.state.book.price}
                  placeholder=" Price"
                  onChange={this.onChange}
                  label="Price" />
              </div>
              <div class="form-group">
                  <Input
                  name="imageURL"
                  type="text"
                  value={this.state.book.imageURL}
                  placeholder=" Image URL"
                  onChange={this.onChange}
                  label="Image" />
                <img src={this.state.book.imageURL} alt="img" />
              </div>
              <Link to={`/book/${this.state.book._id}`} class="btn btn-secondary mr-3">Back to Book</Link>
              <button type="submit" class="btn btn-secondary">Edit Book</button>
            </form>
        </div>
      </div>
    );
  }
}

export default Edit;