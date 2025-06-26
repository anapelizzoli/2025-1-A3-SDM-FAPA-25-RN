from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import IrregularidadeViewSet

app_name = "irregularidade"

router = DefaultRouter()
router.register("", IrregularidadeViewSet, basename="irregularidade")

urlpatterns = [
    path("", include(router.urls)),
]
