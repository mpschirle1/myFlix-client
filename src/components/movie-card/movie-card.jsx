import React from "react";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";

import { Link } from "react-router-dom";

import "./movie-card.scss";

export class MovieCard extends React.Component {
  render() {
    const { movieData } = this.props;

    return (
      <Card className="movie-card">
        <Link to={`/movies/${movieData._id}`}>
          <Card.Img
            variant="top"
            crossOrigin={"anonymous"}
            src={movieData.ImagePath}
          />
        </Link>
        <Card.Body>
          <Row className="justify-content-center mx-auto">
            <Card.Title>{movieData.Title}</Card.Title>
            <Card.Text>{movieData.Description}</Card.Text>
          </Row>
        </Card.Body>
      </Card>
    );
  }
}

// MovieCard.propTypes = {
//   movieData: PropTypes.shape({
//     Title: PropTypes.string.isRequired,
//     Description: PropTypes.string.isRequired,
//     ImagePath: PropTypes.string.isRequired,
//     Genre: PropTypes.shape({
//       Name: PropTypes.string.isRequired,
//     }),
//   }).isRequired,
// };
