import React, { useState, useEffect } from 'react';
import { getTasks, addTask, updateTask, deleteTask } from '../service/TaskService';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const TaskComponent = ({ onTaskEdit }) => {
  const [tasks, setTasks] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [input, setInput] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await getTasks();
    setTasks(response.data);
  };

  const handleAddTask = async (task) => {
    await addTask(task);
    fetchTasks();
    setInput(task.task);
    setShowSuccessModal(true);
  };

  const handleUpdateTask = async (taskId, task) => {
    await updateTask(taskId, task);
    fetchTasks();
  };

  const handleDeleteTask = async (taskId) => {
    await deleteTask(taskId);
    fetchTasks();
  };

  const handleEdit = (task) => {
    onTaskEdit(task);
  };

  const handleDelete = (taskId) => {
    setTaskToDelete(taskId);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    await handleDeleteTask(taskToDelete);
    setShowDeleteModal(false);
    setTaskToDelete(null);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setTaskToDelete(null);
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
  };

  return (
    <div>
      <Table className="mt-3 custom-table" bordered hover responsive>
        <thead className='text-center'>
          <tr>
            <th>#</th>
            <th>Task</th>
            <th>Status</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className='text-center'>
          {tasks.map((task, index) => (
            <tr key={task.id}>
              <td>{index + 1}</td>
              <td>{task.task}</td>
              <td>{task.status}</td>
              <td>{new Date(task.startDate).toLocaleString()}</td>
              <td>{new Date(task.endDate).toLocaleString()}</td>
              <td>
                <Button variant="info" onClick={() => handleEdit(task)}>
                  Edit
                </Button>
                <Button variant="danger" className="ms-2" onClick={() => handleDelete(task.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this task?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showSuccessModal} onHide={handleCloseSuccessModal}>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Your new task <strong>{input}</strong> has been added to the list.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseSuccessModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TaskComponent;
