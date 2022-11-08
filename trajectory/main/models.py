from django.db import models
from users.models import CustomUser
from autoslug import AutoSlugField
from tinymce.models import HTMLField


class Course(models.Model):
    title = models.CharField(max_length=30)
    description = models.CharField(max_length=120)
    user = models.ForeignKey(CustomUser, verbose_name='User', on_delete=models.CASCADE)
    is_published = models.BooleanField(default=True)

    def __str__(self) -> str:
        return self.title


class Theme(models.Model):
    course = models.ForeignKey('Course', on_delete=models.PROTECT, null=True)
    title = models.CharField(max_length=30)
    title_on_en = models.CharField(max_length=30)
    description = models.CharField(max_length=120)
    slug = AutoSlugField(populate_from='title_on_en')
    is_published = models.BooleanField(default=True)

    def __str__(self) -> str:
        return self.title


class Step(models.Model):
    theme = models.ForeignKey('Theme', on_delete=models.PROTECT, null=True)
    title = models.CharField(max_length=30)
    title_on_en = models.CharField(max_length=30)
    description = models.CharField(max_length=120)
    content = HTMLField(blank=True)
    file = models.ForeignKey('File', on_delete=models.PROTECT, null=True)
    slug = AutoSlugField(populate_from='title_on_en')
    is_published = models.BooleanField(default=True)

    def __str__(self) -> str:
        return self.title


class StepStatus(models.Model):
    step = models.ForeignKey('Step', on_delete=models.CASCADE, null=True)
    user = models.ForeignKey(CustomUser, verbose_name='User', on_delete=models.CASCADE)
    STATUS_CHOICES = [
        ('NS', 'Не начат'),
        ('OW', 'На изучении'),
        ('WA', 'Ошибка выполнения'),
        ('OK', 'Шаг пройден'),
    ]
    status = models.CharField(
        verbose_name='Статус',
        max_length=2,
        choices=STATUS_CHOICES,
        default='NS',
        null=True,
    )

    def __str__(self) -> str:
        return self.step.title + ' ' + self.user.email


class File(models.Model):
    title = models.CharField(max_length=30)
    file = models.FileField(blank=True)

    def __str__(self) -> str:
        return self.title


class Note(models.Model):
    user = models.ForeignKey(CustomUser, verbose_name='User', on_delete=models.CASCADE)
    step = models.ForeignKey(Step, verbose_name='Step', on_delete=models.CASCADE)
    note = models.CharField(max_length=255)

    def __str__(self) -> str:
        return self.note
