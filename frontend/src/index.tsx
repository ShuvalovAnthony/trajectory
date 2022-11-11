import { render } from "solid-js/web";
import { Router } from "@solidjs/router";


import App from "./App";
import Header from "./navigation/Header"



render(() => <Router><App /></Router>, document.getElementById('root') as HTMLElement);
render(() => <Router><Header /></Router>, document.getElementById('header') as HTMLElement);