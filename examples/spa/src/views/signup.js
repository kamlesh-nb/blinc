import {
  div,
  form,
  input,
  label,
  button,
  formFields,
} from "../../../../build/tags";

import { signUpUser } from "../messages";
import { signUpToApp } from "../effects/commands";

let state = {
  isLoginStarted: false,
};

const SignUp = (props) => {
  let init = [state];

  const update = (msg, state) => {
    switch (msg.type) {
      case "SIGN_UP":
        return [state, [signUpToApp, msg.payload]];
      case "SIGN_UP_SUCCESS":
        props.router.push("/");
      default:
        return [state];
    }
  };

  const view = (state, dispatch) => {
    const { fields, setValue } = formFields({
      email: "",
      password: "",
      appState: props.appState,
    });

    return div({ class: "Login" }, [
      div({ class: "row" }, [
        div({ class: "col-12" }, [
          label({ text: "Email Address", htmlfor: "email" }),
          input({ id: "email", value: fields.email, onchange: setValue }),
        ]),
      ]),
      div({ class: "row" }, [
        div({ class: "col-12" }, [
          label({ text: "Password", htmlfor: "password" }),
          input({
            id: "password",
            type: "password",
            value: fields.password,
            onchange: setValue,
          }),
        ]),
      ]),
      div({ class: "row" }, [
        div({ class: "col-6" }, [
          button({
            class: "btn-primary",
            text: "Sign Up",
            onclick: (e) => {
              dispatch(signUpUser(fields));
            },
          }),
        ]),
        div({ class: "col-6" }, [
          button({
            class: "btn",
            text: "Cancel",
            onclick: (e) => {
              props.router.push("/");
            },
          }),
        ]),
      ]),
    ]);
  };

  return { init, update, view };
};

export default SignUp;
