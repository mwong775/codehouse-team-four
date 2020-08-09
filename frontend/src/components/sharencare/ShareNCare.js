import React, { useState, useEffect } from 'react';
import io from "socket.io-client";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './ShareNCare.css';

import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginRight: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));


let endPoint = "http://localhost:5000";
let socket = io.connect(`${endPoint}`);

// Functional component
export const ShareNCare = () => {
  // create state using hooks
  const [messages, setMessages] = useState(["SHARE AND CARE"]);
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

  const classes = useStyles();

  return (
    <>
      <main className="chat">
        {messages.map(msg => (
          <div>
            <p>{msg}</p>
          </div>
        ))}
        <div className="input-form">
          <TextField className="input" id="outlined-basic" label="Send A Message" variant="outlined" value={message} name="message" onChange={e => onChange(e)} />
          <Button variant="contained" color="primary" onClick={() => onClick()}>Send</Button>
        </div>
      </main>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="right"
      >
        <div className={classes.toolbar} />
        <Divider />
        <h2>Communities</h2>
        <Divider />
        <List>
          {['General', 'Job Hunting','Remote Jobs'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['Bored At Home', 'Quaranteens'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};
