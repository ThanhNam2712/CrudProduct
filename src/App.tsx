import React, {useState, useEffect} from "react";
import { ITodo } from './interfaces/ITodo';
import {useForm} from "react-hook-form";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
// import { ListGroup, ListGroupItem } from "react-bootstrap";
import {Button, Form, ListGroup, ListGroupItem, Container, Row, Col} from 'react-bootstrap';


function App(){
  const defaultAvatar  = "https://digiticket.vn/blog/wp-content/uploads/2021/07/banh-trung-thu-ha-noi.png";
  const defaultAvatar2 = "https://bazantravel.com/cdn/medias/uploads/84/84368-banh-trung-thu-dep.jpg";
  const defaultAvatar3 = "https://cdn.tgdd.vn/Files/2019/08/16/1188291/nguon-goc-va-y-nghia-banh-trung-thu-201908161014062235.jpg";
  const defaultAvatar4 = "https://static.vinwonders.com/production/banh-trung-thu-trung-chay-4.jpg";
  const defaultAvatar5 = "https://huongvietmart.vn/wp-content/uploads/2022/06/anh-banh-trung-thu-dep-nhat-2.jpg";
  const defaultAvatar6 = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2pkAKomhyi0HKjvjjFs4WS1m3LVsWRVYD9A&s";
  const defaultAvatar7 = "https://static.vinwonders.com/production/banh-trung-thu-trung-chay-4.jpg";
  const [todos, setTodos] =useState([
    { id: 1, title: "Sản phẩm 1", completed: false, avatar: defaultAvatar },
    { id: 2, title: "Sản phẩm 2", completed: false, avatar: defaultAvatar2 },
    { id: 3, title: "Sản phẩm 3", completed: false, avatar: defaultAvatar3 },
    { id: 4, title: "Sản phẩm 4", completed: false, avatar: defaultAvatar4 },
    { id: 5, title: "Sản phẩm 5", completed: false, avatar: defaultAvatar5 },
    { id: 6, title: "Sản phẩm 6", completed: false, avatar: defaultAvatar6 },
    { id: 7, title: "Sản phẩm 7", completed: false, avatar: defaultAvatar7 },

  ]);
  const [newTodo, setNewTodo] = useState("");
  const [newAvatar, setNewAvatar] = useState("");
  const [editing, setEditing] = useState <number | null>(null);
  const [editingText, setEditingText]= useState("");
  const [editingAvatar, setEditingAvatar]= useState("");

  

  useEffect(()=>{
    (async () => {
      try {
        const response = await fetch(`http://localhost:3000/todos`);
        const data = await response.json();
        setTodos(data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const addTodo = ()=>{
    if(newTodo.trim()!==""&& newAvatar.trim()!==""){
      const newId = todos.length ? todos[todos.length -1].id +1:1;
      setTodos([
        ...todos,
        {id: newId, title: newTodo.trim(),completed: false, avatar: newAvatar.trim()}
      ]);
      setNewTodo("");
      setNewAvatar("");
    }
  };

  const deleteTodo = (id:number)=>{
    const updatedTodos = todos.filter((todo)=>todo.id !== id);
    setTodos(updatedTodos);

  };

  const startEditing = (id:number, title: string, avatar:string)=>{
    setEditing(id);
    setEditingText(title);
    setEditingAvatar(avatar);
  };

  const saveEdit = (id:number)=>{
      const updatedTodos = todos.map((todo)=>
      todo.id === id ? {...todo,title: editingText,avatar: editingAvatar}:todo
      );
      setTodos(updatedTodos);
      setEditing(null);
      setEditingText("");
      setEditingAvatar("");
  };

  const toggleComplete = (id:number)=>{
    const updatedTodos = todos.map((todo)=>
      todo.id === id ? {...todo,completed: !todo.completed}: todo
    );
    setTodos(updatedTodos);
  };

  return(
    <Container className="App">
      <h1 className="my-4">Danh sách công việc</h1>
      <ListGroup className="mb-4">
      {todos.map((todo) => (
          <ListGroupItem key={todo.id} className={`d-flex align-items-center ${todo.completed ? "completed" : ""}`}>
            <img src={todo.avatar} alt={todo.title} width="50" height="50" className="me-3" />
            {editing === todo.id ? (
              <>
                <Form.Control
                  type="text"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  className="me-2"
                />
                <Form.Control
                  type="text"
                  value={editingAvatar}
                  onChange={(e) => setEditingAvatar(e.target.value)}
                  placeholder="Nhập URL ảnh"
                  className="me-2"
                />
              </>
            ) : (
              <span className="me-auto" onClick={() => toggleComplete(todo.id)}>{todo.title}</span>
            )}
            {editing === todo.id ? (
              <Button variant="success" onClick={() => saveEdit(todo.id)} className="me-2">Lưu</Button>
            ) : (
              <Button variant="warning" onClick={() => startEditing(todo.id, todo.title, todo.avatar)} className="me-2">Sửa</Button>
            )}
            <Button variant="danger" onClick={() => deleteTodo(todo.id)}>Xóa</Button>
          </ListGroupItem>
        ))}

      </ListGroup>
      <Form className="mb-4">
        <Row>
          <Col>
            <Form.Control
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Nhập công việc mới"
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
  )

}


export default App;
