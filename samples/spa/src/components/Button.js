import { button } from "../../../../src/types";

const Button = ({id, caption, handleClick}) => {
    return button({
      id: id,
      class: "p-5  w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800",
      onclick: (e) => handleClick(e)
    }, [caption]);
}

export default Button;