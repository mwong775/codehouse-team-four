import React from "react";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";
import { Link } from 'react-router-dom';

function Chatbot(props) {

    const theme = {
        background: "white",
        fontFamily: "Arial, Helvetica, sans-serif",
        headerBgColor: "#00B2B2",
        headerFontColor: "#fff",
        headerFontSize: "25px",
        botBubbleColor: "#00B2B2",
        botFontColor: "#fff",
        userBubbleColor: "#fff",
        userFontColor: "#4c4c4c"
       };

    const config = {
        width: "300px",
        height: "400px",
        floating: true
    };

    const steps = [
        {
          id: "Greet",
          message: "Hello, Welcome to our website!",
          trigger: "Ask How to Help"
        },
        {
          id: "Ask How to Help",
          message: "How may I help you?",
          trigger: "Waiting User Input"
        },
        {
          id: "Waiting User Input",
          user: true,
          trigger: "Ask Job Inquiry Type",
        },
        {
            id: "Ask Job Inquiry Type",
            message: "Are you seeking a job or looking to post a job?",
            trigger: "Display Job Options",
        },
        {
          id: "Display Job Options",
          options: [
            {
              value: "job seeker",
              label: "Seek a Job",
              trigger: "Suggest Job Search"
            },
            { 
              value: "job poster",
              label: "Post a Job",
              trigger: "Suggest Creating Job Post"
            } 
          ]
        },
        {
            id: "Suggest Job Search",
            component: (
                <div>I suggest checking out the job search tab <Link href="/searchjobs">here</Link>!</div>
              ),
            asMessage: true,
            trigger: "Done"
        },
        {
            id: "Suggest Creating Job Post",
            component: (
                <div>I suggest creating a new job post over <a href="/postjobs">here</a>!</div>
              ),
            asMessage: true,
            trigger: "Done"
        },
        {
          id: "Done",
          message: "Alrighty then. Have a great day !!",
          end: true
        }
     ];

    return (
        <ThemeProvider theme={theme}>
            <ChatBot steps={steps} {...config} />
        </ThemeProvider>
    );
}
export default Chatbot;