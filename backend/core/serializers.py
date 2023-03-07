from pyexpat import model
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .models import AuthUser, Conversation, Message


class TokenObtainPairPatchedSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        # The default result (access/refresh tokens)
        data = super(TokenObtainPairPatchedSerializer, self).validate(attrs)

        data['username'] = self.user.username
        return data
        # Custom data you want to include
        # data.update({'organization': self.user.organization.uid})
        # and everything else you want to send in the response

class UserCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = AuthUser
        fields = [
            'id',
            'email',
            'username',
            'age',
            'gender',
            'address',
            "password"
        ]
    
    def create(self, validated_data):
        user = super().create(validated_data)
        user.set_password(validated_data["password"])
        user.save()
        return user


class ConversationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Conversation
        fields = '__all__'

class MessageSerializer(serializers.ModelSerializer):
    from_user = serializers.SerializerMethodField()
    to_user = serializers.SerializerMethodField()
    conversation = serializers.SerializerMethodField()

    class Meta:
        model = Message
        fields = (
            "id",
            "conversation",
            "from_user",
            "to_user",
            "content",
            "created_at",
            "read",
        )

    def get_conversation(self, obj):
        return str(obj.conversation.id)

    def get_from_user(self, obj):
        return UserCreateSerializer(obj.from_user).data

    def get_to_user(self, obj):
        return UserCreateSerializer(obj.to_user).data
