import '../style.css'
import { App } from '../../../src'
import Navbar from './views/navbar'
import Footer from './views/footer'
import Home from './views/home'
import Commands from './views/commands'
import Subscriptions from './views/subscriptions'



   
var app = App({
  navbar: Navbar,
  main: {
    mode: 'history',
    activeClass: 'active',
    routes: [
      {path:'/', view: Home},
      {path:'/commands', view: Commands},
      {path:'/subscriptions', view: Subscriptions}
    ]
  },
  footer: Footer  
})

app.run()