import { createSignal, createResource, createEffect, For, Accessor } from "solid-js";
import { useFormHandler, yupSchema } from 'solid-form-handler';
import { TextInput } from './components/TextInput';

import * as yup from 'yup';




type Note = {
    note: string;
};

export const noteSchema: yup.SchemaOf<Note> = yup.object({
    note: yup.string().required('Введите заметку').max(25),
});



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
    const [stepId, setStepId] = createSignal(0);
    const [notes, setNotes] = createSignal(0);
    const [themesList] = createResource(fetchThemes);
    const [stepsList] = createResource(fetchSteps);
    const [notesList] = createResource(stepId, fetchNotes);
    const [step] = createResource(stepId, fetchStep);

    const toggle = (e: any) => {
        const stepid = parseInt(e.target.dataset.stepid);
        setStepId(stepid);
    }

    createEffect(() => {
        if (themesList() && stepsList()) {
            setThemes(themesList().results);
            setSteps(stepsList().results);
            setNotes(notesList().notes);
        }
    })


    const formHandler = useFormHandler(yupSchema(noteSchema));
    const { formData } = formHandler;

    const add_note = async (event: Event) => {
        event.preventDefault();
        try {
            await formHandler.validateForm();
            console.log(JSON.stringify(formData()));

            fetch('http://127.0.0.1:8000/api/v1/note/', {
                method: 'POST',
                headers: {
                    'Accept-Encoding': 'gzip, deflate, br',
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + window.localStorage.getItem("AuthToken"),
                },
                body: JSON.stringify({
                    'note': formData().note,
                    'step': stepId()
                })
            }).then(function (response) {
                // Стоит проверить код ответа.
                if (!response.ok) {
                    // Сервер вернул код ответа за границами диапазона [200, 299]
                    return Promise.reject(new Error(
                        'Response failed: ' + response.status + ' (' + response.statusText + ')'
                    ));
                }
                // Далее будем использовать только JSON из тела ответа.
                return response.json();
            }).then(function (data) {
                console.log(data);
            }).catch(function (error) {
                console.log(error);
            });
            formHandler.resetForm();
        } catch (error) {
            console.error(error);
        }
    };


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
                    <div class="col-8">
                        {step() && (
                            <>
                                <a class="d-flex align-items-center pb-3 mb-3 link-light text-decoration-none border-bottom">
                                    <span class="fs-3 fw-semibold">{step().title}</span>
                                </a>
                                <div innerHTML={step().content}>
                                </div>
                            </>
                        )}
                    </div>
                    <div class="col-3">
                        <a class="d-flex align-items-center pb-3 mb-3 link-light text-decoration-none border-bottom">
                            <span class="fs-3 fw-semibold">Заметки</span>
                        </a>
                        <For each={notes()}>
                            {(note: any, index: Accessor<number>) => {
                                return <>
                                    <p class="word">{note}</p>
                                </>
                            }}
                        </For>

                        <section>
                                <form onSubmit={add_note}>
                                    <div class="row">
                                        <div class="col-6">
                                            <TextInput placeholder="Заметка" name="note" formHandler={formHandler} />
                                        </div>
                                        <div class="col">
                                            <button class="btn btn-secondary" disabled={formHandler.isFormInvalid()}>Добавить</button>
                                        </div>
                                    </div>
                                </form>
                        </section>

                    </div>
                </div>
            </div>
        </main>
    );
};

export default Planpage;



