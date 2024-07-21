
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Container, Row, Col, Table } from 'react-bootstrap';
import { ITodo } from '../interfaces/ITodo';
import "../App.css";

const Products: React.FC = () => {
  const navigate = useNavigate();
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [newAvatar, setNewAvatar] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState('');
  const [editAvatar, setEditAvatar] = useState('');

  useEffect(() => {
    const loggedIn = localStorage.getItem('loggedIn') === 'true';
    if (!loggedIn) {
      navigate('/login');
    }

    (async () => {
      try {
        const response = await fetch('http://localhost:3000/todos');
        const data = await response.json();
        setTodos(data);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    })();
  }, [navigate]);

  const addTodo = async () => {
    if (newTodo.trim() !== '' && newAvatar.trim() !== '') {
      const newTodoItem: ITodo = {
        id: todos.length ? todos[todos.length - 1].id + 1 : 1,
        title: newTodo.trim(),
        avatar: newAvatar.trim(),
        completed: false,
      };

      try {
        const response = await fetch('http://localhost:3000/todos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newTodoItem),
        });

        if (response.ok) {
          const addedTodo = await response.json();
          setTodos([...todos, addedTodo]);
          setNewTodo('');
          setNewAvatar('');
        } else {
          console.error('Error adding todo:', await response.text());
        }
      } catch (error) {
        console.error('Error adding todo:', error);
      }
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3000/todos/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setTodos(todos.filter(todo => todo.id !== id));
      } else {
        console.error('Error deleting todo:', await response.text());
      }
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const startEditing = (todo: ITodo) => {
    setEditingId(todo.id);
    setEditText(todo.title);
    setEditAvatar(todo.avatar);
  };

  const saveEdit = async () => {
    if (editingId !== null) {
      const updatedTodo: ITodo = {
        id: editingId,
        title: editText.trim(),
        avatar: editAvatar.trim(),
        completed: false,
      };

      try {
        const response = await fetch(`http://localhost:3000/todos/${editingId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedTodo),
        });

        if (response.ok) {
          const updated = await response.json();
          setTodos(todos.map(todo => (todo.id === editingId ? updated : todo)));
          setEditingId(null);
          setEditText('');
          setEditAvatar('');
        } else {
          console.error('Error updating todo:', await response.text());
        }
      } catch (error) {
        console.error('Error updating todo:', error);
      }
    }
  };

  return (
    <Container className="mt-4">
      <h1>Danh sách sản phẩm</h1>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Ảnh</th>
            <th>Sản phẩm</th>
            
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {todos.map(todo => (
            <tr key={todo.id}>
              <td>
                <img src={todo.avatar} alt={todo.title} width="50" height="50" />
              </td>
              <td>
                {editingId === todo.id ? (
                  <>
                    <Form.Control
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="me-2"
                    />
                    <Form.Control
                      type="text"
                      value={editAvatar}
                      onChange={(e) => setEditAvatar(e.target.value)}
                      placeholder="Nhập URL ảnh"
                      className="me-2"
                    />
                  </>
                ) : (
                  <span>{todo.title}</span>
                )}
              </td>
              
              <td>
                {editingId === todo.id ? (
                  <Button variant="success" onClick={saveEdit} className="me-2">Lưu</Button>
                ) : (
                  <Button variant="warning" onClick={() => startEditing(todo)} className="me-2">Sửa</Button>
                )}
                <Button variant="danger" onClick={() => deleteTodo(todo.id)}>Xóa</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Form className="mb-4">
        <Row>
          <Col>
            <Form.Control
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Nhập tên sản phẩm"
              className="mb-2"
            />
          </Col>
          <Col>
            <Form.Control
              type="text"
              value={newAvatar}
              onChange={(e) => setNewAvatar(e.target.value)}
              placeholder="Nhập URL ảnh"
              className="mb-2"
            />
          </Col>
          <Col>
            <Button variant="primary" onClick={addTodo}>Thêm</Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default Products;
