import { div, nav, ul, li, a } from "../../../../build/tags";
import { listenToAuthStateChange } from "../effects/subscriptions";
import { logoutFromApp } from "../effects/commands";
import appState from "../globals/appState";

let state = { isLoggedIn: false, user: {} };

const { subscribe, unsubscribe } = listenToAuthStateChange();

const Navbar = (props) => {
  let init = [state, [subscribe]];

  const update = (msg, state) => {
    switch (msg.type) {
      case "AUTH_CHANGED":
        return [Object.assign({}, state, msg.payload)];
      case "SIGN_OUT":
        return [Object.assign({}, state, msg.payload), [logoutFromApp]];
      case "SIGN_OUT_SUCCESS":
        return [Object.assign({}, state, msg.payload)] //, [unsubscribe]];
      default:
        break;
    }
  };

  const view = (state, dispatch) => {
    
    return div({ id: "navigation" }, [
      nav({}, [
        ul({ id: "list" }, [
          li({}, [a({ id: 'home', path: "/", text: "Home",  onclick: (e) => {props.router.navigate(e)} })]),
          li({}, [a({ id: 'commands', path: "/commands", text: "Commands", onclick: (e) => {props.router.navigate(e)} })]),
          li({}, [a({ id: 'subscription', path: "/subscriptions", text: "Subscriptions", onclick: (e) => {props.router.navigate(e)} })]),
          state.isLoggedIn
            ? li({}, [
                a({ id: 'signout',
                  text: "Sign Out",
                  onclick: (e) => {
                    dispatch({
                      type: "SIGN_OUT",
                      payload: { isLoggedIn: false, user: {} },
                    });
                    props.router.push('/')
                  },
                }),
              ])
            : li({}, [a({ id: 'signin', path: "/login", text: "Sign In", onclick: (e) => {props.router.navigate(e)} })]),
        ]),
      ]),
    ]);
  };
  return { init, update, view };
};

export default Navbar;
