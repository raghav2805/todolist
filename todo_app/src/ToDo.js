import React, { useState } from 'react'
import { List, ListItem, ListItemText, Modal, makeStyles, Button } from '@material-ui/core';
import './ToDo.css';
import db from "./firebase.js";

function rand() {
    return Math.round(Math.random() * 20) - 10;
  }
  
  function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    }
}));

function ToDo(props) {
    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);
    const [open, setOpen] = useState(false);
    const [input,setInput] = useState('');

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const updateTodo = () =>{
        db.collection("todo").doc(props.todo.id).set({
            text:input
        }, {merge : true});
        handleClose();
    }

    const body = (
        <div className={classes.paper} style={modalStyle}>
            <h2 id="">Text to change</h2>
            <input id="simple-modal-description" placeholder = {props.todo.text} value = {input} onChange = {event => setInput(event.target.value)}>
                
            </input>
        <Button onClick = {updateTodo}>Update</Button>
        </div>
    );

    return (
        <>

            <Modal
                open={open}
                onClose={handleClose}>
                {body}
            </Modal>

            <div className="margin">
                <List className="List">
                    <ListItem>
                        <ListItemText primary={props.todo.text} secondary="Deadline ⏰" />
                    </ListItem>

                    <div className="btns">
                        <button className="btn" onClick={handleOpen}>Edit</button>


                        <button className="btn" onClick={() => {
                            db.collection("todo").doc(props.todo.id).delete();
                        }}>Delete It</button>
                    </div>
                </List>
            </div>
        </>
    )
}

export default ToDo
