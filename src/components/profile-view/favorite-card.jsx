import React from "react";
import { Row, Col, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export class FavoriteCard extends React.Component {
  render() {
    const { movieData, handleFavorite } = this.props;
    return (
      <Col>
        <Card>
          <Link to={`/movies/${movieData._id}`}>
            <Card.Img crossOrigin={"anonymous"} src={movieData.ImagePath} />
          </Link>
          <Card.Body>
            <p>{movieData.Title}</p>
            <Button
              variant="danger"
              onClick={() => handleFavorite(movieData._id, "remove")}
            >
              Remove
            </Button>
          </Card.Body>
        </Card>
      </Col>
    );
  }
}
