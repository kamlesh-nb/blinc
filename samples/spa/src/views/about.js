import { div } from 'blinc/tags'

const About = () => {
  let init = [0];
  const update = (msg, state) => {};
  const view = (state, dispatch) => {
    return div({}, ["About"]);
  };
  return { init, update, view };
}

export default About