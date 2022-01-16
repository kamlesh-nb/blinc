import { form, div } from "../../../../src/types";

const Form = ({kids}) => {
    return div({ class: "py-5 flex justify-center" },[
      div({
        class: "p-4 w-80 bg-white rounded-lg border border-gray-200 shadow-md sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700"
      }, [
        form({
          class: 'space-y-5'
        },[
          ...kids
        ])
      ])
    ]);
}

export default Form;