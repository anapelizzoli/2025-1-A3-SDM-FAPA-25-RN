from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import DocumentoViewSet

app_name = "documento"

router = DefaultRouter()
router.register("", DocumentoViewSet, basename="documento")

urlpatterns = [
    path("", include(router.urls)),
]
