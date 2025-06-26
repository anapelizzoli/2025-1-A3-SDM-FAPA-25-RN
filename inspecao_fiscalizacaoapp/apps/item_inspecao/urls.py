from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ItemInspecaoViewSet

app_name = "item_inspecao"

router = DefaultRouter()
router.register("", ItemInspecaoViewSet, basename="item_inspecao")

urlpatterns = [
    path("", include(router.urls)),
]
