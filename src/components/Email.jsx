import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';
import { getTasksByUserEmail } from '../service/TaskService';
import '../app.scss'

const Email = () => {
  const [userEmail, setUserEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const savedEmail = localStorage.getItem('userEmail');
    if (savedEmail) {
      setUserEmail(savedEmail);
    }
  }, []);

  const handleEmailAction = async () => {
    if (userEmail) {
      try {
        await getTasksByUserEmail(userEmail);
        alert('Welcome back! Redirecting to your tasks.');
        localStorage.setItem('userEmail', userEmail);
        navigate(`/ToDoList/tasks?email=${userEmail}`);
        
      } catch (error) {
        console.error('Error processing your email:', error);
        alert('There was an error processing your email. Please try again.');
      }
    } else {
      alert('Please enter a valid email address.');
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Form>
        <h2 className="text-center">Enter Your Email for Notifications</h2>
        <Form.Group controlId="formEmail">
          <Form.Label>Email Address:</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
          />
        </Form.Group>
        <p>Dont have an account? <a className='register' href="/ToDoList/register">Register to save your tasks</a> </p>
        {error && <p className="text-danger">{error}</p>}
        <Button variant="primary" onClick={handleEmailAction} className="mt-3">
          Proceed
        </Button>
      </Form>
    </Container>
  );
};

export default Email;
