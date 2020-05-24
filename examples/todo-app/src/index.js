import { View } from "../../../dist/";
import {
  div,
  input,
  ul,
  li,
  button,
  h2,
  hr,
  span,
  label,
  i,
  setFieldValues,
} from "../../../dist/tags";

import { addTodo, clearAll, removeTodo, sendCmd } from './messages'
import { testCmd } from './effects/commands'

var initialState = {
  editText: "",
  uid: 0,
  todos: [],
};

const Todo = (props) => {
  let init = [initialState];
  const update = (msg, state) => {
    switch (msg.type) {
      case "ADD":
        return [
          Object.assign({}, state, {
            uid: state.uid + 1,
            todos: state.todos.concat({
              id: state.uid + 1,
              ...msg.payload,
            }),
          }),
        ];
      case "CLEAR":
        return [
          Object.assign({}, state, {
            todos: [],
          }),
        ];
      case "DEL":
        return [
          Object.assign({}, state, {
            todos: state.todos.filter((k) => k.id !== msg.payload),
          }),
        ];
      case 'CMD':
        return [state, [testCmd, msg.payload]]
      case 'TO_UPPER':
        return [
          Object.assign({}, state, { todos: state.todos.map(todo => (todo.id == msg.payload.id) ? {id: todo.id, title: todo.title.toUpperCase()} : todo)})
        ]
      default:
        return [state];
    }
  };
  const view = (state, dispatch) => {
    let { fields, setValue } = setFieldValues();

    return div({ class: "container" }, [
      h2({ text: "Blinc To Do" }),
      state.todos.length == 0
        ? label({text: `There's nothing you can do at the moment...`})
        : span({text: `Total Todos: ${state.todos.length}`}),
      hr(),
      div({ class: "row" }, [
        div({ class: "col-md-10" }, [
          input({ id: "title", class: "form-control", onchange: setValue }),
        ]),
        div({ class: "col-md-1" }, [
          button({
            id: "add",
            class: "btn btn-primary",
            text: "Add",
            onclick: (e) => {
              dispatch(addTodo(fields));
            },
          }),
        ]),
        div({ class: "col-md-1" }, [
          button({
            id: "clear",
            class: "btn btn-primary",
            text: "Clear",
            onclick: () => {dispatch(clearAll())},
          }),
        ]),
      ]),
      hr(),
      ul(
        { class: "list-group", id: "list" },
        state.todos.map((v, k) => {
          return li({ class: "list-group-item", key: v.id }, [
            div({ class: "row" }, [
              div({ class: "col-md-1" }, [span({ text: v.id })]),
              div({ class: "col-md-7" }, [span({ text: v.title })]),
              div({ class: "col-md-2" }, [
                button(
                  {
                    class: "btn btn-danger",
                    id: "del",
                    onclick: (e) => {
                      dispatch(removeTodo(v.id));
                    },
                    text: "Delete To Do   ",
                  },
                  [i({ class: "far fa-trash-alt" })]
                ),
              ]),
              div({ class: "col-md-2" }, [
                button(
                  {
                    class: "btn btn-success",
                    id: "cmd",
                    onclick: (e) => {dispatch(sendCmd(v.id))},
                    text: "Cmd Test",
                  },
                  [i({ class: "far fa-trash" })]
                ),
              ]),
            ]),
          ]);
        })
      ),
    ]);
  };
  return { init, update, view };
};

let view = View(Todo());
let $node = document.body;
view.mount($node);
