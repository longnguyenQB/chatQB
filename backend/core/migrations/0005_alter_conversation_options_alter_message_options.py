# Generated by Django 4.0 on 2023-02-17 10:33

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0004_conversation_user_create_zoom_and_more'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='conversation',
            options={'ordering': ['-id']},
        ),
        migrations.AlterModelOptions(
            name='message',
            options={'ordering': ['-id']},
        ),
    ]
