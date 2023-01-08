from django.db import models


class Parent(models.Model):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    middle_name = models.CharField(max_length=30)

    def __str__(self) -> str:
        return self.last_name


class Children(models.Model):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    middle_name = models.CharField(max_length=30)
    class_number = models.PositiveIntegerField()

    def __str__(self) -> str:
        return self.last_name


class Lead(models.Model):
    parent = models.ForeignKey(Parent, on_delete=models.CASCADE)
    children = models.ForeignKey(Children, on_delete=models.CASCADE)
    email = models.EmailField()
    phone = models.CharField(max_length=30)
    extra = models.TextField()

    def __str__(self) -> str:
        return self.email

