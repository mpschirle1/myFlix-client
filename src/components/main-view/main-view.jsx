import React from 'react';
import axios from 'axios';

import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './main-view.scss';

class MainView extends React.Component {

  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      registered: null,
      user: null
    };
  }

  componentDidMount() {
    axios.get('https://myflix-db-api.herokuapp.com/movies')
    .then(response => {
      this.setState({
        movies: response.data
      });
    })
    .catch(error => {
      console.log(error);
    });
  }

  // On movie click, updates the state of 'selectedMovie' to that movie
  setSelectedMovie(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  // When user logs in, updates 'user' property to that specific user
  onLoggedIn(user) {
    this.setState({
      user
    });
  }

  onRegistration(registered) {
    this.setState({
      registered
    });
  }

  render() {
    const { movies, selectedMovie, user, registered } = this.state;

    // If not registered, RegistrationView is rendered
    if (!registered) return <RegistrationView onRegistration={registered => this.onRegistration(registered)} />;

    // If no user, LoginView is rendered. On successful login, user details are
    // passed as a prop to LoginView
    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} onRegistration={registered => this.onRegistration(registered)} />;

    // Before movies are loaded
    if (movies.length === 0) return <div className="main-view"/>;

    return (
      <Row className="main-view">
        {/* Returns all movies if 'selectedMovie is null */}
        {selectedMovie
          ? (
              <Col className="mx-auto mt-4" md={12}>
                <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
              </Col>
          )
          : movies.map(movie => (
                <Col className="px-4 px-sm-2 mt-4" xs={12} sm={6} md={4} lg={3}>
                  <MovieCard key={movie._id} movieData={movie} onMovieClick={(newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie) }}/>
                </Col>
            ))
        }
      </Row>
    );
  }
}

export default MainView;