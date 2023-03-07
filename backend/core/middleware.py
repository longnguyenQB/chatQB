from urllib.parse import parse_qs

import jwt
from channels.db import database_sync_to_async
from django.conf import settings
from django.contrib.auth import get_user_model
from django.contrib.auth.models import AnonymousUser
from django.db import close_old_connections
from django.utils.translation import gettext_lazy as _
from rest_framework.authtoken.models import Token
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from rest_framework_simplejwt.tokens import UntypedToken

User = get_user_model()


class TokenAuthentication:
    """
    Simple token based authentication.

    Clients should authenticate by passing the token key in the query parameters.
    For example:

        ?token=401f7ac837da42b97f613d789819ff93537bee6a
    """

    model = None

    def get_model(self):
        if self.model is not None:
            return self.model
        from rest_framework.authtoken.models import Token

        return Token

    """
    A custom token model may be used, but must have the following properties.

    * key -- The string identifying the token
    * user -- The user to which the token belongs
    """

    def authenticate_credentials(self, key):
        model = self.get_model()
        try:
            token = model.objects.select_related("user").get(key=key)
            print(token)
        except model.DoesNotExist:
            raise AuthenticationFailed(_("Invalid token."))

        # if not token.user.is_active:
        #     raise AuthenticationFailed(_("User inactive or deleted."))

        return token.user


@database_sync_to_async
def get_user(scope):
    """
    Return the user model instance associated with the given scope.
    If no user is retrieved, return an instance of `AnonymousUser`.
    """
    # postpone model import to avoid ImproperlyConfigured error before Django
    # setup is complete.
    

    if "token" not in scope:
        raise ValueError(
            "Cannot find token in scope. You should wrap your consumer in "
            "TokenAuthMiddleware."
        )
    token = scope["token"]
    user = None
    try:
        # This will automatically validate the token and raise an error if token is invalid
        UntypedToken(token)
    except (InvalidToken, TokenError) as e:
        # Token is invalid
        # print(e)
        return None
    else:
        #  Then token is valid, decode it
        decoded_data = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
        # print(decoded_data)
        # Will return a dictionary like -
        # {
        #     "token_type": "access",
        #     "exp": 1568770772,
        #     "jti": "5c15e80d65b04c20ad34d77b6703251b",
        #     "user_id": 6
        # }

        # Get the user using ID
        user = get_user_model().objects.get(id=decoded_data["user_id"])
    return user or AnonymousUser()


class TokenAuthMiddleware:
    """
    Custom middleware that takes a token from the query string and authenticates via
    Django Rest Framework authtoken.
    """

    def __init__(self, app):
        # Store the ASGI application we were passed
        self.app = app

    async def __call__(self, scope, receive, send):
        # Look up user from query string (you should also do things like
        # checking if it is a valid user ID, or if scope["user"] is already
        # populated).
        query_params = parse_qs(scope["query_string"].decode())
        token = query_params["token"][0]
        scope["token"] = token
        scope["user"] = await get_user(scope)
        return await self.app(scope, receive, send)
