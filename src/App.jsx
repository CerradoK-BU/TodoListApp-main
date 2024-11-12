import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col} from 'react-bootstrap';
import Todo from './components/todocom';
import Email from './components/Email';
import Register from './components/Register';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './app.scss';
import './App.css';

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
                <Route path="/tasks" element={<Todo />} />
                <Route path="/ToDoList" element={<Email />} /> 
                <Route path="/notificationregister" element={<Register/>}></Route>
              </Routes>
            </Col>
          </Row>
        </Container>
      </BrowserRouter>
    </>
  );
}

export default App;
