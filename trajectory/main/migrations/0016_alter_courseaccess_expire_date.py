# Generated by Django 4.1.2 on 2022-11-13 07:39

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0015_alter_courseaccess_expire_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='courseaccess',
            name='expire_date',
            field=models.DateField(default=django.utils.timezone.now),
        ),
    ]