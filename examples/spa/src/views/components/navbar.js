import { div, nav, ul, li, a } from '../../../../../build/tags'

const Navbar = (props) => {
  return div({ id: "navigation" },[
    nav({},[
        ul({ id: "list"},[
          li({},[a({ path: "/", text: 'Home'})]),
          li({},[a({ path: "/commands", text: 'Commands'})]),
          li({},[a({ path: "/subscriptions", text: 'Subscriptions'})]),
        ]),
    ]),
  ]);
}

export default Navbar