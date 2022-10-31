from django import forms
from django.contrib.auth import authenticate
from django.contrib.auth.forms import AuthenticationForm, UserCreationForm, UserChangeForm
from .models import CustomUser


class UserLoginForm(AuthenticationForm):
    username = forms.CharField(
            required=False,
            widget=forms.TextInput(
                    attrs={
                        'class': 'form-control', 'placeholder': 'Введите email'
                    }
            )
    )
    password = forms.CharField(
            required=False,
            widget=forms.PasswordInput(
                    attrs={
                        'class': 'form-control', 'placeholder': 'Введите пароль'
                    }
            )
    )

    def clean_username(self):
        username = self.cleaned_data.get('username')
        if username == '':
            self.fields['username'].widget.attrs.update({'class': 'form-control is-invalid'})
            return self.add_error('username', 'Электронная почта не может быть пустой :(')
        elif '@' not in username:
            return self.add_error('username', 'Вы забыли символ собачки @')
        elif '.' not in username:
            return self.add_error('username', 'Введите почту целиком')
        try:
            user = CustomUser.objects.get(email=username)
            self.fields['username'].widget.attrs.update({'class': 'form-control is-valid'})
            return username
        except CustomUser.DoesNotExist:
            return self.add_error('username', 'Пользователя с такой почтой не существует')

    def clean_password(self):
        password = self.cleaned_data.get('password')
        username = self.cleaned_data.get('username')
        if password == '':
            self.fields['password'].widget.attrs.update({'class': 'form-control is-invalid'})
            raise forms.ValidationError('Пароль не может быть пустым :(')
        else:
            user = authenticate(username=username, password=password)
            if user is None:
                raise forms.ValidationError('Неверный пароль :(')
            else:
                self.fields['password'].widget.attrs.update({'class': 'form-control is-valid'})
                return password

    def is_valid(self):
        for field in self.errors.as_data():
            self.fields[field].widget.attrs.update({'class': 'form-control is-invalid'})
        return super().is_valid()


class CustomUserMixinForm(forms.ModelForm):
    def is_valid(self):
        errors = self.errors.as_data()
        for field in self.fields:
            if field not in errors:
                self.fields[field].widget.attrs.update({'class': 'form-control is-valid'})
            else:
                self.fields[field].widget.attrs.update({'class': 'form-control is-invalid'})
        if errors and ('password1' in self.fields or 'password2' in self.fields):
            self.fields['password1'].widget.attrs.update({'class': 'form-control is-invalid'})
            self.fields['password2'].widget.attrs.update({'class': 'form-control is-invalid'})
        return super().is_valid()

    def clean_last_name(self):
        last_name = self.cleaned_data.get('last_name').capitalize()
        if last_name == '':
            return self.add_error('last_name', 'Введите фамилию')

        return last_name

    def clean_first_name(self):
        first_name = self.cleaned_data.get('first_name').capitalize()
        if first_name == '':
            return self.add_error('first_name', 'Введите имя')

        return first_name

    def clean_middle_name(self):
        middle_name = self.cleaned_data.get('middle_name').capitalize()
        if middle_name != '':
            self.fields['middle_name'].widget.attrs.update({'class': 'form-control is-valid'})
        return middle_name

    def clean_nickname(self):
        nickname = self.cleaned_data.get('nickname').lower()
        if nickname == '':
            return self.add_error('nickname', 'Придумайте никнейм')

        return nickname

    def clean_phone(self):
        phone = self.cleaned_data.get('phone')
        if phone == '':
            return self.add_error('phone', 'Введите свой телефон')
        elif not phone.isdigit():
            return self.add_error('phone', 'Буквы в номере телефона явно лишние :)')
        elif len(phone) < 11:
            return self.add_error('phone', 'Слишком мало цифр в номере. Вводите номер в 11-значном формате')

        return phone

    def clean_email(self):
        email = self.cleaned_data.get('email').lower()
        if email == '':
            return self.add_error('email', 'Введите электронную почту')

        return email

    def clean_password2(self):
        password1 = self.cleaned_data.get("password1")
        password2 = self.cleaned_data.get("password2")
        if not password1 or not password2:
            self.add_error('password2', 'Введите оба пароля')
            return self.add_error('password1', 'Введите оба пароля')
        elif password1 != password2:
            self.add_error('password2', 'Пароли не совпадают')
            return self.add_error('password1', 'Пароли не совпадают')

        return password2


class UserRegistrationForm(CustomUserMixinForm, UserCreationForm):
    password1 = forms.CharField(
            required=False,
            widget=forms.PasswordInput(
                    attrs={
                        'class': 'form-control', 'placeholder': 'Введите пароль'
                    }
            )
    )
    password2 = forms.CharField(
            required=False,
            widget=forms.PasswordInput(
                    attrs={
                        'class': 'form-control', 'placeholder': 'Подтвердите пароль'
                    }
            )
    )

    def __init__(self, *args, **kwargs):
        super(UserRegistrationForm, self).__init__(*args, **kwargs)
        for field in self.fields:
            self.fields[field].required = False
        self.fields['email'].widget.attrs.update(autofocus=False)

    class Meta:
        model = CustomUser
        fields = ['last_name', 'first_name', 'middle_name', 'nickname', 'phone', 'email', 'status', ]
        widgets = {
            'last_name': forms.TextInput(
                    attrs={
                        'class': 'form-control',
                        'placeholder': 'Фамилия',
                    }
            ),
            'first_name': forms.TextInput(
                    attrs={
                        'class': 'form-control',
                        'placeholder': 'Имя'
                    }
            ),
            'middle_name': forms.TextInput(
                    attrs={
                        'class': 'form-control',
                        'placeholder': 'Отчество'
                    }
            ),
            'nickname': forms.TextInput(
                    attrs={
                        'class': 'form-control',
                        'placeholder': 'Придумайте nickname'
                    }
            ),
            'phone': forms.TextInput(
                    attrs={
                        'class': 'form-control',
                        'placeholder': '89651979791',
                    }
            ),
            'email': forms.TextInput(
                    attrs={
                        'class': 'form-control',
                        'placeholder': 'Email'
                    }
            ),
            'status': forms.Select(
                    attrs={
                        'class': 'form-control',
                    }
            ),
        }


class UserProfileUpdateForm(CustomUserMixinForm, UserChangeForm):
    class Meta:
        model = CustomUser
        fields = ['first_name', 'middle_name', 'last_name', 'nickname', 'phone', 'email', 'school', 'bio']
        widgets = {
            'last_name': forms.TextInput(
                    attrs={
                        'class': 'form-control',
                        'placeholder': 'Фамилия',
                    }
            ),
            'first_name': forms.TextInput(
                    attrs={
                        'class': 'form-control',
                        'placeholder': 'Имя'
                    }
            ),
            'middle_name': forms.TextInput(
                    attrs={
                        'class': 'form-control',
                        'placeholder': 'Отчество'
                    }
            ),
            'nickname': forms.TextInput(
                    attrs={
                        'class': 'form-control',
                        'placeholder': 'Введите nickname'
                    }
            ),
            'phone': forms.TextInput(
                    attrs={
                        'class': 'form-control',
                        'placeholder': 'Номер телефона'
                    }
            ),
            'email': forms.TextInput(
                    attrs={
                        'class': 'form-control',
                        'placeholder': 'Email'
                    }
            ),
            'school': forms.TextInput(
                    attrs={
                        'class': 'form-control',
                        'placeholder': 'Номер школы'
                    }
            ),
            'bio': forms.Textarea(
                    attrs={
                        'class': 'form-control',
                        'rows': '5',
                        'placeholder': 'Биография'
                    }
            ),
        }
        exclude = ['many_to_many_field']

    def __init__(self, *args, **kwargs):
        super(UserProfileUpdateForm, self).__init__(*args, **kwargs)
        for field in self.fields:
            self.fields[field].required = False
