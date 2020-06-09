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
