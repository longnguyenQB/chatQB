from core.views import TokenObtainPairPatchedView, UserRegisterAPI
from django.urls import include, path

urlpatterns = [
    path("login/", TokenObtainPairPatchedView.as_view(), name='token_obtain_pair'),
    path("register/", UserRegisterAPI.as_view(), name="user_register_api"),
]

