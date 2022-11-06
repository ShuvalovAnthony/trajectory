import { Component } from 'solid-js';
import { useFormHandler, yupSchema } from 'solid-form-handler';
import { TextInput } from '../components/TextInput';

import * as yup from 'yup';

type User = {
    email: string;
    password: string;
};

export const userSchema: yup.SchemaOf<User> = yup.object({
    email: yup.string().required('Введите email'),
    password: yup.string().required('Введите пароль'),
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
                window.localStorage.setItem("AuthToken", data.auth_token);
                console.log(window.localStorage.getItem("AuthToken"), 'recieved');
                window.location.href = "/courses"
            }).catch(function (error) {
                console.log(error);
            });

            formHandler.resetForm();

        } catch (error) {
            console.error(error);
        }

    };

    return (
        <div class="container-fluid text-center ">
            <p style="margin-bottom:4cm"></p>
            <div class="d-flex justify-content-center ">
                <div class="col-2">
                    <form onSubmit={submit}>
                        <TextInput placeholder="Email" name="email" formHandler={formHandler} />
                        <p></p>
                        <TextInput type="password" placeholder="Пароль" name="password" formHandler={formHandler} />
                        <p></p>
                        <button class="btn btn-secondary" disabled={formHandler.isFormInvalid()}>Войти</button>
                    </form>
                </div>

            </div>
        </div>
    );
};
export default AuthApp; 
