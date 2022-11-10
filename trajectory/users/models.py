from django.contrib.auth.models import AbstractUser, PermissionsMixin
from django.db import models
from .managers import CustomUserManager


class CustomUser(AbstractUser, PermissionsMixin):
    username = None
    first_name = models.CharField(
        verbose_name='Имя',
        max_length=30
    )
    middle_name = models.CharField(
        verbose_name='Отчество',
        max_length=30,
        blank=True
    )
    last_name = models.CharField(
        verbose_name='Фамилия',
        max_length=30
    )
    nickname = models.CharField(
        verbose_name='Username',
        max_length=30,
        error_messages={
            'unique': 'Пользователь с таким никнеймом уже зарегистрировался'
        }
    )
    phone = models.CharField(
        verbose_name='Номер телефона',
        max_length=11,
        error_messages={
            'unique': 'Пользователь с таким номером уже зарегистрировался'
        }
    )
    email = models.EmailField(
        verbose_name='Адрес электронной почты',
        unique=True,
        error_messages={
            'unique': 'Пользователь с такой почтой уже зарегистрировался'
        }
    )
    STATUS_CHOICES = [
        ('TC', 'Учитель'),
        ('ST', 'Ученик'),
        ('PR', 'Родитель')
    ]
    status = models.CharField(
        verbose_name='Статус',
        max_length=2,
        choices=STATUS_CHOICES,
        default='ST',
        blank=True
    )
    school = models.CharField(
        verbose_name='Номер школы',
        max_length=30,
        null=True
    )
    date_create = models.DateTimeField(
        auto_now_add=True
    )
    bio = models.TextField(
        verbose_name='Биография',
        default='Биография сгенерирована роботом. Напишите тут ее самостоятельно :)',
        max_length=2000,
        blank=True
    )

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    objects = CustomUserManager()

    class Meta:
        verbose_name = 'User'
        verbose_name_plural = 'Users'
        ordering = ['pk']

    def __str__(self):
        return f'{self.first_name} {self.last_name}'