import React from "react";
import PropTypes from "prop-types";

import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { Link } from "react-router-dom";

import "./movie-view.scss";

export class MovieView extends React.Component {
  render() {
    const { movie, onBackClick, handleFavorite, isFavorite } = this.props;

    return (
      <div className="movie-view">
        <Row>
          <Col lg={8}>
            <h1 className="movie-title">
              <Button
                className="back-button"
                variant="link"
                onClick={() => {
                  onBackClick(null);
                }}
              >
                <span>&#60;</span>
              </Button>
              {movie.Title}
            </h1>
            <p>
              {movie.ReleaseYear}&nbsp;&nbsp;|&nbsp;&nbsp;{movie.Rating}
            </p>
          </Col>
        </Row>
        <Row>
          <Col lg={8}>
            <Row>
              <Col xs={12} className="movie-genre mt-4">
                <Row>
                  <Col lg={2} className="label">
                    <h5>Genre: </h5>
                  </Col>
                  <Col lg={10}>
                    <Link to={`/genres/${movie.Genre.Name}`}>
                      <Button variant="link">{movie.Genre.Name}</Button>
                    </Link>
                  </Col>
                </Row>
              </Col>
              <Col xs={12} className="movie-director mt-2">
                <Row>
                  <Col lg={2} className="label">
                    <h5>Director: </h5>
                  </Col>
                  <Col lg={10}>
                    <Link to={`/directors/${movie.Director.Name}`}>
                      <Button variant="link">{movie.Director.Name}</Button>
                    </Link>
                  </Col>
                </Row>
              </Col>
              <Col xs={12} className="movie-description mt-4">
                <h5 className="label">Description</h5>
                <div className="value">{movie.Description}</div>
                <h5 className="mt-4">Starring</h5>
                <p>{movie.Actors.join(", ")}</p>
              </Col>
            </Row>
          </Col>
          <Col className="movie-poster" lg={4}>
            <img
              crossOrigin={"anonymous"}
              src={movie.ImagePath}
              className="float-lg-right mt-lg-0 mt-4 d-flex mx-auto"
            />
          </Col>
          <Col xs={12}>
            {!isFavorite ? (
              <Button
                variant="primary"
                onClick={() => {
                  handleFavorite(movie._id, "add");
                }}
                className="float-lg-right d-flex mt-4 mb-4 mx-auto"
              >
                Add To Favorites
              </Button>
            ) : (
              <div></div>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    ImagePath: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
  }).isRequired,
};
