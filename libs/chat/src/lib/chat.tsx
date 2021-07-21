import React, { useContext, useEffect, useState } from "react";
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';

import {List, ListItem, ListItemText} from '@material-ui/core' //remove grid if not useful

import {SocketContext} from '@seba/context';
import { __classPrivateFieldSet } from "tslib";
const ENDPOINT = "http://localhost:3333";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    list: {
      marginBottom: theme.spacing(2),
    },
  }),
);


/* eslint-disable-next-line */
export interface ChatProps {}

export function Chat(props: ChatProps) {
  // state to keep track of the messages
  const [messages, setMessages] = useState([]);
  const classes = useStyles();
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
      console.log("Received message hello: " + data);
    });
    // add the messages to the state
    socket.on("chatMessage", (data) => {  
      //console.log("Received message chatMessage: " + data.text);
      const chatMessages = messages.slice();
      //console.log(chatMessages);
      setMessages([...chatMessages, data]);
    });
  }, [socket, messages]);
  // show a list of chat messages with a text field on the bottom
  return (
      <List className={classes.list}>
        {messages.map((message) => (
           <ListItem button key={message.id}>
             <ListItemText primary={message.userid} secondary={message.text}/>
           </ListItem>
        ))}
        <ListItem>
          <input type="text" placeholder="Type a message" onKeyDown={sendMessage} />
        </ListItem>
      </List>
  );
}

export default Chat;
