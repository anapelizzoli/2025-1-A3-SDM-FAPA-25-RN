from django.urls import path, include
from . import views
from rest_framework import routers

app_name = "local_inspecao"

router = routers.DefaultRouter()
router.register("", views.Local_InspecaoViewSet, basename="local_inspecao")

urlpatterns = [path("", include(router.urls))]
