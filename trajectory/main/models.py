from email.policy import default
from django.db import models
from django.contrib.auth.models import User


class Plan(models.Model):
    title = models.CharField(max_length=30)
    description = models.CharField(max_length=120)
    status = models.BooleanField(default=False)
    user = models.ForeignKey(User, verbose_name='User', on_delete=models.CASCADE)

    def __str__(self) -> str:
        return self.title


class Theme(models.Model):
    plan = models.ForeignKey('Plan', on_delete=models.PROTECT, null=True)
    status = models.ForeignKey('ThemeStatus', on_delete=models.CASCADE, null=True)
    title = models.CharField(max_length=30)
    description = models.CharField(max_length=120)

    def __str__(self) -> str:
        return self.title


class Step(models.Model):
    theme = models.ForeignKey('Theme', on_delete=models.PROTECT, null=True)
    status = models.ForeignKey('StepStatus', on_delete=models.CASCADE, null=True)
    title = models.CharField(max_length=30)
    description = models.CharField(max_length=120)
    content = models.TextField(max_length=500)

    def __str__(self) -> str:
        return self.title


class ThemeStatus(models.Model):
    status = models.CharField(max_length=20)

    def __str__(self) -> str:
        return self.status


class StepStatus(models.Model):
    status = models.CharField(max_length=20)

    def __str__(self) -> str:
        return self.status


class Link(models.Model):
    name = models.CharField(max_length=30)
    url = models.CharField(max_length=200)

    def __str__(self) -> str:
        return self.name


class File(models.Model):
    title = models.CharField(max_length=30)
    file = models.FileField(blank=True)

    def __str__(self) -> str:
        return self.title