import { createResource, createEffect } from "solid-js";
import { fetchStep, fetchStepStatus, setStepStatus } from "../utils/FetchUtils";
import hljs from 'highlight.js';

// тип пропса
interface StepProps {
    stepId: number;
}

// пропс доступен только!!! в шаблоне

const Step = (props: StepProps) => {
    hljs.configure({ 'ignoreUnescapedHTML': true })
    const [step] = createResource(() => props.stepId, fetchStep);
    const [stepStatus] = createResource(() => props.stepId, fetchStepStatus);

    function isStep(step: any) {
        try { return step.title }
        catch { return false }
    }

    const set_status = (status: string) => {
        setStepStatus(props.stepId, stepStatus().step_status_id, status);
        window.location.reload();
    }

    createEffect(() => {
        if (step()) {
            hljs.highlightAll();
        }
    })

    return (
        <>
            {(isStep(step()) && step().is_published)
                ? (
                    <>
                        <a class="d-flex align-items-center pb-3 mb-3 link-light text-decoration-none border-bottom">
                            <span class="fs-3 fw-semibold">
                                {step().title}
                            </span>
                        </a>
                        
                        <div innerHTML={step().content} class="border-bottom">
                            
                        </div>

                        <br></br>
                        <button onClick={() => set_status("OK")} class="btn d-inline-flex align-items-center rounded border-0">
                            <a class="link-light d-inline-flex text-decoration-none rounded small">
                                <h6>Пройден 🟢</h6>
                            </a>
                        </button>
                        <button onClick={() => set_status("OW")} class="btn d-inline-flex align-items-center rounded border-0">
                            <a class="link-light d-inline-flex text-decoration-none rounded small">
                                <h6>На изучении 🟡</h6>
                            </a>
                        </button>
                    </>
                )
                : (
                    <><a class="d-flex align-items-center pb-3 mb-3 link-light text-decoration-none border-bottom">
                        <span class="fs-3 fw-semibold">Выберите урок</span>
                    </a></>
                )
            }
        </>
    );
};

export default Step;