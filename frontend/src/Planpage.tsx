import { createSignal, createResource, createEffect, For, Accessor } from "solid-js";


async function fetchThemes() {
    return (await fetch('http://127.0.0.1:8000/api/v1/theme/')).json()
}

async function fetchSteps() {
    return (await fetch('http://127.0.0.1:8000/api/v1/step/')).json()
}

const fetchStep = async (stepid: number) =>
    (await fetch(`http://127.0.0.1:8000/api/v1/step/${stepid}/`)).json();


const fetchNotes = async (stepid: number) =>
    (await fetch(`http://127.0.0.1:8000/api/v1/note/${stepid}/note_by_step/`)).json();

const Planpage = () => {
    const [themes, setThemes] = createSignal();
    const [steps, setSteps] = createSignal();
    const [stepId, setStepId] = createSignal(1);
    const [notes, setNotes] = createSignal();
    const [themesList] = createResource(fetchThemes);
    const [stepsList] = createResource(fetchSteps);
    const [step] = createResource(stepId, fetchStep);
    const [note] = createResource(stepId, fetchNotes);

    const toggle = (e: any) => {
        const stepid = parseInt(e.target.dataset.stepid);
        setStepId(stepid);
    }

    createEffect(() => {
        if (themesList() && stepsList()) {
            setThemes(themesList().results);
            setSteps(stepsList().results);
            setNotes(note().notes);
            console.log(notes());
            
        }
    })

    return (
        <main class="d-flex">
            <div class="flex-shrink-0 p-3 bg-dark" style="width: 260px;">
                <a class="d-flex align-items-center pb-3 mb-3 link-light text-decoration-none border-bottom">
                    <span class="fs-3 fw-semibold">Список тем</span>
                </a>
                <ul class="list-unstyled ps-0">
                    <For each={themes()}>{(theme: any, index: Accessor<number>) =>
                        <li class="mb-0">
                            <button class="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target={'#' + theme.slug} aria-expanded="false">
                                {theme.title}
                            </button>
                            <div class="collapse show" id={theme.slug}>
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
            <div class="container-fluid p-3 ">
                {step() && (
                    <div class="row">
                        <div class="col-8">
                            <a class="d-flex align-items-center pb-3 mb-3 link-light text-decoration-none border-bottom">
                                <span class="fs-3 fw-semibold">{step().title}</span>
                            </a>

                            <div innerHTML={step().content}>
                            </div>
                        </div>
                        <div class="col">
                            <a class="d-flex align-items-center pb-3 mb-3 link-light text-decoration-none border-bottom">
                                <span class="fs-3 fw-semibold">Заметки</span>
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </main>

    );
};

export default Planpage;



