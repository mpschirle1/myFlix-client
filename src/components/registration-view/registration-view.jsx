import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Card, CardGroup, Container, Col, Row } from 'react-bootstrap';

import './registration-view.scss';

export function RegistrationView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ birthday, setBirthday ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password, email, birthday);
    props.onRegistration(username);
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs lg="8">
          <CardGroup>
            <Card className="mt-4">
              <Card.Body className="px-4">
                <Card.Title className="text-center">Please Register</Card.Title>
                <Form>
                  <Form.Group className="mb-3 mx-auto mt-4">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control 
                      type="text" 
                      value={username}
                      onChange={e => setUsername(e.target.value)}
                      required 
                      placeholder="Username"
                    />
                  </Form.Group>
                  
                  <Form.Group className="mb-3 mx-auto mt-4">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                      type="password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      required
                      minLength="8"
                      placeholder="Password (Min 8 characters)"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3 mx-auto mt-4">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      required
                      placeholder="someone@somewhere.com" 
                    />
                  </Form.Group>

                  <Form.Group className="mb-3 mx-auto mt-4">
                    <Form.Label>Birthday:</Form.Label>
                    <Form.Control 
                      type="date" 
                      value={birthday} 
                      onChange={e => setBirthday(e.target.value)}
                      placeholder="MM-DD-YYYY"
                    />
                  </Form.Group>

                  <Button
                    variant="primary"
                    type="submit" 
                    onClick={handleSubmit}>
                    Register
                  </Button>
                  
                  <Card.Text className="text-center mb-3 mx-auto mt-4">
                    Already have an account? <Card.Link href="#">Sign In</Card.Link>
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

RegistrationView.propTypes = {
  registered: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.string,
  }),
  onRegistration: PropTypes.func.isRequired
};