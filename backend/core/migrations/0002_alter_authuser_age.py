# Generated by Django 4.0 on 2023-02-08 02:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='authuser',
            name='age',
            field=models.IntegerField(default=0),
        ),
    ]
