import { Elements } from "blinc";
import { div, button } from "blinc";

let initialState = {
  count: 0,
};
const Counter = () => {
  let init = [initialState];

  const reducer = (msg, state) => {
    switch (msg.type) {
      case "INCREMENT":
        return [Object.assign(state, { count: state.count + 1 })];
      case "DECREMENT":
        return [Object.assign(state, { count: state.count - 1 })];
      default:
        return [state];
    }
  };

  const render = (state, dispatch) => {
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
  return { init, reducer, render };
};

let counter = Elements(Counter());
counter.mount(document.body);
