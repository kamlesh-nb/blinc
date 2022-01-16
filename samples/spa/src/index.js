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
        nav({class: "bg-blue-600 border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-800"},[
          div({class: "container flex flex-wrap justify-between items-center mx-auto"}, [
            div({class: "flex items-center md:order-2"}, [
              ul({class: "flex py-1"},[
              li([Link({ class: "block py-2 px-2 text-sm text-white hover:bg-white hover:text-blue-600 dark:hover:bg-white dark:text-gray-200 dark:hover:text-blue-600", text: "Home", href: "/" })]),
              li([Link({ class: "block py-2 px-2 text-sm text-white hover:bg-white hover:text-blue-600 dark:hover:bg-white dark:text-gray-200 dark:hover:text-blue-600", text: "Contact", href: "/contact/9/kam" })]),
              li([Link({ class: "block py-2 px-2 text-sm text-white hover:bg-white hover:text-blue-600 dark:hover:bg-white dark:text-gray-200 dark:hover:text-blue-600", text: "About", href: "/about" })]),
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
                : li([Link({ class: "block py-2 px-2 text-sm text-white hover:bg-white hover:text-blue-600 dark:hover:bg-white dark:text-gray-200 dark:hover:text-blue", text: "Sign In", href: "/signin" })]),
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
