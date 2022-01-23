import { App, Router, Routes, Push } from "../../../src/index";
import { h3, div, main, nav, ul, li, Link, label, header } from "../../../src/types";
import './style.css'

import SignIn from "./views/signin";
import Home from "./views/home";
import ServiceDesigner from "./views/ServiceDesigner";
import AppDesigner from "./views/AppDesigner";
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
        nav({class: "relative flex flex-end flex-wrap items-center justify-end px-2 py-3 bg-blue-500 mb-3"},[
          div({class: "container flex-end px-4 mx-auto flex flex-wrap items-center justify-end"}, [
            div({class: "flex flex-end items-center md:order-2"}, [
              ul({class: "flex flex-end flex-col lg:flex-row list-none lg:ml-auto"},[
              li([Link({ class: "px-2 py-1 flex items-center text-sm font-bold leading-snug text-white hover:opacity-75", text: "Home", href: "/" })]),
              li([Link({ class: "px-2 py-1 flex items-center text-sm font-bold leading-snug text-white hover:opacity-75", text: "Micro Services", href: "/service" })]),
              li([Link({ class: "px-2 py-1 flex items-center text-sm font-bold leading-snug text-white hover:opacity-75", text: "Micro Front-Ends", href: "/app" })]),
            ]),
          ]),
          ])
        ]),
      ]),
      Router(
        state,
        dispatch,
        main({class: "flex justify-center"},
        [
          Routes([
            { path: "/", element: Home },
            { path: "/service", element: ServiceDesigner },
            { path: "/app", element: AppDesigner },
          ]),
        ])
      ),
    ]);
  };
  return { init, reducer, render };
};

App(myApp());
