import { Component } from 'solid-js';
import { useFormHandler, yupSchema } from 'solid-form-handler';
import { Checkboxes } from './components/Checkboxes';
import { TextInput } from './components/TextInput';
import { Checkbox } from './components/Checkbox';
import { Select } from './components/Select';
import { Radios } from './components/Radios';

import * as yup from 'yup';

type User = {
    title: string;
    content: string;
    category: number;
};

export const userSchema: yup.SchemaOf<User> = yup.object({
    title: yup.string().required('Required field'),
    content: yup.string().required('Required field'),
    category: yup.number().required().required('Required field').typeError('Country is required'),
});

export const FormApp: Component = () => {
    const formHandler = useFormHandler(yupSchema(userSchema));
    const { formData } = formHandler;

    const submit = async (event: Event) => {
        event.preventDefault();
        try {
            await formHandler.validateForm();
            fetch('http://127.0.0.1:8000/api/v1/topic/', {
                method: 'POST',
                headers: {
                    'Accept-Encoding': 'gzip, deflate, br',
                    'Content-Type': 'application/json',
                    'Authorization': "Token b59184f08e80365dd1986d8c832187a866cd7217"
                },
                body: JSON.stringify(formData())
            });
            console.log('data was sent');
            formHandler.resetForm();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div class="container-fluid">
            <div class="container">
                <div class="row">
                    <div class="col">
                        <form onSubmit={submit}>
                            <TextInput label="Title" name="title" formHandler={formHandler} />
                            <TextInput label="Content" name="content" formHandler={formHandler} />
                            <Select
                                label="Category"
                                name="category"
                                placeholder="Select a category"
                                options={[
                                    { value: 1, label: 'Python' },
                                    { value: 2, label: 'Ege' },
                                    { value: 3, label: 'Electronics' },
                                ]}
                                formHandler={formHandler}
                            />
                            <button disabled={formHandler.isFormInvalid()}>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default FormApp; 
