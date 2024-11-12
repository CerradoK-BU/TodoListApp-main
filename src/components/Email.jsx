import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Card } from 'react-bootstrap';
import { getTasksByUserEmail } from '../service/TaskService';

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
        navigate(`/tasks?email=${userEmail}`);
        
      } catch (error) {
        console.error('Error processing your email:', error);
        alert('Email not yet registered, Register now!');
      }
    } else {
      alert('Please enter a valid email address.');
    }
  };

  function goToRegister () {
    navigate('/notificationregister')
  }

  const goToHome = () => {
    window.location.href = '/portfolio'
  }

  return (
    <div className='email-container'>
      <Button className='gotobtn mt-4 ms-4' onClick={goToHome}>Back to Portfolio</Button>
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Card className='p-5 card-cont'>
          <Form className='emailform'>
            <h2 className="text-center mb-4">Enter Your Email for Notifications</h2>
            <Form.Group controlId="formEmail">
              <Form.Label className='email'>Email Address:</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                style={{color: '#013974'}}
              />
            </Form.Group>
            <p className='mt-2'>Dont have an account? <a className='register' onClick={goToRegister}>Register to save your tasks</a> </p>
            {error && <p className="text-danger">{error}</p>}
            <Button onClick={handleEmailAction} className="mt-3 proceedbtn">
              Proceed
            </Button>
          </Form>
        </Card>
      </Container>
    </div>
  );
};

export default Email;
