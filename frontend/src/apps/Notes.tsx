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
                </section>
            </div>
        </>
    );
};

export default Notes;