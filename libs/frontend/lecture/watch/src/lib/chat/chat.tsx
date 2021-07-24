import {ListItem, ListItemText, TextField} from '@material-ui/core';
import {useEffect, useState} from 'react';

/* eslint-disable-next-line */
export interface ChatProps {
  socket: any;
  groupId: string;
  user: any;
}

export function Chat(props: ChatProps) {
  // state for the messages
  const [messages, setMessages] = useState([]);

  const sendMessage = (event) => {
    if (event.key === 'Enter') {
      const message = event.target.value;
      event.target.value = '';
      props.socket.emit('message', {
        group_id: props.groupId,
        message,
        author: props.user.display_name,
      });
    }
  };

  useEffect(() => {
    props.socket.on('message', (data: any) => {
      console.log(data);
      setMessages(messages.concat(data));
    });
    return () => {
      props.socket.off('message');
    };
  });
  return (
    <div style={{height: '100%', overflow: 'auto'}}>
      <h3>Chat</h3>
      {props.groupId && (
        <>
          {messages.map((message) => (
            <ListItem>
              <ListItemText
                primary={message.author}
                secondary={message.message}
              />
            </ListItem>
          ))}
          <TextField fullWidth onKeyDown={sendMessage} label="Enter message"/>
        </>
      )}
      {!props.groupId && <p>Enter a study group to use the chat!</p>}
    </div>
  );
}

export default Chat;
