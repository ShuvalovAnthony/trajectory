import { Routes, Route } from "@solidjs/router"

import Mainpage from "./Mainpage"
import Planpage from "./Planpage"



export default function App() {
  return <>
    <Routes>
      <Route path="/" component={Mainpage} />
      <Route path="/courses" component={Planpage} />
    </Routes>
  </>
}