import json
from uuid import UUID

from asgiref.sync import async_to_sync
from channels.generic.websocket import JsonWebsocketConsumer

from .models import AuthUser, Conversation, Message
from .serializers import MessageSerializer


class UUIDEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, UUID):
            # if the obj is uuid, we simply return the value of uuid
            return obj.hex
        return json.JSONEncoder.default(self, obj)

class ChatConsumer(JsonWebsocketConsumer):
    """
    This consumer is used to show user's online status,
    and send notifications.
    """

    def __init__(self, *args, **kwargs):
        super().__init__(args, kwargs)
        self.user = None
        self.conversation_name = None
        self.conversation = None

    def connect(self):
        self.user = self.scope["user"]
        if not self.user.is_authenticated:
            return

        self.accept()
        self.conversation_name = (
            f"{self.scope['url_route']['kwargs']['conversation_name']}"
        )
        self.conversation = Conversation.objects.get(
            name=self.conversation_name
        )
                
        async_to_sync(self.channel_layer.group_add)(
            self.conversation_name,
            self.channel_name,
        )
        self.conversation = Conversation.objects.get(
            name=self.conversation_name
        ) 


        if self.conversation.user_create_zoom and self.conversation.user_guest:
            self.conversation.is_active = False
            self.conversation.save()
            async_to_sync(self.channel_layer.group_send)(
                    self.conversation_name,
                    {
                        "type": "user_join",
                        "user": self.user.username,
                    },
                )


        

    def disconnect(self, code):
        if self.user.is_authenticated:
            # send the leave event to the room            
            async_to_sync(self.channel_layer.group_send)(
                self.conversation_name,
                {
                    "type": "user_leave",
                    "user": self.user.username,
                },
            )
            self.conversation.is_active = False
            self.conversation.save()
        return super().disconnect(code)

    def get_receiver(self):
        self.conversation = Conversation.objects.get(
            name=self.conversation_name
        )        
        usernames = [self.conversation.user_create_zoom.username, self.conversation.user_guest.username]
        for username in usernames:
            if username != self.user.username:
                # This is the receiver
                return AuthUser.objects.get(username=username)

    def receive_json(self, content, **kwargs):
        message_type = content["type"]

        if message_type == "chat_message":
            message = Message.objects.create(
                from_user=self.user,
                to_user=self.get_receiver(),
                content=content["message"],
                conversation=self.conversation,
            )

            async_to_sync(self.channel_layer.group_send)(
                self.conversation_name,
                {
                    "type": "chat_message_echo",
                    "name": self.user.username,
                    "message": MessageSerializer(message).data,
                },
            )



        return super().receive_json(content, **kwargs)

    def chat_message_echo(self, event):
        self.send_json(event)

    def user_join(self, event):
        self.send_json(event)

    def user_leave(self, event):
        self.send_json(event)

    def typing(self, event):
        self.send_json(event)

    def new_message_notification(self, event):
        self.send_json(event)

    def unread_count(self, event):
        self.send_json(event)

    @classmethod
    def encode_json(cls, content):
        return json.dumps(content, cls=UUIDEncoder)