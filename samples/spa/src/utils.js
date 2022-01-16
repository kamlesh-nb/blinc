const viewState = (props = {}) => {
  const fields = {};
  Object.assign(fields, props);
  const setValue = (event) => {
    fields[event.target.id] = event.target.value;
  };
  return { fields, setValue };
};

export default viewState