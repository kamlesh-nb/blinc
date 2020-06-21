const Home = (props) => {
  let init = [0];

  const update = (msg, state) => {};
  const view = (state, dispatch) => {
    return div({}, ["Home"]);
  };
  return { init, update, view };
}

export default Home