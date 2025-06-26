from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import FotoViewSet

app_name = "foto"

router = DefaultRouter()
router.register("", FotoViewSet, basename="foto")

urlpatterns = [
    path("", include(router.urls)),
]
