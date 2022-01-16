import { App, Router, Routes, Push } from "../../../src/index";
import { h3, div, main, nav, ul, li, Link, label, header } from "../../../src/types";
import './style.css'

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
      header({},[
        nav({class: "relative flex flex-wrap items-center justify-between px-2 py-3 bg-blue-500 mb-3"},[
          div({class: "container px-4 mx-auto flex flex-wrap items-center justify-between"}, [
            div({class: "flex items-center md:order-2"}, [
              ul({class: "flex flex-col lg:flex-row list-none lg:ml-auto"},[
              li([Link({ class: "px-2 py-1 flex items-center text-sm uppercase font-bold leading-snug text-white hover:opacity-75", text: "Home", href: "/" })]),
              li([Link({ class: "px-2 py-1 flex items-center text-sm uppercase font-bold leading-snug text-white hover:opacity-75", text: "Contact", href: "/contact/9/kam" })]),
              li([Link({ class: "px-2 py-1 flex items-center text-sm uppercase font-bold leading-snug text-white hover:opacity-75", text: "About", href: "/about" })]),
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
                : li([Link({ class: "px-2 py-1 flex items-center text-sm uppercase font-bold leading-snug text-white hover:opacity-75", text: "Sign In", href: "/signin" })]),
            ]),
          ]),
          ])
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
