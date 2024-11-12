import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Card } from 'react-bootstrap';
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
        navigate(`/ToDoList`);
      } catch (error) {
        console.error('Error registering user:', error);
        setError('There was an error registering your email. Please try again.');
      }
    } else {
      setError('Please enter a valid email address.');
    }
  };

  return (
    <div className='email-container'>
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Card className='p-5 card-cont'>
          <Form className='emailform'>
            <h2 className="text-center mb-4">Register Your Email</h2>
            <Form.Group controlId="formEmail">
              <Form.Label>Email Address:</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                style={{color: '#013974'}}
              />
            </Form.Group>
            {error && <p className="text-danger">{error}</p>}
            <Button onClick={handleRegister} className="mt-3 proceedbtn">
              Register
            </Button>
          </Form>
        </Card>
      </Container>
    </div>
  );
};

export default Register;
