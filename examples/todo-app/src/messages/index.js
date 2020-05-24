const addTodo = (todo) => {
  return { type: "ADD", payload: todo };
};
const clearAll = () => {
  return { type: "CLEAR" };
};
const removeTodo = (index) => {
  return { type: "DEL", payload: index };
};

const sendCmd = (id) => {
  return { type: "CMD", payload: {id}};
}

const titleToUpper = (id) => {
  return { type: "TO_UPPER", payload: {id}};
}

export { addTodo, clearAll, removeTodo, sendCmd, titleToUpper };
