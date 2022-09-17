import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import { Link } from "react-router-dom";

import "./movie-card.scss";

export class MovieCard extends React.Component {
  render() {
    const { movieData } = this.props;

    return (
      <Card className="movie-card">
        <Card.Img
          variant="top"
          crossOrigin={"anonymous"}
          src={movieData.ImagePath}
        />
        <Card.Body>
          <Card.Title>{movieData.Title}</Card.Title>
          <Card.Text>{movieData.Description}</Card.Text>
          <Link to={`/movies/${movieData._id}`}>
            <Button variant="link">Open</Button>
          </Link>
        </Card.Body>
      </Card>
    );
  }
}

MovieCard.propTypes = {
  movieData: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
