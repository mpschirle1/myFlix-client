import React from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { MovieCard } from "../movie-card/movie-card";

export class DirectorView extends React.Component {
  render() {
    const { director, onBackClick, movies } = this.props;

    return (
      <div className="director-view">
        <Row>
          <Col>
            <h1 className="director-name">{director.Name}</h1>
            <h5>Born in {director.Birth}</h5>
          </Col>
        </Row>
        <Row>
          <Col xs={12} className="director-bio mt-4">
            <h5 className="label">Biography</h5>
            <div className="value">{director.Bio}</div>
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
        <Row>
          <Button
            onClick={() => {
              onBackClick(null);
            }}
            className="float-lg-left d-flex mt-4 mx-auto"
          >
            Back
          </Button>
        </Row>
      </div>
    );
  }
}
