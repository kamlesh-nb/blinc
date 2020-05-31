import { div, nav, ul, li, a } from '../../../../build/tags'

const Navbar = (props) => {
  
    let init = [0]
    const update = (msg, state) => {
    }
    const view = (state, dispatch) => {
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
   return { init, update, view }
};

export default Navbar
