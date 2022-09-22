import React from "react";
import axios from "axios";

import { Form, Button, Col, Row, Card } from "react-bootstrap";
import { FavoriteCard } from "../profile-view/favorite-card";

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

  updateUser(e) {
    e.preventDefault();
    const username = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    axios
      .put(
        `https://myflix-db-api.herokuapp.com/users/${username}`,
        {
          Username: this.state.Username,
          Password: this.state.Password,
          Email: this.state.Email,
          Birthday: this.state.Birthday,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday,
        });
        localStorage.setItem("user", this.state.Username);
        const data = response.data;
        console.log(data);
        console.log(this.state.Username);
        alert("Profile has been sucessfully updated");
        window.open(`/users/${username}`, "_self");
      })
      .catch((e) => {
        console.log("Error updating the user");
      });
  }

  setUsername(value) {
    this.state.Username = value;
  }

  setPassword(value) {
    this.state.Password = value;
  }

  setEmail(value) {
    this.state.Email = value;
  }

  setBirthday(value) {
    this.state.Birthday = value;
  }

  render() {
    const { movies, onBackClick, handleFavorite, favoriteMovies } = this.props;
    const { Username, Email, Birthday } = this.state;

    return (
      <div className="profile-view">
        <Row>
          <Col>
            <h4>{Username}</h4>
            <h5>Email: {Email}</h5>
            <h5>Birthday: {this.formatBirthday(Birthday)}</h5>
            {/* <p>{<UpdateView />}</p> */}
          </Col>
        </Row>
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>Update User Info</Card.Title>
                <Form onSubmit={(e) => this.updateUser(e)}>
                  <Form.Group className="mb-3 mx-auto mt-4">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                      type="text"
                      value={this.Username}
                      onChange={(e) => this.setUsername(e.target.value)}
                      required
                      placeholder={"Username"}
                    />
                    {/* {usernameErr && <p>{usernameErr}</p>} */}
                  </Form.Group>

                  <Form.Group className="mb-3 mx-auto mt-4">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                      type="password"
                      value={this.Password}
                      onChange={(e) => this.setPassword(e.target.value)}
                      required
                      minLength="8"
                      placeholder="Password (Min 8 characters)"
                    />
                    {/* {passwordErr && <p>{passwordErr}</p>} */}
                  </Form.Group>

                  <Form.Group className="mb-3 mx-auto mt-4">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                      type="email"
                      value={this.Email}
                      onChange={(e) => this.setEmail(e.target.value)}
                      required
                      placeholder="someone@somewhere.com"
                    />
                    {/* {emailErr && <p>{emailErr}</p>} */}
                  </Form.Group>

                  <Form.Group className="mb-3 mx-auto mt-4">
                    <Form.Label>Birthday:</Form.Label>
                    <Form.Control
                      type="date"
                      value={this.Birthday}
                      onChange={(e) => this.setBirthday(e.target.value)}
                      placeholder="MM-DD-YYYY"
                    />
                  </Form.Group>
                  <div>
                    <Button variant="primary" type="submit">
                      Save Changes
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <h3>Favorite Movies</h3>
          {favoriteMovies.map((movieId) => {
            let movie = movies.find((m) => m._id === movieId);
            return (
              <FavoriteCard
                key={movieId}
                movieData={movie}
                handleFavorite={handleFavorite}
              />
            );
          })}
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
