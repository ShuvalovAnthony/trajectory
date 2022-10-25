import { Component } from 'solid-js';
import { useFormHandler, yupSchema } from 'solid-form-handler';
import { TextInput } from './components/TextInput';
import { createSignal, createResource, createEffect } from "solid-js";
import * as yup from 'yup';


const fetchTopic = async (id: number) =>
    (await fetch(`http://127.0.0.1:8000/api/v1/topic/${id}`)).json();

type TopicId = {
    topicid: number;
};

export const userSchema: yup.SchemaOf<TopicId> = yup.object({
    topicid: yup.number().required('Required field')
});

export const SearchApp: Component = () => {
    const formHandler = useFormHandler(yupSchema(userSchema));
    const { formData } = formHandler;
    const [topicData, setTopicData] = createSignal(1);
    const [topic] = createResource(topicData, fetchTopic);

    createEffect(async () => {
        setTopicData(formData().topicid);
    })

    return (
        <div class="container-fluid">
            <div class="container">
                <div class="row">
                    <div class="col">
                        <form>
                            <TextInput label="Topic ID" name="topicid" formHandler={formHandler} />
                        </form>
                    </div>
                    <div class="col">
                        {topic() && (
                            <section>
                                <h1>{topic().title}</h1>
                                <p>{topic().category}</p>
                            </section>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};


export default SearchApp; 
