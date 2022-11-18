# Generated by Django 4.1.2 on 2022-11-14 15:13

import autoslug.fields
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Course',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=30)),
                ('description', models.CharField(max_length=120)),
                ('is_published', models.BooleanField(default=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='User')),
            ],
        ),
        migrations.CreateModel(
            name='File',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=30)),
                ('file', models.FileField(blank=True, upload_to='')),
            ],
        ),
        migrations.CreateModel(
            name='Step',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=30)),
                ('title_on_en', models.CharField(max_length=30)),
                ('description', models.CharField(max_length=120)),
                ('content', models.TextField()),
                ('slug', autoslug.fields.AutoSlugField(editable=False, populate_from='title_on_en')),
                ('is_published', models.BooleanField(default=True)),
                ('file', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, to='main.file')),
            ],
        ),
        migrations.CreateModel(
            name='Theme',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=30)),
                ('title_on_en', models.CharField(max_length=30)),
                ('description', models.CharField(max_length=120)),
                ('slug', autoslug.fields.AutoSlugField(editable=False, populate_from='title_on_en')),
                ('is_published', models.BooleanField(default=True)),
                ('course', models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, to='main.course')),
            ],
        ),
        migrations.CreateModel(
            name='StepStatus',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('status', models.CharField(choices=[('NS', 'Не начат'), ('OW', 'На изучении'), ('WA', 'Ошибка выполнения'), ('OK', 'Шаг пройден')], default='NS', max_length=2, null=True, verbose_name='Статус')),
                ('step', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='main.step')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='User')),
            ],
        ),
        migrations.AddField(
            model_name='step',
            name='theme',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, to='main.theme'),
        ),
        migrations.CreateModel(
            name='Note',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('note', models.CharField(max_length=255)),
                ('step', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main.step', verbose_name='Step')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='User')),
            ],
        ),
        migrations.CreateModel(
            name='CourseAccess',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('full_access', models.BooleanField(default=False)),
                ('expire_date', models.DateField(default=django.utils.timezone.now)),
                ('course', models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, to='main.course')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='User')),
            ],
        ),
    ]