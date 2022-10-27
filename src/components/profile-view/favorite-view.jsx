import React from "react";
import { Row, Col, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export class FavoriteView extends React.Component {
  render() {
    const { movieData, handleFavorite } = this.props;
    return (
      <>
        <Card className="fav-movie">
          <Link to={`/movies/${movieData._id}`}>
            <Card.Img crossOrigin={"anonymous"} src={movieData.ImagePath} />
          </Link>
          <Card.Body>
            <Row className="justify-content-center">
              <h5>{movieData.Title}</h5>
            </Row>
            <Button
              variant="outline-danger"
              size="sm"
              onClick={() => handleFavorite(movieData._id, "remove")}
              className="d-flex mx-auto mt-3"
            >
              Remove
            </Button>
          </Card.Body>
        </Card>
      </>
    );
  }
}
