import { h3, div, br, form, input, label, button } from "../../../../src/types";
import { Push } from 'blinc'
import viewState from '../utils'

let initialState = {
  username: '',
  password: '',
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
    return div({ class: "py-5 flex justify-center" }, [
      div({ class: "p-4 w-80 bg-white rounded-lg border border-gray-200 shadow-md sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700" }, [
        h3({class: "mb-5 text-xl font-medium text-gray-900 dark:text-white"}, ["Sign in to our platform"]),
        form({ class: 'space-y-2' }, [
          label({ for: "username", class: "block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" }, ["User Name"]),
          input({ id: 'username', class: "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white", placeholder: 'Enter username', value: fields.username, onchange: setValue }),
          br(),
          label({ for: "password", class: "block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" }, ["Password"]),
          input({ id: 'password', class: "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white", placeholder: 'Enter password', type: 'password', value: fields.password, onchange: setValue }),
          br(),
          div({class: "grid gap-4 grid-cols-2 "},[
            button({
              class: "p-5 w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800",
              text: "Sign In",
              onclick: (e) => {
                props.dispatch({
                  type: "LOGGED_IN",
                  payload: { isUserLoggedIn: true },
                });
              },
            }),
            button({
              class: "p-5  w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800",
              text: "Sign Up",
              onclick: (e) => {
                Push('/signup')
              },
            })
          ])

        ])
      ])
    ]);
  };
  return { init, render };
};

export default SignIn


/*

import {
  div,
  i,
  input,
  label,
  button,
  formFields,
} from "../../../../build/tags";
import { loginToApp } from "../effects/commands";

let state = {
  isLoginStarted: false,
  user: {}
};

const Login = (props) => {
  let init = [state];

  const update = (msg, state) => {
    switch (msg.type) {
      case "SIGN_IN":
        return [state, [loginToApp, msg.payload]];
      case "SIGN_IN_SUCCESS": 
        props.router.push('/')
        return [Object.assign({}, state, msg.payload)]
      default:
        return [state];
    }
  };

  const view = (state, dispatch) => {
    const { fields, setValue } = formFields({ email: "", password: "" });
    return div({ class: "Login" }, [
      div({ class: "row" }, [
        div({ class: "col-12" }, [
          label({ text: "User Name", htmlfor: "email" }),
          input({ id: "email", value: fields.email, onchange: setValue }),
        ]),
      ]),
      div({ class: "row" }, [
        div({ class: "col-12" }, [
          label({ text: "Password", htmlfor: "password" }),
          input({ id: "password", type: "password", value: fields.password, onchange: setValue }),
        ]),
      ]),
      div({ class: "row" }, [
        div({ class: "col-6" }, [
          button({
            class: "btn-primary",
            //text: "Login",
            onclick: (e) => {
              dispatch({ type: "SIGN_IN", payload: fields });
            },
          },[
            i({class: 'material-icons'}, [
              'login'
            ]),
            '   Login'
          ]),
        ]),
        div({ class: "col-6" }, [
          button({
            class: "btn",
            text: "Sign Up",
            onclick: (e) => {
              props.router.push("/signup");
            },
          }),
        ]),
      ]),
    ]);
  };

  return { init, update, view };
};

export default Login;

 */