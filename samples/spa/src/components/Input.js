import { label, input, div } from "../../../../src/types"

const Input = ({id, caption, placeholder, type, value, handleChange}) => {
      return div({class: "mb-6"},[
        label({ 
          for: id,
          class: "block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" 
        }, [caption]),
        input({
          id: id,
          class: "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white",
          type: type,
          placeholder: placeholder,
          value: value,
          onchange: (e) => handleChange(e) 
        })
      ]);
};

export default Input