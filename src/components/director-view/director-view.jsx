import React from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { MovieCard } from "../movie-card/movie-card";

import "./director-view.scss";

export class DirectorView extends React.Component {
  render() {
    const { director, onBackClick, movies } = this.props;

    return (
      <div>
        <Row>
          <Col>
            <h1 className="director-name">
              <Button
                className="back-button"
                variant="link"
                onClick={() => {
                  onBackClick(null);
                }}
              >
                <span>&#60;</span>
              </Button>
              {director.Name}
            </h1>
            <h5>
              {director.Birth} &#8212; {director.Death}
            </h5>
          </Col>
        </Row>
        <Row>
          <Col xs={12} className="director-bio mt-4">
            <h5 className="label mb-4">Biography</h5>
            <div className="value mb-4">{director.Bio}</div>
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
