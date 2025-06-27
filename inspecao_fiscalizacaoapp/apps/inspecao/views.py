from rest_framework import viewsets
from .models import Inspecao
from .serializer import InspecaoSerializer


class InspecaoViewSet(viewsets.ModelViewSet):
    queryset = Inspecao.objects.all()
    serializer_class = InspecaoSerializer
