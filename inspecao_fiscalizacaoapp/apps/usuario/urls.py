from django.urls import path, include
from . import views
from rest_framework import routers

app_name = "usuario"

router = routers.DefaultRouter()
router.register("", views.UsuarioViewSet, basename="usuario")

urlpatterns = [path("", include(router.urls))]
