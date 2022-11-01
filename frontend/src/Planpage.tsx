import { createSignal, createResource, createEffect, For, Accessor } from "solid-js";


async function fetchThemes() {
    return (await fetch('http://127.0.0.1:8000/api/v1/theme/')).json()
}

async function fetchSteps() {
    return (await fetch('http://127.0.0.1:8000/api/v1/step/')).json()
}

const fetchStep = async (stepid: number) =>
    (await fetch(`http://127.0.0.1:8000/api/v1/step/${stepid}/`)).json();


const Planpage = () => {
    const [themes, setThemes] = createSignal();
    const [steps, setSteps] = createSignal();
    const [stepId, setStepId] = createSignal(1);
    const [themesList] = createResource(fetchThemes);
    const [stepsList] = createResource(fetchSteps);
    const [step] = createResource(stepId, fetchStep);
    

    const toggle = (e: any) => {
        const stepid = parseInt(e.target.dataset.stepid);
        setStepId(stepid);
    }


    createEffect(() => {
        if (themesList() && stepsList()) {
            setThemes(themesList().results);
            setSteps(stepsList().results);
            console.log(step().content);
            
        }
    })



    return (
        <main class="d-flex">
            <div class="flex-shrink-0 p-3 bg-dark" style="width: 260px;">
                <a class="d-flex align-items-center pb-3 mb-3 link-light text-decoration-none border-bottom">
                    <span class="fs-3 fw-semibold">Themes list</span>
                </a>
                <ul class="list-unstyled ps-0">
                    <For each={themes()}>{(theme: any, index: Accessor<number>) =>
                        <li class="mb-0">
                            <button class="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target={'#' + theme.slug} aria-expanded="false">
                                {theme.title}
                            </button>

                            <div class="collapse" id={theme.slug}>
                                <ul class="btn-toggle-nav list-unstyled fw-normal pb-0 small">

                                    <For each={steps()}>
                                        {(step: any, index: Accessor<number>) => {
                                            if (step.theme == theme.id) {
                                                return <>
                                                    <button class="btn d-inline-flex align-items-center rounded border-0" onClick={toggle}>
                                                        <a data-stepid={step.id} class="link-light d-inline-flex text-decoration-none rounded small">
                                                            {step.title}
                                                        </a>
                                                    </button>
                                                </>
                                            }
                                        }}
                                    </For>
                                </ul>
                            </div>
                        </li>
                    }</For>
                </ul>
            </div>
            <div class="container-fluid">
                {step() && (
                    <div class="row">
                        <div class="col-1"></div>
                        <div class="col-9">
                            <h1>{step().title}</h1>
                            <div innerHTML={step().content}>
                            </div>
                        </div>
                        <div class="col"></div>
                    </div>
                )}
            </div>
        </main>

    );
};

export default Planpage;



