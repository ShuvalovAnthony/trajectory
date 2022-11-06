import { createResource } from "solid-js";


const fetchStep = async (stepid: number) =>
    (await fetch(`http://127.0.0.1:8000/api/v1/step/${stepid}/`)).json();


// тип пропса
interface StepProps {
    stepId: number;
}

// пропс доступен только!!! в шаблоне

const Step = (props: StepProps) => {
    const [step] = createResource(() => props.stepId, fetchStep);

    function isStep(step: any) {
        try { return step.title }
        catch { return false }
    }

    return (
        <>
            <div class="col-8">

                {isStep(step())
                    ? (
                        <><a class="d-flex align-items-center pb-3 mb-3 link-light text-decoration-none border-bottom">
                            <span class="fs-3 fw-semibold">{step().title}</span>
                        </a>
                            <div innerHTML={step().content}>
                            </div></>
                    )
                    : (
                        <><a class="d-flex align-items-center pb-3 mb-3 link-light text-decoration-none border-bottom">
                            <span class="fs-3 fw-semibold">Выберите урок</span>
                        </a></>
                    )
                }
            </div>
        </>
    );
};

export default Step;