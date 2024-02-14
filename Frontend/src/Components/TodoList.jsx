import React, { useContext, useState, useEffect } from 'react';
import { authState } from '../store/authState.js';
import { useRecoilValue } from "recoil";


const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const authStateValue = useRecoilValue(authState);

    useEffect(() => {
        const getTodos = async () => {
            const response = await fetch('https://to-do-app-theta-ebon.vercel.app/todo/todos', {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });
            const data = await response.json();
            setTodos(data);
        };
        getTodos();
    }, [authState.token]);

    const addTodo = async () => {
        const response = await fetch('https://to-do-app-theta-ebon.vercel.app/todo/todos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem("token")}` },
            body: JSON.stringify({ title, description })
        });
        const data = await response.json();
        setTodos([...todos, data]);
        setTitle('');
        setDescription('');
    };

    const markDone = async (id) => {
        const response = await fetch(`https://to-do-app-theta-ebon.vercel.app/todo/todos/${id}/done`, {
            method: 'PATCH',
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        });
        const updatedTodo = await response.json();
        setTodos(todos.map((todo) => (todo._id === updatedTodo._id ? updatedTodo : todo)));
    };

    const deleteTodo = async (id) => {
        await fetch(`https://to-do-app-theta-ebon.vercel.app/todo/todos/${id}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        });
        setTodos(todos.filter((todo) => todo._id !== id));
    };

    return (
        <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto', padding: '20px', backgroundColor: '#f7f7f7', borderRadius: '8px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}>
           
            <div style={{ display: "flex", alignItems: 'center', justifyContent: 'space-between' }}>
                <h2 style={{ margin: '0' }}>Welcome, {authStateValue.username}!</h2>
               
                <button style={{ backgroundColor: '#d32f2f', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer' }} onClick={() => {
                    localStorage.removeItem("token");
                    window.location = "/";
                }}>Logout</button>
            </div>
            <h2 style={{ marginTop: '20px', marginBottom: '10px' }}>Todo List</h2>
            <input type='text' value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Enter Todo Title' style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
            <input type='text' value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Enter Todo Description' style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
            
            <button onClick={addTodo} style={{ backgroundColor: '#388e3c', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '4px', cursor: 'pointer' }}>Add Todo</button>
            {todos.map((todo) => (
                <div key={todo._id} style={{ backgroundColor: '#fff', marginTop: '20px', padding: '10px', borderRadius: '4px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>
                    <h3 style={{ margin: '0', color: '#333' }}>{todo.title}</h3>
                    <p style={{ marginTop: '5px', marginBottom: '10px', color: '#666' }}>{todo.description}</p>
                    
                    <button onClick={() => markDone(todo._id)} 
                    style={{ backgroundColor: todo.done ? '#757575' : '#1976d2', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', marginRight: '10px',marginBottom: '10px' }}>
                        {todo.done ? 'Done' : 'Mark as Done'}</button>
                      
                    <button onClick={() => deleteTodo(todo._id)} style={{ backgroundColor: '#d32f2f', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer' }}>Delete</button>
                </div>
            ))}
        </div>
    );
};

export default TodoList;


// import React, { useContext, useState, useEffect } from 'react';
// import { authState } from '../store/authState.js';
// import {useRecoilValue} from "recoil";

// const TodoList = () => {
//     const [todos, setTodos] = useState([]);
//     const [title, setTitle] = useState('');
//     const [description, setDescription] = useState('');
//     const authStateValue = useRecoilValue(authState);

//     useEffect(() => {
//         const getTodos = async () => {
//             const response = await fetch('https://to-do-app-theta-ebon.vercel.app/todo/todos', {
//                 headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
//             });
//             // Todo: Create a type for the response that you get back from the server
//             const data = await response.json();
//             setTodos(data);
//         };
//         getTodos();
//     }, [authState.token]);

//     const addTodo = async () => {
//         const response = await fetch('https://to-do-app-theta-ebon.vercel.app/todo/todos', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem("token")}` },
//             body: JSON.stringify({ title, description })
//         });
//         const data = await response.json();
//         setTodos([...todos, data]);
//     };

//     const markDone = async (id) => {
//         const response = await fetch(`https://to-do-app-theta-ebon.vercel.app/todo/todos/${id}/done`, {
//             method: 'PATCH',
//             headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
//         });
//         const updatedTodo = await response.json();
//         setTodos(todos.map((todo) => (todo._id === updatedTodo._id ? updatedTodo : todo)));
//     };
//     const deleteTodo = async (id) => {
//         await fetch(`https://to-do-app-theta-ebon.vercel.app/todo/todos/${id}`, {
//             method: 'DELETE',
//             headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
//         });
//         setTodos(todos.filter((todo) => todo._id !== id));
//     };

//     return (
//         <div>
//             <div style={{display: "flex"}}>
//                 <h2>Welcome {authStateValue.username}</h2>
//                 <div style={{marginTop: 25, marginLeft: 20}}>
//                     <button onClick={() => {
//                         localStorage.removeItem("token");
//                         window.location = "/";
//                     }}>Logout</button>
//                 </div>
//             </div>
//             <h2>Todo List</h2>
//             <input type='text' value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Title' />
//             <input type='text' value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Description' />
//             <button onClick={addTodo}>Add Todo</button>
//             {todos.map((todo) => (
//                 <div key={todo._id}>
//                     <h3>{todo.title}</h3>
//                     <p>{todo.description}</p>
//                     <button onClick={() => markDone(todo._id)}>{todo.done ? 'Done' : 'Mark as Done'}</button>
                   
//                     <button onClick={() => deleteTodo(todo._id)}>Delete</button>
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default TodoList;
