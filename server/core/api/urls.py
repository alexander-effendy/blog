from rest_framework.routers import DefaultRouter
from posts.api.urls import post_router
from django.urls import path, include

# from django.urls import path
# from rest_framework.routers import DefaultRouter
# from .views import PostViewSet

# post_router = DefaultRouter()
# post_router.register(r'posts', PostViewSet)

router = DefaultRouter()

# posts
router.registry.extend(post_router.registry)

urlpatterns = [
  path('', include(router.urls)),
]

# comments


# texts