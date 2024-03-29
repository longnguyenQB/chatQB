# Generated by Django 4.0 on 2023-02-17 08:05

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0003_conversation_message'),
    ]

    operations = [
        migrations.AddField(
            model_name='conversation',
            name='user_create_zoom',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='conversation_create_user', to='core.authuser'),
        ),
        migrations.AddField(
            model_name='conversation',
            name='user_guest',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='conversation_guest_user', to='core.authuser'),
        ),
    ]
