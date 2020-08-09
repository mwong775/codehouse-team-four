import React, { useState, useEffect } from 'react';
import io from "socket.io-client";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './ShareNCare.css';

let endPoint = "http://localhost:5000";
let socket = io.connect(`${endPoint}`);

// Functional component
export const ShareNCare = () => {
  // create state using hooks
  const [messages, setMessages] = useState(["Hello and Welcome"]);
  const [message, setMessage] = useState("");

  // componentDidUpdate method as hook (useEffect)
  // this will auto call when message length changes
  useEffect(() => {
    getMessages();
    // line below disables warning
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages.length]);

  // Called when first time app render and every time message length changes
  const getMessages = () => {
    socket.on("message", msg => {
      setMessages([...messages, msg]);
    });
  };

  const onChange = e => {
    setMessage(e.target.value);
  }

  const onClick = e => {
    if (message !== "") {
      // When btn clicked emit the message to server
      socket.emit("message", message);
      setMessage("");
    } else {
      alert("Please Add A Message");
    }
  };

  return (
    <div className="chat">
      {messages.map(msg => (
        <div>
          <p>{msg}</p>
        </div>
      ))}
      <div className="input-form">
        <TextField className="input" id="outlined-basic" label="Message" variant="outlined" value={message} name="message" onChange={e => onChange(e)} />
        <Button variant="contained" color="primary" onClick={() => onClick()}>Send</Button>
      </div>
    </div>
  );
};
