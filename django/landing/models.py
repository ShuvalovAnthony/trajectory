from django.db import models


class Lead(models.Model):
    parent_first_name = models.CharField(max_length=30)
    parent_last_name = models.CharField(max_length=30)
    parent_middle_name = models.CharField(max_length=30, blank=True)

    children_first_name = models.CharField(max_length=30)
    children_last_name = models.CharField(max_length=30)
    children_middle_name = models.CharField(max_length=30, blank=True)
    children_class_number = models.PositiveIntegerField()

    email = models.EmailField()
    phone = models.CharField(max_length=30)
    extra = models.TextField(blank=True)

    def __str__(self) -> str:
        return self.email

