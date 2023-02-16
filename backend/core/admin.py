from django.contrib import admin

from .models import AuthUser, Conversation

# Register your models here.

admin.site.register(AuthUser)
admin.site.register(Conversation)
