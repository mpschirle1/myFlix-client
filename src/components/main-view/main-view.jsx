import React from "react";
import axios from "axios";
import { connect } from "react-redux";

import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";

import { setMovies, setUser } from "../../actions/actions";
import MoviesList from "../movies-list/movies-list";
import { LoginView } from "../login-view/login-view";
import { MovieView } from "../movie-view/movie-view";
import { RegistrationView } from "../registration-view/registration-view";
import { Menubar } from "../navbar/navbar";
import { GenreView } from "../genre-view/genre-view";
import { DirectorView } from "../director-view/director-view";
import { ProfileView } from "../profile-view/profile-view";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "./main-view.scss";
import { Container } from "react-bootstrap";

class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      favoriteMovies: [],
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      const { setUser } = this.props;
      setUser(localStorage.getItem("user"));
      this.getMovies(accessToken);
    }
  }

  getMovies(token) {
    axios
      .get("https://myflix-db-api.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.props.setMovies(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleFavorite(movieId, action) {
    const { user } = this.props;
    let favoriteMovies = this.state.favoriteMovies;
    if (user && favoriteMovies.length === 0) {
      let savedFavoriteMovies = localStorage.getItem("favoriteMovies");
      if (savedFavoriteMovies) {
        favoriteMovies = JSON.parse(savedFavoriteMovies);
      }
    }
    const accessToken = localStorage.getItem("token");
    if (accessToken !== null && user !== null) {
      if (action === "add") {
        let updatedFavorites = [...favoriteMovies, movieId];
        localStorage.setItem(
          "favoriteMovies",
          JSON.stringify(updatedFavorites)
        );
        this.setState({ favoriteMovies: updatedFavorites });
        axios
          .post(
            `https://myflix-db-api.herokuapp.com/users/${user}/movies/${movieId}`,
            {},
            {
              headers: { Authorization: `Bearer ${accessToken}` },
            }
          )
          .then((response) => {
            console.log("Movie sucessfully added to favorite list");
          })
          .catch((error) => {
            console.log(error);
          });
      } else if (action === "remove") {
        let updatedFavorites = favoriteMovies.filter((id) => id !== movieId);
        localStorage.setItem(
          "favoriteMovies",
          JSON.stringify(updatedFavorites)
        );
        this.setState({
          favoriteMovies: updatedFavorites,
        });
        axios
          .delete(
            `https://myflix-db-api.herokuapp.com/users/${user}/movies/${movieId}`,
            {
              headers: { Authorization: `Bearer ${accessToken}` },
            }
          )
          .then((response) => {
            console.log("Movie successfully removed from favorite list");
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  }

  onLoggedIn(authData) {
    const { setUser } = this.props;
    setUser(authData.user.Username);

    const { FavoriteMovies } = authData.user;
    localStorage.setItem("favoriteMovies", JSON.stringify(FavoriteMovies));

    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);
    this.getMovies(authData.token);
  }

  onLoggedOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }

  render() {
    const { movies, user } = this.props;
    let favoriteMovies = this.state.favoriteMovies;
    if (user && favoriteMovies.length === 0) {
      let savedFavoriteMovies = localStorage.getItem("favoriteMovies");
      if (savedFavoriteMovies) {
        favoriteMovies = JSON.parse(savedFavoriteMovies);
      }
    }
    return (
      <Router>
        <Menubar user={user} />
        <Container>
          <Row className="main-view justify-content-md-center">
            <Route
              exact
              path="/"
              render={() => {
                if (!user)
                  return (
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  );
                if (movies.length === 0) return <div className="main-view" />;
                return <MoviesList movies={movies} />;
              }}
            />
            <Route
              path="/register"
              render={() => {
                if (user) return <Redirect to="/" />;
                return <RegistrationView />;
              }}
            />
            <Route
              path="/movies/:movieId"
              render={({ match, history }) => {
                if (!user)
                  return (
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  );
                if (movies.length === 0) return <div className="main-view" />;
                return (
                  <Col className="mx-auto mt-4" md={12}>
                    <MovieView
                      movie={movies.find(
                        (movie) => movie._id === match.params.movieId
                      )}
                      onBackClick={() => history.goBack()}
                      isFavorite={favoriteMovies.includes(match.params.movieId)}
                      handleFavorite={(movieId, action) => {
                        this.handleFavorite.call(this, movieId, action);
                      }}
                    />
                  </Col>
                );
              }}
            />
            <Route
              path="/directors/:name"
              render={({ match, history }) => {
                if (!user)
                  return (
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  );
                if (movies.length === 0) return <div className="main-view" />;

                return (
                  <Col className="mx-auto mt-4" md={12}>
                    <DirectorView
                      movies={movies.filter((movie) => {
                        return movie.Director.Name === match.params.name;
                      })}
                      director={
                        movies.find(
                          (movie) => movie.Director.Name === match.params.name
                        ).Director
                      }
                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                );
              }}
            />
            <Route
              path="/genres/:name"
              render={({ match, history }) => {
                if (!user)
                  return (
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  );
                if (movies.length === 0) return <div className="main-view" />;

                return (
                  <Col className="mx-auto mt-4" md={12}>
                    <GenreView
                      movies={movies.filter((movie) => {
                        return movie.Genre.Name === match.params.name;
                      })}
                      genre={
                        movies.find(
                          (movie) => movie.Genre.Name === match.params.name
                        ).Genre
                      }
                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                );
              }}
            />
            <Route
              path="/users/:username"
              render={({ match, history }) => {
                if (!user)
                  return (
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  );
                if (movies.length === 0) return <div className="main-view" />;

                return (
                  <Col className="mx-auto mt-4" md={12}>
                    <ProfileView
                      history={history}
                      movies={movies}
                      user={user}
                      onBackClick={() => history.goBack()}
                      favoriteMovies={favoriteMovies || []}
                      handleFavorite={(movieId, action) => {
                        this.handleFavorite.call(this, movieId, action);
                      }}
                    />
                  </Col>
                );
              }}
            />
          </Row>
        </Container>
      </Router>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    movies: state.movies,
    user: state.user,
  };
};

export default connect(mapStateToProps, { setMovies, setUser })(MainView);
