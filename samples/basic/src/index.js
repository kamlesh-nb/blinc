import { View } from "blincjs";
import { div, button } from "blincjs/tags";

let initialState = {
  count: 0,
};
const Counter = () => {
  let init = [initialState];

  const update = (msg, state) => {
    switch (msg.type) {
      case "INCREMENT":
        return [Object.assign(state, { count: state.count + 1 })];
      case "DECREMENT":
        return [Object.assign(state, { count: state.count - 1 })];
      default:
        return [state];
    }
  };

  const view = (state, dispatch) => {
    return div({}, [
      button({
        text: "+",
        onclick: (e) => {
          dispatch({ type: "INCREMENT" });
        },
      }),
      String(state.count),
      button({
        text: "-",
        onclick: (e) => {
          dispatch({ type: "DECREMENT" });
        },
      }),
    ]);
  };
  return { init, update, view };
};

let counter = View(Counter());
counter.mount(document.body);
