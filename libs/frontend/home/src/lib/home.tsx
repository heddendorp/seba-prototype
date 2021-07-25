import { makeStyles, Paper } from '@material-ui/core';
/* eslint-disable-next-line */
export interface HomeProps {}

const useStyles = makeStyles((theme) => ({
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: theme.spacing(6),
    marginBottom: theme.spacing(6),
  },
  text: {
    fontSize: '1.2em',
    margin: '0 2rem',
  },
  image: {
    width: '100%',
    maxWidth: 400,
    maxHeight: 300,
    objectFit: 'contain',
  },
}));

export function Home(props: HomeProps) {
  const classes = useStyles();
  return (
    <div>
      <h1>Welcome to Learn With Me!</h1>
      <Paper elevation={4} className={classes.row}>
        <img
          src="/assets/images/laptop.png"
          alt="Image of a laptop"
          className={classes.image}
        />
        <div className={classes.text}>
          <h2>Your digital lecture experience</h2>
          <p>
            Learn with me offers an online environment to expereince your
            lectures together. Get your friends and study together. You will be
            prompted with interactive quizzes during the lecture that help you
            check your knowledge. <br />
            If something is really hard to understand you can ask a question and
            other students will see it while watching the video.
          </p>
        </div>
        <img
          src="/assets/images/rocket.png"
          alt="Image of a rocket"
          className={classes.image}
        />
      </Paper>
      <Paper elevation={4} className={classes.row}>
        <img
          src="/assets/images/chat-right.png"
          alt="Chat bubble"
          className={classes.image}
        />
        <div className={classes.text}>
          <h2>Stay connected</h2>
          <p>
            Our live technonlogy enables you to form a virtual study group with
            your friends. You can discuss the content of the lecture in a chat.
            We also sync your watching progress to make sure everyone is on the
            same page. <br />
            After you selected the lecture you want to watch, create a study group
            and start learning together.
          </p>
        </div>
        <img
          src="/assets/images/chat-left.png"
          alt="Chat bubble"
          className={classes.image}
        />
      </Paper>
      <Paper elevation={4} className={classes.row}>
        <img
          src="/assets/images/hand-left.png"
          alt="Hand pointing left"
          className={classes.image}
        />
        <div className={classes.text}>
          <h2>Get going</h2>
          <h4>Head right over to start watching your first lecture!</h4>
        </div>
        <img
          src="/assets/images/lecture-connection.png"
          alt="Person"
          className={classes.image}
        />
      </Paper>
    </div>
  );
}

export default Home;
