import { Routes, Route } from "@solidjs/router"

import Mainpage from "./Mainpage"
import Coursepage from "./Coursepage"



export default function App() {
  return <>
    <Routes>
      <Route path="/" component={Mainpage} />
      <Route path="/courses" component={Coursepage} />
    </Routes>
  </>
}