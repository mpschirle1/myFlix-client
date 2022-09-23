import React from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { MovieCard } from "../movie-card/movie-card";

export class GenreView extends React.Component {
  render() {
    const { genre, onBackClick, movies } = this.props;

    return (
      <div className="genre-view">
        <Row>
          <Col>
            <h1 className="genre-name">{genre.Name}</h1>
          </Col>
        </Row>
        <Row>
          <Col xs={12} className="genre-description mt-4">
            <h5 className="label">Description</h5>
            <div className="value">{genre.Description}</div>
          </Col>
          {movies.map((movie) => (
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
          ))}
          <Col xs={12}>
            <Button
              onClick={() => {
                onBackClick(null);
              }}
              className="float-lg-left d-flex mt-4 mx-auto"
            >
              Back
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}
