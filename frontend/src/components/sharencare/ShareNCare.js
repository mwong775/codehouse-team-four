import React from 'react';
import { Title } from './Title';
import { MessageList } from './MessageList';
import { SendMessageForm } from './SendMessageForm';

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

export class ShareNCare extends React.Component {
    constructor() {
        super()
        this.state = {
           messages: DUMMY_DATA
        }
      }

    render() {
        return(
            <div>
              {/* <Title /> */}
              <MessageList messages={this.state.messages}/>
              {/* <SendMessageForm /> */}
            </div>
        );
    }
}