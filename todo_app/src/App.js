import './App.css';
import React, { useState, useEffect } from 'react';
import { TextField } from '@material-ui/core';
import ToDo from "./ToDo";
import db from "./firebase.js";

function App() {

  const [todo, setTodo] = useState([]);
  const [input, setInput] = useState('');

  useEffect(()=>{
    db.collection('todo').onSnapshot(snapshot =>{
      setTodo(snapshot.docs.map(doc => ({id: doc.id , text : doc.data().text})));
    })
  }, []);

  const addTodo = (event) => {
    event.preventDefault();

    db.collection('todo').add({
      text: input
    });

    setTodo([...todo, input]);
    setInput('');
  }

  return (
    <>
      <div className="container">
        <h1 className="header">ToDo List on your service sir🚀</h1>
        <form >
          <TextField className="src"  value={input} onChange={event => setInput(event.target.value)}
          id="outlined-helperText"
          label="Text"
          variant="outlined"
        />
          <button type="submit" disabled={!input} className="btn" onClick={addTodo} >Add</button>
        </form>
 
      </div>


      <div className="show">
          {todo.map((dis, index) => (
            <ToDo todo = {dis} key = {index}/>
          ))}
      </div>
       
    </>
  );
}

export default App;
