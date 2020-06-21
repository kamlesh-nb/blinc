import { div, nav, ul, li, a, svg, path } from '../../../../build/tags'
import { WatchAppState } from '../../../../build/blinc'
import { push } from '../../../../build/router'

let activeLink

const Link = (props = {}) => {  
  return a({ 
   ...props,
    onclick: (e) => {
      if(activeLink)
        activeLink.classList.remove('active')
      activeLink = e.target;
      activeLink.classList.add('active')
      e.preventDefault();
      push(e.target.pathname)
    },
  });
};

const Navbar = (props) => {
  let init = [Object.assign({}, props.state), [[WatchAppState]]];
  const update = (msg, state) => {
    switch (msg.type) {
      case "APP_STATE_CHANGED":
        return [Object.assign(state, msg.payload)];
      default:
        return [state];
    }
  };
  const view = (state, dispatch) => {
    return div({}, [
      div({ class: "logo" }, ["Blinc SPA"]),
      nav({}, [
        ul({}, [
          li({}, [Link({ text: "Home", href: "/" })]),
          li({}, [Link({ text: "Contact", href: "/contact/90" })]),
          li({}, [Link({ text: "About", href: "/about" })]),
          state.isUserLoggedIn
            ? li({}, [Link({ text: "Sign Out" })])
            : li({}, [Link({ text: "Sign In", href: "/signin" })]),
        ]),
      ]),
      div({ class: "menu-toggle" }, [
        svg({ height: "24", viewBox: "0 0 24 23", width: "24" }, [
          path({ d: "M0 0h24v24H0z", fill: "none" }),
          path({ d: "M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" }),
        ]),
      ]),
    ]);
  };
  return { init, update, view };
}

export default Navbar