import { div, input, hr, button, formFields } from "../../../../build/tags";
import { listenChangesToUsers } from "../effects/subscriptions";
import { addSub, removeSub, addUser } from "../messages";
import { cmdAddUser } from "../effects/commands";
import Users from "./components/users";
import NewUser from "./components/newUser";

let initialState = {
  isSubscribed: false,
  users: [],
};

const { subscribe, unsubscribe } = listenChangesToUsers();

const Subscriptions = (props) => {
  let init = [initialState];

  const update = (msg, state) => {
    switch (msg.type) {
      case "ADD_USER":
        return [state, [cmdAddUser, msg.payload]];
      case "SUBSCRIBE":
        return [Object.assign({}, state, msg.payload), [subscribe]];
      case "UNSUBSCRIBE":
        return [Object.assign({}, state, msg.payload), [unsubscribe]];
      case "REFRESH_DATA":
        return [Object.assign({}, state, { users: msg.payload })];
      default:
        return [state];
    }
  };

  const view = (state, dispatch) => {
    return div({ class: "container" }, [
     NewUser(dispatch),
      hr(),
      div({ class: "row" }, [
        div({ class: "col-6" }, [
          button({
            class: "btn-success",
            text: "Subscribe",
            onclick: (e) => {
              dispatch(addSub(true));
            },
          }),
        ]),
        div({ class: "col-6" }, [
          button({
            class: "btn-danger",
            text: "Unsubscribe",
            onclick: (e) => {
              dispatch(removeSub(false));
            },
          }),
        ]),
      ]),
      Users(state.users, dispatch),
    ]);
  };

  return { init, update, view };
};

export default Subscriptions;