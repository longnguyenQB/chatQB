from django.contrib import admin

from .models import AuthUser, Config, Conversation, Message


# Register your models here.
class ConversationAdmin(admin.ModelAdmin):
    list_display = ['name', 'user_gender', 'find_gender', 'user_create_zoom', 'user_guest', 'is_active']

class MessageAdmin(admin.ModelAdmin):
    list_display = ['from_user', 'to_user', 'content']

admin.site.register(AuthUser)
admin.site.register(Conversation, ConversationAdmin)
admin.site.register(Message, MessageAdmin)
admin.site.register(Config)
