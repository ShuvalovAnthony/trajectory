import { createSignal, createResource, createEffect, For, Accessor } from "solid-js";


async function fetchThemes() {
    return (await fetch('http://127.0.0.1:8000/api/v1/theme/')).json()
}

async function fetchSteps() {
    return (await fetch('http://127.0.0.1:8000/api/v1/step/')).json()
}



const Themes = () => {
    
}