import { div, input, button, formFields } from "../../../../../build/tags";
import { addUser } from "../../messages";

const NewUser = (dispatch) => {
  const { fields, setValue } = formFields({
    username: "",
    firstname: "",
    lastname: "",
    email: "",
  });

  return div({ class: "row" }, [
    div({ class: "col-2" }, [
      input({
        id: "username",
        value: fields.username,
        placeholder: "Enter User Name",
        onchange: setValue,
      }),
    ]),
    div({ class: "col-2" }, [
      input({
        id: "firstname",
        value: fields.firstname,
        placeholder: "Enter First Name",
        onchange: setValue,
      }),
    ]),
    div({ class: "col-2" }, [
      input({
        id: "lastname",
        value: fields.lastname,
        placeholder: "Enter Last Name",
        onchange: setValue,
      }),
    ]),
    div({ class: "col-2" }, [
      input({
        id: "email",
        value: fields.email,
        placeholder: "Enter EMail",
        onchange: setValue,
      }),
    ]),
    div({ class: "col-4" }, [
      button({
        class: "btn",
        text: "Add User",
        onclick: (e) => {
          dispatch(addUser(fields));
        },
      }),
    ]),
  ]);
};

export default NewUser;
