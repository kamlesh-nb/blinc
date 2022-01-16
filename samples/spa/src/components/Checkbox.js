import { label, input, div } from "../../../../src/types";

const Checkbox = ({id, caption}) => {
  return div({class: "flex items-start mb-6"},[
    div({class: "flex items-center h-5"},[
      input({ id: id, type: "checkbox", class: "w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"})
    ]),
    div({class: "ml-3 text-sm"},[
      label({for: id, class: "font-medium text-gray-900 dark:text-gray-300"}, [caption])
    ])
  ])
}

export default Checkbox;