import { ListItem, ListItemText, TextField } from '@material-ui/core';
import { useEffect, useState } from 'react';

/* eslint-disable-next-line */
export interface ChatProps {
  socket: any;
  group: any;
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
        group_id: props.group._id,
        message,
        author: props.user.display_name,
      });
    }
  };

  useEffect(() => {
    if (props.group) {
      setMessages(props.group.chat);
      props.socket.on('message', (data: any) => {
        console.log(data);
        setMessages(messages => messages.concat(data));
      });
    }
    return () => {
      props.socket.off('message');
    };
  }, [props.groupId]);
  return (
    <div style={{ height: '100%', overflow: 'auto' }}>
      <h3>Chat</h3>
      {props.group && (
        <>
          {messages.map((message) => (
            <ListItem key={message._id}>
              <ListItemText
                primary={message.author}
                secondary={message.message}
              />
            </ListItem>
          ))}
          <TextField fullWidth onKeyDown={sendMessage} label="Enter message" />
        </>
      )}
      {!props.group && <p>Enter a study group to use the chat!</p>}
    </div>
  );
}

export default Chat;
