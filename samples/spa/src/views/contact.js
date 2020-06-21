const Contact = (props) => {
  let init = [0];
  const update = (msg, state) => {};
  const view = (state, dispatch) => {
    return div({}, ["Contact", br({}), props.params.id]);
  };
  return { init, update, view };
}

export default Contact