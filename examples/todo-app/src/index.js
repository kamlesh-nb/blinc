import { View } from "../../../build";
import {div,
  input,
  ul,
  li, 
  button,
  h2,
  hr,
  span,
  label,
  i,
  formFields} from '../../../build/tags'

import { addTodo, clearAll, removeTodo, sendCmd } from './messages'
import { testCmd } from './effects/commands'
import { pipe } from "../../../build/blinc.min";

var initialState = {
  title: "Check you blood sugar",
  uid: 0,
  todos: [],
}; 
const func1 = (param, dispatch) =>{
  console.log('func1 in pipe got executed');
  return { param, dispatch }
}

const func2 = (props={}) =>{
  console.log('func2 in pipe got executed');
  return props
}

const f = pipe(func1, func2, testCmd)

const Todo = (props) => {
  let init = [initialState, [testCmd, {id: 1}]];
  const update = (msg, state) => {
    switch (msg.type) {
      case "ADD":
        return [
          Object.assign({}, state, {
            title: msg.payload,
            uid: state.uid + 1,
            todos: state.todos.concat({
              id: state.uid + 1,
              title: msg.payload,
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
        return [state, [f, msg.payload]]
      case 'TO_UPPER':
        return [
          Object.assign({}, state, { todos: state.todos.map(todo => (todo.id == msg.payload.id) ? {id: todo.id, title: todo.title.toUpperCase()} : todo)})
        ]
      default:
        return [state];
    }
  };
  const view = (state, dispatch) => {
    let { fields, setValue } =   formFields({...state});

    return div({ class: "container" }, [
      h2({ text: "Blinc To Do" }),
      state.todos.length == 0
        ? `There's nothing you can do at the moment...`
        : span({text: `Total Todos: ${state.todos.length}`}),
      hr(), 
      div({ class: "row" }, [
        div({ class: "col-md-10" }, [
          label({for: 'title', text: 'To Do Title'}),
          input({ id: "title", class: "form-control", value: fields.title,  onchange: setValue }),
        ]),
        div({ class: "col-md-1" }, [
          button({
            id: "add",
            class: "btn btn-primary",
            text: "Add",
            onclick: (e) => {
              dispatch(addTodo(fields.title));
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
