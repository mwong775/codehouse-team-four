import React, { useState, useEffect } from 'react';
import { Title } from './Title';
import { MessageList } from './MessageList';
import { SendMessageForm } from './SendMessageForm';
import io from "socket.io-client";

let endPoint = "http://localhost:5000";
let socket = io.connect(`${endPoint}`);

const DUMMY_DATA = [
  {
    senderId: "perborgen",
    text: "who'll win?"
  },
  {
    senderId: "janedoe",
    text: "who'll win?"
  }
]

// Functional component
export const ShareNCare = () => {
  // create state using hooks
  const [messages, setMessages] = useState(["Hello and Welcome"]);
  const [message, setMessage] = useState("");

  // componentDidUpdate method as hook (useEffect)
  // this will auto call when message length changes
  useEffect(() => {
    getMessages();

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
    <div>
      {/* {messages.length > 0 && messages.map(msg => {
        <div>
          <p>{msg}</p>
        </div>
      })} */}
      <input value={message} name="message" onChange={e => onChange(e)}/>
      <button onClick={() => onClick()}>Send Message</button>
    </div>
  );
};

// export default ShareNCare;

// export class ShareNCare extends React.Component {
//     constructor() {
//         super()
//         this.state = {
//            messages: DUMMY_DATA // []
//         }
//       }

//     render() {
//         return(
//             <div className="app">
//               <Title />
//               <MessageList messages={this.state.messages}/>
//               <SendMessageForm />
//             </div>
//         );
//     }
// }