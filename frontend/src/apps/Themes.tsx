import { createSignal, createResource, createEffect, For, Accessor } from "solid-js";
import Notes from '../apps/Notes'
import Step from '../apps/Step'
import { fetchSteps, fetchThemesByCourse } from "../utils/FetchUtils";
import { stepStatus } from "../utils/StepStatus"


const Themes = (course: any) => {
    const [themes, setThemes] = createSignal();
    const [steps, setSteps] = createSignal();
    const [themesList] = createResource(course.course, fetchThemesByCourse);
    const [stepsList] = createResource(fetchSteps);
    const [stepId, setStepId] = createSignal(0);

    const toggle = (e: any) => {
        const id = e.srcElement.dataset.stepid || e.target.dataset.stepid;
        const stepid = parseInt(id);
        setStepId(stepid);
    }

    createEffect(() => {
        if (themesList() && stepsList()) {
            setThemes(themesList().themes);
            setSteps(stepsList().steps);
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
                                                if (step.theme_id === theme.id) {
                                                    return <>
                                                        <button data-stepid={step.step_id} onClick={toggle} class="btn d-inline-flex align-items-center rounded border-0">
                                                            {stepStatus(step.status)}
                                                            <a data-stepid={step.step_id} class="link-light d-inline-flex text-decoration-none rounded small">
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
                        <div class="col">
                            <Step stepId={stepId()} />
                        </div>
                        <div class="col-1">
                            <Notes stepId={stepId()} />
                        </div>
                    </div>

                </div>
            </main>
        </>
    )
}

export default Themes;