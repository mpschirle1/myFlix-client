import React, { useState } from "react";
import axios from "axios";

import {
  Form,
  Button,
  Container,
  Col,
  Row,
  Modal,
  Alert,
} from "react-bootstrap";

export function UpdateView() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [usernameErr, setUsernameErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [emailErr, setEmailErr] = useState("");

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [showSuccess, setShowSuccess] = useState(false);

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
    if (!email) {
      setEmailErr("Email Required");
      isReq = false;
    } else if (email.indexOf("@") === -1) {
      setEmailErr("Invalid Email");
      isReq = false;
    }

    return isReq;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      const token = localStorage.getItem("token");
      axios
        .put(
          `https://myflix-db-api.herokuapp.com/users/${username}`,
          {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          const data = response.data;
          console.log(data);
          setShowSuccess(true);
          setTimeout(() => {
            handleClose();
            window.open(`/users/${username}`, "_self");
          }, 2000);
        })
        .catch((e) => {
          console.log("Error updating the user");
        });
    }
  };

  return (
    <>
      <Button variant="link" onClick={handleShow}>
        Click here to update user info
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update User Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row className="justify-content-center">
              <Col xs lg="8">
                <Alert show={showSuccess} variant="success">
                  <Alert.Heading>Success!</Alert.Heading>
                </Alert>
                <Form>
                  <Form.Group className="mb-3 mx-auto mt-4">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      placeholder={"Username"}
                    />
                    {usernameErr && <p>{usernameErr}</p>}
                  </Form.Group>

                  <Form.Group className="mb-3 mx-auto mt-4">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength="8"
                      placeholder="Password (Min 8 characters)"
                    />
                    {passwordErr && <p>{passwordErr}</p>}
                  </Form.Group>

                  <Form.Group className="mb-3 mx-auto mt-4">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="someone@somewhere.com"
                    />
                    {emailErr && <p>{emailErr}</p>}
                  </Form.Group>

                  <Form.Group className="mb-3 mx-auto mt-4">
                    <Form.Label>Birthday:</Form.Label>
                    <Form.Control
                      type="date"
                      value={birthday}
                      onChange={(e) => setBirthday(e.target.value)}
                      placeholder="MM-DD-YYYY"
                    />
                  </Form.Group>
                </Form>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={(e) => {
              handleSubmit(e);
            }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
