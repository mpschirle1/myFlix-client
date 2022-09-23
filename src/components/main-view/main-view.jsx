import React from "react";
import axios from "axios";

import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";

import { LoginView } from "../login-view/login-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { RegistrationView } from "../registration-view/registration-view";
import { Menubar } from "../navbar/navbar";
import { GenreView } from "../genre-view/genre-view";
import { DirectorView } from "../director-view/director-view";
import { ProfileView } from "../profile-view/profile-view";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "./main-view.scss";

class MainView extends React.Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      user: null,
      favoriteMovies: [],
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem("user"),
      });
      this.getMovies(accessToken);
    }
  }

  getMovies(token) {
    axios
      .get("https://myflix-db-api.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.setState({
          movies: response.data,
          user: this.state.user,
          favoriteMovies: this.state.favoriteMovies,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleFavorite(movieId, action) {
    const { user } = this.state;
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
    console.log(authData);
    const { Username, Email, Birthday, FavoriteMovies } = authData.user;

    localStorage.setItem("favoriteMovies", JSON.stringify(FavoriteMovies));

    this.setState({
      user: Username,
      favoriteMovies: FavoriteMovies || [],
    });
    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", Username);
    localStorage.setItem("email", Email);
    localStorage.setItem("birthday", Birthday);
    this.getMovies(authData.token);
  }

  onLoggedOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.setState({
      user: null,
    });
  }

  render() {
    const { movies, user } = this.state;
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
              return movies.map((movie) => (
                <Col
                  className="px-4 px-sm-2 mt-4"
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  key={movie._id}
                >
                  <MovieCard movieData={movie} />
                </Col>
              ));
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
                    user={user === match.params.username}
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
      </Router>
    );
  }
}

export default MainView;
