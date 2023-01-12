import { Component } from 'solid-js';
import { useFormHandler, yupSchema } from 'solid-form-handler';
import { TextInput } from '../components/TextInput';

import * as yup from 'yup';

type Lead = {
    email: string;
    phone: string;
    parent_first_name: string;
    parent_last_name: string;
    children_first_name: string;
    children_last_name: string;
    children_class_number: number;
};


export const leadSchema: yup.SchemaOf<Lead> = yup.object({
    email: yup.string().email('Неверный формат email').required('Введите email'),
    phone: yup.string().required('Введите телефон'),
    parent_first_name: yup.string().required('Введите имя'),
    parent_last_name: yup.string().required('Введите фамилию'),
    parent_middle_name: yup.string(),
    children_first_name: yup.string().required('Введите имя ученика'),
    children_last_name: yup.string().required('Введите фамилию ученика'),
    children_middle_name: yup.string(),
    children_class_number: yup.number().typeError('Введите число').required('Введите класс ученика'),
    extra: yup.string(),
});


const Landing = () => {
    const formHandler = useFormHandler(yupSchema(leadSchema));
    const { formData } = formHandler;

    const submit = async (event: Event) => {
        event.preventDefault();
        try {
            await formHandler.validateForm();
            console.log(formData());
            fetch(`http://${import.meta.env.VITE_URL_ADRESS_PORT8}/api/v1/lead/`, {
                method: 'POST',
                headers: {
                    'Accept-Encoding': 'gzip, deflate, br',
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + window.localStorage.getItem("AuthToken"),
                },
                body: JSON.stringify(formData())
            }).then(function (response) {
                if (!response.ok) {
                    return Promise.reject(new Error(
                        'Response failed: ' + response.status + ' (' + response.statusText + ')'
                    ));
                }
                return response.json();
            }).then(function (data) {
                console.log(data, window.localStorage.getItem("AuthToken"));
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
            <h1>Лендинг</h1>
            <p></p>
            
            <div class="d-flex justify-content-center ">
                <div class="col-auto">
                    <form onSubmit={submit}>
                        <TextInput placeholder="Email" name="email" formHandler={formHandler} />
                        <p></p>
                        <TextInput placeholder="Телефон" name="phone" formHandler={formHandler} />
                        <p></p>
                        <TextInput placeholder="Фамилия" name="parent_last_name" formHandler={formHandler} />
                        <p></p>
                        <TextInput placeholder="Имя" name="parent_first_name" formHandler={formHandler} />
                        <p></p>
                        <TextInput placeholder="Отчество" name="parent_middle_name" formHandler={formHandler} />
                        <p></p>
                        <TextInput placeholder="Фамилия ребенка" name="children_last_name" formHandler={formHandler} />
                        <p></p>
                        <TextInput placeholder="Имя ребенка" name="children_first_name" formHandler={formHandler} />
                        <p></p>
                        <TextInput placeholder="Отчество ребенка" name="children_middle_name" formHandler={formHandler} />
                        <p></p>
                        <TextInput placeholder="Класс ребенка" name="children_class_number" formHandler={formHandler} />
                        <p></p>
                        <TextInput placeholder="Заметка" name="extra" formHandler={formHandler} />
                        <p></p>
                        <button class="btn btn-secondary" disabled={formHandler.isFormInvalid()}>Отправить заявку</button>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default Landing;