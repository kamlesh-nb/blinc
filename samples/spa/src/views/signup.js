import { div, br, form, input, button } from "../../../../src/types";
import { Push } from '../../../../src/index';
import { Input, Button, Form, Col } from "../components"
import viewState from '../utils'

let initialState = {
  username: '',
  password:'',
  verificationcode: '',
  verificationStatus: '',
  keyInVerificationCode: false,
  userData: {}
}  

const SignUp = (props) => {
  let init = [initialState]

  const reducer = (msg, state) => {

  }

  const render = (state, dispatch) => {
    const { fields, setValue } = viewState(state);

    return Form({
      kids: [
        Input({
          id: "username",
          type: "text",
          placeholder: "Enter User Name",
          value: fields.username,
          handleChange: setValue,
          caption: "User Name"
        }),
        Input({
          id: "password",
          type: "password",
          placeholder: "Enter Password",
          value: fields.password,
          handleChange: setValue,
          caption: "Password"
        }),
        Col({
          cols: 2,
          kids: [
            Button({
              id: "btnSignUp",
              caption: "Sign Up",
              handleClick: (e) => {
                console.log(fields)
              }
            }),
            Button({
              id: "btnCancel",
              caption: "Cancel",
              handleClick: (e) => {
                 Push("/");
              }
            }),
          ]
        })
      ]
    })
  };
  return { init, reducer, render };
};

export default SignUp