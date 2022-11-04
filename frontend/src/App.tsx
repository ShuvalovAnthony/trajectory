import { Routes, Route } from "@solidjs/router"

import Mainpage from "./navigation/Mainpage"
import Coursepage from "./apps/Coursepage"
import Auth from "./apps/Auth"


export default function App() {
  return <>
    <Routes>
      <Route path="/" component={Mainpage} />
      <Route path="/courses" component={Coursepage} />
      <Route path="/login" component={Auth} />
    </Routes>
  </>
}