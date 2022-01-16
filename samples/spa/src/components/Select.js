import { label, select, option, div } from "../../../../src/types";

const Select = ({id, caption, options, handleChange}) => {
  return div({class: "mb-6"}, [
    label({for: id, class: "block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"}, [caption]),
    select({
      id: id, 
      onchange: (e) => handleChange(e),
      class: "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      }, 
      options.map((value, index) => {
        return option({value: value.key}, [value.value])
      })
    )
  ])
}

export default Select;