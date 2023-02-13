from django.shortcuts import render
from rest_framework import views
from rest_framework_simplejwt.views import TokenObtainPairView

from .serializers import TokenObtainPairPatchedSerializer

# Create your views here.

class TokenObtainPairPatchedView(TokenObtainPairView):
    """
    Takes a set of user credentials and returns an access and refresh JSON web
    token pair to prove the authentication of those credentials.
    """

    serializer_class = TokenObtainPairPatchedSerializer
class UserRegisterAPI(views.APIView):
    pass