import { createResource } from "solid-js";
import { fetchStep, fetchStepStatus, setStepStatus } from "../utils/FetchUtils";
import { isStep } from "../utils/StepStatus";

// тип пропса
interface StepProps {
    stepId: number;
}

// пропс доступен только!!! в шаблоне

const Step = (props: StepProps) => {
    const [step] = createResource(() => props.stepId, fetchStep);
    const [stepStatus] = createResource(() => props.stepId, fetchStepStatus);

    function isStep(step: any) {
        try { return step.title }
        catch { return false }
    }

    const status_ok = () => {
        setStepStatus(props.stepId, stepStatus().step_status_id, "OK");
        location.reload();
    }

    return (
        <>
            {isStep(step())
                ? (
                    <><a class="d-flex align-items-center pb-3 mb-3 link-light text-decoration-none border-bottom">
                        <span class="fs-3 fw-semibold">
                            {step().title}
                        </span>
                    </a>
                        <div innerHTML={step().content}>
                        </div>

                        <button onClick={status_ok} class="btn d-inline-flex align-items-center rounded border-0">
                            <a class="link-light d-inline-flex text-decoration-none rounded small">
                                <h6>Отметить выполненным</h6>
                            </a>
                        </button></>
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