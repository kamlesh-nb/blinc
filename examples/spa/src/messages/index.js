const loadUsers = (pageNo) => {
  return { type: "LOAD_USERS", payload: {pageNo: pageNo}};
}

const showUsers = (data) => {
  return {type: 'SHOW_USERS', payload: data}
}

const addSub = (isSubscribed) => {
  return {type: 'SUBSCRIBE', payload: { isSubscribed: isSubscribed }}
}

const removeSub = (isSubscribed) => {
  return {type: 'UNSUBSCRIBE', payload: { isSubscribed: isSubscribed }}
}

const addUser = (data) => {
  return {type: 'ADD_USER', payload: data}
}

const refreshUsers = (data) => {
  return {type: 'REFRESH_DATA', payload: data}
}

export { loadUsers, showUsers, addSub, removeSub, addUser, refreshUsers }