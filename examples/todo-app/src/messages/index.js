const addTodo = (todo) => {
  return { type: "ADD", payload: todo };
};
const clearAll = () => {
  return { type: "CLEAR" };
};
const removeTodo = (index) => {
  return { type: "DEL", payload: index };
};

export { addTodo, clearAll, removeTodo };
