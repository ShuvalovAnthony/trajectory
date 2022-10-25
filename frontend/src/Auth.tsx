import { Component } from 'solid-js';
import { useFormHandler, yupSchema } from 'solid-form-handler';
import { Checkboxes } from './components/Checkboxes';
import { TextInput } from './components/TextInput';
import { Checkbox } from './components/Checkbox';
import { Select } from './components/Select';
import { Radios } from './components/Radios';

import * as yup from 'yup';

type User = {
    username: string;
    password: string;
};

export const userSchema: yup.SchemaOf<User> = yup.object({
    username: yup.string().required('Required field'),
    password: yup.string().required('Required field'),
});

export const AuthApp: Component = () => {
    const formHandler = useFormHandler(yupSchema(userSchema));
    const { formData } = formHandler;

    const submit = async (event: Event) => {
        event.preventDefault();
        try {
            await formHandler.validateForm();
            fetch('http://127.0.0.1:8000/auth/token/login', {
                method: 'POST',
                headers: {
                    'Accept-Encoding': 'gzip, deflate, br',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData())
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
                            <TextInput label="Username" name="username" formHandler={formHandler} />
                            <TextInput type="password" label="Password" name="password" formHandler={formHandler} />
                            <button disabled={formHandler.isFormInvalid()}>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default AuthApp; 
