import React from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

export class GenreView extends React.Component {
  render() {
    const { genre, onBackClick } = this.props;

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
