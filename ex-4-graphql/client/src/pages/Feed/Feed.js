import React, { Component, Fragment } from 'react';

import Post from '../../components/Feed/Post/Post';
import Button from '../../components/Button/Button';
import FeedEdit from '../../components/Feed/FeedEdit/FeedEdit';
import Input from '../../components/Form/Input/Input';
import Paginator from '../../components/Paginator/Paginator';
import Loader from '../../components/Loader/Loader';
import ErrorHandler from '../../components/ErrorHandler/ErrorHandler';
import { graphQLFetch, imageUrl } from '../../util/api';
import './Feed.css';

class Feed extends Component {
  state = {
    isEditing: false,
    posts: [],
    totalPosts: 0,
    editPost: null,
    status: '',
    postPage: 1,
    postsLoading: true,
    editLoading: false
  };

  componentDidMount() {
    const graphQLQuery = {
      query: ` 
        {
          getUser(id: "${this.props.userId}") {
            status
          }
        }
      `
    };

    graphQLFetch(graphQLQuery, this.props.token)
      .then(res => {
        return res.json();
      })
      .then(({ errors, data }) => {
        if (errors) {
          throw new Error('Failed to fetch user status.');
        }
 
        this.setState({ status: data.getUser.status });
      })
      .catch(this.catchError);

    this.loadPosts();
  }

  loadPosts = direction => {
    if (direction) {
      this.setState({ postsLoading: true, posts: [] });
    }
    let page = this.state.postPage;
    if (direction === 'next') {
      page++;
      this.setState({ postPage: page });
    }
    if (direction === 'previous') {
      page--;
      this.setState({ postPage: page });
    }
    
    const graphQLQuery = {
      query: `
        {
          getPosts(page: ${page}) {
            posts {
              _id
              title
              content
              image
              creator {
                name
              }
              createdAt
            }
            totalItems
          }
        }
      `
    };

    graphQLFetch(graphQLQuery, this.props.token)
      .then(res => {
        return res.json();
      })
      .then(({ data, errors }) => {
        if (errors) {
          throw new Error('Failed to fetch posts.');
        }

        const {posts, totalItems: totalPosts} = data.getPosts;
 
        this.setState({
          posts,
          totalPosts,
          postsLoading: false
        });
      })
      .catch(this.catchError);
  };

  uploadImage = image => {
    if (image) {
      const formData = new FormData();
  
      formData.append('image', image);
      
      return fetch(imageUrl, {
        body: formData,
        headers: {
          Authorization: `Bearer ${this.props.token}`
        },
        method: 'POST'
      })
      .then(res => {
        return res.json();
      })
      .then(({ error, message, image }) => {
        if (error) {
          throw new Error(message);
        }
        return image;
      });
    } else {
      return Promise.resolve();
    }
  };

  statusUpdateHandler = event => {
    event.preventDefault();

    const graphQLQuery = {
      query: `
        mutation {
          updateUser(status: "${this.state.status}") {
            status
          }
        }
      `
    };

    graphQLFetch(graphQLQuery, this.props.token)
      .then(res => {
        return res.json();
      })
      .then(({ errors, data }) => {
        if (errors) {
          throw new Error("Can't update status!");
        }
        console.log(data.updateUser.status);
      })
      .catch(this.catchError);
  };

  newPostHandler = () => {
    this.setState({ isEditing: true });
  };

  startEditPostHandler = postId => {
    this.setState(prevState => {
      const loadedPost = { ...prevState.posts.find(p => p._id === postId) };

      return {
        isEditing: true,
        editPost: loadedPost
      };
    });
  };

  cancelEditHandler = () => {
    this.setState({ isEditing: false, editPost: null });
  };

  finishEditHandler = ({ title, content, image }) => {
    this.setState({
      editLoading: true
    });

    const action = this.state.editPost ? 'updatePost' : 'createPost';
    
    this.uploadImage(image)
      .then(image => {
        let mutationArgs = `
          title: "${title}",
          content: "${content}",
          image: "${image}"
        `;

        if (this.state.editPost) {
          mutationArgs = `
            id: "${this.state.editPost._id}",
            title: "${title}",
            content: "${content}",
            image: "${image || this.state.editPost.image}"
          `;
        }

        const graphQLQuery = {
          query: `
            mutation {
              ${action} (
                ${mutationArgs}
              ) {
                _id
                title
                image
                content
                creator {
                  name
                }
                createdAt
              }
            }
          `
        };
        return graphQLFetch(graphQLQuery, this.props.token);
      })
      .then(res => {
        return res.json();
      })
      .then(resData => {
        if (resData.errors) {
          throw new Error('Creating or editing a post failed!');
        }
        const post = resData.data[action];
        this.setState(prevState => {
          let updatedPosts = [...prevState.posts];
          if (prevState.editPost) {
            const postIndex = prevState.posts.findIndex(
              p => p._id === prevState.editPost._id
            );
            updatedPosts[postIndex] = post;
          } else {
            if (prevState.posts.length >= 2) {
              updatedPosts.pop();
            }
            updatedPosts.unshift(post);
          }
          return {
            posts: updatedPosts,
            totalPosts: prevState.totalPosts + (prevState.editPost ? 0 : 1),
            isEditing: false,
            editPost: null,
            editLoading: false
          };
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          isEditing: false,
          editPost: null,
          editLoading: false,
          error: err
        });
      });
  };

  statusInputChangeHandler = (input, value) => {
    this.setState({ status: value });
  };

  deletePostHandler = postId => {
    this.setState({ postsLoading: true });
    
    const graphQLQuery = {
      query: `
        mutation {
          deletePost(id: "${postId}")
        }
      `
    };
 
    graphQLFetch(graphQLQuery, this.props.token)
      .then(res => {
        return res.json();
      })
      .then(({ errors }) => {
        if (errors) {
          throw new Error(errors[0].message);
        }

        this.loadPosts();
      })
      .catch(err => {
        this.catchError(err);
        this.setState({ postsLoading: false });
      });
  };

  errorHandler = () => {
    this.setState({ error: null });
  };

  catchError = error => {
    this.setState({ error: error });
  };

  render() {
    return (
      <Fragment>
        <ErrorHandler error={this.state.error} onHandle={this.errorHandler} />
        <FeedEdit
          editing={this.state.isEditing}
          selectedPost={this.state.editPost}
          loading={this.state.editLoading}
          onCancelEdit={this.cancelEditHandler}
          onFinishEdit={this.finishEditHandler}
        />
        <section className="feed__status">
          <form onSubmit={this.statusUpdateHandler}>
            <Input
              type="text"
              placeholder="Your status"
              control="input"
              onChange={this.statusInputChangeHandler}
              value={this.state.status}
            />
            <Button mode="flat" type="submit">
              Update
            </Button>
          </form>
        </section>
        <section className="feed__control">
          <Button mode="raised" design="accent" onClick={this.newPostHandler}>
            New Post
          </Button>
        </section>
        <section className="feed">
          {this.state.postsLoading && (
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <Loader />
            </div>
          )}
          {this.state.posts.length <= 0 && !this.state.postsLoading ? (
            <p style={{ textAlign: 'center' }}>No posts found.</p>
          ) : null}
          {!this.state.postsLoading && (
            <Paginator
              onPrevious={this.loadPosts.bind(this, 'previous')}
              onNext={this.loadPosts.bind(this, 'next')}
              lastPage={Math.ceil(this.state.totalPosts / 2)}
              currentPage={this.state.postPage}
            >
              {this.state.posts.map(post => (
                <Post
                  key={post._id}
                  id={post._id}
                  author={post.creator.name}
                  date={new Date(post.createdAt).toLocaleDateString('en-US')}
                  title={post.title}
                  image={post.imageUrl}
                  content={post.content}
                  onStartEdit={this.startEditPostHandler.bind(this, post._id)}
                  onDelete={this.deletePostHandler.bind(this, post._id)}
                />
              ))}
            </Paginator>
          )}
        </section>
      </Fragment>
    );
  }
}

export default Feed;
