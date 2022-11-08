# Generated by Django 4.1.2 on 2022-11-08 08:01

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('main', '0009_delete_link_remove_course_status_remove_step_status_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='StepStatus',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('status', models.CharField(choices=[('NS', 'Не начат'), ('OW', 'На изучении'), ('WA', 'Ошибка выполнения'), ('OK', 'Шаг пройден')], default='NS', max_length=2, null=True, verbose_name='Статус')),
                ('step', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='main.step')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='User')),
            ],
        ),
    ]
