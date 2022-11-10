import { Routes, Route } from "@solidjs/router"

import Mainpage from "./navigation/Mainpage"
import Coursepage from "./apps/Coursepage"
import Login from "./auth/Login"
import Register from "./auth/Register"
import Themes from "./apps/Themes"

export default function App() {
  return <>
    <Routes>
      <Route path="/" component={Mainpage} />
      <Route path="/courses" component={Coursepage} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
    </Routes>
  </>
}