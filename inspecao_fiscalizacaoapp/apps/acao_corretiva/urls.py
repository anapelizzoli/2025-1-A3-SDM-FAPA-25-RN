from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AcaoCorretivaViewSet

app_name = "acao_corretiva"

router = DefaultRouter()
router.register("", AcaoCorretivaViewSet, basename="acao_corretiva")

urlpatterns = [
    path("", include(router.urls)),
]
