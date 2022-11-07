# Generated by Django 4.1.2 on 2022-11-07 06:18

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0008_alter_step_content'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Link',
        ),
        migrations.RemoveField(
            model_name='course',
            name='status',
        ),
        migrations.RemoveField(
            model_name='step',
            name='status',
        ),
        migrations.RemoveField(
            model_name='theme',
            name='status',
        ),
        migrations.AddField(
            model_name='course',
            name='is_published',
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name='step',
            name='file',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, to='main.file'),
        ),
        migrations.AddField(
            model_name='step',
            name='is_published',
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name='theme',
            name='is_published',
            field=models.BooleanField(default=True),
        ),
        migrations.DeleteModel(
            name='StepStatus',
        ),
        migrations.DeleteModel(
            name='ThemeStatus',
        ),
    ]
