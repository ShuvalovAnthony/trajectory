# Generated by Django 4.1.2 on 2023-01-27 00:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('landing', '0002_remove_lead_children_remove_lead_parent_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='lead',
            name='children_first_name',
            field=models.CharField(blank=True, max_length=30),
        ),
        migrations.AlterField(
            model_name='lead',
            name='children_last_name',
            field=models.CharField(blank=True, max_length=30),
        ),
    ]