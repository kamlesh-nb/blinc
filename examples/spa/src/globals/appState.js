import { changeNotifier } from '../lib/index'

let appState = changeNotifier({
  isLoggedIn: false,
  user: {},
})

export default appState