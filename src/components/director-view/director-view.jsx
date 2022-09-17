import React from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

export class DirectorView extends React.Component {
  render() {
    const { director, onBackClick } = this.props;

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
