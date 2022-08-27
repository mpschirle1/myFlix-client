import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Card, CardGroup, Container, Col, Row } from 'react-bootstrap';
import axios from 'axios';

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://myflix-db-api.herokuapp.com/login', {
      Username: username,
      Password: password
    })
    .then(response => {
      const data = response.data;
      props.onLoggedIn(data);
    })
    .catch(e => {
      console.log('No such user')
    });
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs lg="8">
          <CardGroup>
            <Card className="mt-4">
              <Card.Body className="px-4">
                <Card.Title className="text-center">Please Log In</Card.Title>
                <Form>
                  <Form.Group className="mb-3" controlId="formUsername">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control 
                      type="text" 
                      onChange={e => setUsername(e.target.value)}
                      required
                      placeholder="Username" 
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formPassword">
                     <Form.Label>Password:</Form.Label>
                      <Form.Control 
                        type="password" 
                        onChange={e => setPassword(e.target.value)}
                        required
                        placeholder="Password (Min 8 characters)" 
                      />
                  </Form.Group>

                  <Button 
                    variant="primary" 
                    type="submit" 
                    onClick={handleSubmit}>
                    Submit
                  </Button>

                  <Card.Text className="text-center mb-3 mx-auto mt-4">
                    New users please <Card.Link href="#">register</Card.Link>
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
  onLoggedIn: PropTypes.func.isRequired
};