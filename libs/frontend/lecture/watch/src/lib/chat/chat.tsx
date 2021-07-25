import {
  Grid,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useStyles } from '../style';

/* eslint-disable-next-line */
export interface ChatProps {
  socket: any;
  group: any;
  groupId?: string;
  user: any;
}

export function Chat(props: ChatProps) {
  // state for the messages
  const [messages, setMessages] = useState<any[]>([]);
  const classes = useStyles();

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
        setMessages((messages) => [data].concat(messages));
      });
    }
    return () => {
      props.socket.off('message');
    };
  }, [props.groupId]);
  return (
    <div>
      <Typography variant="h4" component="h3" gutterBottom>
        Chat
      </Typography>
      {props.groupId && (
        <>
          <TextField fullWidth onKeyDown={sendMessage} label="Enter message" />
          <List style={{ overflowY: 'auto', maxHeight: '50vh' }}>
            {messages.map((message) => (
              <>
                {props.user.display_name == message.author ? (
                  <ListItem className={classes.sentMessage} key={message._id}>
                    <ListItemText
                      primary={message.author}
                      secondary={message.message}
                    />
                  </ListItem>
                ) : (
                  <ListItem
                    className={classes.receivedMessage}
                    key={message._id}
                  >
                    <ListItemText
                      primary={message.author}
                      secondary={message.message}
                    />
                  </ListItem>
                )}
              </>
            ))}
          </List>
        </>
      )}
      {!props.group && <p>Enter a study group to use the chat!</p>}
    </div>
  );
}

export default Chat;
