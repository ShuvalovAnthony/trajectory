import { createSignal, createResource, createEffect, For, Accessor } from "solid-js";
import { createStore } from "solid-js/store";


async function fetchThemes() {
    return (await fetch('http://127.0.0.1:8000/api/v1/theme/')).json()
}

async function fetchSteps() {
    return (await fetch('http://127.0.0.1:8000/api/v1/step/')).json()
}

async function fetchStepsByTheme(theme_id: any) {
    return (await fetch(`http://127.0.0.1:8000/api/v1/step/${theme_id}/steps_by_theme/`)).json()
}




const Planpage = () => {
    const [themesList] = createResource(fetchThemes);
    const [stepsList] = createResource(fetchSteps);
    const [themes, setThemes] = createSignal();
    const [steps, setSteps] = createSignal();

    createEffect(() => {
        if (themesList() && stepsList()) {
            setThemes(themesList().results);
            setSteps(stepsList().results);
        }
    })



    return (
        <main class="d-flex">

            <div class="flex-shrink-0 p-3 bg-dark" style="width: 150px;">
                <a class="d-flex align-items-center pb-3 mb-3 link-light text-decoration-none border-bottom">
                    <span class="fs-2 fw-semibold">Plan</span>
                </a>
                <ul class="list-unstyled ps-0">
                    <For each={themes()}>{(theme: any, index: Accessor<number>) =>
                        <li class="mb-1">
                            <button class="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target={'#' + theme.title} aria-expanded="false">
                                {theme.title}
                            </button>

                            <div class="collapse" id={theme.title}>

                                <For each={steps()}>
                                    {(step: any, index: Accessor<number>) => {
                                        if (step.theme == theme.id){
                                        return <div><ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                         </ul>
                                           <li><a href={"#" + step.title} class="link-light d-inline-flex text-decoration-none rounded">{step.title}</a></li> 
                                        </div>
                                    }}}
                                </For>

                            </div>
                        </li>
                    }</For>
                </ul>
            </div>
        </main>

    );
};

export default Planpage; 



