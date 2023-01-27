import { Component } from 'solid-js';
import { useFormHandler, yupSchema } from 'solid-form-handler';
import { TextInput } from '../components/TextInput';

import * as yup from 'yup';

type Lead = {
    email: string;
    phone: string;
    parent_first_name: string;
    parent_last_name: string;
    children_class_number: number;
};

export const leadSchema: yup.SchemaOf<Lead> = yup.object({

    email: yup.string().email('Неверный формат email').required('Введите email'),
    phone: yup.string().matches(/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/, 'Неверный номер телефона').required('Введите телефон'),
    parent_first_name: yup.string().required('Введите имя'),
    parent_last_name: yup.string().required('Введите фамилию'),
    parent_middle_name: yup.string(),
    children_first_name: yup.string(),
    children_last_name: yup.string(),
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
                alert('Заявка успешно отправлена');
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
            <div class='m-5'>
                <h3 class='m-3'>    Записаться на курсы</h3>
            </div>
            <div class="d-flex justify-content-center ">


                <form onSubmit={submit}>
                    <div class="row">
                        <div class="col-md-3">
                            <h5>Информация о родителе</h5>
                            Обязательные поля отмечены *
                            <img src="https://cdn-icons-png.flaticon.com/512/437/437501.png" style="width: 15rem;" class="img-thumbnail m-2"></img>
                        </div>
                        <div class="col-md-3">
                            <TextInput placeholder="Email*" name="email" formHandler={formHandler} class="m-2" />
                            <TextInput placeholder="Телефон*" name="phone" formHandler={formHandler} class="m-2" />
                            <TextInput placeholder="Класс ребенка*" name="children_class_number" formHandler={formHandler} class="m-2" />
                            <TextInput placeholder="Фамилия*" name="parent_last_name" formHandler={formHandler} class="m-2" />
                            <TextInput placeholder="Имя*" name="parent_first_name" formHandler={formHandler} class="m-2" />
                            <TextInput placeholder="Отчество" name="parent_middle_name" formHandler={formHandler} class="m-2" />
                            <TextInput placeholder="Комментарий" name="extra" formHandler={formHandler} class="m-2" />
                        </div>
                        <div class="col-md-3">
                            <h5>Информация об ученике</h5>
                            Обязательные поля отмечены *
                            <img src="https://cdn-icons-png.flaticon.com/512/3886/3886660.png" style="width: 15rem;" class="img-thumbnail m-2"></img>
                        </div>
                        <div class="col-md-3">
                            <TextInput placeholder="Фамилия ребенка" name="children_last_name" formHandler={formHandler} class="m-2" />
                            <TextInput placeholder="Имя ребенка" name="children_first_name" formHandler={formHandler} class="m-2" />
                            <TextInput placeholder="Отчество ребенка" name="children_middle_name" formHandler={formHandler} class="m-2" />
                        </div>

                    </div>
                    <button class="btn btn-secondary m-5" disabled={formHandler.isFormInvalid()}>Отправить заявку</button>
                </form>
            </div>

        </div>

    );
};

export default Landing;