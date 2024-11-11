import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';
import { registerUser } from '../service/TaskService';


const Register = () => {
  const [userEmail, setUserEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (userEmail) {
      try {
        await registerUser(userEmail);
        localStorage.setItem('userEmail', userEmail);
        alert('Email registered successfully!');
        navigate(`/ToDoList/login`);
      } catch (error) {
        console.error('Error registering user:', error);
        setError('There was an error registering your email. Please try again.');
      }
    } else {
      setError('Please enter a valid email address.');
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Form>
        <h2 className="text-center">Register Your Email</h2>
        <Form.Group controlId="formEmail">
          <Form.Label>Email Address:</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
          />
        </Form.Group>
        {error && <p className="text-danger">{error}</p>}
        <Button variant="primary" onClick={handleRegister} className="mt-3">
          Register
        </Button>
      </Form>
    </Container>
  );
};

export default Register;
