import random

from django.shortcuts import render
from django.utils.crypto import get_random_string
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView

from .models import Conversation
from .serializers import (ConversationSerializer,
                          TokenObtainPairPatchedSerializer,
                          UserCreateSerializer)


class GENDER:
    MALE = "MALE"
    FEMALE = "FEMALE"
    LGBT = "LGBT"



def rand_str(length=32, type="lower_hex"):
    if type == "str":
        return get_random_string(length, allowed_chars="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789")
    elif type == "lower_str":
        return get_random_string(length, allowed_chars="abcdefghijklmnopqrstuvwxyz0123456789")
    elif type == "lower_hex":
        return random.choice("123456789abcdef") + get_random_string(length - 1, allowed_chars="0123456789abcdef")
    else:
        return random.choice("123456789") + get_random_string(length - 1, allowed_chars="0123456789")
# Create your views here.

class TokenObtainPairPatchedView(TokenObtainPairView):
    """
    Takes a set of user credentials and returns an access and refresh JSON web
    token pair to prove the authentication of those credentials.
    """

    serializer_class = TokenObtainPairPatchedSerializer
class UserRegisterAPI(APIView):
    
    def post(self, request):
        serializer = UserCreateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, 201)
        else:
            return Response(serializer.data, 403)

class FindingRoom(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        data = request.data
        find_gender = data.get("find_gender")
        user_gender = data.get("user_gender")
        conversation = get_or_create(find_gender,user_gender)
        conversation_data = ConversationSerializer(conversation).data
        return Response(conversation_data, 200)

        
        


def get_or_create(find_gender, user_gender):
    if user_gender == GENDER.MALE:
        if find_gender == GENDER.MALE:
            
            conversation = Conversation.objects.filter(user_gender=GENDER.MALE, find_gender=GENDER.MALE, is_active=True)
            if conversation.exists():
                return conversation.last()
            else:
                conversation = Conversation.objects.create(
                    name=rand_str(),
                    user_gender=user_gender,
                    find_gender=find_gender,
                )
                return conversation

        elif find_gender == GENDER.FEMALE:
            conversation = Conversation.objects.filter(user_gender=GENDER.FEMALE, find_gender=GENDER.MALE, is_active=True)
            if conversation.exists():
                return conversation.last()
            else:
                conversation = Conversation.objects.create(
                    name=rand_str(),
                    user_gender=user_gender,
                    find_gender=find_gender,
                )
                return conversation
        elif find_gender == GENDER.LGBT:
                conversation = Conversation.objects.filter(user_gender=GENDER.LGBT, find_gender=GENDER.MALE, is_active=True)
                if conversation.exists():
                    return conversation.last()
                else:
                    conversation = Conversation.objects.create(
                        name=rand_str(),
                        user_gender=user_gender,
                        find_gender=find_gender,
                    )
                    return conversation

        
    if user_gender == GENDER.FEMALE:
        if find_gender == GENDER.MALE:
            conversation = Conversation.objects.filter(user_gender=GENDER.MALE, find_gender=GENDER.FEMALE, is_active=True)
            if conversation.exists():
                return conversation.last()
            else:
                conversation = Conversation.objects.create(
                    name=rand_str(),
                    user_gender=user_gender,
                    find_gender=find_gender,
                )
                return conversation

        elif find_gender == GENDER.FEMALE:
            conversation = Conversation.objects.filter(user_gender=GENDER.FEMALE, find_gender=GENDER.FEMALE, is_active=True)
            if conversation.exists():
                return conversation.last()
            else:
                conversation = Conversation.objects.create(
                    name=rand_str(),
                    user_gender=user_gender,
                    find_gender=find_gender,
                )
                return conversation
        elif find_gender == GENDER.LGBT:
            conversation = Conversation.objects.filter(user_gender=GENDER.LGBT, find_gender=GENDER.FEMALE, is_active=True)
            if conversation.is_exits():
                return conversation.last()
            else:
                conversation = Conversation.objects.create(
                    name=rand_str(),
                    user_gender=user_gender,
                    find_gender=find_gender,
                )
                return conversation

    if user_gender == GENDER.LGBT:
        if find_gender == GENDER.MALE:
            conversation = Conversation.objects.filter(user_gender=GENDER.MALE, find_gender=GENDER.LGBT, is_active=True)
            if conversation.exists():
                return conversation.last()
            else:
                conversation = Conversation.objects.create(
                    name=rand_str(),
                    user_gender=user_gender,
                    find_gender=find_gender,
                )

        elif find_gender == GENDER.FEMALE:
            conversation = Conversation.objects.filter(user_gender=GENDER.FEMALE, find_gender=GENDER.LGBT, is_active=True)
            if conversation.exists():
                return conversation.last()
            else:
                conversation = Conversation.objects.create(
                    name=rand_str(),
                    user_gender=user_gender,
                    find_gender=find_gender,
                )
                return conversation
        elif find_gender == GENDER.LGBT:
            conversation = Conversation.objects.filter(user_gender=GENDER.LGBT, find_gender=GENDER.LGBT, is_active=True)
            if conversation.exists():
                return conversation.last()
            else:
                conversation = Conversation.objects.create(
                    name=rand_str(),
                    user_gender=user_gender,
                    find_gender=find_gender,
                )
                return conversation