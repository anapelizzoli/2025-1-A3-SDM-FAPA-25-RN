from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import InspecaoViewSet

app_name = "inspecao"

router = DefaultRouter()
router.register("", InspecaoViewSet, basename="inspecao")

urlpatterns = [
    path("", include(router.urls)),
]
