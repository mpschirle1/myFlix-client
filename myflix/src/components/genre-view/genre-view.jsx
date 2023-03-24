import React from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { MovieCard } from "../movie-card/movie-card";

import "./genre-view.scss";

export class GenreView extends React.Component {
  render() {
    const { genre, onBackClick, movies } = this.props;

    return (
      <div>
        <Row>
          <Col>
            <h1 className="genre-name pb-4">
              <Button
                className="back-button"
                variant="link"
                onClick={() => {
                  onBackClick(null);
                }}
              >
                <span>&#60;</span>
              </Button>
              {genre.Name}
            </h1>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <h5 className="label pb-4">Description</h5>
            <div className="value pb-4">{genre.Description}</div>
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
        </Row>
      </div>
    );
  }
}
