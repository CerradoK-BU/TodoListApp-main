import { useState, useEffect } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Navbar, Button } from 'react-bootstrap';
import Todo from './components/todocom';
import Email from './components/Email';
import Register from './components/Register';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './app.scss';

function App() {
  const [email, setEmail] = useState('');

  useEffect(() => {
    const savedEmail = localStorage.getItem('userEmail');
    if (savedEmail) {
      setEmail(savedEmail);
    }
  }, []);


  return (
    <>
      <BrowserRouter>
        <Container fluid className="hero">
          <Row>
            <Col>
              <Routes>
                <Route path="/ToDoList/tasks" element={<Todo />} />
                <Route path="/ToDoList/login" element={<Email />} /> 
                <Route path="/ToDoList/register" element={<Register/>}></Route>
              </Routes>
            </Col>
          </Row>
        </Container>
      </BrowserRouter>
    </>
  );
}

export default App;
