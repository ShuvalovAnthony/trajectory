import { createSignal, createResource, createEffect, For, Accessor } from "solid-js";
import { useFormHandler, yupSchema } from 'solid-form-handler';
import { TextInput } from '../components/TextInput';

import * as yup from 'yup';


type Note = {
    note: string;
};

export const noteSchema: yup.SchemaOf<Note> = yup.object({
    note: yup.string().required('Введите заметку').max(25),
});

const fetchNotes = async (stepid: number) =>
    (await fetch(`http://127.0.0.1:8000/api/v1/note/${stepid}/note_by_step/`,
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
interface NoteProps {
    stepId: number;
}

// пропс доступен только!!! в шаблоне

const Notes = (props: NoteProps) => {
    const [notes, setNotes] = createSignal([]);
    const [notesList] = createResource(() => props.stepId, fetchNotes);

    createEffect(() => {
        if (notesList()) {
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
                    'step': props.stepId
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
        <>
            <div class="col-3">
                <a class="d-flex align-items-center pb-3 mb-3 link-light text-decoration-none border-bottom">
                    <span class="fs-3 fw-semibold">Заметки</span>
                </a>
                <For each={notes()}>
                    {(note: any, index: Accessor<number>) => {
                        return <>
                            <p class="word">{note.note}</p>
                        </>
                    }}
                </For>

                <section>
                    {props.stepId && (
                        <form onSubmit={add_note}>
                            <div class="row">
                                <div class="col-6">
                                    <TextInput placeholder="Заметка" name="note" formHandler={formHandler} />
                                </div>
                                <div class="col">
                                    <button class="btn btn-secondary" disabled={formHandler.isFormInvalid()}>Добавить</button>
                                    <br></br>
                                </div>
                            </div>
                        </form>
                    )}
                </section>
            </div>
        </>
    );
};

export default Notes;







import Themes from '../apps/Themes'
import { CheckAuth } from "../auth/CheckAuth";
import { createSignal, createResource, createEffect } from "solid-js";

// вынести темы отдельно
const Planpage = () => {
    const [courseId, setCourseId] = createSignal(0);

    createEffect(() => {
        console.log("Course Id now is", courseId());
      });

    return (
        <>
        
        {CheckAuth() && courseId() ? (
                <Themes course={courseId()}/>
        )
        :
        (
            <>
            <button onClick={() => setCourseId(1)}>Python</button>
            <button onClick={() => setCourseId(2)}>Ege</button>
            </>
        )}
        </>
    );
};

export default Planpage;



import { createSignal, createResource, createEffect, For, Accessor } from "solid-js";
import { useFormHandler, yupSchema } from 'solid-form-handler';
import { TextInput } from '../components/TextInput';
import { fetchNotes } from "../utils/FetchUtils"
import * as yup from 'yup';


type Note = {
    note: string;
};

export const noteSchema: yup.SchemaOf<Note> = yup.object({
    note: yup.string().required('Введите заметку').max(25),
});



// тип пропса
interface NoteProps {
    stepId: number;
}

// пропс доступен только!!! в шаблоне

const Notes = (props: NoteProps) => {
    const [notes, setNotes] = createSignal([]);
    const [notesList] = createResource(() => props.stepId, fetchNotes);

    createEffect(() => {
        if (notesList()) {
            setNotes(notesList().notes);
        }
    })

    const formHandler = useFormHandler(yupSchema(noteSchema));
    const { formData } = formHandler;

    const add_note = async (event: Event) => {
        event.preventDefault();
        try {
            await formHandler.validateForm();
            fetch('http://127.0.0.1:8000/api/v1/note/', {
                method: 'POST',
                headers: {
                    'Accept-Encoding': 'gzip, deflate, br',
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + window.localStorage.getItem("AuthToken"),
                },
                body: JSON.stringify({
                    'note': formData().note,
                    'step': props.stepId
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
                console.log('Note was saved');
            }).catch(function (error) {
                console.log(error);
            });
            formHandler.resetForm();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            {(props.stepId != 0) && (
            <div class="d-flex p-3 bg-dark ms-auto" style="transform: rotate(90deg);">
                <button class="btn btn-secondary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
                    Заметки
                </button>

            </div>)
}


            <div class="offcanvas offcanvas-end text-bg-dark " tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                <div class="offcanvas-header ">
                    <h5 class="offcanvas-title " id="offcanvasRightLabel">Заметки</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div class="offcanvas-body">
                    <For each={notes()}>
                        {(note: any, index: Accessor<number>) => {
                            return <>
                                <p class="word">{note.note}</p>
                            </>
                        }}
                    </For>
                    <section>
                        {props.stepId && (
                            <form onSubmit={add_note}>
                                <div class="row">
                                    <div class="col-6">
                                        <TextInput placeholder="Заметка" name="note" formHandler={formHandler} />
                                    </div>
                                    <div class="col">
                                        <button class="btn btn-secondary" disabled={formHandler.isFormInvalid()}>Добавить</button>
                                        <br></br>
                                    </div>
                                </div>
                            </form>
                        )}
                    </section>
                </div>
            </div>
        </>
    );
};

export default Notes;
