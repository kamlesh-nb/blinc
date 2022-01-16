import { div, br, form, input, button } from "../../../../src/types";
import { Push } from '../../../../src/index'
import viewState from '../utils'

let initialState = {
  username: '',
  password:'',
  verificationcode: '',
  verificationStatus: '',
  keyInVerificationCode: false,
  userData: {}
}

const SignIn = (props) => {
  let init = [initialState]
  const reducer = (msg, state) => {

  }
  const render = (state, dispatch) => {
    const { fields, setValue } = viewState(state)
    return div([
      form({class: 'Login'},[
        input({id: 'username', placeholder: 'Enter username', value: fields.username, onchange: setValue}),
      br(),
      input({id: 'password', placeholder: 'Enter password', type: 'password', value: fields.password, onchange: setValue}),
      br(),
      button({
        text: "Sign In",
        onclick: (e) => {
          props.dispatch({
            type: "LOGGED_IN",
            payload: { isUserLoggedIn: true },
          });
        },
      }),
      button({
        text: "Sign Up",
        onclick: (e) => {
          Push('/signup')
        },
      })
      ])
    ]);
  };
  return { init, render };
};

export default SignIn