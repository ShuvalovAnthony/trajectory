import { render } from "solid-js/web";
import { Router } from "@solidjs/router";


import App from "./App";
import Header from "./Header"



render(() => <Router><App /></Router>, document.getElementById('root') as HTMLElement);
render(() => <Header />, document.getElementById('header') as HTMLElement);