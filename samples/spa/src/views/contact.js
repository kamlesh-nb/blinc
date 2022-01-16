import { div,label, input } from "../../../../src/types";

const Contact = (props) => {
  const render = () => {
    return div([
      label({text: "ID"}),
      input({value: props.params.id}),
      label({text: "Name"}),
      input({value: props.params.name})
    ]);
  };
  return { render };
};

export default Contact