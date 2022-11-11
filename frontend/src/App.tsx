import { Routes, Route, A } from "@solidjs/router"
import { lazy } from "solid-js";


import Mainpage from "./navigation/Mainpage"
import Coursepage from "./apps/Coursepage"
import Login from "./auth/Login"
import Register from "./auth/Register"
import Themes from "./apps/Themes"
import Header
 from "./navigation/Header";

export default function App() {
  return <>
    <Routes>
      <Route path="/" component={Mainpage} />
      <Route path="/courses" component={Coursepage} />
      <Route path="/courses/:courseid" component={Coursepage} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
    </Routes>
  </>
}