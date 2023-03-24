import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Form,
  Button,
  Card,
  CardGroup,
  Container,
  Col,
  Row,
} from "react-bootstrap";
import axios from "axios";

import "./login-view.scss";

export function LoginView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameErr, setUsernameErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");

  const validate = () => {
    let isReq = true;
    if (!username) {
      setUsernameErr("Username Required");
      isReq = false;
    } else if (username.length < 5) {
      setUsernameErr("Username must be 5 characters long");
      isReq = false;
    }
    if (!password) {
      setPasswordErr("Password Required");
      isReq = false;
    } else if (password.length < 8) {
      setPasswordErr("Password must be at least 8 characters long");
      isReq = false;
    }

    return isReq;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      axios
        .post("https://myflix-db-api.herokuapp.com/login", {
          Username: username,
          Password: password,
        })
        .then((response) => {
          const data = response.data;
          props.onLoggedIn(data);
        })
        .catch((e) => {
          console.log(e);
          alert("Invalid Username/Password");
        });
    }
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs lg="8">
          <CardGroup className="login-card">
            <Card className="mt-4">
              <Card.Body className="px-4">
                <Card.Title className="text-center">Please Log In</Card.Title>
                <Form>
                  <Form.Group className="mb-3" controlId="formUsername">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      placeholder="Username"
                    />
                    {usernameErr && <p>{usernameErr}</p>}
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                      type="password"
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="Password (Min 8 characters)"
                    />
                    {passwordErr && <p>{passwordErr}</p>}
                  </Form.Group>

                  <Row className="mt-4 justify-content-center">
                    <Button
                      variant="secondary"
                      type="submit"
                      onClick={handleSubmit}
                    >
                      Submit
                    </Button>
                  </Row>

                  <Card.Text className="text-center mb-3 mx-auto mt-4">
                    New user?{" "}
                    <Card.Link href="/register">Sign up here.</Card.Link>
                  </Card.Text>
                </Form>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>
  );
}

LoginView.propTypes = {
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
  }),
  onLoggedIn: PropTypes.func.isRequired,
};
