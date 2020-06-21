import { div } from 'blinc/tags'

const Footer = () => {
  let init = [0];
  const update = (msg, state) => {};
  const view = (state, dispatch) => {
    return div({}, ["Footer"]);
  };
  return { init, update, view };
}

export default Footer