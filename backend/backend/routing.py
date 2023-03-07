from distutils import core

from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from core import routing
from core.middleware import TokenAuthMiddleware

application = ProtocolTypeRouter({
    "websocket": TokenAuthMiddleware(URLRouter(routing.websocket_urlpatterns))
})

