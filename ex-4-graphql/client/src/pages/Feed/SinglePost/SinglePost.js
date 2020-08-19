import React, { Component } from 'react';

import Image from '../../../components/Image/Image';
import { baseUrl, graphQLFetch } from '../../../util/api';
import './SinglePost.css';

class SinglePost extends Component {
  state = {
    title: '',
    author: '',
    date: '',
    image: '',
    content: ''
  };

  componentDidMount() {
    const postId = this.props.match.params.postId;
    const graphQLQuery = {
      query: `
        {
          getPost(id: "${postId}") {
            title,
            content
            image
            creator {
              name
            }
            createdAt
          }
        }
      `
    }

    graphQLFetch(graphQLQuery, this.props.token)
      .then(res => {
        return res.json();
      })
      .then(({ errors, data }) => {
        if (errors) {
          throw new Error('Failed to fetch post');
        }
 
        const {
          title, 
          content, 
          image, 
          creator, 
          createdAt
        } = data.getPost;

        this.setState({
          title,
          content,
          image: `${baseUrl}/images/${image}`,
          author: creator.name,
          date: new Date(createdAt).toLocaleDateString('en-US'),
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <section className="single-post">
        <h1>{this.state.title}</h1>
        <h2>
          Created by {this.state.author} on {this.state.date}
        </h2>
        <div className="single-post__image">
          <Image contain imageUrl={this.state.image} />
        </div>
        <p>{this.state.content}</p>
      </section>
    );
  }
}

export default SinglePost;
