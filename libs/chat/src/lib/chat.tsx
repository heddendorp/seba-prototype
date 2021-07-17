import React, { useContext, useEffect, useState } from "react";
import {Grid, List, ListItem} from '@material-ui/core'
import {SocketContext} from '@seba/context';
const ENDPOINT = "http://localhost:3333";


/* eslint-disable-next-line */
export interface ChatProps {}

export function Chat(props: ChatProps) {
  // state to keep track of the messages
  const [messages, setMessages] = useState([]);

  const socket = useContext(SocketContext);

  // keydown handler to send messages on enter
  const sendMessage = (event) => {
    if (event.key === "Enter") {
      const message = event.target.value;
      event.target.value = "";
      socket.emit("chatMessage", message);
    }
  };
      
  // use effect to connect to the socket
  useEffect(() => {
    socket.on("message", (data) => {
      console.log("Received message: " + data);
    });
    // add the messages to the state
    socket.on("chatMessage", (data) => {  
      console.log("Received message: " + data.text);
      const chatMessages = messages.slice();
      console.log(chatMessages);
      setMessages([...chatMessages, data]);
    });
  }, [socket, messages]);
  // show a list of chat messages with a text field on the bottom
  return (
      <List>
        {messages.map((message) => (
           <ListItem key={message.id}>{message.text}</ListItem>
        ))}
        <ListItem>
          <input type="text" placeholder="Type a message" onKeyDown={sendMessage} />
        </ListItem>
      </List>
  );
}

export default Chat;
