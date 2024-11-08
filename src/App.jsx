import { useState, useEffect, useRef } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Modal, Button, Form, Navbar, Nav, NavbarToggle } from 'react-bootstrap';
import Todo from './components/todocom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import './app.scss';

function App() {
  const [showModal, setShowModal] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const containerRef = useRef(null); 

  const isMediumScreen = useMediaQuery({ maxWidth: 768 }); 
  const isSmallScreen = useMediaQuery({maxWidth: 576});
  

  const handleCloseModal = () => {
    setShowModal(false);
    setShowConfirmation(false);
  };

  const handleSaveNotificationInfo = () => {
    console.log('Email:', email);
    console.log('Contact Number:', contactNumber);
    
    setShowModal(false);
    setShowConfirmation(false);
  };

  const handleConfirmNotification = () => {
    setShowConfirmation(false);
    setShowModal(true);
  };

  const handleCancelNotification = () => {
    setShowConfirmation(false);
  };

 
  
  return (
    <>
  <BrowserRouter>
    <Container fluid ref={containerRef} className="hero">
    <Navbar expand="lg">
      <Container fluid>
        <Navbar.Brand >
          <h2 className='edit-size'>ToDo List <i className="bi bi-list-task"></i></h2>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="d-flex flex-column align-items-center">
            <h5 className='text-info'>GET NOTIFIED NOW!</h5>
            <i className="bi bi-bell edit-size" style={{ color: '#2CC2E0' }}></i>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

      
          <Row>
            <Col>
              <h3 className='text-center py-5 task'>
                ADD TASK
              </h3>
              <Routes>
                <Route path='/ToDoList' element = {<Todo/>}></Route>
              </Routes>
            </Col>
          </Row>

          <Modal show={showConfirmation} onHide={handleCancelNotification}>
            <Modal.Header closeButton>
              <Modal.Title>Notification Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Do you want to get notified?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCancelNotification}>
                No
              </Button>
              <Button variant="primary" onClick={handleConfirmNotification}>
                Yes
              </Button>
            </Modal.Footer>
          </Modal>

          <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>Notification Settings</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="formEmail">
                  <Form.Label>Email address:</Form.Label>
                  <Form.Control type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>

              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Close
              </Button>
              <Button variant="primary" onClick={handleSaveNotificationInfo}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </Container>
      </BrowserRouter>
    </>
  );
}

export default App;
