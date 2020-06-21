import { App, ChangeView, AppStateChanged } from '../../../build/blinc'
import {Routes, onRouteChange} from '../../../build/router'
import { addRules, getRules } from '../../../build/css'
import Navbar from './views/navbar'
import Home from './views/home'
import Contact from './views/contact'
import About from './views/about'
import Footer from './views/footer'
import SignIn from './views/signin'
import '../style.css'


let style = {
  svg: {
    color: 'red'
  }
}

addRules(style)

let initialState = {
  isUserLoggedIn: false,
};

const MyApp = () => {
  let init = [initialState, [[onRouteChange]]];
  const update = (msg, state) => {
    switch (msg.type) {
      case "ROUTE_CHANGED":
        return [
          state,
          [[ChangeView, Object.assign({}, { state: state }, msg.payload)]],
        ];
      case "LOGGED_IN":
        return [
          Object.assign({}, state, msg.payload),
          [[AppStateChanged, msg.payload]],
        ];
      case "LOGGED_OUT":
        return [
          Object.assign({}, state, msg.payload),
          [[AppStateChanged, msg.payload]],
        ];
      case "STATE_SHARED":
        return [state];
      default:
        return [state];
    }
  };
  const view = () => {
    return {
      head: {
        meta: [{ name: "description", content: "Blinc" }],
        title: "Blinc SPA Sample",
        cssRules: getRules()
      },
      body: {
        header: Navbar,
        main: Routes([
          { path: "/", view: Home },
          { path: "/contact/:id", view: Contact },
          { path: "/about", view: About },
          { path: "/signin", view: SignIn },
        ]),
        footer: Footer,
      },
    };
  };
  return { init, update, view };
};

App(MyApp());