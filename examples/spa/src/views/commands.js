import {
  div,
  button,
  hr,
  table,
  tbody,
  tr,
  td,
  img,
  input,
  formFields,
} from "../../../../src/tags";
import { loadUsers } from "../messages";
import { getUsers } from "../effects/commands";

let initialState = {
  page: 2,
  per_page: 6,
  total: 12,
  total_pages: 2,
  data: {
    data: [],
  },
};

const Commands = (props) => {
  let init = [initialState];

  const update = (msg, state) => {
    switch (msg.type) {
      case "LOAD_USERS":
        return [state, [getUsers, msg.payload]];
      case "SHOW_USERS":
        return [Object.assign(state, msg.payload)];
      default:
        return state;
    }
  };

  const view = (state, dispatch) => {
    const { fields, setValue } = formFields();

    return div({ class: "container" }, [
      div({ class: "row" }, [
        div({ class: "col-6" }, [
          input({
            id: "pageNo",
            placeholder: "Enter page no.",
            onchange: setValue,
          }),
        ]),
        div({ class: "col-6" }, [
          button({
            class: "btn",
            text: "Load Users",
            onclick: (e) => {
              dispatch(loadUsers(fields.pageNo));
            },
          }),
        ]),
      ]),
      hr(),
      table({}, [
        tbody(
          {},
          state.data.data.map((item) => {
            return tr({}, [
              td({ text: item.id }),
              td({ text: item.email }),
              td({ text: item.first_name }),
              td({ text: item.last_name }),
              td({}, [img({ src: item.avatar })]),
            ]);
          })
        ),
      ]),
    ]);
  };

  return { init, update, view };
};

export default Commands;
