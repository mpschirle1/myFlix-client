import React, { useState } from "react";
import axios from "axios";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import { Link } from "react-router-dom";
import { UpdateView } from "./update-view";

export class ProfileView extends React.Component {
  constructor() {
    super();

    this.state = {
      Username: null,
      Password: null,
      Email: null,
      Birthday: null,
      FavoriteMovies: [],
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    this.getUser(accessToken);
  }

  getUser = (token) => {
    const Username = localStorage.getItem("user");
    axios
      .get(`https://myflix-db-api.herokuapp.com/users/${Username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday,
          FavoriteMovies: response.data.FavoriteMovies,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  formatBirthday(birthday) {
    let date = new Date(birthday);
    return `${
      date.getMonth() + 1
    }/${date.getUTCDate()}/${date.getUTCFullYear()}`;
  }

  render() {
    const { movies, onBackClick } = this.props;
    const { Username, Email, Birthday, FavoriteMovies } = this.state;

    return (
      <div className="profile-view">
        <Row>
          <Col>
            <h4>{Username}</h4>
            <h5>Email: {Email}</h5>
            <h5>Birthday: {this.formatBirthday(Birthday)}</h5>
            <p>{<UpdateView />}</p>
          </Col>
        </Row>
        <Row>
          <Col key={movies._id}>
            <h4>Favorite Movies</h4>
            {FavoriteMovies.map((movies) => {
              return (
                <div>
                  <img src={movies.ImagePath} crossOrigin={"anonymous"} />
                  <Link to={`/movies/${movies._id}`}>
                    <h4>{movies.Title}</h4>
                  </Link>
                </div>
              );
            })}
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
