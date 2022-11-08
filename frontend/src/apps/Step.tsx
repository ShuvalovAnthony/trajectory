import { createResource } from "solid-js";


const fetchStep = async (stepid: number) =>
    (await fetch(`http://127.0.0.1:8000/api/v1/step/${stepid}/`,
        {
            method: 'GET',
            headers: {
                'Accept-Encoding': 'gzip, deflate, br',
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + window.localStorage.getItem("AuthToken"),
            },
        }
    )).json();


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
            {isStep(step())
                ? (
                    <><a class="d-flex align-items-center pb-3 mb-3 link-light text-decoration-none border-bottom">
                        <span class="fs-3 fw-semibold">{step().title}</span>
                    </a>
                        <div innerHTML={step().content}>
                        </div>

                        <button data-stepid="" class="btn d-inline-flex align-items-center rounded border-0">
                            <a data-stepid="" class="link-light d-inline-flex text-decoration-none rounded small">
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