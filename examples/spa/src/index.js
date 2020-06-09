import "../style.css";
import { App } from "./lib";
import Home from "./views/home";
import Commands from "./views/commands";
import Subscriptions from "./views/subscriptions";
import Navbar from "./views/navbar";
import Footer from "./views/footer";
import Login from './views/login'
import SignUp from './views/signup'

var app = App({
    navbar: Navbar,
    body: {
      mode: "history",
      activeClass: "active",
      target: "main",
      routes: [
        { path: "/", view: Home },
        { path: "/commands", view: Commands },
        { path: "/subscriptions", view: Subscriptions },
        { path: "/login", view: Login },
        { path: "/signup", view: SignUp },
      ],
    },
    //footer: Footer
});

app.run();
