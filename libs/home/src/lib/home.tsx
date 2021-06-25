/* eslint-disable-next-line */
import {Navigation} from "@seba/navigation";

export interface HomeProps {}

export function Home(props: HomeProps) {

  return (
    <div>
      <Navigation/>
      <main>
        Welcome to home!
      </main>
    </div>
  );
}

export default Home;
