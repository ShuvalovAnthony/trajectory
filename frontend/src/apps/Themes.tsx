import { createSignal, createResource, createEffect, For, Accessor } from "solid-js";
import Notes from '../apps/Notes'
import Step from '../apps/Step'

async function fetchThemes() {
    return (await fetch('http://127.0.0.1:8000/api/v1/theme/')).json()
}

async function fetchSteps() {
    return (await fetch('http://127.0.0.1:8000/api/v1/step/')).json()
}


const Themes = () => {
    const [themes, setThemes] = createSignal();
    const [steps, setSteps] = createSignal();
    const [themesList] = createResource(fetchThemes);
    const [stepsList] = createResource(fetchSteps);
    const [stepId, setStepId] = createSignal(0);


    const toggle = (e: any) => {
        const id = e.srcElement.dataset.stepid || e.target.dataset.stepid;
        const stepid = parseInt(id);
        setStepId(stepid);
    }

    createEffect(() => {
        if (themesList() && stepsList()) {
            setThemes(themesList().results);
            setSteps(stepsList().results);
        }
    })

    return (
        <>
            <main class="d-flex">
                <div class="flex-shrink-0 p-3 bg-dark" style="width: 260px;">

                    <a class="d-flex align-items-center pb-3 mb-3 link-light text-decoration-none border-bottom">
                        <span class="fs-3 fw-semibold">Список тем</span>
                    </a>
                    <ul class="list-unstyled ps-0">
                        <For each={Object(themes())}>{(theme: any, index: Accessor<number>) =>
                            <li class="mb-0">
                                <button class="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target={'#' + theme.slug} aria-expanded="false">
                                    {theme.title}
                                </button>
                                <div class="collapse" id={theme.slug}>
                                    <ul class="btn-toggle-nav list-unstyled fw-normal pb-0 small">
                                        <For each={Object(steps())}>
                                            {(step: any, index: Accessor<number>) => {
                                                if (step.theme == theme.id) {
                                                    return <>
                                                        <button data-stepid={step.id} class="btn d-inline-flex align-items-center rounded border-0" onClick={toggle}>
                                                            <a data-stepid={step.id} class="link-light d-inline-flex text-decoration-none rounded small">
                                                                {step.title}
                                                            </a>
                                                        </button></>
                                                }
                                            }}
                                        </For>
                                    </ul>
                                </div>
                            </li>
                        }</For>
                    </ul>
                </div>
                <div class="container-fluid p-3 ">
                <div class="row">
                    <Step stepId={stepId()} />
                    <Notes stepId={stepId()} />
                </div>
            </div>
            </main>
        </>
    )

}

export default Themes;