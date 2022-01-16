import { App, Router, Routes, Push } from "../../../src/index";
import { hr, div, main, nav, ul, li, Link, label, header } from "../../../src/types";
import '../index.css'

import SignIn from "./views/signin";
import Home from "./views/home";
import Contact from "./views/contact";
import About from "./views/about";
import SignUp from "./views/signup";

let initialState = {
  isUserLoggedIn: false,
  userData: null,
};

const myApp = () => {
  let init = [initialState];
  const reducer = (msg, state) => {
    switch (msg.type) {
      case "LOGGED_IN":
        return [Object.assign({}, state, msg.payload)];
      case "LOGGED_OUT":
        return [Object.assign({}, state, msg.payload)];
      default:
        return [state];
    }
  };
  const render = (state, dispatch) => {
    return div({ id: "root" }, [
      header([
        nav([
          ul([
            li([Link({ text: "Home", href: "/" })]),
            li([Link({ text: "Contact", href: "/contact/9/kam" })]),
            li([Link({ text: "About", href: "/about" })]),
            state.isUserLoggedIn
              ? li([
                  label({
                    text: "Sign Out",
                    onclick: (e) => {
                      dispatch({
                        type: "LOGGED_OUT",
                        payload: {
                          isUserLoggedIn: false,
                          userData: null,
                        },
                      });
                      Push("/");
                    },
                  }),
                ])
              : li([Link({ text: "Sign In", href: "/signin" })]),
          ]),
        ]),
      ]),
      Router(
        state,
        dispatch,
        main([
          Routes([
            { path: "/", element: Home },
            { path: "/contact/:id/:name", element: Contact },
            { path: "/about", element: About },
            { path: "/signin", element: SignIn },
            { path: "/signup", element: SignUp },
          ]),
        ])
      ),
    ]);
  };
  return { init, reducer, render };
};

App(myApp());
